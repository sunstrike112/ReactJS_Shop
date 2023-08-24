import React from 'react'
import { useWebview } from 'Hooks'
import DesktopMode from './DesktopMode'
import MobileMode from './MobileMode'

const IssuePermissionScreen = () => {
  // Use hooks
  const { isWebviewMode } = useWebview()

  return isWebviewMode ? <MobileMode /> : <DesktopMode />
}

export default IssuePermissionScreen
