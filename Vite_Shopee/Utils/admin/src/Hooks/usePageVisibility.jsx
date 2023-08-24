/* eslint-disable consistent-return */
import { useState, useEffect } from 'react'

export const getBrowserVisibilityProp = () => {
  if (typeof document.hidden !== 'undefined') {
    return 'visibilitychange'
  } if (typeof document.msHidden !== 'undefined') {
    return 'msvisibilitychange'
  } if (typeof document.webkitHidden !== 'undefined') {
    return 'webkitvisibilitychange'
  }
}

export function getBrowserDocumentHiddenProp() {
  if (typeof document.hidden !== 'undefined') {
    return 'hidden'
  } if (typeof document.msHidden !== 'undefined') {
    return 'msHidden'
  } if (typeof document.webkitHidden !== 'undefined') {
    return 'webkitHidden'
  }
}

export function getIsDocumentHidden() {
  return !document[getBrowserDocumentHiddenProp()]
}

export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(getIsDocumentHidden())
  const onVisibilityChange = () => setIsVisible(getIsDocumentHidden())

  useEffect(() => {
    const visibilityChange = getBrowserVisibilityProp()

    document.addEventListener(visibilityChange, onVisibilityChange, false)

    return () => {
      document.removeEventListener(visibilityChange, onVisibilityChange)
    }
  }, [])

  return isVisible
}
