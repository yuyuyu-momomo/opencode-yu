/** OpenCode 2 currently fixes both the sidebar and its containing pane to 42
 * columns. Keep that host-specific adjustment here, and restore it on disposal. */
export function sidebarLayout(scrollbox) {
  const sidebar = scrollbox.parent
  const pane = sidebar?.parent
  const frame = pane?.parent
  const docked = frame?.getChildren().some((node) => node.id === "session-pane")
  // The packaged host's native renderables expose dimensions, but not Yoga.
  if (!sidebar || sidebar.width < 32 || sidebar.width > 100 || !sidebar.getChildren().includes(scrollbox)) return
  if (docked && (pane.width !== sidebar.width || pane.getChildren().length !== 1)) return
  const targets = (docked ? [sidebar, pane] : [sidebar]).map((node) => ({ node, original: node.width, applied: undefined }))
  function restore() {
    for (const item of targets) {
      if (!item.node.isDestroyed && item.applied !== undefined && item.node.width === item.applied) item.node.width = item.original
      item.applied = undefined
    }
  }
  return {
    frame: docked ? frame : undefined,
    apply(percent, terminalWidth) {
      if (percent === undefined) return restore()
      // A resize callback may still see the previous layout snapshot. The
      // session frame fills the space from its left edge to the terminal edge.
      const total = docked ? Math.max(1, terminalWidth - (frame.screenX ?? frame.x ?? 0)) : terminalWidth
      const max = Math.max(36, Math.min(Math.floor(total * .6), total - 44))
      const width = Math.max(36, Math.min(max, Math.round(total * percent / 100)))
      for (const item of targets) {
        if (item.node.isDestroyed) continue
        if (item.node.width !== width) item.node.width = width
        item.applied = width
      }
    },
    restore,
  }
}
