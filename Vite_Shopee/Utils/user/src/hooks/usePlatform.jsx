function ios() {
  if (/iPad|iPhone|iPod/.test(navigator.platform)) {
    return true
  }
  return navigator.maxTouchPoints
          && navigator.maxTouchPoints > 2
          && /MacIntel/.test(navigator.platform)
}

function ipadOS() {
  return navigator.maxTouchPoints
        && navigator.maxTouchPoints > 2
        && /MacIntel/.test(navigator.platform)
}

export const usePlatform = () => ({
  isIOS: ios(),
  isIpadOS: ipadOS(),
  isIpadOrIphone: ios() || ipadOS()
})
