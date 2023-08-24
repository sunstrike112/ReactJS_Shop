import React from 'react'
import { Title } from 'Components'
import RecorderScreen from 'Components/recorder-screen'
import { useTranslation } from 'react-i18next'

import { EditOutlined } from '@ant-design/icons'
import { Wrapper } from 'Themes/facit'

const RecordingScreen = () => {
  const { t } = useTranslation(['recording'])
  return (
    <Wrapper>
      <Title icon={EditOutlined} title={t('title')} />
      <RecorderScreen />
    </Wrapper>
  )
}

export default RecordingScreen
