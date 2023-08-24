import React from 'react'
import { useTranslation } from 'react-i18next'
import { Title } from 'Components'
import { NotificationOutlined } from '@ant-design/icons'
import { HeaderPost } from './components'
import { Wrapper } from './styled'

const NotifyPost = () => {
  const { t } = useTranslation(['notification'])
  return (
    <Wrapper>
      <Title icon={NotificationOutlined} title={t('post.title')} />
      <HeaderPost t={t} />
      {/* <Text.primary fontSize="size_24" fontWeight="fw_600">
        Recipients list
      </Text.primary>
      <HeaderTable t={t} current={currentPage} onChange={onChangePagination} totalCounting={2} /> */}
      {/* <TablePost t={t} /> */}
    </Wrapper>
  )
}

export default NotifyPost
