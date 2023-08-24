import React, { useCallback, useEffect } from 'react'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useAuth, useHistories, useMyCompany, useQuery, useRoles, useRoot } from 'Hooks'
import 'antd/dist/antd.less'

import { Api82105Watcher, Modal, Text, WebviewNetworkWatcher } from 'Components'
import TrialModal from 'Components/TrialModal'
import { useNetworkState } from 'Hooks/network'
import { WifiOutlined } from '@ant-design/icons'
import { getLocalStorage, signOut, STORAGE } from 'Utils'
import RoutesName from 'Routes/constant'
import { store } from 'index'
import Approutes from './Routes'
import ThemeProvider, { theme, ThemedGlobalStyle } from './Themes'

function App() {
  const [t] = useTranslation()
  const [isOnline] = useNetworkState()
  const { isPaymentExpired,
    isTrialExpired,
    isCancellation,
    isCompany, isSubCompany,
    isCourseAdmin,
    isWorkspaceAdmin,
    isWorkspaceVirtual } = useRoles()
  const { companyInfo, loadCompanyInfo, errorAPI } = useMyCompany()
  const query = useQuery()
  const history = useHistories()
  const { metaData } = useAuth()
  const { userId } = metaData
  const { setThemeAction } = useRoot()

  const handleSignOut = useCallback(() => {
    signOut(false, userId)
  }, [])

  useEffect(() => {
    if (isOnline !== null) {
      if (isOnline) {
        message.destroy()
        message.success({ content: t('online'), icon: <WifiOutlined /> })
      } else {
        message.error({ content: t('offline'), duration: 0 })
      }
    }
  }, [isOnline])

  // FOR get theme if exist in local
  useEffect(() => {
    const themeLocal = getLocalStorage(STORAGE.THEME)
    if (themeLocal) {
      setThemeAction({ params: { theme: themeLocal } })
    }
  }, [])

  useEffect(() => {
    if ((isSubCompany || isCompany || isCourseAdmin)
			&& !isWorkspaceVirtual
			&& !history.location.pathname.includes(RoutesName.MY_COMPANY) // Reject call in my-company screen
			&& !isWorkspaceAdmin
    ) {
      loadCompanyInfo()
    }
    if (query.get('trialExpired')) {
      store.dispatch({ type: 'ERROR_USER_EXPIRED_TRIAL' })
    }
    if (query.get('companyCancellation')) {
      store.dispatch({ type: 'ERROR_COMPANY_HAS_CANCELLATION' })
    }
  }, [query, isSubCompany, isCompany, isCourseAdmin, isWorkspaceVirtual])

  // FOR use theme global
  const themeGlobal = { ...theme() }

  return (
    <ThemeProvider themeGlobal={themeGlobal}>
      <WebviewNetworkWatcher />
      <Api82105Watcher />
      <ThemedGlobalStyle />
      <Approutes isTrialExpired={isTrialExpired} isPaymentExpired={isPaymentExpired} />
      {(isTrialExpired && isSubCompany && isCourseAdmin) && (
        <Modal
          visible
          onSubmitText={t('common:yes')}
          cancel={false}
          onSubmit={handleSignOut}
          onCancel={handleSignOut}
        >
          <Text.primary style={{ textAlign: 'center' }}>{t('common:trial_expired_user')}</Text.primary>
        </Modal>
      )}
      {(isCancellation || isTrialExpired) && !errorAPI && !isSubCompany && !isCourseAdmin && (
      <TrialModal
        visible
        onClose={companyInfo?.isPlanzz ? () => history.push(RoutesName.MY_COMPANY) : handleSignOut}
      />
      )}
      {(isCancellation || isTrialExpired) && errorAPI && !isSubCompany && !isCourseAdmin && (
      <Modal
        visible
        onSubmitText={t('common:yes')}
        onCancelText={t('common:cancel')}
        onClose={handleSignOut}
        type="error"
        ok={false}
      >
        <Text.primary
          fontWeight="fw_600"
          style={{ color: 'red', textAlign: 'center' }}
          fontSize="size_16"
        >
          {errorAPI.message}
        </Text.primary>
      </Modal>
      )}
      {isPaymentExpired && (
      <Modal
        visible
        onSubmitText={t('common:yes')}
        cancel={false}
        onSubmit={handleSignOut}
        onCancel={handleSignOut}
      >
        <Text.primary style={{ textAlign: 'center' }}>{t('common:payment_expired')}</Text.primary>
      </Modal>
      )}
    </ThemeProvider>
  )
}

export default App
