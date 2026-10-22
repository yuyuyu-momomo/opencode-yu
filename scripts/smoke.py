#!/usr/bin/env python3
"""Use an isolated OpenCode server and tmux; never send a model request."""
import json
import os
from pathlib import Path
import shlex
import socket
import subprocess
import tempfile
import time
import urllib.request

ROOT = Path(__file__).resolve().parent.parent
OPENCODE = os.environ.get("MOYU_OPENCODE_BINARY", "opencode")
WORK = Path(tempfile.mkdtemp(prefix="opencode-moyu-smoke-"))
CONFIG = WORK / "config" / "opencode"
PROJECT = WORK / "project"
CONFIG.mkdir(parents=True)
PROJECT.mkdir()
(CONFIG / "tui.json").write_text(json.dumps({"plugin": []}))
(CONFIG / "opencode.json").write_text('{"provider":{},"plugin":[]}')
(CONFIG / "package.json").write_text('{"dependencies":{"@opencode-ai/plugin":"1.19.0"}}')
(CONFIG / "node_modules/@opencode-ai").mkdir(parents=True)
(CONFIG / "node_modules/@opencode-ai/plugin").symlink_to(ROOT / "node_modules/@opencode-ai/plugin", target_is_directory=True)
ENV = os.environ | {
    "XDG_CONFIG_HOME": str(WORK / "config"),
    "XDG_DATA_HOME": str(WORK / "data"),
    "XDG_STATE_HOME": str(WORK / "state"),
    "XDG_CACHE_HOME": str(WORK / "cache"),
    "OPENCODE_CONFIG_DIR": str(CONFIG),
    "OPENCODE_DISABLE_MODELS_FETCH": "true",
    "OPENCODE_DISABLE_AUTOUPDATE": "true",
    "OPENCODE_DISABLE_DEFAULT_PLUGINS": "true",
    "TERM": "xterm-256color",
}
ENV.pop("OPENCODE_CONFIG", None)
ENV.pop("OPENCODE_CONFIG_CONTENT", None)
ENV.pop("OPENCODE_SERVER_PASSWORD", None)
ENV.pop("OPENCODE_SERVER_USERNAME", None)
subprocess.run(["node", str(ROOT / "dist/install.mjs"), "--config-dir", str(CONFIG)], check=True, env=ENV, capture_output=True)
installed_config = json.loads((CONFIG / "tui.json").read_text())
assert "/extensions/opencode-moyu/dist/tui.js" in installed_config["plugin"][0][0]
installed_config["plugin"][0][1]["rows"] = 12
(CONFIG / "tui.json").write_text(json.dumps(installed_config))
with socket.socket() as sock:
    sock.bind(("127.0.0.1", 0))
    port = sock.getsockname()[1]
url = f"http://127.0.0.1:{port}"
socket_name = f"moyu-{os.getpid()}"
checks = []

def tmux(*args, check=True):
    return subprocess.run(["tmux", "-L", socket_name, "-f", "/dev/null", *args], env=ENV, text=True, capture_output=True, check=check).stdout

def capture(name):
    output = tmux("capture-pane", "-p", "-t", "reader:0.0")
    (WORK / f"{name}.txt").write_text(output)
    return output

def wait_for(predicate, name, timeout=25):
    deadline = time.monotonic() + timeout
    output = ""
    while time.monotonic() < deadline:
        output = capture(name)
        if predicate(output):
            checks.append(name)
            print(f"PASS {name}", flush=True)
            return output
        time.sleep(0.25)
    raise AssertionError(f"Timeout: {name}\n{output}")

def start(session):
    cmd = shlex.join([OPENCODE, "attach", url, "--dir", str(PROJECT), "--session", session])
    # Pass isolation vars explicitly because tmux's server has its own environment.
    cmd = shlex.join(["env", *[f"{key}={value}" for key, value in ENV.items() if key.startswith("XDG_") or key.startswith("OPENCODE_")], "TERM=xterm-256color"]) + " " + cmd
    tmux("new-session", "-d", "-s", "reader", "-x", "160", "-y", "46", "-c", str(PROJECT), cmd + " 2>" + shlex.quote(str(WORK / "tui-stderr.log")))
    tmux("set-option", "-t", "reader", "remain-on-exit", "on")

log = (WORK / "server.log").open("w")
server = subprocess.Popen([OPENCODE, "serve", "--port", str(port)], cwd=PROJECT, env=ENV, stdout=log, stderr=subprocess.STDOUT)
print(f"Artifacts: {WORK}", flush=True)
try:
    deadline = time.monotonic() + 40
    while True:
        try:
            req = urllib.request.Request(url + "/session", data=json.dumps({"title": "Moyu plugin smoke"}).encode(), headers={"Content-Type": "application/json"})
            with urllib.request.urlopen(req, timeout=2) as response:
                session = json.load(response)["id"]
            break
        except Exception:
            if server.poll() is not None or time.monotonic() > deadline:
                raise RuntimeError((WORK / "server.log").read_text())
            time.sleep(0.3)
    start(session)
    with urllib.request.urlopen(url + "/experimental/tool/ids?directory=" + urllib.parse.quote(str(PROJECT)), timeout=20) as response:
        tool_ids = json.load(response)
    for name in ["moyu_sources", "moyu_catalog", "moyu_import", "moyu_library", "moyu_delete"]:
        assert name in tool_ids, (name, tool_ids)
    checks.append("00-model-tools-registered")
    print("PASS 00-model-tools-registered", flush=True)
    wait_for(lambda s: "随手读" in s and "夜班便利店" in s and "下一页" in s, "01-sidebar")
    tmux("send-keys", "-t", "reader:0.0", "M-Right")
    page2 = wait_for(lambda s: "2 / " in s, "02-next-page")
    tmux("send-keys", "-t", "reader:0.0", "M-Left")
    wait_for(lambda s: "1 / " in s, "03-prev-page")
    tmux("send-keys", "-t", "reader:0.0", "M-c")
    wait_for(lambda s: "目录" in s and "第一章" in s and "第二章" in s, "04-chapters")
    tmux("send-keys", "-t", "reader:0.0", "Escape")
    wait_for(lambda s: "搜索章节" not in s and "随手读" in s, "04b-close-chapters")
    tmux("send-keys", "-t", "reader:0.0", "M-o")
    wait_for(lambda s: "书架" in s and "打开本地文件" in s, "05-bookshelf")
    tmux("send-keys", "-t", "reader:0.0", "Escape")
    wait_for(lambda s: "打开本地文件" not in s and "随手读" in s, "05b-close-bookshelf")
    tmux("send-keys", "-t", "reader:0.0", "M-m")
    wait_for(lambda s: "随手读" not in s and "夜班便利店" not in s, "06-hide")
    tmux("send-keys", "-t", "reader:0.0", "M-m")
    wait_for(lambda s: "随手读" in s, "07-show")
    tmux("send-keys", "-t", "reader:0.0", "M-Right")
    wait_for(lambda s: "2 / " in s, "08-save-position")
    tmux("send-keys", "-t", "reader:0.0", "C-d")
    time.sleep(1)
    tmux("kill-session", "-t", "reader", check=False)
    start(session)
    wait_for(lambda s: "随手读" in s and "2 / " in s, "09-resume-position")
    tmux("resize-window", "-t", "reader:0", "-x", "145", "-y", "32")
    wait_for(lambda s: "随手读" in s and "下一页" in s, "10-resize")
    tmux("resize-window", "-t", "reader:0", "-x", "160", "-y", "46")
    time.sleep(0.5)
    tmux("send-keys", "-t", "reader:0.0", "M-g")
    wait_for(lambda s: "输入 0–100" in s, "11-jump-dialog")
    tmux("send-keys", "-t", "reader:0.0", "-l", "0")
    tmux("send-keys", "-t", "reader:0.0", "Enter")
    wait_for(lambda s: "输入 0–100" not in s and "1 / " in s, "12-jump-to-start")
    tmux("send-keys", "-t", "reader:0.0", "M-c")
    wait_for(lambda s: "搜索章节" in s, "13-directory-open")
    tmux("send-keys", "-t", "reader:0.0", "M-m")
    wait_for(lambda s: "随手读" not in s and "搜索章节" not in s, "14-hide-also-closes-dialog")
    tmux("send-keys", "-t", "reader:0.0", "M-m")
    wait_for(lambda s: "随手读" in s, "15-show-again")
    custom = WORK / "中文测试.txt"
    custom.write_text("第一章 本地导入\n这是本地文件读取验证。\n" * 100)
    tmux("send-keys", "-t", "reader:0.0", "M-o")
    wait_for(lambda s: "书架" in s and "打开本地文件" in s, "16-open-shelf")
    tmux("send-keys", "-t", "reader:0.0", "Enter")
    wait_for(lambda s: "本地 TXT / Markdown" in s, "17-file-dialog")
    tmux("send-keys", "-t", "reader:0.0", "-l", str(custom))
    tmux("send-keys", "-t", "reader:0.0", "Enter")
    wait_for(lambda s: "中文测试" in s and "这是本地文件读取验证" in s, "18-open-local-chinese-file")
    encrypted_books = list((CONFIG / "extensions/opencode-moyu/books").glob("*.moyubook"))
    assert encrypted_books
    assert all("这是本地文件读取验证".encode() not in item.read_bytes() for item in encrypted_books)
    checks.append("18b-import-encrypted")
    tmux("send-keys", "-t", "reader:0.0", "M-d")
    wait_for(lambda s: "从资料库删除" in s, "18c-delete-confirmation")
    tmux("send-keys", "-t", "reader:0.0", "Escape")
    wait_for(lambda s: "从资料库删除" not in s and "随手读" in s, "18d-cancel-delete")
    tmux("send-keys", "-t", "reader:0.0", "-l", "moyu_input_probe_123")
    wait_for(lambda s: "moyu_input_probe_123" in s and "随手读" in s, "19-coding-prompt-still-works")
    delete_code = '''import {pathToFileURL} from "node:url";
const plugin=(await import(pathToFileURL(process.argv[1]).href)).default;
const hooks=await plugin.server({},JSON.parse(process.argv[2]));
console.log(await hooks.tool.moyu_delete.execute({id:process.argv[3]},{ask:async()=>{}}));'''
    library_dir = CONFIG / "extensions/opencode-moyu/books"
    sample_id_files = set()
    # The most recently modified encrypted book is the just-imported custom file.
    latest = max(library_dir.glob("*.moyubook"), key=lambda path: path.stat().st_mtime_ns)
    options = json.loads((CONFIG / "opencode.json").read_text())["plugin"][0][1]
    subprocess.run(["node", "--input-type=module", "-e", delete_code, str(CONFIG / "extensions/opencode-moyu/dist/server.js"), json.dumps(options), latest.stem], check=True, capture_output=True)
    wait_for(lambda s: "中文测试" not in s and "Alt+O 打开本地小说" in s, "19b-model-delete-clears-sidebar")
    assert custom.exists()
    assert not latest.exists()
    with urllib.request.urlopen(url + f"/session/{session}/message", timeout=5) as response:
        messages = json.load(response)
    assert messages == [], messages
    checks.append("20-no-messages-or-model-calls")
    print("PASS 20-no-messages-or-model-calls", flush=True)
    print(json.dumps({"ok": True, "checks": checks, "artifacts": str(WORK)}, ensure_ascii=False), flush=True)
finally:
    tmux("kill-server", check=False)
    server.terminate()
    try:
        server.wait(timeout=10)
    except subprocess.TimeoutExpired:
        server.kill()
        server.wait()
    log.close()
