export function getSizesWithoutPadding(element, isVideo = false) {
  const computedStyles = getComputedStyle(element)
  let width = element.clientWidth
  let height = element.clientHeight

  height -= parseFloat(computedStyles.paddingTop) + parseFloat(computedStyles.paddingBottom)
  width -= parseFloat(computedStyles.paddingLeft) + parseFloat(computedStyles.paddingRight)

  return {
    width,
    height,
    videoWidth: isVideo ? element.videoWidth : 0,
    videoHeight: isVideo ? element.videoHeight : 0
  }
}
