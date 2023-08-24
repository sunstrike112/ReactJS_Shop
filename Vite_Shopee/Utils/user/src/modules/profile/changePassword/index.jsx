import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import HomeLayout from '../../layouts/home'
import { Wrapper, ProfileEditContent } from '../styled'
import { TextPrimary, Toast } from '../../../components'
import { ProfileMenu, ProfilePass } from '../components'
import { useProfile, useAuth } from '../../../hooks'

const ChangePassword = () => {
  const { t } = useTranslation()
  const { isChangePassword } = useProfile()
  const { signOut } = useAuth()
  const Logout = () => signOut()

  useEffect(() => {
    if (isChangePassword) {
      setTimeout(Logout, 500)
    }
    return () => clearTimeout(Logout)
  }, [isChangePassword])

  return (
    <HomeLayout>
      <Wrapper>
        <TextPrimary
          className="title"
          fontSize="size_24"
          fontWeight="fw_600"
        >
          {t('profile.menu.edit_profile_personal')}
        </TextPrimary>
        <ProfileEditContent>
          <ProfileMenu />
          <ProfilePass />
        </ProfileEditContent>
      </Wrapper>
      <Toast
        content={t('profile.password.success')}
        type="success"
        isShow={isChangePassword}
        duration={5}
        callBack={signOut}
      />
    </HomeLayout>
  )
}

export default ChangePassword
