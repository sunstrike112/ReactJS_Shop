/* eslint-disable react/prop-types */
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { OutlineButton, TextNormal } from '../../../../../components'
import { TabsName } from '../../../../../constants'
import { useHistories } from '../../../../../hooks'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`

const PageNotFound = () => {
  const histories = useHistories()
  const { t } = useTranslation()

  const handleRedirect = () => {
    histories.push(`/course-list?fromTab=${TabsName.NISSOKEN_COURSE}`)
  }

  return (
    <Wrapper>
      <TextNormal fontSize="size_40" fontWeight="bold">
        {t('common.page_not_found')}
      </TextNormal>
      <OutlineButton onClick={handleRedirect} title={t('common.header.mypage')} />
    </Wrapper>
  )
}
export default PageNotFound
