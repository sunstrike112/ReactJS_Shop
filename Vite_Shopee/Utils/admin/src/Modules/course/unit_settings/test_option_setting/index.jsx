import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'react-router-dom'
import { Button, Checkbox, Space } from 'antd'
import { useTestDetail, useOptionSetting } from 'Hooks/unit_settings'
import { EditOutlined } from '@ant-design/icons'
import { RoutesName } from 'Modules/course/routes'

import { Title, FormInputNumber, FormLabel, PopupButton } from 'Components'
import { QUERY } from 'Constants'
import { useGetQuery, useHistories, useRoles } from 'Hooks'
import { Wrapper, Divider } from 'Themes/facit'
import { Row, Right, CheckBox } from './styled'
import OptionSettingSchema from './schema'

const OptionSettingScreen = () => {
  const { t } = useTranslation(['unit_setting'])
  const { unitId, courseId } = useParams()
  const history = useHistories()

  const { queryWorkspaceID } = useGetQuery()
  const { createBy } = useRoles()
  const { getDetailTestAction, detailTest } = useTestDetail()
  const { optionSettingTestAction, optionSetting } = useOptionSetting()
  const { isLoading } = optionSetting

  const form = useForm({
    resolver: yupResolver(OptionSettingSchema(t))
  })
  const { handleSubmit, reset, setValue } = form
  const [isShow, setIsShow] = useState(detailTest && !!detailTest.data?.questionSettings.isShowAnswer)

  useEffect(() => {
    getDetailTestAction({ courseId, unitId })
  }, [unitId, courseId])

  useEffect(() => {
    setValue('timeLimit', detailTest.data?.questionSettings.timeLimit)
    setValue('isShowAnswer', detailTest.data?.questionSettings.isShowAnswer !== 0)
  }, [detailTest])

  const defaultValue = {
    timeLimit: detailTest.data?.questionSettings.timeLimit || null,
    isShowAnswer: false
  }

  const onSubmit = (formData) => {
    const data = { timeLimit: formData.timeLimit, isShowAnswer: Number(!!formData.isShowAnswer) }
    optionSettingTestAction({ courseId, unitId, data, history, createBy })
  }

  const handleShowHideAnswer = () => {
    setIsShow((prev) => !prev)
    setValue('isShowAnswer', !form.getValues('isShowAnswer'))
  }

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('detail.option_settings')}
        backRoute={`${RoutesName.TEST_DETAIL}/${courseId}/${unitId}?${QUERY.CREATE_BY}=${createBy}${queryWorkspaceID.CONNECT}`}
        backRouteText="unit_setting:back_test_details"
      />
      <div className="form-wrapper">
        <FormProvider {...form}>
          <form>
            <Row>
              <FormLabel title={t('course')} />
              <Right noInput>
                <span>{detailTest.data?.basicInformationResponse.courseName}</span>
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('unit')} />
              <Right className="unit__field" noInput>
                {detailTest.data?.basicInformationResponse.unitName}
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('detail.time_limit')} description="Optional" />
              <Right label={t('common:minutes')}>
                <FormInputNumber
                  min={0}
                  max={999}
                  maxLength={3}
                  name="timeLimit"
                  style={{ width: 100 }}
                  prefix={null}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('basic_info_setting.show_answer')} />
              <CheckBox>
                <Checkbox
                  name="isShowAnswer"
                  checked={isShow}
                  onChange={handleShowHideAnswer}
                />
              </CheckBox>
            </Row>
            <Divider />
            <div className="form-action-group">
              <Space>
                <Button htmlType="button" onClick={() => reset(defaultValue)}>{t('common:restore')}</Button>
                <PopupButton
                  icon={EditOutlined}
                  titlePopup={t('basic_info_setting.confirm_change')}
                  textButton={t('common:button_setup')}
                  okText="common:button_setup"
                  onConfirm={handleSubmit(onSubmit)}
                  disabled={isLoading}
                  isLoading={isLoading}
                />
              </Space>
            </div>
          </form>
        </FormProvider>
      </div>
    </Wrapper>
  )
}

export default OptionSettingScreen
