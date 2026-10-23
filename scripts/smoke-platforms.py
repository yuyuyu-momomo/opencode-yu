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
WORK = Path(tempfile.mkdtemp(prefix="opencode-moyu-platform-smoke-"))
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
    command = shlex.join(["env", *[f"{key}={value}" for key, value in ENV.items() if key.startswith(("XDG_", "OPENCODE_"))], *[f"{key}={value}" for key, value in ENV.items() if key.startswith("MOYU_")], "TERM=xterm-256color", BINARY, "--server", URL, "--session", session, str(PROJECT)])
    tmux("new-session", "-d", "-s", "reader", "-x", "160", "-y", "46", "-c", str(PROJECT), command + " 2>" + shlex.quote(str(WORK / "stderr.log")))
    tmux("set-option", "-t", "reader", "remain-on-exit", "on")


def has_pixels(text):
    if "随手读" not in text: return False
    column = sidebar_column(text)
    return '[object Object]' not in text and sum(bool(re.search('[▀-▟]', line[column:])) for line in text.splitlines()) >= 3

media = WORK / "测试 视频.mp4"
ffmpeg = os.environ["MOYU_FFMPEG"]
subprocess.run([ffmpeg, "-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i", "testsrc2=size=160x90:rate=10", "-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo", "-t", "30", "-c:v", "mpeg4", "-c:a", "aac", str(media)], check=True)
preload = """import {createVideoIngestion} from './src/services/video-ingestion.mjs';import{copyFile}from'node:fs/promises';import{join}from'node:path';
const service=createVideoIngestion({directory:process.argv[1],keyFile:process.argv[2],read:async()=>{throw new Error('offline fixture')},download:async(_url,work)=>{const path=join(work,'video.mp4');await copyFile(process.argv[3],path);return{path,title:'测试网络视频'}}});
console.log(JSON.stringify(await service.importVideo({url:'BV1xx411c7mD'})));
"""
subprocess.run(["node", "--input-type=module", "-e", preload, str(CONFIG / "extensions/opencode-moyu/books"), str(CONFIG / "extensions/opencode-moyu/keys/library.key"), str(media)], cwd=ROOT, check=True, capture_output=True)
novel = WORK / "目录定位测试.txt"
novel.write_text("\n".join(f"第{i}章 测试章节{i}\n" + ("这是一段测试正文。\n" * 30) for i in range(1, 51)))
print("Artifacts:", WORK, flush=True)
log = (WORK / "server.log").open("w")
server = subprocess.Popen([BINARY, "serve", "--port", str(PORT)], cwd=PROJECT, env=ENV, stdout=log, stderr=subprocess.STDOUT)
try:
    deadline = time.monotonic() + 40
    while True:
        try:
            session = api("/api/session", {"title": "Moyu media smoke", "location": {"directory": str(PROJECT)}})["data"]["id"]
            break
        except Exception:
            if time.monotonic() > deadline: raise
            time.sleep(.3)
    start(session)
    wait_for(lambda s: "[视频]" in s and "下一页" in s, "mode-buttons")
    time.sleep(1)
    click("[书架]", "open-book")
    wait_for(lambda s: "打开本地文件" in s, "book-shelf")
    click("＋ 打开本地文件", "local-book")
    wait_for(lambda s: "打开小说 · 本地" in s, "book-path")
    tmux("send-keys", "-t", "reader:0.0", "-l", str(novel))
    tmux("send-keys", "-t", "reader:0.0", "Enter")
    wait_for(lambda s: "目录定位测试" in s and "[目录]" in s, "book-imported")
    click("[目录]", "chapter-search")
    wait_for(lambda s: "搜索章节" in s, "chapters-open")
    tmux("send-keys", "-t", "reader:0.0", "-l", "测试章节35")
    time.sleep(.4)
    tmux("send-keys", "-t", "reader:0.0", "Enter")
    wait_for(lambda s: "第35章 测试章节35" in s and "[目录]" in s and "· 目录" not in s, "chapter-35-selected")
    click("[目录]", "chapter-current")
    wait_for(lambda s: "搜索章节" in s and "第35章 测试章节35" in s and "第1章 测试章节1" not in s, "chapter-auto-scrolls-current")
    tmux("send-keys", "-t", "reader:0.0", "Enter")
    wait_for(lambda s: "第35章 测试章节35" in s and "[目录]" in s and "· 目录" not in s, "chapter-current-highlighted")
    click("[视频]", "video-mode")
    wait_for(lambda s: "[视频库]" in s, "video-mode-visible")
    assert '[搜索]' in capture('discovery-buttons') and '[热门]' in capture('discovery-buttons')
    CHECKS.append('visible-search-and-popular')
    click("[视频库]", "video-shelf")
    wait_for(lambda s: "视频来源设置" in s, "video-source-entry")
    click("视频来源设置", "settings")
    wait_for(lambda s: "填写 YouTube API Key" in s, "youtube-key-missing")
    click("填写 YouTube API Key", "key-prompt")
    wait_for(lambda s: "YouTube API Key · 本地加密保存" in s, "youtube-key-input")
    fake_key = "AIzaSy" + "T" * 33
    tmux("send-keys", "-t", "reader:0.0", "-l", fake_key)
    tmux("send-keys", "-t", "reader:0.0", "Enter")
    key_file = CONFIG / "extensions/opencode-moyu/books/.moyu/settings/youtube.enc"
    wait_for(lambda s: key_file.exists() and "[视频库]" in s, "youtube-key-encrypted")
    assert fake_key.encode() not in key_file.read_bytes()
    click("[视频库]", "settings-shelf")
    wait_for(lambda s: "视频来源设置" in s, "settings-entry-again")
    click("视频来源设置", "settings-again")
    wait_for(lambda s: "已配置" in s and fake_key not in s, "youtube-key-not-echoed")
    click("移除保存的 YouTube", "key-remove")
    wait_for(lambda s: "移除本地保存的密钥" in s, "key-remove-confirmation")
    current = capture("key-remove-buttons")
    click("Confirm" if "Confirm" in current else "confirm", "key-confirm")
    wait_for(lambda s: "填写 YouTube API Key" in s and not key_file.exists(), "youtube-key-removed")
    tmux("send-keys", "-t", "reader:0.0", "Escape")
    wait_for(lambda s: "[视频库]" in s, "settings-closed")
    click("[视频库]", "cached-shelf")
    wait_for(lambda s: "测试网络视频" in s, "encrypted-cache-listed")
    click("测试网络视频", "cached-open")
    wait_for(lambda s: has_pixels(s) and "已暂停" in s and "[开启声音]" in s, "encrypted-video-pixels")
    click('[画质', 'quality-menu')
    wait_for(lambda s: '侧栏视频画质' in s and '自动清晰' in s, 'inline-quality-menu')
    click('像素风', 'pixel-quality')
    wait_for(lambda s: '[画质：像素风]' in s and has_pixels(s), 'pixel-mode-compatible')
    click('[画质', 'quality-return')
    wait_for(lambda s: '侧栏视频画质' in s, 'quality-reopen')
    click('自动清晰', 'native-quality')
    wait_for(lambda s: '[画质：细腻字符]' in s and has_pixels(s), 'native-blocks-fallback-honest')
    playback = CONFIG / "extensions/opencode-moyu/books/.moyu/playback"
    assert list(playback.glob("*/video.mp4"))
    click("[小说]", "cache-leave")
    wait_for(lambda s: "[目录]" in s and not list(playback.glob("*/video.mp4")), "temporary-video-cleaned")
    click("[视频]", "cache-resume")
    wait_for(lambda s: has_pixels(s) and "已暂停" in s, "encrypted-video-reopens")
    for attempt in range(3):
        click("[小说]", f"switch-{attempt}-novel")
        wait_for(lambda s: "[目录]" in s and not list(playback.glob("*/video.mp4")), f"switch-{attempt}-cleaned")
        click("[视频]", f"switch-{attempt}-video")
        wait_for(lambda s: has_pixels(s) and "已暂停" in s and "[开启声音]" in s, f"switch-{attempt}-restored")
    click("[播放]", "play")
    wait_for(lambda s: "[暂停]" in s and "00:02 /" in s, "video-plays")
    click("[暂停]", "pause")
    paused = wait_for(lambda s: "[播放]" in s and "已暂停" in s, "video-pauses")
    position = re.search(r"(\d\d:\d\d) / 00:30", paused)[1]
    time.sleep(.6)
    assert position in capture("paused-position")
    click("[前进10秒]", "seek")
    wait_for(lambda s: "00:12 /" in s or "00:13 /" in s, "video-seeks")
    click("[小说]", "novel-mode")
    wait_for(lambda s: "第35章 测试章节35" in s and "[目录]" in s, "novel-progress-preserved")
    click("[视频]", "video-return")
    wait_for(lambda s: "已暂停" in s and "[播放]" in s, "video-return-paused")
    click("[开启声音]", "unmute")
    wait_for(lambda s: "[静音]" in s, "sound-enabled-explicitly")
    click("[播放]", "play-sound")
    wait_for(lambda s: "[暂停]" in s, "audio-play-started")
    time.sleep(2)
    assert "声音播放失败" not in capture("sound-check")
    click("[静音]", "mute")
    wait_for(lambda s: "[开启声音]" in s and "[暂停]" in s, "sound-mutes-while-playing")
    click("[隐藏]", "hide")
    wait_for(lambda s: "[显示阅读]" in s, "video-hidden")
    click("[显示阅读]", "show")
    wait_for(lambda s: "已暂停" in s and "[播放]" in s, "hidden-video-paused")
    choose_width(50, "video-width")
    choose_height(75, "video-height")
    wait_for(lambda s: has_pixels(s) and "[播放]" in s, "pixels-after-resize")
    tmux("kill-session", "-t", "reader", check=False)
    time.sleep(.5)
    start(session)
    wait_for(lambda s: "[视频库]" in s and has_pixels(s) and "[开启声音]" in s and "已暂停" in s, "restart-video-muted-paused")
    time.sleep(1)
    click("[删除]", "remove-video")
    wait_for(lambda s: "从视频库移除" in s, "video-delete-confirmation")
    tmux("send-keys", "-t", "reader:0.0", "Escape")
    wait_for(lambda s: "从视频库移除" not in s and "测试网络视频" in s, "video-delete-cancel")
    click("[删除]", "remove-again")
    wait_for(lambda s: "从视频库移除" in s, "video-delete-reopen")
    current = capture("video-delete-buttons")
    click("Confirm" if "Confirm" in current else "confirm", "video-delete-confirm")
    wait_for(lambda s: "请选择本地视频" in s, "video-record-removed")
    assert media.exists()
    assert not list((CONFIG / "extensions/opencode-moyu/books/.moyu/media").glob("*.moyuvid"))
    assert not list(playback.glob("*/video.mp4"))
    # Recreate the test resource, then simulate deletion through the model tool store.
    subprocess.run(["node", "--input-type=module", "-e", preload, str(CONFIG / "extensions/opencode-moyu/books"), str(CONFIG / "extensions/opencode-moyu/keys/library.key"), str(media)], cwd=ROOT, check=True, capture_output=True)
    click("[视频库]", "model-delete-shelf")
    wait_for(lambda s: "测试网络视频" in s and "视频库 ·" in s, "model-delete-resource-listed")
    click("测试网络视频", "model-delete-open")
    wait_for(lambda s: has_pixels(s) and "已暂停" in s, "model-delete-resource-opened")
    deletion = """import {LibraryStore,stableId} from './src/library/store.mjs';
const store=new LibraryStore(process.argv[1],{keyFile:process.argv[2]});await store.deleteResource(stableId('video:https://www.bilibili.com/video/BV1xx411c7mD/'));
"""
    subprocess.run(["node", "--input-type=module", "-e", deletion, str(CONFIG / "extensions/opencode-moyu/books"), str(CONFIG / "extensions/opencode-moyu/keys/library.key")], cwd=ROOT, check=True, capture_output=True)
    wait_for(lambda s: "请选择本地视频" in s and not list(playback.glob("*/video.mp4")), "model-delete-clears-pixels-and-temporary-file")
    messages = api(f"/api/session/{session}/message")["data"]
    assert not any(item["type"] == "user" for item in messages)
    CHECKS.append("source-preserved-no-model-requests")
    print(json.dumps({"checks": CHECKS, "artifacts": str(WORK)}, ensure_ascii=False), flush=True)
finally:
    tmux("kill-server", check=False)
    server.terminate()
    try: server.wait(timeout=10)
    except subprocess.TimeoutExpired: server.kill(); server.wait()
    log.close()
