/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'
import { Space, Button, Col, Form } from 'antd'

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
import { PUBLISH_COURSE_OPTION } from 'Constants/course'
import { useUpdateCourse } from 'Hooks/course'
import { USER_ROLE } from 'Constants/auth'
import { useRoles, useAuth, useRegistrationCourses, useQuery, useSettingAccessCourse, useGetQuery, useHistories, useWebview } from 'Hooks'
import { COMPANY_TYPES, getFileFromS3, getText } from 'Utils'
import { Wrapper, Divider, Right, Row } from 'Themes/facit'
import EditCourseShema from './schema'
import { RoutesName as RoutesNameSideBar } from '../../../../Components/sideBarWebview/constant'

const EditCourseModal = () => {
  const { id: courseId } = useParams()
  const history = useHistories()
  const { t, i18n: { language } } = useTranslation(['course'])
  const { isWebviewMode, isPreviewingResultOfWebview } = useWebview()
  const {
    course,
    categoriesOption,
    loadCourseAction,
    editCourseAction
  } = useUpdateCourse()
  const { profile } = useAuth()
  const { isWorkSpace } = profile
  const { workspaceid } = useGetQuery()
  const { loadAllCategoriesAction, infoCourse, setInfoCourseAction } = useRegistrationCourses()
  const { isAdmin, isSuperAdmin, isSubCompany, isCourseAdmin } = useRoles()
  const query = useQuery()
  const createBy = query.get('createBy')
  const companyId = query.get('companyId')
  const { loadCompanyTypesAction, loadCompanySelectedAction } = useSettingAccessCourse()

  const [listCompany, setListCompany] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })

  const form = useForm({
    resolver: yupResolver(EditCourseShema(t)),
    defaultValues: {
      coursePublicSetting: 'PUBLIC',
      accessCourse: []
    }
  })
  const { handleSubmit, setValue, watch, clearErrors } = form
  const { accessCourse } = watch()

  const onSubmit = useCallback((formData) => {
    const { courseCategory, ...data } = formData
    if (courseCategory) {
      data.courseCategoryId = courseCategory.value
      data.courseCategoryName = courseCategory.label
    }
    data.descriptionText = getText(data.overview)
    if (isAdmin || isSuperAdmin) {
      data.companyIds = data.accessCourse.length ? listCompany.selectedRowKeys.map((id) => id) : []
      data.accessCourse = data.accessCourse.length === COMPANY_TYPES.length ? 'ALL' : data.accessCourse[0]
    } else {
      delete data.companyIds
      delete data.accessCourse
    }
    editCourseAction({
      courseId,
      data,
      workspaceid,
      history,
      isWebviewMode,
      callback: {
        saveNewInfoCourse: () => setInfoCourseAction(({
          ...infoCourse,
          courseName: data.courseName,
          publicSetting: data.coursePublicSetting
        }))
      }
    })
  }, [listCompany])

  const handleResetData = () => {
    setValue('courseId', course.courseId)
    setValue('courseCategory', course.courseCategoryId && course.courseCategoryName ? {
      value: course.courseCategoryId,
      label: course.courseCategoryName
    } : null)
    setValue('courseName', course.courseName)
    setValue('coursePublicSetting', course.coursePublicSetting)
    setValue('imagePath', getFileFromS3(course.imagePath))
    setValue('overview', course.overview || '')
    setValue('accessCourse', course.accessCourse === 'ALL' ? COMPANY_TYPES.map(({ value }) => value) : [course.accessCourse])
    if (course.companyIds?.length && !isAdmin) {
      loadCompanySelectedAction({
        params: {
          page: 1,
          limit: 100
        },
        data: {
          ids: course.companyIds.map((id) => id)
        }
      })
      setListCompany({ ...listCompany, selectedRowKeys: course.companyIds.map((id) => id) })
    }
  }

  useEffect(() => {
    if (course) {
      handleResetData()
    }
  }, [course])

  useEffect(() => {
    if (isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(createBy)) {
      setValue('courseCategory', course.courseCategoryName ? course.courseCategoryName : null)
    }
  }, [course, isSuperAdmin, createBy])

  useEffect(() => {
    clearErrors()
  }, [language])

  useEffect(() => {
    if (accessCourse.length) {
      clearErrors('accessCourse')
    }
  }, [accessCourse])

  useEffect(() => {
    loadCourseAction({ courseId })
    loadAllCategoriesAction({ params: { companyId: isSuperAdmin && companyId } })
  }, [courseId, isSuperAdmin, companyId])
  useEffect(() => {
    if (!isSubCompany && !isCourseAdmin) {
      loadCompanyTypesAction({
        params: {
          page: 1,
          limit: 100,
          filter: {
            accessCourse: course.accessCourse
          }
        }
      })
    }
  }, [course])

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
            <FormInput name="courseName" disabled />
          </Right>
        </Col>
        <Divider />
        <Col wrapperCol={{ flex: 1, width: '100%' }} style={{ marginRight: '0px', width: '100%' }}>
          <FormLabel title={t('registration_course.create.overview')} description="Optional" width={50} />
          <Right style={{ width: '100%', padding: '0px 16px 0px 16px' }}>
            <FormEditor t={t} name="overview" style={{ width: '100%' }} disabled={isPreviewingResultOfWebview} />
          </Right>
        </Col>
        <Divider />
        <Col wrapperCol={{ flex: 1, width: '100%' }} style={{ marginRight: '0px', width: '100%' }}>
          <FormLabel width={60} title={t('registration_course.create.course_image')} description="Optional" />
          <Right style={{ width: '100%', padding: '0px 16px 0px 16px' }}>
            <FormUploadImage t={t} name="imagePath" disabled={isPreviewingResultOfWebview} />
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
              disabled={isPreviewingResultOfWebview}
            />
          </Right>
        </Col>
        <Divider />

        {!isPreviewingResultOfWebview && (
        <div className="form-action-group" style={{ marginTop: '1rem' }}>
          <Space>
            <Button htmlType="button" onClick={handleResetData}>{t('common:restore')}</Button>
            <PopupButton
              icon={EditOutlined}
              titlePopup={t('registration_course.edit.warning_submit_message')}
              textButton={t('registration_course.edit.edit_submit')}
              onConfirm={handleSubmit(onSubmit)}
              disabled={isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(createBy)}
            />
          </Space>
        </div>
        )}
      </Form>
    </FormProvider>
  )

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('registration_course.edit.title')}
        active={isWebviewMode}
        backRouteText=""
        backRoute={isWebviewMode && `${RoutesNameSideBar.HOME}`}
      />
      {isWebviewMode
        ? renderFormMobile()
        : (
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
                    <FormEditor name="overview" />
                  </Right>
                </Row>
                <Divider />
                <Row>
                  <FormLabel title={t('registration_course.create.course_image')} description="Optional" />
                  <Right>
                    <FormUploadImage
                      t={t}
                      name="imagePath"
                    />
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
                  <Space>
                    <Button htmlType="button" onClick={handleResetData}>{t('common:restore')}</Button>
                    <PopupButton
                      icon={EditOutlined}
                      titlePopup={t('registration_course.edit.warning_submit_message')}
                      textButton={t('registration_course.edit.edit_submit')}
                      onConfirm={handleSubmit(onSubmit)}
                      disabled={isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(createBy)}
                    />
                  </Space>
                </div>
              </form>
            </FormProvider>
          </div>
        )}
    </Wrapper>
  )
}

export default EditCourseModal
