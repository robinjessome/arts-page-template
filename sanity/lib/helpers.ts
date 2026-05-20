import { Color } from '@/sanity.types'

export function generateHsl(
  color: Color,
  modify?: 'lighten' | 'darken' | 'set',
  modifier: number = 0
) {
  if (
    !color.hsl ||
    color.hsl.h === undefined ||
    color.hsl.s === undefined ||
    color.hsl.l === undefined
  ) {
    return null
  }

  const h = Math.round(color.hsl.h)
  const s = Math.round(color.hsl.s * 100)
  let l = Math.round(color.hsl.l * 100)

  if (modify === 'lighten') {
    l = Math.min(100, l + modifier) // Clamp to max 100%
  } else if (modify === 'darken') {
    l = Math.max(0, l - modifier) // Clamp to min 0%
  } else if (modify === 'set') {
    l = modifier
  }

  return `${h} ${s}% ${l}%`
}
