import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { stringify } from 'qs'
import { Wrapper, Left, Right, Link, StyledDailyReportWrapper } from './styled'

import { Image, Sidebar, LinkIcon } from '../index'
import { ICON_TALK_BOARD, ICON_TALK_BOARD_ACTIVE, LOGO_COMPANY, SIDEBAR_ICON } from '../../assets'

import { USER_ROLE, ADMIN_URL, ROUTES_NAME } from '../../constants'
import { SETTING_PROFILE } from './constant'
import { STORAGE, getLocalStorage, getFileFromS3 } from '../../utils'

import Language from './components/language'
import Notice from './components/notice'
import ProfileSettings from './components/profile-settings'
import Workspaces from './components/workspaces'

import {
  useNotification,
  useAuth,
  useProfile,
  useHistories,
  useGetQuery,
  useWorkspaces,
  useTalkBoard,
  useGlobalStore,
  useCourseList,
  useDailyReports
} from '../../hooks'
import ContentSidebar from './components/tablet-only/content-sidebar'
import UnreadDailyReportWatcher from './components/UnreadDailyReportWatcher'

const Header = () => {
  // Use hooks
  const { t } = useTranslation()
  const { data: workspaces, currentWorkspace } = useWorkspaces()
  const {
    authenticated,
    profile,
    userRole,
    getProfile
  } = useProfile()
  const { unreadTalkBoard, loadUnreadTalkBoardAction } = useTalkBoard()
  const { infoCompany } = useGlobalStore()
  const { unRead, getNotificationUnread } = useNotification({ userId: profile?.userId })
  const location = useLocation()
  const history = useHistories()
  const { signOut } = useAuth()
  const { workspaceid, queryWorkspaceID } = useGetQuery()
  const { initRoute } = useGlobalStore()
  const { refreshCourseListPageAction, isSearching: isLoadingCourseList } = useCourseList({ userId: profile.userId })
  const { dailyReports: { totalUnread } } = useDailyReports()
  // End use hooks

  // FOR local storage
  const getMetaData = getLocalStorage(STORAGE.META_DATA)
  const language = getLocalStorage(STORAGE.LANGUAGE)
  const theme = JSON.parse(getLocalStorage(STORAGE.THEME))

  const metaData = JSON.parse(getMetaData)

  const [isSidebar, setIsSidebar] = useState(false)

  const isAllowGetUnread = useMemo(() => authenticated && ![USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.APPROVAL_MANAGEMENT].includes(userRole), [authenticated, userRole])

  useEffect(() => {
    if (authenticated && ![USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.APPROVAL_MANAGEMENT].includes(userRole)) {
      // For notification
      const allowLoadUnreadNotification = ![USER_ROLE.NISSHOKEN_ADMIN].includes(userRole)
      && !location.pathname.includes('/notification/detail/') // Ignore get unread in notify-detail page because it's be call after focus on
      if (allowLoadUnreadNotification) {
        getNotificationUnread()
      }

      // For talk-board
      loadUnreadTalkBoardAction()
    }
  }, [authenticated, location.pathname, userRole])

  const changeProfile = (setting) => {
    switch (setting.getPath) {
      case ROUTES_NAME.LOGIN:
        const role = metaData.roles[0]
        if ([USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN].includes(role)) {
          window.location.replace(`${ADMIN_URL}${ROUTES_NAME.LOGOUT}`)
        } else {
          signOut()
        }
        break
      case '/management':
        const queryParams = stringify({ ...metaData, language, workspaceid, theme })
        window.location.replace(`${ADMIN_URL}/auth/verify?${queryParams}`)
        break
      case ROUTES_NAME.TEMPLATE:
        if (window.location.pathname !== ROUTES_NAME.TEMPLATE) {
          history.push(setting.getPath)
        }
        break
      default:
        history.push(setting.getPath)
        break
    }
  }

  const onRedirectToTopPage = () => {
    if (isLoadingCourseList || !location.pathname.includes(ROUTES_NAME.COURSE_LIST)) return
    refreshCourseListPageAction()
  }

  return (
    <Wrapper unreadTalkBoard={unreadTalkBoard}>
      <Left>
        {authenticated && <Image className="sidebar__icon" onClick={() => setIsSidebar(true)} src={SIDEBAR_ICON} />}
        <LinkIcon
          className="logo__company"
          src={(getFileFromS3(infoCompany.logoPath) || getFileFromS3(profile.imagePath)) || LOGO_COMPANY}
          to={`/${queryWorkspaceID.ONLY}`}
        />
      </Left>
      <Right>
        {authenticated && (
          <>
            {Object.keys(currentWorkspace || {}).length ? (
              <>
                <Workspaces
                  t={t}
                  userId={profile.userId}
                  userRole={userRole}
                  workspaceid={workspaceid}
                  currentWorkspace={currentWorkspace}
                  workspaces={workspaces}
                  getProfile={getProfile}
                />
                <div className="line" />
              </>
            ) : null}
            <Link
              className="link__page"
              style={{ color: location.pathname.includes(ROUTES_NAME.COURSE_LIST) ? '#00C271' : '' }}
              to={initRoute.topPage}
              onClick={onRedirectToTopPage}
            >
              {t('common.header.home')}
            </Link>
            <div className="line" />
            <Link
              className="link__page"
              style={{ color: location.pathname.includes(ROUTES_NAME.MY_PAGE) ? '#00C271' : '' }}
              to={initRoute.myPage}
            >
              {t('common.header.mypage')}
            </Link>
            <div className="line" />
            <StyledDailyReportWrapper>
              <Link
                className="link__page"
                style={{ color: location.pathname.includes(ROUTES_NAME.DAILY_REPORTS) ? '#00C271' : '' }}
                to={`${ROUTES_NAME.DAILY_REPORTS}${queryWorkspaceID.ONLY}`}
              >
                {t('report.dailyReport')}
              </Link>
              <div className="totalUnread">
                {totalUnread}
              </div>
            </StyledDailyReportWrapper>
            <div className="line" />
            {userRole !== USER_ROLE.NISSHOKEN_ADMIN && (
              <>
                <Link
                  className="link__page"
                  style={{ color: location.pathname === ROUTES_NAME.SEMINARS ? '#00C271' : '' }}
                  to={`${ROUTES_NAME.SEMINARS}${queryWorkspaceID.ONLY}`}
                >
                  {t('common.header.seminar')}
                </Link>
                <div className="line" />
              </>
            )}
            <div className="talk-board-unread">
              {unreadTalkBoard > 0
              && <div className="unread-count">{unreadTalkBoard}</div>}
              <Link
                className="link__page talk__board"
                to={`${ROUTES_NAME.TALK_BOARD}${queryWorkspaceID.ONLY}`}
              >
                {location.pathname === ROUTES_NAME.TALK_BOARD
                  ? <ICON_TALK_BOARD_ACTIVE />
                  : <ICON_TALK_BOARD />}
              </Link>
            </div>
            {userRole !== USER_ROLE.NISSHOKEN_ADMIN && <Notice notifyUnRead={unRead} />}
            <ProfileSettings
              changeProfile={changeProfile}
              SETTING_PROFILE={SETTING_PROFILE}
              avatar={getFileFromS3(profile.avatar)}
              isWorkSpace={profile.isWorkSpace}
            />
          </>
        )}
        {/* Task 3537: Temporary hide */}
        {/* {!authenticated && location.pathname !== '/auth/forgot-password'
          ? location.pathname !== '/auth/register' && location.pathname !== '/setting-password/company'
          && location.pathname !== '/setting-password/employee'
          && location.pathname !== '/setting-password/company'
          && location.pathname !== '/setting-password/user' ? (
            <Link className="sign__up" to="/auth/register">
              {t('common.header.sign_up')}
            </Link>
            ) : (
              <Link className="sign__up" to="/auth/login">
                {t('common.header.login')}
              </Link>
            ) : '' } */}
        {!authenticated && location.pathname !== ROUTES_NAME.LOGIN && (
          <Link className="sign__up" to={ROUTES_NAME.LOGIN}>
            {t('common.header.login')}
          </Link>
        )}
        <Language />
      </Right>
      <Sidebar width={300} placement="left" visible={isSidebar} onVisible={setIsSidebar}>
        <ContentSidebar />
      </Sidebar>

      {/* For get notification unread */}
      {isAllowGetUnread && <UnreadDailyReportWatcher />}
    </Wrapper>
  )
}

export default Header
