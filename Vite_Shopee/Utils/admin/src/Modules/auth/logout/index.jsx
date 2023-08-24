/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react'

import { Loading } from 'Components'
import { signOut } from 'Utils'
import { useAuth } from 'Hooks'

// this page use for logout from user domain
const LogoutScreen = () => {
  const { metaData } = useAuth()

  useEffect(() => {
    signOut(false, metaData.userId)
  }, [])
  return <Loading />
}

export default LogoutScreen
