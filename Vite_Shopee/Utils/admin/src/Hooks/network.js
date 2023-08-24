import { useEffect, useState } from 'react'

export const useNetworkState = () => {
  const [isOnline, setIsOnline] = useState(null)
  const handleNetworkState = () => setIsOnline(window.navigator.onLine)
  useEffect(() => {
    window.addEventListener('online', handleNetworkState)
    window.addEventListener('offline', handleNetworkState)
    return function () {
      window.removeEventListener('online', handleNetworkState)
      window.removeEventListener('offline', handleNetworkState)
    }
  })
  return [isOnline]
}
