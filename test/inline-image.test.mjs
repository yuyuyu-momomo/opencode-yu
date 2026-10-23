import test from "node:test"
import assert from "node:assert/strict"
import { InlineImage, imageProtocol, imageFrameSize } from "../src/media/inline-image.mjs"

test("侧栏原画按宿主及终端能力选择，不把字符回退称为高清", () => {
  const core = { ImageRenderable: class {}, NativeImage: { fromRgba() {} } }
  assert.equal(imageProtocol({}, {}), "legacy")
  assert.equal(imageProtocol(core, { capabilities: {} }), "blocks")
  assert.equal(imageProtocol(core, { capabilities: { kitty_graphics: true } }), "kitty")
  assert.equal(imageProtocol(core, { capabilities: { sixel: true } }), "blocks")
  assert.equal(imageProtocol(core, { capabilities: { sixel: true }, resolution: { width: 800, height: 600 } }), "sixel")
  assert.equal(imageProtocol(core, { capabilities: { kitty_graphics: true, multiplexer: "tmux" } }), "blocks")
  const renderer = { width: 160, height: 50, resolution: { width: 1600, height: 1000 } }
  const portrait = imageFrameSize(480,852,36,20,renderer,'sixel')
  assert.ok(portrait.height === 400 && portrait.width > 200)
  const bounded = imageFrameSize(8000,8000,10000,10000,renderer,'kitty')
  assert.ok(bounded.width * bounded.height <= 921600)
  assert.ok(bounded.width <= 1280 && bounded.height <= 1280)
})

test("逐帧原画及时释放引用，替换、隐藏、删除均清理图片且不写终端", () => {
  let refs = 0, created = 0, last
  const lease = () => { refs++; let live=true; return { retain:lease, dispose(){assert.ok(live);live=false;refs--} } }
  const core = {
    NativeImage: { fromRgba(bytes,width,height,stride,options) { assert.equal(bytes.length,width*height*4);assert.equal(stride,width*4);assert.equal(bytes[3],255);assert.equal(options.owner,'owner');created++;return lease() } },
    ImageRenderable: class {
      constructor(_renderer,options){assert.equal(options.protocol,'auto');last=this}
      set source(image){this.image?.dispose();this.image=image?.retain()}
      destroy(){this.source=undefined;this.isDestroyed=true}
    },
  }
  const inline=new InlineImage(core,{nativeScene:{resourceContext:'owner'}})
  const parent={add() {}}
  inline.present(Buffer.alloc(12,100),{width:2,height:2})
  inline.mount(parent)
  for(let i=0;i<200;i++) inline.present(Buffer.alloc(12,i),{width:2,height:2})
  assert.equal(refs,1);assert.equal(created,201)
  inline.unmount();assert.equal(refs,0);assert.equal(last.isDestroyed,true)
  inline.mount(parent);assert.equal(refs,1)
  inline.clear();assert.equal(refs,0)
  inline.dispose();assert.equal(refs,0)
})

test("原画渲染失败交给界面回退，不抛出到视频解码事件", () => {
  const errors = []
  let released = false
  const core = {
    NativeImage: { fromRgba() { return { dispose() { released = true } } } },
    ImageRenderable: class { set source(_image) { throw new Error("native source failed") } },
  }
  const inline = new InlineImage(core, {}, (error) => errors.push(error.message))
  inline.mount({add() {}})
  assert.doesNotThrow(() => inline.present(Buffer.alloc(12), {width:2,height:2}))
  assert.equal(released, true)
  assert.deepEqual(errors, ["native source failed"])
  assert.doesNotThrow(() => inline.present(Buffer.alloc(3), {width:2,height:2}))
  assert.equal(errors.at(-1), "原画帧长度异常")
})
