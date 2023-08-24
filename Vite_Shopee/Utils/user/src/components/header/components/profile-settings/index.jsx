/* eslint-disable react/prop-types */
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Avatar } from 'antd'
import { TextPrimary, Image } from '../../..'
import { useOnClickOutside, useProfile, useGetQuery } from '../../../../hooks'
import { AVATAR_DEFAULT, ICON_EDIT_PROFILE, ICON_LOGOUT_PROFLE, ICON_PROFILE, ICON_SETTING_PROFILE } from '../../../../assets'
import { USER_ROLE, USER_WORKSPACE_ROLE } from '../../../../constants'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  .avatar {
    cursor: pointer;
    border: 2px solid ${({ theme, isActive }) => (isActive === true ? theme.green : theme.white)};
  }
  .language-box {
    position: absolute;
    z-index: 100;
    top: 45px;
    right: 10px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.grey_blur};
    width: 140px;
    background: ${({ theme }) => theme.white};
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);
    div {
      height: 40px;
      align-items: center;
      display: flex;
      padding-left: 20px;
      img {
        margin-right: 12px;
      }
      &:hover {
        background: ${({ theme }) => theme.green_light};
      }
    }
  }
`

const ProfileSettings = ({ changeProfile, avatar, isWorkSpace }) => {
  const { t } = useTranslation()
  const { userRole } = useProfile()
  const { workspaceid } = useGetQuery()

  const profileEl = useRef()
  const [isProfile, setIsProfile] = useState(false)
  useOnClickOutside(profileEl, () => setIsProfile(false))

  const SETTING_PROFILE = [
    {
      value: '0',
      name: 'common.header.profile',
      src: ICON_PROFILE,
      srcActive: ICON_PROFILE,
      getPath: '/profile',
      isShow: true,
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.COURSE_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COMPANY_EMPLOYEE, USER_ROLE.INDIVIDUAL_USER, USER_ROLE.NISSHOKEN_ADMIN]
    },
    {
      value: '1',
      name: 'common.header.edit_profile',
      src: ICON_EDIT_PROFILE,
      getPath: [USER_WORKSPACE_ROLE.WORKSPACE_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY].includes(isWorkSpace) ? '/profile/change-password' : '/profile/edit',
      isShow: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY].includes(isWorkSpace),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.COURSE_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COMPANY_EMPLOYEE, USER_ROLE.INDIVIDUAL_USER, USER_ROLE.NISSHOKEN_ADMIN]
    },
    {
      value: '3',
      name: 'common.header.setting',
      src: ICON_SETTING_PROFILE,
      getPath: '/management',
      isShow: true,
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.COURSE_ADMIN, USER_ROLE.COURSE_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.NISSHOKEN_ADMIN]
    },
    {
      value: '4',
      name: 'common.header.logout',
      src: ICON_LOGOUT_PROFLE,
      getPath: '/auth/login',
      isShow: true,
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.COURSE_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COMPANY_EMPLOYEE, USER_ROLE.INDIVIDUAL_USER, USER_ROLE.NISSHOKEN_ADMIN]
    }
  ]

  const menus = useMemo(() => SETTING_PROFILE.filter((item) => item.rules.includes(userRole) && item.isShow), [userRole, workspaceid, SETTING_PROFILE])

  const handleSetIsProfile = useCallback(() => setIsProfile(!isProfile), [isProfile])

  return (
    <Wrapper ref={profileEl} isActive={isProfile}>
      <Avatar
        className="avatar"
        size={40}
        onClick={handleSetIsProfile}
        src={avatar || AVATAR_DEFAULT}
        alt="avatar"
      />
      {isProfile && menus.length > 0 && (
        <div style={{ width: '220px' }} className="language-box">
          {menus.map((setting, index) => (
            <div
              key={index}
              aria-hidden="true"
              onClick={() => changeProfile(setting)}
              className="d-flex cursor-pointer"
            >
              <Image width={20} alt="lang_img" src={setting.src} />
              <TextPrimary>{t(`${setting.name}`)}</TextPrimary>
            </div>
          ))}
        </div>
      )}
    </Wrapper>
  )
}
export default ProfileSettings
