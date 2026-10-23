#!/usr/bin/env python3
"""Verify OpenCode 2 plugins in a real terminal without model generation."""
import base64
import json
import os
import re
import unicodedata
from pathlib import Path
import shlex
import socket
import subprocess
import tempfile
import time
import urllib.request

ROOT = Path(__file__).resolve().parent.parent
BINARY = os.environ.get("MOYU_OPENCODE_BINARY", "opencode")
WORK = Path(tempfile.mkdtemp(prefix="opencode-moyu-v2-smoke-"))
CONFIG = WORK / "config/opencode"
PROJECT = WORK / "project"
CONFIG.mkdir(parents=True)
PROJECT.mkdir()
ENV = os.environ | {f"XDG_{key}_HOME": str(WORK / key.lower()) for key in ["CONFIG", "DATA", "STATE", "CACHE"]}
ENV.update(OPENCODE_CONFIG_DIR=str(CONFIG), OPENCODE_SERVER_PASSWORD="moyu-local-smoke-only", OPENCODE_SERVER_USERNAME="opencode", TERM="xterm-256color")
ENV.pop("OPENCODE_CONFIG", None)
ENV.pop("OPENCODE_CONFIG_CONTENT", None)
subprocess.run(["node", str(ROOT / "dist/install.mjs"), "--config-dir", str(CONFIG), "--opencode-major", "2"], env=ENV, check=True, capture_output=True)
with socket.socket() as sock:
    sock.bind(("127.0.0.1", 0))
    PORT = sock.getsockname()[1]
URL = f"http://127.0.0.1:{PORT}"
SOCKET = f"moyu-v2-{os.getpid()}"
HEADERS = {"Content-Type": "application/json", "x-opencode-directory": str(PROJECT), "Authorization": "Basic " + base64.b64encode(b"opencode:moyu-local-smoke-only").decode()}
CHECKS = []

def api(path, data=None):
    request = urllib.request.Request(URL + path, data=json.dumps(data).encode() if data is not None else None, headers=HEADERS)
    with urllib.request.urlopen(request, timeout=10) as response:
        return json.load(response)

def tmux(*args, check=True):
    return subprocess.run(["tmux", "-L", SOCKET, "-f", "/dev/null", *args], text=True, capture_output=True, check=check).stdout

def capture(name):
    value = tmux("capture-pane", "-p", "-t", "reader:0.0")
    (WORK / (name + ".txt")).write_text(value)
    return value

def wait_for(predicate, name, timeout=30):
    deadline = time.monotonic() + timeout
    value = ""
    while time.monotonic() < deadline:
        value = capture(name)
        if predicate(value):
            CHECKS.append(name)
            print("PASS", name, flush=True)
            return value
        time.sleep(0.25)
    raise AssertionError(f"{name}\n{value}")

def click(label, name, hold=False):
    value = capture(name + "-before")
    row, line = min(((i, line) for i, line in enumerate(value.splitlines()) if label in line), key=lambda item: item[1].index(label))
    prefix = line[:line.index(label)]
    column = sum(0 if unicodedata.combining(c) else 2 if unicodedata.east_asian_width(c) in "WF" else 1 for c in prefix) + 2
    tmux("send-keys", "-t", "reader:0.0", "-l", f"\x1b[<0;{column};{row + 1}M")
    time.sleep(.25 if hold else .1)
    if hold:
        assert "· 目录" not in capture(name + "-held"), "Menu must not open on mouse-down"
    tmux("send-keys", "-t", "reader:0.0", "-l", f"\x1b[<0;{column};{row + 1}m")
    time.sleep(.15)


def footer_rows(text):
    lines = text.splitlines()
    return tuple(next(i for i, line in enumerate(lines) if label in line) for label in ["页 ·", "上一页", "点击上方按钮"])


def choose_height(percent, name):
    click("[高度", name + "-open")
    wait_for(lambda text: "阅读区高度" in text, name + "-menu")
    click(f"高度 {percent}%", name + "-select")
    return wait_for(lambda text: f"[高度 {percent}%]" in text and "阅读区高度" not in text, name)


def choose_width(percent, name):
    click("[宽度", name + "-open")
    wait_for(lambda text: "阅读区宽度" in text, name + "-menu")
    click(f"宽度 {percent}%", name + "-select")
    return wait_for(lambda text: f"[宽度 {percent}%]" in text and "阅读区宽度" not in text, name)


def sidebar_column(text):
    return next(line.index("随手读") for line in text.splitlines() if "随手读" in line)


def start(session):
    command = shlex.join(["env", *[f"{key}={value}" for key, value in ENV.items() if key.startswith(("XDG_", "OPENCODE_"))], "TERM=xterm-256color", BINARY, "--server", URL, "--session", session, str(PROJECT)])
    tmux("new-session", "-d", "-s", "reader", "-x", "160", "-y", "46", "-c", str(PROJECT), command + " 2>" + shlex.quote(str(WORK / "stderr.log")))
    tmux("set-option", "-t", "reader", "remain-on-exit", "on")

print("Artifacts:", WORK, flush=True)
log = (WORK / "server.log").open("w")
server = subprocess.Popen([BINARY, "serve", "--port", str(PORT)], cwd=PROJECT, env=ENV, stdout=log, stderr=subprocess.STDOUT)
try:
    deadline = time.monotonic() + 40
    while True:
        try:
            session = api("/api/session", {"title": "Moyu v2 smoke", "location": {"directory": str(PROJECT)}})["data"]["id"]
            break
        except Exception:
            if time.monotonic() > deadline:
                raise
            time.sleep(0.3)
    deadline = time.monotonic() + 35
    while True:
        plugins = api("/api/plugin")
        if any(row.get("id") == "opencode-moyu-server" for row in plugins["data"]):
            CHECKS.append("server-plugin")
            print("PASS server-plugin", flush=True)
            break
        if time.monotonic() > deadline:
            raise AssertionError(plugins)
        time.sleep(0.3)
    start(session)
    wait_for(lambda text: "随手读" in text and "夜班便利店" in text, "sidebar")
    tmux("send-keys", "-t", "reader:0.0", "M-Right")
    wait_for(lambda text: "2 /" in text, "next-page")
    tmux("send-keys", "-t", "reader:0.0", "-l", "/moyu")
    tmux("send-keys", "-t", "reader:0.0", "Enter")
    time.sleep(0.4)  # Arguments-capable commands first complete to '/moyu '.
    tmux("send-keys", "-t", "reader:0.0", "Enter")
    wait_for(lambda text: "书架 · 摸鱼阅读" in text and "让当前模型采集小说" in text, "slash-moyu-shelf")
    tmux("send-keys", "-t", "reader:0.0", "-l", "让当前模型")
    tmux("send-keys", "-t", "reader:0.0", "Enter")
    wait_for(lambda text: "让当前模型采集小说" in text and "忘语的凡人修仙传" in text, "collection-prompt")
    tmux("send-keys", "-t", "reader:0.0", "Escape")
    wait_for(lambda text: "让当前模型采集小说" not in text, "cancel-collection")
    tmux("send-keys", "-t", "reader:0.0", "M-o")
    wait_for(lambda text: "书架 · 摸鱼阅读" in text, "shelf")
    tmux("send-keys", "-t", "reader:0.0", "M-m")
    wait_for(lambda text: "随手读" not in text and "书架 · 摸鱼阅读" not in text, "hide-closes-dialog")
    tmux("send-keys", "-t", "reader:0.0", "M-m")
    wait_for(lambda text: "随手读" in text and "2 /" in text, "show")
    tmux("send-keys", "-t", "reader:0.0", "M-c")
    wait_for(lambda text: "夜班便利店 · 目录" in text, "chapters")
    tmux("send-keys", "-t", "reader:0.0", "Escape")
    wait_for(lambda text: "夜班便利店 · 目录" not in text, "cancel")
    tmux("send-keys", "-t", "reader:0.0", "-l", "input-check")
    wait_for(lambda text: "input-check" in text, "normal-input")
    tmux("send-keys", "-t", "reader:0.0", "C-c")
    tmux("kill-session", "-t", "reader")
    time.sleep(1)
    start(session)
    wait_for(lambda text: "随手读" in text and "2 /" in text, "restart-resume")
    initial = capture("before-size")
    original_column = sidebar_column(initial)
    click("[目录]", "chapter-press-release", hold=True)
    wait_for(lambda text: "夜班便利店 · 目录" in text, "click-chapters-stays-open")
    time.sleep(.7)
    assert "夜班便利店 · 目录" in capture("chapter-after-release")
    click("第二章 一张没有日期的小票", "choose-second-chapter")
    wait_for(lambda text: "夜班便利店 · 目录" not in text and "第二章 一张没有日期的小票" in text, "mouse-selects-chapter")
    click("[书架]", "click-shelf")
    wait_for(lambda text: "书架 · 摸鱼阅读" in text, "click-bookshelf-stays-open")
    click("夜班便利店", "choose-book")
    wait_for(lambda text: "书架 · 摸鱼阅读" not in text and "随手读" in text, "mouse-selects-book")
    choose_width(50, "width-50")
    wide = wait_for(lambda text: sidebar_column(text) < original_column - 20, "sidebar-actually-widens")
    assert "第二章 一张没有日期的小票" in wide
    assert int(re.search(r"\d+ / (\d+) 页", wide)[1]) < int(re.search(r"\d+ / (\d+) 页", initial)[1]), "Wider body must reflow pagination"
    click("[隐藏]", "click-hide")
    wait_for(lambda text: "[显示阅读]" in text and "随手读" not in text, "mouse-hides-reader")
    hidden = capture("hidden-width")
    assert next(line.index("[显示阅读]") for line in hidden.splitlines() if "[显示阅读]" in line) == original_column
    click("[显示阅读]", "click-show")
    wait_for(lambda text: "随手读" in text and sidebar_column(text) < original_column - 20, "mouse-restores-reader-width")
    choose_height(25, "height-25")
    time.sleep(0.5)
    small_footer = footer_rows(capture("height-25-layout"))
    choose_height(75, "height-75")
    enlarged = wait_for(lambda text: "阅读区高度" not in text and all(a > b for a, b in zip(footer_rows(text), small_footer)), "footer-moves-with-height")
    medium_footer = footer_rows(enlarged)
    assert len(set(a - b for a, b in zip(medium_footer, small_footer))) == 1
    choose_height(100, "height-100")
    full = wait_for(lambda text: all(a > b for a, b in zip(footer_rows(text), medium_footer)), "footer-moves-to-full-height")
    full_footer = footer_rows(full)
    tmux("send-keys", "-t", "reader:0.0", "M-g")
    wait_for(lambda text: "跳转阅读进度" in text, "last-page-jump")
    tmux("send-keys", "-t", "reader:0.0", "-l", "100")
    tmux("send-keys", "-t", "reader:0.0", "Enter")
    last = wait_for(lambda text: (match := re.search(r"(\d+) / (\d+) 页 · 100%", text)) and match[1] == match[2], "last-page")
    assert footer_rows(last) == full_footer, "Short final page must reserve the full body height"
    choose_height(75, "restore-height-75")
    tmux("send-keys", "-t", "reader:0.0", "-l", "sized-input-check")
    wait_for(lambda text: "sized-input-check" in text, "size-keeps-coding-input")
    tmux("send-keys", "-t", "reader:0.0", "C-c")
    tmux("kill-session", "-t", "reader")
    time.sleep(1)
    start(session)
    wait_for(lambda text: "[高度 75%]" in text and "[宽度 50%]" in text and sidebar_column(text) < original_column - 20, "restart-height")
    tmux("resize-window", "-t", "reader", "-x", "145", "-y", "32")
    wait_for(lambda text: len(text.splitlines()) == 32 and "[高度 75%]" in text and "下一页" in text, "compact-with-height")
    tmux("resize-window", "-t", "reader", "-x", "160", "-y", "54")
    wait_for(lambda text: len(text.splitlines()) == 54 and "[高度 75%]" in text and "下一页" in text, "resize-with-height")
    time.sleep(.7)  # Let the renderer finish its resize frames before hit testing.
    wait_for(lambda text: sidebar_column(text) == sidebar_column(wide), "width-proportion-after-resize")
    click("[高度", "height-reset-open")
    wait_for(lambda text: "阅读区高度" in text, "size-menu-reset")
    click("自动高度", "height-reset-select")
    wait_for(lambda text: "[高度 自动]" in text and "阅读区高度" not in text, "reset-height")
    click("[宽度", "width-reset-open")
    wait_for(lambda text: "阅读区宽度" in text, "width-menu-reset")
    click("默认宽度", "width-reset-select")
    wait_for(lambda text: "[宽度 自动]" in text and sidebar_column(text) == original_column, "reset-width")
    before_page = int(re.search(r"(\d+) / \d+ 页", capture("before-mouse-prev"))[1])
    click("[‹ 上一页]", "mouse-prev")
    wait_for(lambda text: (match := re.search(r"(\d+) / \d+ 页", text)) and int(match[1]) == before_page - 1, "mouse-page-turn")
    library = CONFIG / "extensions/opencode-moyu/books"
    encrypted = list(library.glob("*.moyubook"))
    assert len(encrypted) == 1
    resource_id = encrypted[0].stem
    click("[删除]", "delete-open")
    wait_for(lambda text: "从资料库删除" in text and "夜班便利店" in text, "top-delete-confirmation")
    tmux("send-keys", "-t", "reader:0.0", "Escape")
    wait_for(lambda text: "从资料库删除" not in text and "[删除]" in text, "delete-cancel")
    assert encrypted[0].exists()
    click("[删除]", "delete-reopen")
    wait_for(lambda text: "从资料库删除" in text and "confirm" in text.lower(), "delete-mouse-confirm-ready")
    current = capture("delete-confirm-buttons")
    confirm = "Confirm" if "Confirm" in current else "confirm"
    click(confirm, "delete-confirm-click")
    wait_for(lambda text: "点击打开本地小说" in text and "从资料库删除" not in text, "delete-clears-reader")
    assert not encrypted[0].exists()
    assert not list((library / ".moyu").rglob(resource_id + "*"))
    assert (library / "夜班便利店.txt").exists()
    CHECKS.append("delete-removes-encrypted-resource-and-cache")
    print(json.dumps({"checks": CHECKS, "artifacts": str(WORK)}, ensure_ascii=False), flush=True)
finally:
    tmux("kill-server", check=False)
    server.terminate()
    try:
        server.wait(timeout=10)
    except subprocess.TimeoutExpired:
        server.kill()
        server.wait()
    log.close()
