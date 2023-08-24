import React, { useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { PUBLISH_COURSE_OPTION } from 'Constants/course'
import { useDetailPublishReports, useHistories } from 'Hooks'
import { useParams } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'

import { Row, Popconfirm, Space, Button, Col } from 'antd'
import { FormLabel, Title, FormRadio } from 'Components'
import { Wrapper, Divider, Right } from 'Themes/facit'

const UpdatePublishReportScreen = () => {
  const { t } = useTranslation(['report_setting'])
  const { reportId } = useParams()
  const history = useHistories()
  const { loadDetailPublishReportAction, detailPublishReport, updateDetailPublishReportAction } = useDetailPublishReports()
  const { publicSetting: publicSettingState } = detailPublishReport

  const form = useForm()
  const { setValue, handleSubmit } = form

  useEffect(() => {
    loadDetailPublishReportAction({ reportId })
  }, [])

  useEffect(() => {
    setValue('publicSetting', publicSettingState)
  }, [publicSettingState])

  const onSubmit = useCallback((formData) => {
    const { publicSetting } = formData
    updateDetailPublishReportAction({ reportId, history, data: { publicSetting } })
  }, [reportId])

  return (
    <Wrapper>
      <Title icon={EditOutlined} title={t('publish_setting.title')} />
      <div className="form-wrapper">
        <FormProvider {...form}>
          <form>
            <Divider className="top" />
            <Row>
              <Col span={7}>
                <FormLabel width={100} title={t('publish_other_students')} description="Required" />
              </Col>
              <Col span={15}>
                <Right>
                  <FormRadio
                    t={t}
                    name="publicSetting"
                    options={PUBLISH_COURSE_OPTION}
                  />
                </Right>
              </Col>
            </Row>
            <Divider />
            <div className="form-action-group">
              <Space>
                <Popconfirm
                  title={t('common:popup_confirm', { key: t('everyone_report_setting') })}
                  onConfirm={handleSubmit(onSubmit)}
                >
                  <Button
                    type="primary"
                    size="large"
                  >
                    <EditOutlined />
                    {t('common:button_setup')}
                  </Button>
                </Popconfirm>
              </Space>
            </div>
          </form>
        </FormProvider>
      </div>
    </Wrapper>
  )
}

export default UpdatePublishReportScreen
