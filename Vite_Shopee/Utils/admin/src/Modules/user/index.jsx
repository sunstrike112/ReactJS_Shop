import React from 'react'

import { useTranslation } from 'react-i18next'
import { ICON_PEN_TOOL } from 'Assets'
import { Block, HeaderTab } from 'Components'

import { Wrapper } from './styled'
import CONSTANT from './constant'

const UserScreen = () => {
  const { t } = useTranslation(['user'])

  return (
    <Wrapper>
      <HeaderTab icon={ICON_PEN_TOOL} title={t('user_management')} />
      <Block
        t={t}
        blocks={CONSTANT.user}
        title="block_user_title"
      />
      <Block
        t={t}
        blocks={CONSTANT.group_and_attribute}
        title="block_group_and_attribute_title"
      />
      <Block
        t={t}
        blocks={CONSTANT.login_history}
        title="block_login_history_title"
      />
    </Wrapper>
  )
}

export default UserScreen
