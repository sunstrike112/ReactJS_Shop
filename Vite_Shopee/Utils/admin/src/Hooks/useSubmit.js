import { useEffect } from 'react'

export const useEnterKeyPress = (callback, dependencies = []) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.stopPropagation()
        callback.current?.click()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, dependencies)
}
