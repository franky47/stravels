
export const hslToHex = (h, s, l) => {
  const format = (r, g, b) => {
    return '#' + [
      Math.round(r * 255).toString(16),
      Math.round(g * 255).toString(16),
      Math.round(b * 255).toString(16)
    ].join('')
  }

  if (s === 0.0) {
    return format(l, l, l)
  }

  const hueToRgb = (p, q, t) => {
    if (t < 0.0) t += 1.0
    if (t > 1.0) t -= 1.0

    if (t < 1.0 / 6.0) return p + (q - p) * 6.0 * t
    if (t < 0.5) return q
    if (t < 2.0 / 3.0) return p + (q - p) * (4.0 - 6.0 * t)
    return p
  }
  const q = l < 0.5 ? l * (1.0 + s) : l + s - l * s
  const p = 2.0 * l - q
  const r = hueToRgb(p, q, h + 1.0 / 3.0)
  const g = hueToRgb(p, q, h)
  const b = hueToRgb(p, q, h - 1.0 / 3.0)

  console.tron.log(format(r, g, b))
  return format(r, g, b)
}
