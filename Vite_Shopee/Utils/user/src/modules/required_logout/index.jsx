import React from 'react'
import { useTranslation } from 'react-i18next'
import { BoxError } from '../../components'
import AuthLayout from '../layouts/auth'
import { Wrapper, Body } from './styled'

const RequiredLogoutScreen = () => {
  const { t } = useTranslation()
  return (
    <AuthLayout isFooter={false}>
      <Wrapper>
        <Body>
          <BoxError title={t('common.required_logout')} />
        </Body>
      </Wrapper>
    </AuthLayout>
  )
}

export default RequiredLogoutScreen
