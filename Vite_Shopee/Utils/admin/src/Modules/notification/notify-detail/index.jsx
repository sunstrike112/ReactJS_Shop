import React from 'react'
import { useTranslation } from 'react-i18next'
import { Title } from 'Components'
import { Wrapper } from 'Themes/facit'
import { NotificationOutlined } from '@ant-design/icons'
import { TablePostDetail } from './components'

const NotifyDetail = () => {
  const { t } = useTranslation(['notification'])

  return (
    <Wrapper>
      <Title icon={NotificationOutlined} title={t('post.title_detail_notifi')} />
      <TablePostDetail t={t} />
    </Wrapper>
  )
}

export default NotifyDetail
