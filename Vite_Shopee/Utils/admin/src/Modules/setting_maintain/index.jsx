/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Wrapper } from 'Themes/facit'
import { FormSwitch, FormTextArea, Title } from 'Components'
import { QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons'
import { Popover, Button } from 'antd'
import { yupResolver } from '@hookform/resolvers/yup'

import { useSettingMaintenanceStatus } from 'Hooks'
import { FormProvider, useForm } from 'react-hook-form'
import { Content, ContentItem, UpdateButton } from './styled'
import Schema from './schema'

const SettingMaintainScreen = () => {
  const { t } = useTranslation(['settingMaintain'])
  const {
    loadSettingMaintenanceStatusAction,
    updateSettingMaintenanceStatusAction,
    settingMaintenanceStatus
  } = useSettingMaintenanceStatus()

  const form = useForm({
    resolver: yupResolver(Schema(t))
  })

  const { handleSubmit, setValue } = form

  useEffect(() => {
    loadSettingMaintenanceStatusAction()
  }, [])

  useEffect(() => {
    setValue('maintenanceMessage', settingMaintenanceStatus?.maintenanceMessage)
    setValue('maintenanceNotice', !!settingMaintenanceStatus?.maintenanceNotice)
    setValue('maintenanceSpecialEmail', settingMaintenanceStatus?.maintenanceSpecialEmail)
    setValue('maintenanceStatus', !!settingMaintenanceStatus?.maintenanceStatus)
  }, [settingMaintenanceStatus])

  const onUpdateStatus = useCallback(({ maintenanceStatus }) => {
    updateSettingMaintenanceStatusAction({
      id: 1,
      maintenanceMessage: settingMaintenanceStatus.maintenanceMessage,
      maintenanceNotice: settingMaintenanceStatus.maintenanceNotice,
      maintenanceSpecialEmail: settingMaintenanceStatus.maintenanceSpecialEmail,
      maintenanceStatus: maintenanceStatus ? 1 : 0
    })
  }, [settingMaintenanceStatus])

  const onUpdateMessage = useCallback(({ maintenanceMessage, maintenanceNotice }) => {
    updateSettingMaintenanceStatusAction({
      id: 1,
      maintenanceMessage,
      maintenanceNotice: maintenanceNotice ? 1 : 0,
      maintenanceSpecialEmail: settingMaintenanceStatus.maintenanceSpecialEmail,
      maintenanceStatus: settingMaintenanceStatus.maintenanceStatus
    })
  }, [settingMaintenanceStatus])

  const onUpdateSpecialUser = useCallback(({ maintenanceSpecialEmail }) => {
    updateSettingMaintenanceStatusAction({
      id: 1,
      maintenanceMessage: settingMaintenanceStatus.maintenanceMessage,
      maintenanceNotice: settingMaintenanceStatus.maintenanceNotice,
      maintenanceSpecialEmail: maintenanceSpecialEmail?.replace(/ /g, ''),
      maintenanceStatus: settingMaintenanceStatus.maintenanceStatus
    })
  }, [settingMaintenanceStatus])

  return (
    <Wrapper>
      <FormProvider {...form}>
        <Title
          icon={SettingOutlined}
          title={t('setting_maintain')}
        />
        <Content>
          <ContentItem>
            <h2>1. {t('maintenance_notice')}</h2>
            <FormSwitch
              name="maintenanceNotice"
            />
            <FormTextArea
              name="maintenanceMessage"
              rows={6}
              total={500}
            />
            <UpdateButton type="submit" onClick={handleSubmit(onUpdateMessage)}>
              {t('common:update')}
            </UpdateButton>
          </ContentItem>
          <ContentItem>
            <h2>2. {t('maintenance')}</h2>
            <FormSwitch
              name="maintenanceStatus"
            />
            <UpdateButton type="submit" onClick={handleSubmit(onUpdateStatus)}>
              {t('common:update')}
            </UpdateButton>
          </ContentItem>
          <ContentItem>
            <h2>
              3. {t('special_user')}
              <Popover
                content={t('special_user_guide')}
                trigger="click"
                placement="topLeft"
              >
                <QuestionCircleOutlined style={{ marginLeft: 10 }} />
              </Popover>
            </h2>
            <FormTextArea
              name="maintenanceSpecialEmail"
              rows={6}
              total={2000}
            />
            <UpdateButton type="submit" onClick={handleSubmit(onUpdateSpecialUser)}>
              {t('common:update')}
            </UpdateButton>
          </ContentItem>
        </Content>
      </FormProvider>
    </Wrapper>
  )
}

export default SettingMaintainScreen
