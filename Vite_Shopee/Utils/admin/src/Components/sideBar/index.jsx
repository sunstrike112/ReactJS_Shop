/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import {
  EditOutlined,
  GlobalOutlined,
  HomeOutlined
} from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import i18next from 'I18n'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import {
  AVATAR_DEFAULT,
  CHEVRON_RIGHT_ICON,
  COMPANY_LOGO,
  EN_ICON,
  JP_ICON,
  LOGOUT_ICON,
  TOGGLE_ASIDE_LEFT_ICON,
  TOGGLE_ASIDE_RIGHT_ICON,
  VI_ICON
} from 'Assets'
import { Image } from 'Components'
import { QUERY, USER_URL } from 'Constants'
import { USER_ROLE, USER_WORKSPACE_ROLE } from 'Constants/auth'
import { useAmountOfCompanyUnapproved, useAuth, useGetQuery, useHistories, useRoot, useWebview } from 'Hooks'
import { getFileFromS3, getLocalStorage, signOut, STORAGE } from 'Utils'
import { MenuList, RoutesName } from './constant'
import { Li, Ul, Wrapper } from './styled'

const { COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN, NISSHOKEN_ADMIN, APPROVAL_MANAGEMENT, NISSHOKEN_SUPER_ADMIN } = USER_ROLE
const { VIRTUAL_COMPANY } = USER_WORKSPACE_ROLE

const SideBar = () => {
  const { metaData, profile } = useAuth()
  const role = metaData?.roles?.[0]
  const roleWS = profile.isWorkSpace
  const history = useHistories()
  const location = useLocation()
  const { t, i18n: { language } } = useTranslation(['menu', 'courseResult'])
  const [itemActive, setItemActive] = useState(['home'])
  const [itemToggle, setItemToggle] = useState(role === NISSHOKEN_ADMIN ? ['course-management'] : [])
  const { sidebarCompact, sidebarHover, toggleSidebarAction, hoverSidebarAction, infoCompany } = useRoot()
  const { isWebviewMode } = useWebview()
  const { isNoticeToSuperAdmin } = useAmountOfCompanyUnapproved()

  const handleToggleSidebar = useCallback(toggleSidebarAction, [])

  const handleHoverSidebar = useCallback(() => {
    if (sidebarCompact) {
      hoverSidebarAction()
    }
  }, [sidebarCompact])

  const handleLogout = () => {
    signOut(false, metaData.userId)
  }

  const changeLocation = (pathName) => {
    if (isNoticeToSuperAdmin) return
    history.push(pathName)
  }

  const languageText = useMemo(() => {
    switch (language) {
      case 'jp':
        return '日本語'
      case 'en':
        return 'English'
      case 'vi':
        return 'Tiếng Việt'
      default:
        return null
    }
  }, [language])

  useEffect(() => {
    if (location.pathname !== RoutesName.HOME) {
      const keys = location.pathname.split(RoutesName.HOME).filter((f) => f)
      if (keys.length > 1) setItemToggle([keys?.[0]])
      setItemActive(keys.reverse())
    }
  }, [location.pathname])

  const menus = useMemo(() => MenuList.filter((m) => {
    const isSuitableRoles = m.rules.includes(role) && m.rulesWS.includes(roleWS)
    return isSuitableRoles
  })
    .map((item) => ({
      ...item,
      children: item.children && item.children.filter((ch) => {
        const isSuitableRolesChildren = ch.rules.includes(role) && ch.rulesWS.includes(roleWS)
        return isSuitableRolesChildren
      }) })),
  [role, roleWS])

  const languageLocal = getLocalStorage(STORAGE.LANGUAGE)
  const { workspaceid } = useGetQuery()

  const semiToggle = useCallback((key, children) => !itemActive.includes(key) && itemToggle.includes(key) && children, [itemActive, itemToggle])

  const handleRedirectUserPage = () => {
    if (workspaceid) {
      return window.location.replace(`${USER_URL}?${QUERY.WORKSPACE_ID}=${workspaceid}&lang=${languageLocal || 'jp'}`)
    }
    return window.location.replace(`${USER_URL}?lang=${languageLocal || 'jp'}`)
  }

  const dropdownMenu = useMemo(() => (
    <Menu style={{ width: '95%' }}>
      <Menu.SubMenu key="sub-1" title={`${t('common:language')}: ${languageText}`} icon={<GlobalOutlined />}>
        <Menu.Item key="2" onClick={() => i18next.changeLanguage('jp')}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <JP_ICON />
            <span>&nbsp;日本語</span>
          </div>
        </Menu.Item>
        <Menu.Item key="3" onClick={() => i18next.changeLanguage('en')}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <EN_ICON />
            <span>&nbsp;English</span>
          </div>
        </Menu.Item>
        <Menu.Item key="4" onClick={() => i18next.changeLanguage('vi')}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <VI_ICON />
            <span>&nbsp;Tiếng Việt</span>
          </div>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Divider />
      {[COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN, NISSHOKEN_ADMIN].includes(role)
        ? !(profile.isWorkSpace === VIRTUAL_COMPANY && role === NISSHOKEN_ADMIN) // Prevent redirect userPage with virtualCompanyAdmin roles
        && (
          <>
            <Menu.Item key="0" onClick={handleRedirectUserPage}>
              <HomeOutlined />
              <span>&nbsp;{t('common:home_page')}</span>
            </Menu.Item>
            <Menu.Divider />
          </>
        )
        : null}
      {[APPROVAL_MANAGEMENT, NISSHOKEN_SUPER_ADMIN].includes(role) && (
      <>
        <Menu.Item key="1" onClick={() => changeLocation(RoutesName.EDIT_MAIN_COMPANY)}>
          <EditOutlined />
          <span>&nbsp;{t('common:editLoginInfo')}</span>
        </Menu.Item>
        <Menu.Divider />
      </>
      )}
      <Menu.Item key="2" onClick={handleLogout}>
        <LOGOUT_ICON className="logout-icon" />
        <span>&nbsp;{t('common:logout')}</span>
      </Menu.Item>
    </Menu>
  ), [t, isNoticeToSuperAdmin])

  return (
    <Wrapper
      sidebarCompact={sidebarCompact}
      sidebarHover={sidebarHover}
      isWebviewMode={isWebviewMode}
      companyLogo={getFileFromS3(infoCompany.logoPath) || getFileFromS3(profile.imagePath)}
      onMouseEnter={handleHoverSidebar}
      onMouseLeave={handleHoverSidebar}
    >
      <div className="aside-head">
        <div className="brand">
          {(!sidebarCompact || sidebarHover) && (
            <div className="brand-logo">
              <h1 className="brand-title">
                <Image
                  src={getFileFromS3(infoCompany.logoPath) || getFileFromS3(profile.imagePath) || COMPANY_LOGO}
                  onClick={() => changeLocation(RoutesName.HOME)}
                  alt="E-learning"
                />
              </h1>
            </div>
          )}
          <button type="button" className="brand-aside-toggle" onClick={handleToggleSidebar}>
            {!sidebarCompact ? <TOGGLE_ASIDE_LEFT_ICON className="svg-icon--material svg-icon brand-aside-toggle-close" />
              : <TOGGLE_ASIDE_RIGHT_ICON className="svg-icon--material svg-icon brand-aside-toggle-close" />}
          </button>
        </div>
      </div>
      <div className="aside-body">
        <nav aria-label="aside-dashboard">
          <Ul
            sidebarCompact={sidebarCompact}
            sidebarHover={sidebarHover}
          >
            {menus.map((item, index) => {
              const { Icon, title, key, stroke, fill, pathName, children } = item
              return (
                <Li
                  sidebarCompact={sidebarCompact}
                  sidebarHover={sidebarHover}
                  stroke={stroke}
                  fill={fill}
                  key={index}
                  onClick={() => {
                    if (pathName === RoutesName.HOME) {
                      changeLocation(RoutesName.HOME)
                      setItemActive('home')
                      setItemToggle([])
                    }
                    if (pathName && !location.pathname.includes(pathName)) {
                      const itemIndex = itemToggle.indexOf(key)
                      if (itemIndex === -1) {
                        setItemToggle([])
                      }
                      changeLocation(pathName)
                    }
                    if (children) {
                      const itemIndex = itemToggle.indexOf(key)
                      if (itemIndex > -1) {
                        setItemToggle([])
                      } else {
                        setItemActive([])
                        setItemToggle([key])
                      }
                    }
                  }}
                >
                  <a className={`navigation-link ${semiToggle(key, children) ? 'semi-active' : itemActive.includes(key) ? (!itemToggle.includes(key) ? 'active' : 'semi-active') : ''}`}>
                    <span className="navigation-link-info">
                      <Icon className="navigation-icon" />
                      <span className="navigation-text">
                        {t(title)}
                      </span>
                    </span>
                    {children && (
                      <span className="navigation-link-extra">
                        <CHEVRON_RIGHT_ICON className={`svg-icon--material ${itemToggle.includes(key) && 'down'}`} />
                      </span>
                    )}
                  </a>
                  {itemToggle.includes(key) && children && children.map((childItem, childIndex) => (
                    <Ul
                      sidebarCompact={sidebarCompact}
                      sidebarHover={sidebarHover}
                      className="navigation"
                      key={childIndex}
                    >
                      <Li
                        sidebarCompact={sidebarCompact}
                        sidebarHover={sidebarHover}
                        className="navigation-item"
                        stroke={childItem.stroke}
                        fill={childItem.fill}
                        key={childItem.key}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (childItem.pathName && !(location.pathname === childItem.pathName)) {
                            changeLocation(childItem.pathName)
                          }
                        }}
                      >
                        <a className={`navigation-link ${location.pathname.includes(childItem.pathName) ? 'active' : itemActive.includes(key) || semiToggle(key, children) ? 'semi-active' : ''}`}>
                          <span className="navigation-link-info">
                            <childItem.Icon className="navigation-icon" />
                            <span className="navigation-text">
                              {t(childItem.title)}
                            </span>
                          </span>
                        </a>
                      </Li>
                    </Ul>
                  ))}
                </Li>
              )
            })}
          </Ul>
        </nav>
      </div>
      <div className="aside-foot" id="dropdownProfile">
        <Dropdown
          getPopupContainer={() => document.getElementById('dropdownProfile')}
          overlay={dropdownMenu}
          trigger={['click']}
          placement="topLeft"
        >
          <div className="user" aria-expanded="false">
            <div className="user-avatar">
              <img
                src={getFileFromS3(profile.avatar) || AVATAR_DEFAULT}
                alt="Avatar"
                width="128"
                height="128"
              />
            </div>
            {(!sidebarCompact || sidebarHover) && (
              <div className="user-info">
                <div className="user-name">{profile.fullName}</div>
                <div className="company-info">
                  {profile.isWorkSpace === USER_WORKSPACE_ROLE.WORKSPACE_ADMIN ? profile.workSpaceName : profile.companyName}
                </div>
              </div>
            )}
          </div>
        </Dropdown>
      </div>
    </Wrapper>
  )
}

export default SideBar
