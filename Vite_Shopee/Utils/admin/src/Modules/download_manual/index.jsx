import React from 'react'
import { useTranslation } from 'react-i18next'
import { Wrapper } from 'Themes/facit'
import { Title } from 'Components'
import { DownloadOutlined } from '@ant-design/icons'
import CategoriesChannelsPrograms from 'Assets/manualDownload/Categories_Channels_Programs.pdf'
import TrialRegistrationMethod from 'Assets/manualDownload/Trial_registration_method.pdf'
import VideoRegistrationMethod from 'Assets/manualDownload/Video_registration_method.pdf'

import styled from 'styled-components'

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #323232;
  margin-top: 15px;
  padding: 24px;
  background: #FFFFFF;
  border-radius: 0.75rem;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 5%);
  a {
    text-decoration: underline;
    margin-top: 10px;
  }
`

const DownloadManualScreen = () => {
  const { t } = useTranslation(['downloadManual'])
  return (
    <Wrapper>
      <Title
        icon={DownloadOutlined}
        title={t('title')}
      />
      <Content>
        <a
          href={TrialRegistrationMethod}
          download="トライアル登録方法"
          target="_blank"
          rel="noreferrer"
        >トライアル登録方法
        </a>
        <a
          href={CategoriesChannelsPrograms}
          download="カテゴリー・チャンネル・番組"
          target="_blank"
          rel="noreferrer"
        >
          カテゴリー・チャンネル・番組
        </a>
        <a
          href={VideoRegistrationMethod}
          download="動画登録方法"
          target="_blank"
          rel="noreferrer"
        >動画登録方法
        </a>
      </Content>
    </Wrapper>
  )
}

export default DownloadManualScreen
