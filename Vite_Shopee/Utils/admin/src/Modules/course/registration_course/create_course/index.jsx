/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EditOutlined } from '@ant-design/icons'

import {
  FormRadio,
  FormTreeSelect,
  FormInput,
  FormUploadImage,
  FormEditor,
  Title,
  FormLabel,
  PopupButton,
  SettingAccessCourse
} from 'Components'
import { Col, Form } from 'antd'
import { PUBLISH_COURSE_OPTION } from 'Constants/course'
import { useCreateCourse } from 'Hooks/course'
import { useRoles, useAuth, useRegistrationCourses, useLoadCompanyAll, useSettingAccessCourse, useGetQuery, useHistories, useWebview } from 'Hooks'
import { getText, COMPANY_TYPES } from 'Utils'
import { Wrapper, Divider, Right, Row } from 'Themes/facit'
import { useSelector } from 'react-redux'
import { makeSelectCategoryPreview } from 'Modules/course/registration_categories/store/selectors'
import { isEmpty } from 'lodash'
import CreateCourseSchema from './schema'
import { RoutesName as RoutesNameSideBar } from '../../../../Components/sideBarWebview/constant'

const CreateCourseScreen = () => {
  const { t, i18n: { language } } = useTranslation(['course'])
  const { isWebviewMode } = useWebview()
  const history = useHistories()
  const form = useForm({
    resolver: yupResolver(CreateCourseSchema(t)),
    defaultValues: {
      coursePublicSetting: 'PUBLIC',
      accessCourse: COMPANY_TYPES.map(({ value }) => value)
    },
    mode: 'onChange'
  })
  const categoryPreview = useSelector(makeSelectCategoryPreview())
  const { handleSubmit, watch, setValue, clearErrors } = form
  const { accessCourse } = watch()
  const { categoriesOption, createCourseAction } = useCreateCourse()
  const { loadAllCategoriesAction } = useRegistrationCourses()
  const { workspaceid } = useGetQuery()
  const { isAdmin, isSuperAdmin, isCompany, isSubCompany, isCourseAdmin } = useRoles()
  const { companyAll } = useLoadCompanyAll()
  const { idOfNissokenCompany } = companyAll
  const { loadCompanyTypesAction } = useSettingAccessCourse()
  const { profile } = useAuth()
  const { isWorkSpace } = profile

  const [listCompany, setListCompany] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })

  const onSubmit = useCallback((formData) => {
    const { courseCategory, ...data } = formData
    delete data.file
    if (courseCategory) {
      data.courseCategoryId = courseCategory.value
      data.courseCategoryName = courseCategory.label
    }

    if (isWebviewMode && !isEmpty(categoryPreview)) {
      data.courseCategoryId = categoryPreview.courseCategoryId
      data.courseCategoryName = categoryPreview.courseCategoryName
    }
    data.descriptionText = getText(data.overview)
    if (isAdmin || isSuperAdmin) {
      data.companyIds = data.accessCourse.length ? listCompany.selectedRowKeys.map((id) => id) : []
      data.accessCourse = data.accessCourse.length === COMPANY_TYPES.length ? 'ALL' : data.accessCourse[0]
    } else {
      delete data.companyIds
      delete data.accessCourse
    }
    createCourseAction({ data, workspaceid, history })
  }, [listCompany])

  useEffect(() => {
    clearErrors()
  }, [language])

  useEffect(() => {
    loadAllCategoriesAction({ params: { companyId: !isCompany && idOfNissokenCompany } })
  }, [isCompany])

  useEffect(() => {
    if (!isSubCompany && !isCourseAdmin) {
      loadCompanyTypesAction({
        params: {
          page: 1,
          limit: 100,
          filter: {
            accessCourse: 'ALL'
          }
        }
      })
    }
  }, [])

  const renderFormMobile = () => (
    <FormProvider {...form} onSubmit={handleSubmit(onSubmit)}>
      <Form
        name="wrap"
        labelCol={{
          flex: '110px'
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1
        }}
        style={{ backgroundColor: 'white', marginTop: '1rem', marginBottom: '1rem', padding: '1rem', borderRadius: '1rem' }}
      >
        <Col wrapperCol={{ flex: 1, width: '100%' }} style={{ marginRight: '0px', width: '100%' }}>
          <FormLabel
            width={50}
            title={t('registration_course.create.course_name')}
            description="Required"
          />
          <Right style={{ width: '100%', padding: '0px 16px 0px 16px', marginBottom: '16px' }}>
            <FormInput name="courseName" />
          </Right>
        </Col>
        <Divider />
        <Col wrapperCol={{ flex: 1, width: '100%' }} style={{ marginRight: '0px', width: '100%' }}>
          <FormLabel title={t('registration_course.create.overview')} description="Optional" width={50} />
          <Right style={{ width: '100%', padding: '0px 16px 0px 16px' }}>
            <FormEditor t={t} name="overview" style={{ width: '100%' }} />
          </Right>
        </Col>
        <Divider />
        <Col wrapperCol={{ flex: 1, width: '100%' }} style={{ marginRight: '0px', width: '100%' }}>
          <FormLabel width={60} title={t('registration_course.create.course_image')} description="Optional" />
          <Right style={{ width: '100%', padding: '0px 16px 0px 16px' }}>
            <FormUploadImage t={t} name="imagePath" />
            <p>
              {t('common:require_image_size_and_type', {
                imgSize: '10MB',
                imgType: '(jpg, gif, png)'
              })}
              <br />
              {t('common:require_image_resolution', {
                imgWidth: '300px',
                imgHeight: '200px'
              })}
            </p>
          </Right>
        </Col>
        <Divider />
        <Col wrapperCol={{ flex: 1, width: '100%' }} style={{ marginRight: '0px', width: '100%' }}>
          <FormLabel title={t('registration_course.create.public_setting')} description="Required" width={50} />
          <Right style={{ width: '100%', padding: '0px 16px 0px 16px' }}>
            <FormRadio
              t={t}
              name="coursePublicSetting"
              options={PUBLISH_COURSE_OPTION}
            />
          </Right>
        </Col>
        <Divider />
        <Form.Item label=" " style={{ width: '100%', marginTop: '2rem' }}>
          <PopupButton
            icon={EditOutlined}
            titlePopup={t('registration_course.create.warning_submit_message')}
            textButton={t('registration_course.create.create_submit')}
            onConfirm={handleSubmit(onSubmit)}
            okText="common:register"
          />
        </Form.Item>
      </Form>
    </FormProvider>
  )

  useEffect(() => {
    if (accessCourse.length) {
      clearErrors('accessCourse')
    }
  }, [accessCourse])
  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('registration_course.create.title')}
        active={isWebviewMode}
        backRoute={isWebviewMode && RoutesNameSideBar.COURSE_MANAGEMENT}
        backRouteText=""
      />
      {!isWebviewMode ? (
        <div className="form-wrapper">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <FormLabel
                  title={t('registration_course.create.course_name')}
                  description="Required"
                />
                <Right>
                  <FormInput name="courseName" />
                </Right>
              </Row>
              <Divider />
              <Row>
                <FormLabel title={t('registration_course.create.course_category_name')} description="Optional" />
                <Right>
                  <FormTreeSelect
                    t={t}
                    name="courseCategory"
                    valueKey="courseCategoryId"
                    labelKey="courseCategoryName"
                    options={categoriesOption}
                  />
                </Right>
              </Row>
              <Divider />
              <Row>

                <FormLabel title={t('registration_course.create.overview')} description="Optional" />
                <Right>
                  <FormEditor t={t} name="overview" />
                </Right>
              </Row>
              <Divider />
              <Row>
                <FormLabel title={t('registration_course.create.course_image')} description="Optional" />
                <Right>
                  <FormUploadImage t={t} name="imagePath" />
                  <p>
                    {t('common:require_image_size_and_type', {
                      imgSize: '10MB',
                      imgType: '(jpg, gif, png)'
                    })}
                    <br />
                    {t('common:require_image_resolution', {
                      imgWidth: '300px',
                      imgHeight: '200px'
                    })}
                  </p>
                </Right>
              </Row>
              <Divider />
              <Row>
                <FormLabel title={t('registration_course.create.public_setting')} description="Required" />
                <Right>
                  <FormRadio
                    t={t}
                    name="coursePublicSetting"
                    options={PUBLISH_COURSE_OPTION}
                  />
                </Right>
              </Row>
              <Divider />
              <SettingAccessCourse
                t={t}
                isWorkSpace={isWorkSpace}
                setValue={setValue}
                accessCourse={accessCourse}
                setListCompany={setListCompany}
                listCompany={listCompany}
              />
              <div className="form-action-group">
                <PopupButton
                  icon={EditOutlined}
                  titlePopup={t('registration_course.create.warning_submit_message')}
                  textButton={t('registration_course.create.create_submit')}
                  onConfirm={handleSubmit(onSubmit)}
                  okText="common:register"
                />
              </div>
            </form>
          </FormProvider>
        </div>
      )
        : renderFormMobile()}

    </Wrapper>
  )
}

export default CreateCourseScreen
