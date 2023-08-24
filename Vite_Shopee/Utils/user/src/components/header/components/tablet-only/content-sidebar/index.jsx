/* eslint-disable react/prop-types */
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Wrapper } from './styled'
import { LinkNormal } from '../../../../index'
import { TabsName, USER_ROLE } from '../../../../../constants'
import { useProfile, useGetQuery } from '../../../../../hooks'

const ContentSidebar = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const { userRole } = useProfile()

  const { queryWorkspaceID } = useGetQuery()

  return (
    <Wrapper>
      <div className="content">
        <LinkNormal
          to={`/course-list?fromTab=${userRole === USER_ROLE.NISSHOKEN_ADMIN ? TabsName.NISSOKEN_COURSE : TabsName.COMPANY_COURSE}${queryWorkspaceID.ONLY}`}
          fontSize="size_18"
          fontWeight="fw_600"
          title={t('common.header.home')}
          color="grey"
          style={{ color: location.pathname.includes('/course-list') ? '#00C271' : '' }}
        />
        <LinkNormal
          to={`/mypage${queryWorkspaceID.ONLY}`}
          fontSize="size_18"
          fontWeight="fw_600"
          title={t('common.header.mypage')}
          color="grey"
          style={{ color: location.pathname === '/mypage' ? '#00C271' : '' }}
        />
        <LinkNormal
          to={`/seminars${queryWorkspaceID.ONLY}`}
          fontSize="size_18"
          fontWeight="fw_600"
          title={t('common.header.seminar')}
          color="grey"
          style={{ color: location.pathname === '/seminars' ? '#00C271' : '' }}
        />
      </div>
    </Wrapper>
  )
}
export default ContentSidebar
