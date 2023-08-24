import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextPrimary } from '../../../components'
import { useProfile } from '../../../hooks'
import HomeLayout from '../../layouts/home'
import { ProfileMenu } from '../components'
import UpdateEmail from '../components/updateEmail'
import VerifyCode from '../components/verifiCode'
import {
  ProfileEditContent,
  Wrapper
} from '../styled'
import { PassWrapper } from './styled'

const ChangeEmail = () => {
  const { t } = useTranslation()
  const { verifyCode } = useProfile()

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
          <PassWrapper>
            <TextPrimary className="pass__header" fontSize="size_24" fontWeight="fw_600">
              {t('profile.edit.email')}
            </TextPrimary>
            {verifyCode.isSuccess ? <UpdateEmail /> : <VerifyCode />}
          </PassWrapper>
        </ProfileEditContent>
      </Wrapper>
    </HomeLayout>
  )
}

export default ChangeEmail
