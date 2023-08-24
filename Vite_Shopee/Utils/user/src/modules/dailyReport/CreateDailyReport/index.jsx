import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Checkbox, Col, Row, Select, Space, Spin } from 'antd'
import { uniq, findIndex } from 'lodash'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { checkOverSizeAPI } from '../../../apis'
import { BACK_ICON, COLLAPSE_GROUP_ICON, EXPAND_GROUP_ICON, ICON_ARROW_DOWN_GREEN } from '../../../assets'
import { Modal, TextNormal, TextPrimary } from '../../../components'
import {
  FormCheckboxTree, FormInput, FormRadio,
  FormTextArea, FormUploadFile, FormDatePicker, FormCheckbox
} from '../../../components/form'
import { ROUTES_NAME, STATUS } from '../../../constants'
import { useDailyReports, useHistories, useTalkBoard } from '../../../hooks'
import { removeFromArray, convertBooleanToNumber } from '../../../utils'
import { FULL_DATE } from '../../../utils/date'
import { getLocalLanguage } from '../../../utils/storage'
import HomeLayout from '../../layouts/home'
import Schema from './schema'
import { Container, Wrapper, WrapperParentGroup, WrapperChildrenGroup } from './styled'

const CreateDailyReportScreen = () => {
  const {
    listGroup,
    listAttribute,
    loadGroupAction,
    loadAttributeAction
  } = useTalkBoard()
  const {
    createDailyReportAction,
    loadTemplatesAction,
    loadTemplateDetailAction,
    templates
  } = useDailyReports()
  const history = useHistories()
  const { t } = useTranslation()

  const [visibleErrorSize, setVisibleErrorSize] = useState(false)
  const [visibleCreateSuccess, setVisibleCreateSuccess] = useState(false)
  const [expandGroupState, setExpandGroupState] = useState([])
  const [templateId, setTemplateId] = useState(null)

  const form = useForm({
    resolver: yupResolver(Schema()),
    defaultValues: {
      title: '',
      content: '',
      lstAttributeId: [],
      isSelectConditionSpecification: false,
      lstDepartmentId: [],
      isPushNotification: false,
      files: [],
      reportDate: new Date()
    }
  })
  const { handleSubmit, watch, setValue, clearErrors, formState: { errors } } = form

  const [
    isSelectConditionSpecification,
    lstDepartmentId,
    lstAttributeId,
    reportDateWatch
  ] = watch([
    'isSelectConditionSpecification',
    'lstDepartmentId',
    'lstAttributeId',
    'reportDate'
  ])

  const listGroupOption = useMemo(() => listGroup.map((item) => ({ ...item, disabled: !item.joined, isExpand: false })), [listGroup])

  const handleSubmitWithType = (isDraft = false) => {
    const onSubmit = async (formData) => {
      const { title, content, files, reportDate, isPushNotification } = formData
      let isOverSize = false
      const data = {
        reportDate: moment(reportDate).valueOf(),
        title,
        templateId,
        attributeIds: isSelectConditionSpecification ? lstAttributeId : [],
        departmentIds: isSelectConditionSpecification ? lstDepartmentId : [],
        content,
        isPushNotification: convertBooleanToNumber(isPushNotification),
        langCode: getLocalLanguage(),
        isDraft: convertBooleanToNumber(isDraft),
        fileUrls: files.map((file) => ({ fileName: file.name, fileSize: file.size, fileType: file.type, link: file.urlS3 }))
      }

      if (files.length > 0) {
        const totalSize = files.reduce((total, file) => total + file.size, 0)
        const response = await checkOverSizeAPI({ totalSize })
        isOverSize = response.data
      }

      if (isOverSize) {
        setVisibleErrorSize(true)
      } else {
        createDailyReportAction({
          data,
          callback: {
            done: () => setVisibleCreateSuccess(true)
          }
        })
      }
    }

    handleSubmit(onSubmit)()
  }

  useEffect(() => {
    loadGroupAction()
    loadAttributeAction()
    loadTemplatesAction({ params: { page: 1, limit: 1000000000 }, isKeepDefaultPaging: true }) // get All (1000000000 is maximum in DB)
  }, [])

  const allKeysAttribute = listAttribute.map((item) => item.key)

  const onChangeAttributeTree = () => {
    if (lstAttributeId.length === allKeysAttribute.length) {
      setValue('lstAttributeId', [])
    } else {
      setValue('lstAttributeId', allKeysAttribute)
    }
  }

  useEffect(() => {
    if ((lstAttributeId.length || lstDepartmentId.length) && isSelectConditionSpecification && errors.lstAttributeId) {
      clearErrors('lstAttributeId')
    }
  }, [lstAttributeId, lstDepartmentId, isSelectConditionSpecification, errors.lstAttributeId])

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

  const handleChangeTemplate = (value) => {
    loadTemplateDetailAction({
      templateId: value,
      callback: {
        setContentValue: (valueContent) => {
          setValue('content', valueContent)
          if (errors.content) {
            clearErrors('content')
          }
        }
      }
    })
    setTemplateId(value)
  }

  useEffect(() => {
    if (templates.data.length) {
      loadTemplateDetailAction({
        templateId: templates.data[0].id,
        callback: { setContentValue: (valueContent) => setValue('content', valueContent) }
      })
      setTemplateId(templates.data[0].id)
    }
  }, [templates.data.length])

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

  const goBack = () => history.push(ROUTES_NAME.DAILY_REPORTS)

  const onChangeSharingRange = (event) => {
    const { value } = event.target
    setValue('isSelectConditionSpecification', value)

    if (!value) {
      if (lstAttributeId.length) {
        setValue('lstAttributeId', [])
      }
      if (lstDepartmentId.length) {
        setValue('lstDepartmentId', [])
      }
    }

    if (errors.lstAttributeId) {
      clearErrors('lstAttributeId')
    }
  }

  return (
    <HomeLayout>
      <Container>
        <Wrapper>
          <button
            className="btn-back"
            onClick={goBack}
          >
            <BACK_ICON />
          </button>
          <div className="talk-board-form">
            <div className="title">{t('dailyReports.create.title')}</div>
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
                            defaultValue={templates.data[0]?.title}
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
                    name="isSelectConditionSpecification"
                    options={STATUS}
                    onChange={onChangeSharingRange}
                  />
                </Col>
                {isSelectConditionSpecification
                && (
                <>
                  <Col span={10}>{t('talk_board.group')}</Col>
                  <Col span={14} className="checkbox-group-tree">
                    {listGroupOption.map((group) => (
                      <>
                        <WrapperParentGroup>
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
                {isSelectConditionSpecification
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
          description={t('dailyReports.create.createSuccessFull')}
          okText={t('common.yes')}
          onOk={goBack}
          borderRadiusButton={6}
        />
      </Container>
    </HomeLayout>
  )
}

export default CreateDailyReportScreen
