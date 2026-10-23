/** Two square RGB pixels per terminal cell; keep frame storage bounded. */
export function pixelSize(width, height, columns, rows) {
  const maxWidth = Math.max(2, Math.min(160, Math.floor(columns)))
  const maxHeight = Math.max(2, Math.min(100, Math.floor(rows) * 2))
  const scale = Math.min(maxWidth / width, maxHeight / height)
  return { width: Math.max(2, Math.floor(width * scale)), height: Math.max(2, Math.floor(height * scale / 2) * 2) }
}

export function pixelRuns(frame, width, height) {
  if (frame.length !== width * height * 3) throw new Error("视频帧长度异常")
  const runs = []
  const color = (offset) => [0, 1, 2].map((i) => Math.round(frame[offset + i] / 51) * 51).join(",")
  for (let y = 0; y < height; y += 2) {
    let last
    for (let x = 0; x < width; x++) {
      const fg = color((y * width + x) * 3), bg = color(((y + 1) * width + x) * 3)
      if (last?.fg === fg && last.bg === bg) last.text += "▀"
      else { last = { text: "▀", fg, bg }; runs.push(last) }
    }
    if (y + 2 < height) runs.push({ text: "\n" })
  }
  return runs
}

export function mediaTime(seconds) {
  const value = Math.max(0, Math.floor(Number(seconds) || 0))
  const hours = Math.floor(value / 3600)
  return (hours ? hours + ":" : "") + [Math.floor(value / 60) % 60, value % 60].map((n) => String(n).padStart(2, "0")).join(":")
}
