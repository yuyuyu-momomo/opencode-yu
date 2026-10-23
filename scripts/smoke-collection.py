#!/usr/bin/env python3
"""Verify short TUI messages and private model rules with a local mock model."""
import base64
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path
import shlex
import socket
import subprocess
import tempfile
from threading import Thread
import time
import urllib.request
import unicodedata

ROOT = Path(__file__).resolve().parent.parent
WORK = Path(tempfile.mkdtemp(prefix="opencode-moyu-collection-smoke-"))
CONFIG = WORK / "config/opencode"
PROJECT = WORK / "project"
CONFIG.mkdir(parents=True)
PROJECT.mkdir()
REQUESTS = []
CHECKS = []
QUERY = "忘语的凡人修仙传，先采集20章"
SHORT = "采集小说：" + QUERY
FOLLOWUP = "只说一句你好"


class MockModel(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def do_GET(self):
        body = json.dumps({"object": "list", "data": [{"id": "moyu-mock", "object": "model"}]}).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        data = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
        REQUESTS.append(data)
        (WORK / "model-requests.json").write_text(json.dumps(REQUESTS, ensure_ascii=False))
        last = next((content(message) for message in reversed(data.get("messages", [])) if message["role"] == "user"), "")
        reply = "## Objective\n- Test collection.\n## Requirements\n- HTTP only.\n## Decisions\n- Local test.\n## Work State\n### Completed\n- Request received.\n### Active\n- (none)\n### Blocked\n- (none)\n## Next Move\n1. Continue test.\n## Relevant Files\n(none)\n## Important Context\n- No external model." if "structured summary" in last else "已收到。"
        if data.get("stream"):
            self.send_response(200)
            self.send_header("Content-Type", "text/event-stream")
            self.end_headers()
            for delta, finish in [({"role": "assistant", "content": reply}, None), ({}, "stop")]:
                part = {"id": "moyu-mock", "object": "chat.completion.chunk", "created": int(time.time()), "model": "moyu-mock", "choices": [{"index": 0, "delta": delta, "finish_reason": finish}]}
                if finish: part["usage"] = {"prompt_tokens": 1000, "completion_tokens": 5, "total_tokens": 1005}
                self.wfile.write(("data: " + json.dumps(part, ensure_ascii=False) + "\n\n").encode())
            self.wfile.write(b"data: [DONE]\n\n")
        else:
            body = json.dumps({"id": "moyu-mock", "object": "chat.completion", "created": int(time.time()), "model": "moyu-mock", "choices": [{"index": 0, "message": {"role": "assistant", "content": reply}, "finish_reason": "stop"}], "usage": {"prompt_tokens": 100, "completion_tokens": 5, "total_tokens": 105}}).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)


model = ThreadingHTTPServer(("127.0.0.1", 0), MockModel)
Thread(target=model.serve_forever, daemon=True).start()
MODEL = {"providerID": "moyu-local", "id": "moyu-mock"}
(CONFIG / "opencode.json").write_text(json.dumps({
    "model": "moyu-local/moyu-mock", "small_model": "moyu-local/moyu-mock",
    "compaction": {"auto": False},
    "provider": {"moyu-local": {"npm": "@ai-sdk/openai-compatible", "name": "Moyu local test", "options": {"baseURL": f"http://127.0.0.1:{model.server_port}/v1", "apiKey": "local-test-only"}, "models": {"moyu-mock": {"name": "Moyu mock", "limit": {"context": 131072, "output": 4096}}}}},
}))
BINARY = os.environ.get("MOYU_OPENCODE_BINARY", "opencode")
ENV = os.environ | {f"XDG_{key}_HOME": str(WORK / key.lower()) for key in ["CONFIG", "DATA", "STATE", "CACHE"]}
ENV.update(OPENCODE_CONFIG_DIR=str(CONFIG), OPENCODE_SERVER_PASSWORD="moyu-local-smoke-only", OPENCODE_SERVER_USERNAME="opencode", OPENCODE_DISABLE_MODELS_FETCH="true", OPENCODE_DISABLE_AUTOUPDATE="true", TERM="xterm-256color")
ENV.pop("OPENCODE_CONFIG", None)
ENV.pop("OPENCODE_CONFIG_CONTENT", None)
subprocess.run(["node", str(ROOT / "dist/install.mjs"), "--config-dir", str(CONFIG), "--opencode-major", "2"], env=ENV, check=True, capture_output=True)
with socket.socket() as sock:
    sock.bind(("127.0.0.1", 0))
    PORT = sock.getsockname()[1]
URL = f"http://127.0.0.1:{PORT}"
SOCKET = f"moyu-collection-{os.getpid()}"
HEADERS = {"Content-Type": "application/json", "x-opencode-directory": str(PROJECT), "Authorization": "Basic " + base64.b64encode(b"opencode:moyu-local-smoke-only").decode()}


def api(path, data=None):
    request = urllib.request.Request(URL + path, data=json.dumps(data).encode() if data is not None else None, headers=HEADERS)
    with urllib.request.urlopen(request, timeout=10) as response:
        return json.load(response)


def tmux(*args, check=True):
    return subprocess.run(["tmux", "-L", SOCKET, "-f", "/dev/null", *args], text=True, capture_output=True, check=check).stdout


def screen():
    value = tmux("capture-pane", "-p", "-t", "reader:0.0")
    (WORK / "screen.txt").write_text(value)
    return value


def wait_for(predicate, name, timeout=35):
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if predicate():
            CHECKS.append(name)
            print("PASS", name, flush=True)
            return
        time.sleep(0.25)
    raise AssertionError(f"{name}; artifacts: {WORK}")


def click(label):
    value = screen()
    row, line = min(((i, line) for i, line in enumerate(value.splitlines()) if label in line), key=lambda item: item[1].index(label))
    col = sum(0 if unicodedata.combining(c) else 2 if unicodedata.east_asian_width(c) in "WF" else 1 for c in line[:line.index(label)]) + 2
    tmux("send-keys", "-t", "reader:0.0", "-l", f"\x1b[<0;{col};{row+1}M")
    time.sleep(.15)
    tmux("send-keys", "-t", "reader:0.0", "-l", f"\x1b[<0;{col};{row+1}m")
    time.sleep(.2)


def context_row():
    return next(i for i, line in enumerate(screen().splitlines()) if line.rstrip().endswith("Context"))


def height_choice(percent):
    click("[高度")
    wait_for(lambda: "阅读区高度" in screen(), f"height-{percent}-menu")
    click(f"高度 {percent}%")
    wait_for(lambda: f"[高度 {percent}%]" in screen() and "阅读区高度" not in screen(), f"height-{percent}-selected")
    time.sleep(.5)


def content(message):
    value = message.get("content", "")
    return value if isinstance(value, str) else "\n".join(part.get("text", "") for part in value if isinstance(part, dict))


def model_request(text):
    return next((request for request in reversed(REQUESTS) if next((content(message) for message in reversed(request.get("messages", [])) if message["role"] == "user"), None) == text), None)


print("Artifacts:", WORK, flush=True)
log = (WORK / "server.log").open("w")
server = subprocess.Popen([BINARY, "serve", "--port", str(PORT)], cwd=PROJECT, env=ENV, stdout=log, stderr=subprocess.STDOUT)
try:
    deadline = time.monotonic() + 40
    while True:
        try:
            session = api("/api/session", {"title": "Moyu private instructions", "location": {"directory": str(PROJECT)}, "model": MODEL})["data"]["id"]
            break
        except Exception:
            if time.monotonic() > deadline:
                raise
            time.sleep(0.3)
    command = shlex.join(["env", *[f"{key}={value}" for key, value in ENV.items() if key.startswith(("XDG_", "OPENCODE_"))], "TERM=xterm-256color", BINARY, "--server", URL, "--session", session, str(PROJECT)])
    tmux("new-session", "-d", "-s", "reader", "-x", "160", "-y", "46", "-c", str(PROJECT), command)
    wait_for(lambda: "随手读" in screen() and "Moyu mock" in screen(), "local-model-and-reader")
    tmux("send-keys", "-t", "reader:0.0", "-l", "/moyu " + QUERY)
    time.sleep(0.3)
    tmux("send-keys", "-t", "reader:0.0", "Enter")
    wait_for(lambda: model_request(SHORT) is not None, "slash-reaches-local-model")
    parent = session
    tasks = api("/api/session")["data"]
    session = next(item["id"] for item in tasks if item.get("metadata", {}).get("sourceSessionID") == parent)
    CHECKS.append("collection-uses-fresh-session")
    request = model_request(SHORT)
    system = "\n".join(content(message) for message in request["messages"] if message["role"] in ["system", "developer"])
    assert "禁止打开或操控浏览器" in system and "moyu_import" in system
    CHECKS.append("model-gets-private-http-rules")
    wait_for(lambda: SHORT in screen() and "已收到。" in screen(), "tui-shows-short-request")
    visible = screen()
    assert "采集方式限定" not in visible and "不得通过 shell" not in visible
    messages = api(f"/api/session/{session}/message?order=asc")["data"]
    users = [message for message in messages if message["type"] == "user"]
    assert len(users) == 1 and users[0]["text"] == SHORT
    assert users[0]["metadata"]["origin"] == "moyu"
    CHECKS.append("history-has-no-internal-rules")
    wait_for(lambda: "Context" in screen() and "tokens" in screen(), "native-context-visible")
    wait_for(lambda: "[删除]" in screen() and "已交给当前模型" not in screen(), "collection-toast-cleared")
    height_choice(25)
    low = context_row()
    low_footer = next(i for i, line in enumerate(screen().splitlines()) if "点击上方按钮" in line)
    assert low > low_footer + 2, "Native context should sit at the bottom, separated from the small reader"
    height_choice(75)
    assert context_row() == low, "Native context should stay anchored when reader height changes"
    CHECKS.append("native-context-bottom-at-both-heights")
    height_choice(100)
    assert context_row() == low and "[删除]" in screen() and "下一页" in screen()
    CHECKS.append("full-height-reserves-context-and-reader-controls")
    api(f"/api/session/{session}/compact", {})
    wait_for(lambda: any(message["type"] == "compaction" and message.get("status") == "completed" for message in api(f"/api/session/{session}/message?order=asc")["data"]), "moyu-compaction-returns-summary")
    summary_requests = [request for request in REQUESTS if "structured summary" in content(request.get("messages", [{}])[-1])]
    assert summary_requests and all(not request.get("tools") for request in summary_requests)
    CHECKS.append("moyu-compaction-has-no-tools")
    tmux("send-keys", "-t", "reader:0.0", "-l", FOLLOWUP)
    tmux("send-keys", "-t", "reader:0.0", "Enter")
    wait_for(lambda: model_request(FOLLOWUP) is not None, "ordinary-followup")
    next_system = "\n".join(content(message) for message in model_request(FOLLOWUP)["messages"] if message["role"] in ["system", "developer"])
    assert "禁止打开或操控浏览器" not in next_system
    CHECKS.append("ordinary-task-has-no-moyu-rules")
    print(json.dumps({"checks": CHECKS, "artifacts": str(WORK), "externalModelRequests": 0}, ensure_ascii=False), flush=True)
finally:
    tmux("kill-server", check=False)
    server.terminate()
    try:
        server.wait(timeout=10)
    except subprocess.TimeoutExpired:
        server.kill()
        server.wait()
    model.shutdown()
    model.server_close()
    log.close()
