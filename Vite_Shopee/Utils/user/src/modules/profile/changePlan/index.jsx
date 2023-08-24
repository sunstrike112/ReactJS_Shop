import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import HomeLayout from '../../layouts/home'
import { Wrapper, ProfileEditContent } from '../styled'
import { TextPrimary } from '../../../components'
import { ProfileMenu, ChangePlan } from '../components'
import { useProfile } from '../../../hooks'

const ChangePlanSreen = () => {
  const { t } = useTranslation()
  const { resetTrialExpired, isTrialExpired } = useProfile()
  useEffect(() => {
    if (isTrialExpired) {
      resetTrialExpired()
    }
  }, [isTrialExpired])

  return (
    <HomeLayout>
      <Wrapper>
        <TextPrimary
          className="title"
          fontSize="size_24"
          fontWeight="fw_600"
        >
          {t('profile.menu.changePlan')}
        </TextPrimary>
        <ProfileEditContent>
          <ProfileMenu />
          <ChangePlan />
        </ProfileEditContent>
      </Wrapper>
    </HomeLayout>
  )
}

export default ChangePlanSreen
