/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Checkbox, Col, Row, Select, Space, Spin } from 'antd'
import { uniq, findIndex } from 'lodash'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'
import { checkOverSizeAPI } from '../../../apis'
import { BACK_ICON, COLLAPSE_GROUP_ICON, EXPAND_GROUP_ICON, ICON_ARROW_DOWN_GREEN } from '../../../assets'
import { Modal, TextNormal } from '../../../components'
import {
  FormCheckboxTree, FormInput, FormRadio,
  FormTextArea, FormUploadFile, FormDatePicker
} from '../../../components/form'
import { ROUTES_NAME, STATUS } from '../../../constants'
import { useDailyReports, useHistories, useTalkBoard } from '../../../hooks'
import { getLocalStorage, removeFromArray, STORAGE, convertBooleanToNumber, flatKeys } from '../../../utils'
import { FULL_DATE } from '../../../utils/date'
import HomeLayout from '../../layouts/home'
import Schema from './schema'
import { Container, Wrapper, WrapperParentGroup, WrapperChildrenGroup } from './styled'

const EditTemplateScreen = () => {
  // Use hooks
  const history = useHistories()
  const { t } = useTranslation()
  const { templateId } = useParams()

  const {
    templateDetail,
    loadTemplateDetailAction,
    editTemplateAction
  } = useDailyReports()
  // End use hooks

  const [visibleErrorSize, setVisibleErrorSize] = useState(false)
  const [visibleCreateSuccess, setVisibleCreateSuccess] = useState(false)

  const form = useForm({
    resolver: yupResolver(Schema()),
    defaultValues: {
      title: '',
      description: ''
    }
  })
  const { handleSubmit, setValue, watch, formState: { errors, isDirty } } = form

  const setInitData = () => {
    setValue('title', templateDetail.data.title)
    setValue('description', templateDetail.data.description)
  }

  const goBack = () => history.go(-1)

  const onSubmit = (formData) => {
    const data = {
      title: formData.title.trim(),
      description: formData.description.trim()
    }
    editTemplateAction({
      templateId,
      data,
      callback: {
        done: () => setVisibleCreateSuccess(true)
      }
    })
  }

  useEffect(() => {
    loadTemplateDetailAction({ templateId })
  }, [])

  useEffect(() => {
    if (templateDetail) {
      setInitData()
    }
  }, [templateDetail])

  return (
    <HomeLayout>
      <Wrapper>
        <div className="talk-board-form">
          <div className="title">{t('dailyReports.template.edit_template')}</div>
          <hr />
          <FormProvider {...form} isDirty={isDirty}>
            <FormInput
              t={t}
              name="title"
              label={t('dailyReports.template.title')}
              isRequired
              maxLength={100}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'left'
              }}
            />

            <FormTextArea
              t={t}
              name="description"
              label={t('dailyReports.template.description')}
              isRequired
              maxLength={4000}
              total={4000}
              rows={8}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'left'
              }}
            />
            <div className="form-action-group">
              <Space>
                <Button
                  htmlType="button"
                  className="btn-cancel"
                  onClick={goBack}
                  style={{
                    border: '1px solid #1A1A1A',
                    fontWeight: '500'
                  }}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-post"
                  onClick={handleSubmit(onSubmit)}
                >
                  {/* The text will be auto inserted space in the middle if text just includes 2 character => add &#127; html charter code to fix it */}
                  &#127;{t('dailyReports.template.save')}
                </Button>
              </Space>
            </div>
          </FormProvider>
        </div>
      </Wrapper>
      <Modal
        isModalVisible={visibleErrorSize}
        setIsModalVisible={setVisibleErrorSize}
        isCancel={false}
        description={t('talk_board.upload_exceed_limit')}
        okText={t('common.yes')}
        borderRadiusButton={6}
      />
      <Modal
        isModalVisible={visibleCreateSuccess}
        setIsModalVisible={setVisibleCreateSuccess}
        isCancel={false}
        description={t('dailyReports.template.edit_success')}
        okText={t('common.yes')}
        onOk={goBack}
        borderRadiusButton={6}
      />
    </HomeLayout>
  )
}

export default EditTemplateScreen
