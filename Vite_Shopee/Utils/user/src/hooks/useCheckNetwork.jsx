import { useState, useEffect } from 'react'

export function useCheckNetwork() {
  const [isOnline, setIsOnline] = useState(true)
  const handleIsOnline = () => setIsOnline(window.navigator.onLine)
  useEffect(async () => {
    await window.addEventListener('online', handleIsOnline)
    await window.addEventListener('offline', handleIsOnline)

    return () => {
      window.removeEventListener('online', handleIsOnline)
      window.removeEventListener('offline', handleIsOnline)
    }
  }, [])

  return isOnline
}
