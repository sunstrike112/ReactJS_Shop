/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import { ArrowLeftOutlined, GlobalOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu, notification } from 'antd'
import i18next from 'I18n'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { AVATAR_DEFAULT, CHEVRON_RIGHT_ICON, COMPANY_LOGO, EN_ICON, JP_ICON, LOGOUT_ICON, VI_ICON } from 'Assets'
import { Image } from 'Components'
import { PUBLISH_TYPE } from 'Constants'
import { USER_WORKSPACE_ROLE } from 'Constants/auth'
import { useAuth, useHistories, useIssuePermission, useLoadUnitSetting, useRegistrationCourses, useRoot, useWebview } from 'Hooks'
import { checkUploadFileStatusForWebview, getFileFromS3, getLocalStorage, setLocalStorage, STORAGE } from 'Utils'
import { MenuList, QUERY_PARAMS, RoutesName } from './constant'
import { Li, Ul, Wrapper } from './styled'
import ExceedPackageModal from './ExceedPackageModal'

export const redirectToApp = (queryParams) => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const workspaceid = urlParams.get('workspaceid')
  const urlToReplace = workspaceid ? `${window.location.origin}?${queryParams}&workspaceid=${workspaceid}` : `${window.location.origin}?${queryParams}`
  window.location.replace(urlToReplace)
}

const SideBarWebview = () => {
  const languageLocal = getLocalStorage(STORAGE.LANGUAGE)
  // Use hooks
  const { metaData, profile } = useAuth()
  const role = metaData?.roles?.[0]
  const roleWS = profile.isWorkSpace
  const history = useHistories()
  const location = useLocation()
  const { t, i18n: { language } } = useTranslation(['menu', 'courseResult'])
  const { infoCompany } = useRoot()
  const { infoCourse, infoCourseToAssign, isDisabledIssueCourse, disableIssueCourseAction } = useRegistrationCourses()
  const { unitId } = useLoadUnitSetting()
  const { createIssuePermissionAction } = useIssuePermission()
  const { isWebviewMode, isPreviewingResultOfWebview, isUploadExceedPackageInWebview, webviewFileId } = useWebview()
  // End use hooks

  // Use states
  const [itemActive, setItemActive] = useState(['home'])
  const [itemToggle, setItemToggle] = useState(['course-management'])
  const [isPreview, setIsPreView] = useState(isPreviewingResultOfWebview || false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isExceedPackage, setIsExceedPackage] = useState(false)
  // End use states

  const onCancelPreview = () => {
    setIsPreView(false)
    setLocalStorage(STORAGE.WEBVIEW_PREVIEW, JSON.stringify(false))
  }

  const onAction = () => {
    if (isPreview) {
      setIsSubmitting(true)
      const { startTime, endTime, required, listCourseIds, listUserIds } = infoCourseToAssign
      const data = { startTime, endTime, required, listCourseIds, listUserIds }
      checkUploadFileStatusForWebview({
        t,
        webviewFileId,
        onSuccess: () => {
          createIssuePermissionAction({
            data,
            isWebviewMode,
            history,
            langCode: languageLocal,
            callback: {
              done: () => {
                onCancelPreview()
                setIsSubmitting(false)
                redirectToApp(QUERY_PARAMS.ASSIGN_COURSE_SUCCESS)
              }
            }
          })
        },
        onFailure: () => {
          onCancelPreview()
        }
      })
    } else {
      if (!infoCourseToAssign.isEnoughData && !infoCourse.hasAutoAssignment) {
        notification.error({
          message: t('common:error'),
          description: t('issue_permission:error_message.required_info_course_to_assign'),
          duration: 2
        })
        return
      }
      setIsPreView(true)
      setLocalStorage(STORAGE.WEBVIEW_PREVIEW, JSON.stringify(true))
    }
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

  useEffect(() => {
    if (isUploadExceedPackageInWebview) {
      setIsExceedPackage(true)
    }
  }, [isUploadExceedPackageInWebview])

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

  const handleRedirect = (pathname) => {
    switch (pathname) {
      case RoutesName.COURSE_ISSUE_PERMISSION: {
        if (infoCourse.hasAutoAssignment) {
          notification.error({
            message: t('common:error'),
            description: t('issue_permission:error_message.course_has_been_assigned'),
            duration: 2
          })
          disableIssueCourseAction()
        } else if (infoCourse.publicSetting === PUBLISH_TYPE.PRIVATE) {
          notification.error({
            message: t('common:error'),
            description: t('issue_permission:error_message.not_assign_course_private'),
            duration: 2
          })
        } else if (!unitId) {
          notification.error({
            message: t('common:error'),
            description: t('issue_permission:error_message.required_unit'),
            duration: 2
          })
        } else if (!infoCourse.courseId) {
          notification.error({
            message: t('common:error'),
            description: t('issue_permission:error_message.required_course'),
            duration: 2
          })
        } else {
          history.push(pathname)
        }
        break
      }
      case RoutesName.COURSE_UNIT_SETTING: {
        if (!infoCourse.courseId) {
          notification.error({
            message: t('common:error'),
            description: t('issue_permission:error_message.required_course'),
            duration: 2
          })
        } else if (unitId) {
          history.push(`/course-management/unit-settings/lecture/edit/${infoCourse.courseId}/${unitId}`)
        } else {
          history.push(`/course-management/unit-settings/lecture/create/${infoCourse.courseId}`)
        }
        break
      }
      case RoutesName.COURSE_MANAGEMENT: {
        if (infoCourse.courseId) {
          history.push(`/course-management/lesson-course/edit/${infoCourse.courseId}`)
        } else {
          history.push(RoutesName.COURSE_MANAGEMENT)
        }
        break
      }
      default: history.push(pathname)
    }
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
      <Menu.Item key="1" onClick={() => redirectToApp(QUERY_PARAMS.APP_LOGIN)}>
        <LOGOUT_ICON className="logout-icon" />
        <span>&nbsp;{t('common:logout')}</span>
      </Menu.Item>
    </Menu>
  ), [t])

  return (
    <Wrapper
      companyLogo={getFileFromS3(infoCompany.logoPath) || getFileFromS3(profile.imagePath)}
      isShow={location.pathname.includes('menu')}
    >
      <div className="aside-head">
        <div className="brand">
          <div className="brand-logo">
            {isPreview && <ArrowLeftOutlined onClick={onCancelPreview} style={{ marginRight: 5 }} />}
            <h1 className="brand-title">
              <Image
                src={(getFileFromS3(infoCompany.logoPath) || getFileFromS3(profile.imagePath)) || COMPANY_LOGO}
                onClick={() => handleRedirect(RoutesName.HOME)}
                alt="E-learning"
              />
            </h1>
          </div>
          <Button disabled={isPreview && infoCourse.hasAutoAssignment} loading={isSubmitting} type="primary" onClick={onAction}>
            {isPreview ? t('issue_permission:common.issue') : t('common:tooltip.view')}
          </Button>
        </div>
      </div>
      <div className="aside-body">
        <nav aria-label="aside-dashboard">
          <Ul>
            {menus.map((item, index) => {
              const { Icon, title, key, stroke, fill, pathName, children } = item
              return (
                <Li
                  stroke={stroke}
                  fill={fill}
                  key={index}
                  onClick={() => {
                    if (pathName === RoutesName.HOME) {
                      handleRedirect(RoutesName.HOME)
                    }
                    if (pathName && !location.pathname.includes(pathName)) {
                      handleRedirect(pathName)
                    }
                    if (children) {
                      const itemIndex = itemToggle.indexOf(key)
                      if (itemIndex > -1) {
                        setItemToggle([])
                      } else {
                        setItemToggle([key])
                      }
                    }
                  }}
                >
                  <a className={`navigation-link ${itemActive.includes(key) ? 'active' : ''}`}>
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
                  {itemToggle.includes(key) && children && children.map((childItem, childIndex) => {
                    const disabled = isDisabledIssueCourse && childItem.pathName === RoutesName.COURSE_ISSUE_PERMISSION
                    return (
                      <Ul
                        className="navigation"
                        key={childIndex}
                      >
                        <Li
                          className="navigation-item"
                          stroke={childItem.stroke}
                          fill={childItem.fill}
                          key={childItem.key}
                          disabled={disabled}
                          onClick={(e) => {
                            e.stopPropagation()
                            if (disabled) {
                              return
                            }
                            if (childItem.pathName && !(location.pathname === childItem.pathName)) {
                              handleRedirect(childItem.pathName)
                            }
                          }}
                        >
                          <a className={`navigation-link ${location.pathname.includes(childItem.pathName) ? 'active' : ''}`}>
                            <span className="navigation-link-info">
                              <childItem.Icon className="navigation-icon" />
                              <span className="navigation-text">
                                {t(childItem.title)}
                              </span>
                            </span>
                          </a>
                        </Li>
                      </Ul>
                    )
                  })}
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
            <div className="user-info">
              <div className="user-name">{profile.fullName}</div>
              <div className="company-info">
                {profile.isWorkSpace === USER_WORKSPACE_ROLE.WORKSPACE_ADMIN ? profile.workSpaceName : profile.companyName}
              </div>
            </div>
          </div>
        </Dropdown>
      </div>

      <ExceedPackageModal visible={isExceedPackage} />
    </Wrapper>
  )
}

export default SideBarWebview
