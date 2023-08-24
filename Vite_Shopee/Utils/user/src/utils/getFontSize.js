import { MEDIA_WIDTHS } from '../themes'

export const getFontSize = (fontSize, size = null) => {
  const newFontSize = +fontSize?.replace('size_', '')
  if (size === MEDIA_WIDTHS.upToLarge) {
    return `${newFontSize * 0.9}px`
  }
  if (size === MEDIA_WIDTHS.upToMedium) {
    return `${newFontSize * 0.8}px`
  }
  if (size === MEDIA_WIDTHS.upToExtraSmall) {
    return `${newFontSize * 0.7}px`
  }
  return `${newFontSize}px`
}
