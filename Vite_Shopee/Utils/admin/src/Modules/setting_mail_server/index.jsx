/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { MailOutlined } from '@ant-design/icons'
import { Title } from 'Components'
import { useTranslation } from 'react-i18next'
import { Wrapper } from 'Themes/facit'
import { useAuth, useSettingEmailServer } from 'Hooks'
import MailServerForm from './MailServerForm'
import MailServerInfo from './MailServerInfo'

const SettingMailServerScreen = () => {
  const { t } = useTranslation(['mailServer'])
  const { emailServer, isUpdating, getEmailServerAction, updateEmailServerAction } = useSettingEmailServer()
  const { profile } = useAuth()

  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (profile) {
      const { companyId } = profile
      getEmailServerAction({ companyId })
    }
  }, [profile])

  return (
    <Wrapper>
      <Title
        icon={MailOutlined}
        title={t('menu:mail_server')}
      />
      <div className="form-wrapper">
        {isEdit
          ? (
            <MailServerForm
              t={t}
              setIsEdit={setIsEdit}
              emailServer={emailServer}
              updateEmailServerAction={updateEmailServerAction}
              isUpdating={isUpdating}
              profile={profile}
            />
          )
          : (
            <MailServerInfo
              t={t}
              setIsEdit={setIsEdit}
              emailServer={emailServer}
            />
          )}
      </div>
    </Wrapper>
  )
}

export default SettingMailServerScreen
