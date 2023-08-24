import { notification } from 'antd'
import i18next from 'i18next'
import { parse, stringify } from 'qs'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { BookmarkCourseDisplayTypeWatcher, Modal, ResetFilterOfCourse } from './components'
import { ADMIN_URL, SIGNAL_TYPE, USER_ROLE } from './constants'
import {
  useAuth,
  useCheckNetwork,
  useGlobalStore,
  useHistories,
  useLoadingPortal,
  useProfile,
  useWorkspaces } from './hooks'
import { getLocalStorage, removeLocalStorage, setLocalStorage, STORAGE } from './utils'

import 'antd/dist/antd.css'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { store } from '.'
import LoadingScreen from './modules/loading'
import LoadingPortal from './modules/loadingPortal'
import AppRoutes from './routes'
import ThemeProvider, { theme, ThemedGlobalStyle } from './themes'

const App = () => {
  const isOnline = useCheckNetwork()
  const history = useHistories()
  const location = useLocation()
  const { t } = useTranslation()
  const { getProfile, isTrialExpired, isCompanyCancellation, isPaymentExpired, resetTrialExpired, profile } = useProfile()
  const { signOut } = useAuth()
  const { isMaintainNotice, setThemeAction, themeCompany } = useGlobalStore()
  const { isLoadingPortal } = useLoadingPortal()
  const { loadWorkspacesAction } = useWorkspaces()

  const [loading, setLoading] = useState(true)
  const [isOpenExpiredModal, setIsOpenExpiredModal] = useState(false)
  const [isOpenPaymentModal, setIsOpenPaymentModal] = useState(false)
  const [isShowCancellation, setIsShowCancellation] = useState(false)

  const handleOk = () => {
    const getMetaData = getLocalStorage(STORAGE.META_DATA)
    const language = getLocalStorage(STORAGE.LANGUAGE)
    const metaData = JSON.parse(getMetaData)
    let queryParams = ''
    if (isTrialExpired) {
      queryParams = stringify({ ...metaData, language, redirectTo: '/?trialExpired=1' })
      resetTrialExpired()
    } else if (isCompanyCancellation) {
      queryParams = stringify({ ...metaData, language, redirectTo: '/?companyCancellation=1' })
    }
    window.location.replace(`${ADMIN_URL}/auth/verify?${queryParams}`)
  }

  useEffect(() => {
    if (isMaintainNotice) {
      notification.warning({
        description: t('errors.server_maintaining'),
        duration: 3
      })
      setTimeout(() => {
        store.dispatch({
          type: '@APP/SHOW_MAINTAIN_NOTICE',
          isMaintainNotice: false
        })
      }, 500)
    }
  }, [isMaintainNotice])

  useEffect(async () => {
    const userToken = await getLocalStorage(STORAGE.USER_TOKEN)
    const getMetaData = await getLocalStorage(STORAGE.META_DATA)
    const metaData = JSON.parse(getMetaData)
    const { signal, lang, fromUserRole, isMaintainNoticeAdmin } = parse(window.location.search, { ignoreQueryPrefix: true }) // signal from admin

    // FOR show maintain notice
    if (isMaintainNoticeAdmin) {
      notification.warning({
        description: t('errors.server_maintaining'),
        duration: 3
      })
    }
    // FOR setting language
    if (lang) {
      setLocalStorage(STORAGE.LANGUAGE, lang)
      i18next.changeLanguage(lang)
    }
    // FOR get signal from ADMIN PAGE to sign out and get profile
    if (userToken && metaData.userId) {
      switch (+signal) {
        case SIGNAL_TYPE.LOGOUT:
          await signOut()
          setTimeout(() => setLoading(false), 1000)
          break
        default:
          await getProfile({ userId: metaData.userId, fromUserRole })
          setTimeout(() => setLoading(false), 1000)
          break
      }
    } else {
      setTimeout(() => setLoading(false), 1000)
    }
    // FOR get info workspace
    const isSignOut = signal // This query are signal logout from admin url
    const allowLoadWorkspace = metaData
    && ![USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.APPROVAL_MANAGEMENT].includes(metaData.roles[0])
    && !isSignOut
    if (allowLoadWorkspace) {
      loadWorkspacesAction()
    }
  }, [])

  useEffect(() => {
    const hasTrialExpired = isTrialExpired && history.location.pathname !== '/profile/change-plan'

    setIsOpenExpiredModal(hasTrialExpired)
    setIsOpenPaymentModal(isPaymentExpired)
    setIsShowCancellation(isCompanyCancellation)
  }, [isTrialExpired, isPaymentExpired, isCompanyCancellation])

  //-------------------------------------------------
  // FOR settings theme and favicon, title of page
  useEffect(() => {
    let themeCode
    const themeLocal = JSON.parse(getLocalStorage(STORAGE.THEME))
    if (location.pathname === '/auth/login' && location.search) {
      themeCode = location.search.replace('?', '')
    } else if (location.pathname === '/auth/login' && !location.search) {
      themeCode = null
    } else if (themeLocal) {
      themeCode = themeLocal
    }

    if (themeCode) {
      setThemeAction({ params: { theme: themeCode } })
    } else {
      removeLocalStorage(STORAGE.THEME)
    }
  }, [])

  // FOR loading
  if (loading) {
    return (
      <LoadingScreen />
    )
  }

  // FOR use theme global
  const themeGlobal = { ...theme(), ...themeCompany }

  return (
    <ThemeProvider themeGlobal={themeGlobal}>
      <ThemedGlobalStyle />
      <ResetFilterOfCourse />
      <BookmarkCourseDisplayTypeWatcher />
      <AppRoutes isOnline={isOnline} />
      {/* Modal for account trial expired */}
      <Modal
        isModalVisible={isOpenExpiredModal}
        setIsModalVisible={setIsOpenExpiredModal}
        description={t([USER_ROLE.COMPANY_EMPLOYEE, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN].includes(profile.role)
          ? 'common.trial_expired_user'
          : 'common.trial_expired_company')}
        cancelText={t('common.no')}
        okText={t('common.yes')}
        onOk={[USER_ROLE.COMPANY_EMPLOYEE, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN].includes(profile.role) ? signOut : handleOk}
        onCancel={signOut}
        isCancel={!([USER_ROLE.COMPANY_EMPLOYEE, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN].includes(profile.role))}
      />
      {/* Modal for account payment expired */}
      <Modal
        isModalVisible={isOpenPaymentModal}
        setIsModalVisible={setIsOpenPaymentModal}
        description={t('common.payment_expired')}
        okText={t('common.yes')}
        onOk={signOut}
        isCancel={false}
      />
      {/* Modal for account have cancellation contract */}
      <Modal
        isModalVisible={isShowCancellation}
        setIsModalVisible={setIsShowCancellation}
        description={t([USER_ROLE.COMPANY_ADMIN].includes(profile.role) ? 'common.company_cancellation_admin' : 'common.company_cancellation_member')}
        okText={t('common.yes')}
        onOk={[USER_ROLE.COMPANY_ADMIN].includes(profile.role) ? handleOk : signOut}
        isCancel={[USER_ROLE.COMPANY_ADMIN].includes(profile.role) && true}
        onCancel={signOut}
      />
      {/* LoadingPortal common */}
      <LoadingPortal isLoadingPortal={isLoadingPortal} />
    </ThemeProvider>
  )
}

export default App
