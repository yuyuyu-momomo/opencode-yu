#!/usr/bin/env python3
"""Verify native Sixel output and cleanup in an isolated OpenCode 2 terminal.

Needs tmux and MOYU_FFMPEG. Set MOYU_LIVE_VIDEO_SOURCES=1 to also test Bilibili
popular over HTTP. Explicit Sixel negotiation applies only to this test process;
output capture does not establish capabilities of the user's terminal emulator.
"""
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
    command = shlex.join(["env", *[f"{key}={value}" for key, value in ENV.items() if key.startswith(("XDG_", "OPENCODE_"))], *[f"{key}={value}" for key, value in ENV.items() if key.startswith(("MOYU_", "OPENTUI_"))], "TERM=xterm-256color", BINARY, "--server", URL, "--session", session, str(PROJECT)])
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

ENV['OPENTUI_IMAGE_PROTOCOL']='sixel'
raw=WORK/'sixel-output.bin'
log=(WORK/'server.log').open('w');server=subprocess.Popen([BINARY,'serve','--port',str(PORT)],cwd=PROJECT,env=ENV,stdout=log,stderr=subprocess.STDOUT)
def images():
    data=raw.read_bytes().replace(b'\x1b\x1b',b'\x1b') if raw.exists() else b''
    return len(re.findall(rb'\x1bP[0-9;]*q',data)),data
try:
    deadline=time.monotonic()+40
    while True:
        try:session=api('/api/session',{'title':'Moyu inline Sixel smoke','location':{'directory':str(PROJECT)}})['data']['id'];break
        except Exception:
            if time.monotonic()>deadline:raise
            time.sleep(.3)
    start(session)
    wait_for(lambda s:'[视频]' in s,'session-ready');time.sleep(1)
    tmux('pipe-pane','-O','-t','reader:0.0','cat > '+shlex.quote(str(raw)))
    click('[视频]','video-open');wait_for(lambda s:'[热门]' in s,'discovery-visible')
    if os.environ.get('MOYU_LIVE_VIDEO_SOURCES') == '1':
        click('[热门]','popular-open')
        wait_for(lambda s:'B 站热门 · 第 1 页' in s and '换一批' in s,'popular-live-results')
        tmux('send-keys','-t','reader:0.0','Escape')
        wait_for(lambda s:'[搜索]' in s and 'B 站热门 · 第 1 页' not in s,'popular-closed')
    click('[搜索]','search-open');wait_for(lambda s:'选择视频搜索来源' in s and '哔哩哔哩' in s,'search-direct-entry')
    tmux('send-keys','-t','reader:0.0','Escape')
    wait_for(lambda s:'[视频库]' in s and '选择视频搜索来源' not in s,'search-closed')
    click('[视频库]','shelf-open');wait_for(lambda s:'测试网络视频' in s,'video-found')
    click('测试网络视频','video-load');wait_for(lambda s:'已暂停' in s and '[画质：原画]' in s and images()[0]>0,'native-sixel-frame')
    first,data=images()
    rasters=re.findall(rb'"1;1;(\d+);(\d+)',data)
    assert any(int(w)>80 and int(h)>40 for w,h in rasters),rasters
    click('[播放]','play');wait_for(lambda s:'[暂停]' in s and images()[0]>first+3,'native-moving-frames')
    click('[暂停]','pause');wait_for(lambda s:'已暂停' in s,'native-paused')
    time.sleep(.5);paused=images()[0];time.sleep(.8);assert images()[0]==paused
    click('[高度','resize-open');wait_for(lambda s:'阅读区高度' in s,'height-menu-over-image')
    click('高度 75%','resize');wait_for(lambda s:'[高度 75%]' in s and '[画质：原画]' in s,'native-resize')
    click('[隐藏]','hide');wait_for(lambda s:'[显示阅读]' in s,'native-hidden')
    playback=CONFIG/'extensions/opencode-moyu/books/.moyu/playback'
    wait_for(lambda s:not list(playback.glob('*/video.mp4')),'plaintext-cleaned')
    time.sleep(.5);hidden=images()[0];time.sleep(.5);assert images()[0]==hidden
    click('[显示阅读]','show');wait_for(lambda s:'[画质：原画]' in s and '已暂停' in s and images()[0]>hidden,'native-restored')
    count,data=images()
    print(json.dumps({'checks':CHECKS,'sixelFrames':count,'rasters':[(int(w),int(h)) for w,h in rasters[:3]],'artifacts':str(WORK),'terminal':'explicit Sixel over tmux test transport; not the user terminal'},ensure_ascii=False))
finally:
    tmux('kill-server',check=False);server.terminate();server.wait(timeout=10);log.close()
