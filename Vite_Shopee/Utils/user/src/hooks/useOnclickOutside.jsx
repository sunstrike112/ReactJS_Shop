import { useEffect } from 'react'

export const useOnClickOutside = (ref, callback) => {
  const listener = (event) => {
    if (!ref.current || ref.current.contains(event.target)) {
      return
    }
    callback(event)
  }

  useEffect(() => {
    document.addEventListener('mousedown', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [])
}
