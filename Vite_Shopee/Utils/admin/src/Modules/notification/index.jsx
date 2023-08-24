import React from 'react'
import { useTranslation } from 'react-i18next'
import { HeaderTab, Block } from 'Components'
import { NotificationOutlined } from '@ant-design/icons'
import { Wrapper } from './styled'
import CONSTANT from './constant'

const ContactManagement = () => {
  const { t } = useTranslation(['notification'])
  return (
    <Wrapper>
      <HeaderTab icon={NotificationOutlined} title={t('title')} />
      <Block t={t} blocks={CONSTANT.notification} title={t('management.title')} />
    </Wrapper>
  )
}

export default ContactManagement
