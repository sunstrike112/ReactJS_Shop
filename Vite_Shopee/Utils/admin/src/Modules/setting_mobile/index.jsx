import React, { useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Divider, Right, Wrapper } from 'Themes/facit'
import { FormInput, FormInputNumber, FormLabel, Title } from 'Components'
import { EditOutlined, MobileOutlined } from '@ant-design/icons'
import { Button, Row, Space, Spin } from 'antd'
import { yupResolver } from '@hookform/resolvers/yup'

import { useSettingMobile } from 'Hooks'
import { FormProvider, useForm } from 'react-hook-form'
import { LABEL_TYPES } from 'Constants'
import { isEmpty } from 'lodash'
import Schema from './schema'

const SettingMobileScreen = () => {
  const { t } = useTranslation(['settingMobile'])

  const { data, isLoading, isSubmitting, updateSettingMobileDetailAction } = useSettingMobile()

  const form = useForm({
    resolver: yupResolver(Schema(t))
  })

  const { handleSubmit, formState: { errors }, reset, clearErrors } = form

  const setInitData = useCallback(() => {
    if (Object.keys(data).length) {
      const { iosVersion, iosLink, androidVersion, androidLink } = data
      reset({ iosVersion, iosLink, androidVersion, androidLink })
    }
  }, [data])

  const onSubmit = (formData) => {
    updateSettingMobileDetailAction({ data: { ...data, ...formData } })
  }

  useEffect(() => {
    setInitData()
  }, [setInitData])

  useEffect(() => {
    clearErrors()
  }, [t])

  return (
    <Wrapper>
      <Title
        icon={MobileOutlined}
        title={t('title')}
      />
      <Spin spinning={isLoading}>
        <div className="form-wrapper">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <FormLabel
                  title={t('ios_version')}
                  description={LABEL_TYPES.REQUIRED}
                />
                <Right>
                  <FormInputNumber
                    name="iosVersion"
                    prefix={false}
                    min={0}
                    isTypingDot={false}
                  />
                </Right>
              </Row>
              <Divider />
              <Row>
                <FormLabel
                  title={t('ios_link')}
                  description={LABEL_TYPES.REQUIRED}
                />
                <Right>
                  <FormInput
                    name="iosLink"
                    maxLength={255}
                  />
                </Right>
              </Row>
              <Divider />
              <Row>
                <FormLabel
                  title={t('android_version')}
                  description={LABEL_TYPES.REQUIRED}
                />
                <Right>
                  <FormInputNumber
                    name="androidVersion"
                    prefix={false}
                    min={0}
                    isTypingDot={false}
                  />
                </Right>
              </Row>
              <Divider />
              <Row>
                <FormLabel
                  title={t('android_link')}
                  description={LABEL_TYPES.REQUIRED}
                />
                <Right>
                  <FormInput
                    name="androidLink"
                    maxLength={255}
                  />
                </Right>
              </Row>
              <div className="form-action-group">
                <Space>
                  <Button onClick={setInitData}>
                    {t('common:reset')}
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    disabled={!isEmpty(errors)}
                    loading={isSubmitting}
                    icon={<EditOutlined />}
                  >
                    {t('common:update')}
                  </Button>
                </Space>
              </div>
            </form>

          </FormProvider>
        </div>
      </Spin>

    </Wrapper>
  )
}

export default SettingMobileScreen
