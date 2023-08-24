import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Checkbox, Col, Row, Select, Space, Spin } from 'antd'
import { uniq, findIndex } from 'lodash'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { checkOverSizeAPI } from '../../../apis'
import { BACK_ICON, COLLAPSE_GROUP_ICON, EXPAND_GROUP_ICON, ICON_ARROW_DOWN_GREEN } from '../../../assets'
import { Modal, TextNormal, TextPrimary } from '../../../components'
import {
  FormCheckboxTree, FormInput, FormRadio,
  FormTextArea, FormUploadFile, FormDatePicker, FormCheckbox
} from '../../../components/form'
import { STATUS } from '../../../constants'
import { useDailyReports, useHistories, useTalkBoard } from '../../../hooks'
import { removeFromArray, convertBooleanToNumber, flatKeys } from '../../../utils'
import { FULL_DATE } from '../../../utils/date'
import { getLocalLanguage } from '../../../utils/storage'
import HomeLayout from '../../layouts/home'
import Schema from './schema'
import { Container, Wrapper, WrapperParentGroup, WrapperChildrenGroup } from './styled'

const EditDailyReportScreen = () => {
  // Use hooks
  const history = useHistories()
  const { t } = useTranslation()
  const { dailyReportId } = useParams()
  const {
    listGroup,
    listAttribute,
    loadGroupAction,
    loadAttributeAction
  } = useTalkBoard()
  const {
    editDailyReportAction,
    loadTemplatesAction,
    loadTemplateDetailAction,
    loadDailyReportAction,
    dailyReport,
    templates
  } = useDailyReports()
  const form = useForm({
    resolver: yupResolver(Schema()),
    defaultValues: {
      lstAttributeId: [],
      lstDepartmentId: []
    }
  })
  const { handleSubmit, watch, setValue, clearErrors, setError, formState: { errors } } = form
  // End use hooks

  // Use states
  const [visibleErrorSize, setVisibleErrorSize] = useState(false)
  const [visibleCreateSuccess, setVisibleCreateSuccess] = useState(false)
  const [expandGroupState, setExpandGroupState] = useState([])
  const [templateSelected, setTemplateSelected] = useState({})
  // Use states

  const [
    isChooseAll,
    lstDepartmentId,
    lstAttributeId,
    isCheckGroupAndAttribute,
    reportDateWatch,
    isPushNotificationWatch
  ] = watch([
    'isChooseAll',
    'lstDepartmentId',
    'lstAttributeId',
    'isCheckGroupAndAttribute',
    'reportDate',
    'isPushNotification'
  ])

  const listGroupOption = useMemo(() => listGroup.map((item) => ({ ...item, disabled: !item.joined, isExpand: false })), [listGroup])

  useEffect(() => {
    if ((lstDepartmentId.length === 0) && (lstAttributeId.length === 0) && isCheckGroupAndAttribute) {
      setError('lstAttributeId', { type: 'required', message: 'talk_board.error_message.group_or_attribute_required' })
    }
    if ((!!lstDepartmentId && lstDepartmentId.length > 0) || (!!lstAttributeId && lstAttributeId.length > 0)) {
      clearErrors('lstAttributeId')
    }
  }, [lstDepartmentId, lstAttributeId])

  const onError = (error) => {
    if (error) setValue('isCheckGroupAndAttribute', true)
  }
  const handleSubmitWithType = (isDraft = false) => {
    const onSubmit = async (formData) => {
      const { title, content, files, reportDate, isPushNotification } = formData
      let isOverSize = false
      const data = {
        reportDate: moment(reportDate).valueOf(),
        title,
        templateId: templateSelected.id,
        attributeIds: isChooseAll ? lstAttributeId : [],
        departmentIds: isChooseAll ? lstDepartmentId : [],
        content,
        isPushNotification: convertBooleanToNumber(isPushNotification),
        langCode: getLocalLanguage(),
        isDraft: convertBooleanToNumber(isDraft),
        fileUrls: files.map((file) => ({ fileName: file.name, fileSize: file.size, fileType: file.type, link: file.urlS3 }))
      }

      const filesInit = dailyReport.data.reportFiles
      const filesUpload = files.filter((file) => filesInit.findIndex((fileInit) => fileInit.id === file.id) === -1)

      if (filesUpload.length > 0) {
        const totalSize = filesUpload.reduce((total, file) => total + file.size, 0)
        const response = await checkOverSizeAPI({ totalSize })
        isOverSize = response.data
      }

      if (isOverSize) {
        setVisibleErrorSize(true)
      } else {
        editDailyReportAction({
          dailyReportId,
          data,
          callback: {
            done: () => setVisibleCreateSuccess(true)
          }
        })
      }
    }

    handleSubmit(onSubmit, onError)()
  }

  useEffect(() => {
    loadGroupAction()
    loadAttributeAction()
    loadTemplatesAction({ params: { page: 1, limit: 1000000000 }, isKeepDefaultPaging: true }) // get All (1000000000 is maximum in DB)
  }, [])

  const setInitData = () => {
    setValue('files', dailyReport.data.reportFiles.map((item) => ({
      ...item,
      id: item.id,
      name: item.fileName,
      size: +item.fileSize,
      type: item.fileType,
      uid: item.id,
      urlS3: item.link
    })))
    setValue('title', dailyReport.data.title)
    setValue('reportDate', moment(dailyReport.data.reportDate))
    setValue('content', dailyReport.data.content)
    setValue('isChooseAll', !(dailyReport.data.listAttributes.length === 0 && dailyReport.data.lstDepartments.length === 0))
    setValue('lstAttributeId', flatKeys(dailyReport.data.listAttributes, 'key'))
    setValue('lstDepartmentId', flatKeys(dailyReport.data.lstDepartments, 'departmentId'))
    setValue('isPushNotification', Boolean(dailyReport.data.isPushNotification))
  }

  useEffect(() => {
    if (Object.keys(dailyReport.data).length) {
      setInitData()
    }
  }, [dailyReport.data])

  useEffect(() => {
    if (templates.data.length && dailyReport.data.templateId) {
      setTemplateSelected(() => {
        const result = templates.data.find((template) => template.id === dailyReport.data.templateId)
        return result || {}
      })
    }
  }, [templates.data, dailyReport.data.templateId])

  useEffect(() => {
    if (dailyReportId) {
      loadDailyReportAction({ dailyReportId })
    }
  }, [dailyReportId])

  useEffect(() => {
    if (!isChooseAll) {
      clearErrors(['lstAttributeId'])
    }
  }, [isChooseAll])

  const allKeysAttribute = listAttribute.map((item) => item.key)
  const onChangeAttributeTree = () => {
    if (lstAttributeId.length === allKeysAttribute.length) {
      setValue('lstAttributeId', [])
      if ((lstDepartmentId.length === 0) && (lstAttributeId.length === 0) && isCheckGroupAndAttribute) {
        setError('lstAttributeId', { type: 'required', message: 'talk_board.error_message.group_or_attribute_required' })
      }
      if (listAttribute.length === 0) {
        clearErrors('lstAttributeId')
      }
    } else {
      setValue('lstAttributeId', allKeysAttribute)
      clearErrors('lstAttributeId')
    }
  }

  const handleCheckboxParent = (event) => {
    const { value, checked } = event.target
    const childrenKeys = value.children.map((element) => element.key)
    if (checked) {
      setValue('lstDepartmentId', uniq((lstDepartmentId.concat(value.key)).concat(childrenKeys)))
    } else {
      setValue('lstDepartmentId', removeFromArray(lstDepartmentId.filter((item) => item !== value.key), childrenKeys))
    }
  }

  const handleCheckboxChildren = (event) => {
    const { value, checked } = event.target
    if (checked) {
      setValue('lstDepartmentId', uniq(lstDepartmentId.concat(value.key)))
    } else {
      setValue('lstDepartmentId', lstDepartmentId.filter((item) => item !== value.key))
    }
  }

  const handleChangeTemplate = (templateId) => {
    loadTemplateDetailAction({
      templateId,
      callback: {
        setContentValue: (valueContent) => {
          setValue('content', valueContent)
          if (errors.content) {
            clearErrors('content')
          }
        }
      } })
    setTemplateSelected(() => {
      const result = templates.data.find((template) => template.id === templateId)
      return result
    })
  }

  useEffect(() => {
    setExpandGroupState(listGroupOption
      .filter((item) => item.children.length !== 0)
      .map((group) => ({ key: group.key, isExpand: group.isExpand })))
  }, [listGroupOption])

  const handleExpandGroup = (key) => {
    const index = findIndex(expandGroupState, { key })
    setExpandGroupState(expandGroupState.map((state) => {
      if (state.key === key) return { key: expandGroupState[index].key, isExpand: !expandGroupState[index].isExpand }
      return state
    }))
  }

  const goBack = () => history.goBack()

  return (
    <HomeLayout>
      {dailyReport.isLoading
        ? <></>
        : (
          <Container>
            <Wrapper>
              <button
                className="btn-back"
                onClick={goBack}
              >
                <BACK_ICON />
              </button>
              <div className="talk-board-form">
                <div className="title">{t('dailyReports.edit.title')}</div>
                <hr />
                <FormProvider {...form}>
                  <FormDatePicker
                    t={t}
                    name="reportDate"
                    label={t('dailyReports.create.date')}
                    format={FULL_DATE}
                    value={moment(reportDateWatch, FULL_DATE)}
                    isRequired
                    allowClear={false}
                    wrapperProps={{
                      colon: false,
                      labelCol: { span: 10 },
                      wrapperCol: { span: 14 },
                      labelAlign: 'left'
                    }}
                  />
                  <FormInput
                    t={t}
                    name="title"
                    label={t('dailyReports.titleField')}
                    isRequired
                    maxLength={100}
                    wrapperProps={{
                      colon: false,
                      labelCol: { span: 10 },
                      wrapperCol: { span: 14 },
                      labelAlign: 'left'
                    }}
                  />
                  <div className="template">
                    {templates.isLoading
                      ? <div className="template__loading"><Spin /></div>
                      : (
                        <>
                          <Row>
                            <Col span={10}>
                              <TextPrimary fontSize="size_13" fontWeight="fw_600">{t('dailyReports.template.template')}</TextPrimary>
                            </Col>
                            <Col span={14}>
                              <Select
                                notFoundContent={(<TextNormal color="success" style={{ textAlign: 'center' }}>{t('common.no_data')}</TextNormal>)}
                                suffixIcon={<ICON_ARROW_DOWN_GREEN />}
                                options={templates.data.map((template) => ({ value: template.id, label: template.title }))}
                                value={templateSelected.id}
                                onSelect={handleChangeTemplate}
                              />
                            </Col>
                          </Row>
                          <div className="template__content">
                            <FormTextArea
                              t={t}
                              name="content"
                              maxLength={4000}
                              total={4000}
                              rows={15}
                            />
                          </div>
                        </>
                      )}
                  </div>
                  <Row className="uploadfile-tree">
                    <Col span={10}>{t('talk_board.attachment')}</Col>
                    <Col span={14}>
                      <FormUploadFile name="files" />
                    </Col>
                  </Row>
                  <Row className="group-tree">
                    <Col span={10}>
                      {t('talk_board.sharing_range')}
                      <span style={{ color: 'red' }}>
                    &nbsp;*
                      </span>
                    </Col>
                    <Col span={14}>
                      <FormRadio
                        t={t}
                        name="isChooseAll"
                        options={STATUS}
                      />
                    </Col>
                    {isChooseAll
                && (
                <>
                  <Col span={10}>{t('talk_board.group')}</Col>
                  <Col span={14} className="checkbox-group-tree">
                    {listGroupOption.map((group) => (
                      <>
                        <WrapperParentGroup key={group.key}>
                          {group.children.length !== 0
                          && (
                          <button onClick={() => handleExpandGroup(group.key)}>
                            {expandGroupState[findIndex(expandGroupState, { key: group.key })]?.isExpand
                              ? <COLLAPSE_GROUP_ICON /> : <EXPAND_GROUP_ICON />}
                          </button>
                          )}
                          <Checkbox
                            disabled={!group.joined}
                            value={{
                              key: group.key,
                              isParent: group.children.length !== 0,
                              children: group.children
                            }}
                            checked={lstDepartmentId.includes(group.key)}
                            onChange={handleCheckboxParent}
                          >
                            {group.title}
                          </Checkbox>
                        </WrapperParentGroup>

                        <WrapperChildrenGroup>
                          {expandGroupState.map((state) => state.key).includes(group.key)
                          && expandGroupState[findIndex(expandGroupState, { key: group.key })]?.isExpand
                          && group.children.map((childrenGroup) => (
                            <Checkbox
                              key={childrenGroup.key}
                              className="checkbox-child-group"
                              onChange={handleCheckboxChildren}
                              checked={lstDepartmentId.includes(childrenGroup.key)}
                              value={{
                                key: childrenGroup.key,
                                isParent: false
                              }}
                            >
                              {childrenGroup.title}
                            </Checkbox>
                          ))}
                        </WrapperChildrenGroup>
                      </>
                    ))}
                  </Col>
                </>
                )}
                  </Row>
                  <Row className="attribute-tree">
                    {isChooseAll
                  && (
                  <>
                    <Col span={10}>{t('talk_board.attribute')}</Col>
                    <Col span={14}>
                      <FormCheckboxTree
                        t={t}
                        name="lstAttributeId"
                        listOption={listAttribute}
                        listId={lstAttributeId}
                        onChangeTree={onChangeAttributeTree}
                        allKeysGroup={allKeysAttribute}
                        isHiddenSelectAll={listAttribute.length > 0}
                      />
                    </Col>
                  </>
                  )}
                  </Row>
                  <FormCheckbox
                    label={t('dailyReports.create.pushNotification')}
                    t={t}
                    name="isPushNotification"
                    checked={isPushNotificationWatch}
                    disabled={!dailyReport.data.isDraft}
                    wrapperProps={{
                      colon: false,
                      labelCol: { span: 10 },
                      wrapperCol: { span: 14 },
                      labelAlign: 'left'
                    }}
                  />
                  <div className="form-action-group">
                    <Space>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="btn-post"
                        onClick={() => handleSubmitWithType()}
                        disabled={Object.keys(errors).length}
                      >
                        {/* The text will be auto inserted space in the middle if text just includes 2 character => add &#127; html charter code to fix it */}
                        &#127;{t('common.save')}
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="btn-post draft"
                        onClick={() => handleSubmitWithType(true)}
                        disabled={Object.keys(errors).length}
                      >
                        {t('common.draft')}
                      </Button>
                      <Button
                        htmlType="button"
                        className="btn-cancel"
                        onClick={goBack}
                      >
                        {t('common.cancel')}
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
              description={t('dailyReports.edit.editSuccessFull')}
              okText={t('common.yes')}
              onOk={goBack}
              borderRadiusButton={6}
            />
          </Container>
        )}

    </HomeLayout>
  )
}

export default EditDailyReportScreen
