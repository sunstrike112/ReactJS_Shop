import React from 'react'
import { useTranslation } from 'react-i18next'

import HomeLayout from '../../layouts/home'
import { Wrapper, ProfileEditContent } from '../styled'
import { TextPrimary } from '../../../components'
import { ProfileMenu, ProfileEdit } from '../components'

const EditProfile = () => {
  const { t } = useTranslation()

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
          <ProfileEdit />
        </ProfileEditContent>
      </Wrapper>
    </HomeLayout>
  )
}

export default EditProfile
