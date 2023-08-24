import React, { useMemo } from 'react'
import {
  useRouteMatch
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TextPrimary } from '../../../../components'
import { MenuTab, MenuWrapper } from './styled'
import Image from '../../../../components/image'
import { ICON_LOCK, ICON_USER, EMAIL, ICON_TEMPLATE_REPORT } from '../../../../assets'
import { useHistories, useProfile } from '../../../../hooks'
import { ROUTES_NAME, USER_WORKSPACE_ROLE } from '../../../../constants'

const ProfileMenu = () => {
  const { t } = useTranslation()
  const history = useHistories()
  const { path } = useRouteMatch()
  const { profile } = useProfile()

  const { COMPANY_ADMIN, WORKSPACE_ADMIN, VIRTUAL_COMPANY } = USER_WORKSPACE_ROLE

  const TABS = [
    {
      text: t('profile.menu.account'),
      icon: ICON_USER,
      path: '/profile/edit',
      key: 'profile',
      rules: [COMPANY_ADMIN]
    },
    {
      text: t('profile.menu.password'),
      icon: ICON_LOCK,
      path: '/profile/change-password',
      key: 'change-password',
      rules: [COMPANY_ADMIN, WORKSPACE_ADMIN, VIRTUAL_COMPANY]
    },
    {
      text: t('profile.home.email'),
      icon: EMAIL,
      path: '/profile/change-email',
      key: 'change-email',
      rules: [COMPANY_ADMIN]
    },
    {
      text: t('common.header.template'),
      icon: ICON_TEMPLATE_REPORT,
      path: ROUTES_NAME.TEMPLATE,
      key: 'template',
      rules: [COMPANY_ADMIN, WORKSPACE_ADMIN, VIRTUAL_COMPANY]
    }
  ]

  const tabs = useMemo(() => TABS.filter((tab) => tab.rules.includes(profile.isWorkSpace)), [profile.isWorkSpace, t])

  const onClick = (tab) => {
    history.push(tab.path)
  }

  return (
    <MenuWrapper>
      <div className="menu__title">
        <TextPrimary fontSize="size_14" fontWeight="fw_600">
          {t('profile.menu.info_login')}
        </TextPrimary>
      </div>
      {tabs.map((item) => (
        <MenuTab
          className={path.includes(item.path) && 'active'}
          key={item.key}
          onClick={() => onClick(item)}
        >
          <Image src={item.icon} alt="icon" style={{ width: 24 }} />
          <TextPrimary className="menu__tab" fontSize="size_14" fontWeight="fw_400">
            {item.text}
          </TextPrimary>
        </MenuTab>
      ))}
    </MenuWrapper>
  )
}

export default ProfileMenu
