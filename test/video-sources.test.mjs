import test from "node:test"
import assert from "node:assert/strict"
import { mkdtemp, readFile, readdir, writeFile, stat, copyFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { promisify } from "node:util"
import { execFile, spawn } from "node:child_process"
import { LibraryStore } from "../src/library/store.mjs"
import { MediaSettings } from "../src/media/settings.mjs"
import { createVideoPlatforms, videoUrl } from "../src/sources/video-platforms.mjs"
import { createVideoIngestion, downloadVideo, downloadFailure, downloaderBinary, VIDEO_FORMAT_ARGS } from "../src/services/video-ingestion.mjs"
import { mediaBinary } from "../src/media/runtime.mjs"

test("视频链接规范化并拒绝伪装域名、凭据、任意网站和合集", () => {
  assert.equal(videoUrl('https://youtu.be/BaW_jenozKc?t=4').url, 'https://www.youtube.com/watch?v=BaW_jenozKc')
  assert.equal(videoUrl('https://www.bilibili.com/video/BV1xx411c7mD/?p=2&tracking=ignored').url, 'https://www.bilibili.com/video/BV1xx411c7mD/?p=2')
  assert.equal(videoUrl('BV1xx411c7mD').platform, 'bilibili')
  for (const value of ['https://youtube.com.evil.test/watch?v=BaW_jenozKc', 'https://127.0.0.1/test', 'https://a:b@youtube.com/watch?v=BaW_jenozKc', 'https://youtube.com/playlist?list=abc', 'file:///tmp/movie.mp4']) assert.throws(() => videoUrl(value))
})

test("访问验证失败保留实际原因，不把下载器的浏览器 Cookie 建议传给模型", () => {
  const error=downloadFailure("Sign in to confirm you're not a bot. Use --cookies-from-browser or --cookies https://example.com/?token=secret",'youtube')
  assert.match(error,/登录或人机验证/)
  assert.ok(!error.includes('cookies') && !error.includes('secret'))
  assert.match(downloadFailure('This video is unavailable','youtube'),/未入库/)
  assert.match(downloadFailure('SSL certificate verification failed','youtube'),/SSL certificate/)
  assert.match(downloadFailure('Requested format is not available. Use --list-formats','bilibili'),/未提供当前可下载的视频格式/)
})

test("YouTube 密钥仅写加密设置，状态和资料库不暴露密钥，支持替换和移除", async () => {
  const root = await mkdtemp(join(tmpdir(), 'moyu-video-key-')), store = new LibraryStore(join(root, 'books'))
  const settings = new MediaSettings(store), key = 'AIzaSy' + 'A'.repeat(33)
  const old = process.env.YOUTUBE_API_KEY
  delete process.env.YOUTUBE_API_KEY
  try {
    assert.deepEqual(await settings.status(), { youtubeApiKeyConfigured: false })
    await settings.saveKey(key)
    const bytes = await readFile(settings.path)
    assert.equal(bytes.subarray(0,5).toString(), 'MOYU1')
    assert.ok(!bytes.includes(Buffer.from(key)))
    assert.equal(await settings.key(), key)
    assert.deepEqual(await store.resources(), [])
    assert.deepEqual(await settings.status(), { youtubeApiKeyConfigured: true })
    await settings.saveKey('B'.repeat(39))
    assert.equal(await settings.key(), 'B'.repeat(39))
    await settings.removeKey()
    assert.equal(await settings.key(), '')
  } finally { if (old !== undefined) process.env.YOUTUBE_API_KEY = old }
})

test("YouTube 精简数据使用请求头传密钥，失败不回显服务端或密钥内容", async () => {
  const key = 'private-test-key', requests = []
  const api = createVideoPlatforms({ settings: { key: async () => key }, read: async (url, options) => {
    requests.push({ url, options })
    return { text: JSON.stringify({ items: Array.from({length:8}, () => ({ id: { videoId: 'BaW_jenozKc' }, snippet: { title: '标题', channelTitle: '作者', description: 'a'.repeat(10000) } })) }) }
  } })
  const items = await api.search({ platform: 'youtube', query: 'demo', limit: 99 })
  assert.equal(items.length, 5); assert.equal(items[0].description.length, 200)
  assert.ok(!requests[0].url.includes(key)); assert.equal(requests[0].options.headers['X-Goog-Api-Key'], key)
  const failing = createVideoPlatforms({settings:{key:async()=>key},read:async()=>{throw new Error('HTTP 403 with secret '+key)}})
  await assert.rejects(failing.search({platform:'youtube',query:'demo'}), error => /HTTP 403/.test(error.message) && !error.message.includes(key))
  const missing = createVideoPlatforms({settings:{key:async()=>''},read:async()=>{throw new Error('must not request')}})
  await assert.rejects(missing.search({platform:'youtube',query:'demo'}), /API Key/)
})

test("B 站结果去除 HTML 与控制字符，接口拒绝不会伪装为成功", async () => {
  const api = createVideoPlatforms({settings:{key:async()=>''},read:async()=>({text:JSON.stringify({code:0,data:{result:[{bvid:'BV1xx411c7mD',title:'<em>标题</em>\x1b[31m',author:'作者',description:'说明',duration:'0:20'}]}})})})
  const items = await api.search({platform:'bilibili',query:'demo'})
  assert.equal(items[0].title,'标题')
  const rejected = createVideoPlatforms({settings:{key:async()=>''},read:async()=>({text:JSON.stringify({code:-412})})})
  await assert.rejects(rejected.search({platform:'bilibili',query:'demo'}), /-412/)
})

test("热门列表无需密钥，分批有界且拒绝或取消不会当作空成功", async () => {
  const requests=[]
  const api=createVideoPlatforms({settings:{key:async()=>{throw new Error('must not read key')}},read:async(url,options)=>{
    requests.push({url,options})
    return {text:JSON.stringify({code:0,data:{no_more:false,list:Array.from({length:20},()=>({bvid:'BV19Rn26CEco',title:'<b>热门</b>',owner:{name:'作者'},duration:66}))}})}
  }})
  const result=await api.popular({page:2})
  assert.equal(result.items.length,10);assert.equal(result.hasMore,true);assert.equal(result.page,2)
  assert.equal(result.items[0].title,'热门');assert.equal(new URL(requests[0].url).searchParams.get('pn'),'2')
  const signal=new AbortController().signal
  await api.popular({signal});assert.equal(requests[1].options.signal,signal)
  const failed=createVideoPlatforms({settings:{},read:async()=>{throw new Error('HTTP 412')}})
  await assert.rejects(failed.popular(),/HTTP 412/)
})

let downloader
try { downloader = await downloaderBinary() } catch {}
test("实际 yt-dlp 离线选格式：横竖屏按短边、无低清回退、未知尺寸和无声视频", {skip:!downloader}, async () => {
  const root = await mkdtemp(join(tmpdir(), 'moyu-format-selection-'))
  const audio = {format_id:'audio', url:'https://media.invalid/audio.m4a',ext:'m4a',vcodec:'none',acodec:'mp4a.40.2',abr:128}
  const video = (id, width, height, extra={}) => ({format_id:id,url:'https://media.invalid/'+id+'.mp4',ext:'mp4',vcodec:'avc1.640033',acodec:'none',width,height,fps:30,...extra})
  const portrait = [video('v360',360,640),video('v480',480,852),video('av1',480,852,{vcodec:'av01.0.08M.08'}),video('v720',720,1280),audio]
  const fixtures = [
    ['portrait', portrait, 'v480+audio'],
    ['landscape', [video('v360',640,360),video('v480',852,480),video('v720',1280,720),audio], 'v480+audio'],
    ['only-hd', [video('v720',720,1280),video('v1080',1080,1920),audio], 'v720+audio'],
    ['unknown-size', [video('unknown',undefined,undefined),audio], 'unknown+audio'],
    ['silent', [video('silent',480,852)], 'silent'],
    ['combined', [video('combined',480,852,{acodec:'mp4a.40.2'})], 'combined'],
  ]
  for (const [name, formats, expected] of fixtures) {
    const path = join(root,name+'.json')
    await writeFile(path,JSON.stringify({id:name,title:name,extractor:'test',webpage_url:'https://media.invalid/'+name,formats}))
    const args = ['--ignore-config','--no-plugin-dirs','--no-cache-dir','--simulate','--no-check-formats','--load-info-json',path,'--print','%(format_id)s']
    const {stdout} = await promisify(execFile)(downloader,[...args,...VIDEO_FORMAT_ARGS],{timeout:15000,maxBuffer:32768})
    assert.equal(stdout.trim(),expected,name)
    if (name==='portrait') await assert.rejects(promisify(execFile)(downloader,[...args,'--format','bv*[height<=480]+ba/b[height<=480]'],{timeout:15000,maxBuffer:32768}),/Requested format is not available/)
  }
})

let ffmpeg
try { ffmpeg = await mediaBinary('ffmpeg'); await mediaBinary('ffprobe') } catch {}
test("取消下载结束实际子进程，下载器参数不读取用户配置或浏览器", {skip:!ffmpeg}, async () => {
  const directory=await mkdtemp(join(tmpdir(),'moyu-download-cancel-'))
  const script=join(directory,'waiting.mjs')
  await writeFile(script,"setInterval(()=>{},1000)")
  const abort=new AbortController()
  let child, options
  const pending=downloadVideo('BV1xx411c7mD',directory,{signal:abort.signal,binary:async()=>process.execPath,launch:(_binary,args,settings)=>{
    options=args;child=spawn(process.execPath,[script],settings)
    child.once('spawn',()=>abort.abort())
    return child
  }})
  await assert.rejects(pending,/已取消/)
  assert.ok(child.signalCode || child.exitCode!==null)
  assert.ok(options.includes('--ignore-config') && options.includes('--no-plugin-dirs'))
  assert.ok(!options.includes('--cookies-from-browser') && !options.includes('--cookies'))
})
test("下载结果流式加密、重复复用、播放临时解密、篡改拒绝、删除和取消清理", {skip:!ffmpeg}, async () => {
  const root = await mkdtemp(join(tmpdir(),'moyu-video-cache-')), fixture = join(root,'fixture.mp4')
  await promisify(execFile)(ffmpeg,['-hide_banner','-loglevel','error','-f','lavfi','-i','testsrc2=size=160x90:rate=10','-t','1','-c:v','mpeg4',fixture])
  let calls=0
  const service = createVideoIngestion({directory:join(root,'books'),read:async()=>{throw new Error('offline fixture')},download:async (_url,work)=>{calls++;const path=join(work,'video.mp4');await copyFile(fixture,path);return{path,title:'测试网络视频'}}})
  const result=await service.importVideo({url:'BV1xx411c7mD'})
  assert.equal(result.cached,false)
  const cached=await service.importVideo({url:'BV1xx411c7mD'})
  assert.equal(cached.cached,true);assert.equal(calls,1)
  const bytes=await readFile(service.cache.path(result.resource.id))
  assert.equal(bytes.subarray(0,8).toString(),'MOYUVID1')
  assert.ok(!bytes.equals(await readFile(fixture)))
  const playable=await service.cache.open(result.resource)
  assert.equal((await stat(playable.path)).mode & 0o777,0o600)
  assert.deepEqual(await readFile(playable.path),await readFile(fixture))
  await playable.release()
  assert.deepEqual(await readdir(service.cache.playback),[])
  const changed=Buffer.from(bytes);changed[changed.length-1]^=1;await writeFile(service.cache.path(result.resource.id),changed)
  await assert.rejects(service.cache.open(result.resource),/解密或播放/)
  assert.deepEqual(await readdir(service.cache.playback),[])
  await service.store.deleteResource(result.resource.id)
  assert.deepEqual(await service.store.resources(),[])
  assert.deepEqual(await readdir(service.cache.directory),[])
  assert.ok((await stat(fixture)).isFile())
  const abort=new AbortController()
  const canceled=createVideoIngestion({directory:join(root,'cancel'),read:async()=>{throw new Error('offline fixture')},download:async(_url,work)=>{const path=join(work,'video.mp4');await copyFile(fixture,path);abort.abort();return{path,title:'cancel'}}})
  await assert.rejects(canceled.importVideo({url:'BV1xx411c7mD',signal:abort.signal}))
  assert.deepEqual(await canceled.store.resources(),[])
  assert.deepEqual(await readdir(join(canceled.store.internal,'downloads')),[])
})
