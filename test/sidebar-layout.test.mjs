import test from "node:test"
import assert from "node:assert/strict"
import { sidebarDock, sidebarLayout } from "../src/ui/sidebar-layout.mjs"

test("原生侧栏无需 Yoga API 即可改变宽度，保持主会话空间并按拥有权恢复", () => {
  const scrollbox = {}
  const sidebar = { width: 42, getChildren: () => [scrollbox] }
  const pane = { width: 42, getChildren: () => [sidebar] }
  const frame = { width: 160, getChildren: () => [{ id: "session-pane" }, pane] }
  scrollbox.parent = sidebar
  sidebar.parent = pane
  pane.parent = frame
  const layout = sidebarLayout(scrollbox)
  assert.ok(layout)
  layout.apply(50, 160)
  assert.equal(sidebar.width, 80)
  assert.equal(pane.width, 80)
  frame.width = 100
  layout.apply(60, 100)
  assert.equal(pane.width, 56)
  assert.ok(frame.width - pane.width >= 44)
  layout.apply(undefined, 100)
  assert.equal(sidebar.width, 42)
  assert.equal(pane.width, 42)
  layout.apply(50, 100)
  pane.width = 70 // Another host panel took ownership after our last change.
  layout.restore()
  assert.equal(pane.width, 70)
  assert.equal(sidebar.width, 42)
  pane.getChildren = () => [sidebar, {}]
  assert.equal(sidebarLayout(scrollbox), undefined)
})

test("原生卡片保留底部空间，新增高度触发测量，卸载恢复原布局回调", async () => {
  const reader = { height: 12 }
  const card = { height: 3 }
  const hidden = { height: 20, visible: false }
  let hostCalls = 0, measures = 0
  const previous = () => { hostCalls++ }
  const container = { minHeight: undefined, onSizeChange: previous, getChildren: () => [reader, card, hidden] }
  reader.parent = container
  const viewport = { height: 30 }
  const docking = sidebarDock(reader, viewport, () => { measures++ })
  assert.equal(docking.measure(true), 4)
  assert.equal(container.minHeight, 30)
  card.height = 6
  container.onSizeChange()
  await Promise.resolve()
  assert.equal(hostCalls, 1)
  assert.equal(measures, 1)
  assert.equal(docking.measure(true), 7)
  docking.restore()
  assert.equal(container.minHeight, null)
  assert.equal(container.onSizeChange, previous)
})
