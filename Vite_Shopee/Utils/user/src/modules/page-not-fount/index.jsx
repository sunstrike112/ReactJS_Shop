/* eslint-disable react/prop-types */
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { OutlineButton, TextNormal } from '../../components'
import { useHistories, useProfile, useGlobalStore } from '../../hooks'
import { menuTextMapping } from '../../constants'
import { locationLogin } from '../../utils'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`

const PageNotFound = () => {
  const { t } = useTranslation()
  const histories = useHistories()

  const { authenticated } = useProfile()

  const { menu, initRoute } = useGlobalStore()

  const handleRedirect = () => {
    if (authenticated) {
      histories.push(initRoute.home)
    } else {
      histories.push(locationLogin())
    }
  }

  return (
    <Wrapper>
      <TextNormal fontSize="size_40" fontWeight="bold">
        {t('common.page_not_found')}
      </TextNormal>
      <OutlineButton
        onClick={handleRedirect}
        title={t(authenticated ? `common.header.${menuTextMapping[menu]}` : 'common.header.login')}
      />
    </Wrapper>
  )
}
export default PageNotFound
