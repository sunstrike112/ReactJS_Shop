/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { Row, Col } from 'antd'
import { pickBy, identity, uniqBy } from 'lodash'

import { useTestResult, useMyCompany, useLoadCompanyAll, useRoles, useGroupAttribute } from 'Hooks'
import { handleSearchSelectTree } from 'Utils'
import {
  FormInput,
  FormTreeSelect,
  HeaderSearch,
  FormSelect
} from 'Components'

const FilterBlock = ({ setSortInfo, sortParams, setRowSelected }) => {
  const {
    pagination,
    listCourse,
    listUnitAll,
    isLoadingCourseList,
    loadTestResultAction,
    loadCourseListAction,
    loadUnitListAllAction,
    loadSaveFilterAction,
    resetTestResultAction
  } = useTestResult()

  const {
    loadAttributesAction,
    loadGroupsAction,
    groups: listGroup,
    attributes: listAttribute
  } = useGroupAttribute()
  const { companyAll } = useLoadCompanyAll()
  const { companyOptions, valueOfNissokenCompany, idOfNissokenCompany } = companyAll

  const { isSuperAdmin } = useRoles()
  const { t } = useTranslation(['courseResult'])
  const { limit: pageSize } = pagination
  const [courseSelected, setCourseSelected] = useState([])

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      listGroupIds: [],
      listAtrributeIds: [],
      listCourseIds: [],
      listUnitIds: [],
      signinId: ''
    }
  })

  const { handleSubmit, reset, watch, setValue } = form

  const [
    course,
    companyIdWatch
  ] = watch([
    'listCourseIds',
    'companyId'
  ])
  const { courseTypeAll } = useMyCompany(companyIdWatch?.label || '')

  useEffect(() => {
    if (courseTypeAll[1].label) {
      setValue('courseType', courseTypeAll[1])
    }
  }, [courseTypeAll])

  useEffect(() => {
    if (!isSuperAdmin) {
      loadCourseListAction({
        params: {
          courseType: 'COMPANY'
        }
      })
      loadAttributesAction({
        params: {}
      })
      loadGroupsAction({
        params: {}
      })
    } else {
      loadCourseListAction({
        params: {
          courseType: 'NISSOKEN',
          companyId: idOfNissokenCompany
        }
      })
      loadAttributesAction({
        params: {
          companyId: idOfNissokenCompany
        }
      })
      loadGroupsAction({
        params: {
          companyId: idOfNissokenCompany
        }
      })
    }
  }, [isSuperAdmin])

  const onSubmit = (formData) => {
    const { name, email, listGroupIds, listAtrributeIds, listCourseIds, listUnitIds, courseType, signinId } = formData
    const listUnitTest = listUnitAll.map((item) => item.unitId)
    const filter = pickBy({
      userName: name.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      listGroup: listGroupIds.map((v) => v.value),
      listAttribute: listAtrributeIds.map((v) => v.value),
      courseType: courseType.value,
      listCourse: listCourseIds.map((v) => v.value),
      listUnits: listUnitIds.map((v) => v.value).filter((v) => listUnitTest.includes(v)),

      sortBy: sortParams?.params?.sortBy,
      sortType: sortParams?.params?.sortType,
      signinId: signinId.trim()
    }, identity)
    const params = isSuperAdmin ? {
      ...filter,
      page: 1,
      limit: pageSize,
      companyId: companyIdWatch.value
    } : {
      ...filter,
      page: 1,
      limit: pageSize
    }
    loadTestResultAction({
      params
    })
    loadSaveFilterAction({ ...filter })
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
  }

  const handleCancel = () => {
    reset({
      companyId: valueOfNissokenCompany,
      name: '',
      email: '',
      listGroupIds: [],
      listAtrributeIds: [],
      courseType: courseTypeAll[1],
      listCourseIds: [],
      listUnitIds: [],
      sortBy: null,
      sortType: null,
      signinId: ''
    })
    resetTestResultAction()
    setSortInfo(null)
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
    loadCourseListAction({
      params: {
        courseType: isSuperAdmin ? 'NISSOKEN' : 'COMPANY',
        companyId: isSuperAdmin && idOfNissokenCompany
      }
    })

    if (!isSuperAdmin) {
      loadAttributesAction({
        params: {}
      })
      loadGroupsAction({
        params: {}
      })
    } else {
      loadAttributesAction({
        params: {
          companyId: idOfNissokenCompany
        }
      })
      loadGroupsAction({
        params: {
          companyId: idOfNissokenCompany
        }
      })
    }

    const params = isSuperAdmin ? {
      page: 1,
      limit: pageSize,
      companyId: idOfNissokenCompany,
      courseType: 'NISSOKEN'

    } : {
      page: 1,
      limit: pageSize,
      courseType: 'COMPANY'
    }
  }

  const handleEnterSearch = (event) => {
    if (event.code === 'Enter') {
      event.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  const handleOnChange = useCallback((courseType) => {
    loadCourseListAction({
      params: {
        courseType: courseType.value,
        companyId: isSuperAdmin && companyIdWatch?.value
      }
    })
    setValue('courseType', courseType)
    setValue('listCourseIds', [])
  }, [companyIdWatch])

  useEffect(() => {
    setCourseSelected(course)
  }, [course])

  useEffect(() => {
    if (isSuperAdmin) {
      setValue('companyId', valueOfNissokenCompany)
    }
  }, [isSuperAdmin, valueOfNissokenCompany])

  useEffect(() => {
    if (courseSelected.length !== 0) {
      loadUnitListAllAction({
        lstCourse: courseSelected.map((v) => v.value),
        unitType: 'TEST'
      })
    } else {
      setValue('listUnitIds', [])
    }
  }, [courseSelected])

  const handleSelectCompany = (company) => {
    setValue('companyId', company)
    setValue('listGroupIds', [])
    setValue('listAtrributeIds', [])
    setValue('listCourseIds', [])
    setValue('listUnitIds', [])
    loadAttributesAction({
      params: {
        companyId: company.value
      }
    })
    loadGroupsAction({
      params: {
        companyId: company.value
      }
    })
    loadCourseListAction({
      params: {
        courseType: company.value === idOfNissokenCompany ? 'NISSOKEN' : 'COMPANY',
        companyId: company?.value
      }
    })
  }

  return (
    <FormProvider {...form}>
      <HeaderSearch onSubmit={handleSubmit(onSubmit)} onCancel={handleCancel}>
        <div>
          <Row gutter={24} style={{ minWidth: 900 }}>
            {isSuperAdmin && (
              <Col span={12}>
                <FormSelect
                  label={t('company:company_name')}
                  name="companyId"
                  options={companyOptions}
                  isClearable={false}
                  onChange={handleSelectCompany}
                  wrapperProps={{
                    colon: false,
                    labelCol: { span: 10 },
                    wrapperCol: { span: 14 },
                    labelAlign: 'right'
                  }}
                />
              </Col>
            )}
            <Col span={12}>
              <FormInput
                name="name"
                label={t('name')}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
              />
            </Col>
            <Col span={12}>
              <FormInput
                name="email"
                label={t('email')}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
              />
            </Col>
            <Col span={12}>
              <FormTreeSelect
                t={t}
                multiple
                name="listGroupIds"
                valueKey="departmentId"
                labelKey="name"
                label={t('group')}
                options={listGroup}
                onKeyDown={handleEnterSearch}
                filterTreeNode={handleSearchSelectTree}
                dropdownClassName="dropdown-tree-select"
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
              />
            </Col>
            <Col span={12}>
              <FormTreeSelect
                t={t}
                multiple
                name="listAtrributeIds"
                valueKey="attributeId"
                labelKey="attributeName"
                label={t('attribute')}
                options={listAttribute}
                onKeyDown={handleEnterSearch}
                filterTreeNode={handleSearchSelectTree}
                dropdownClassName="dropdown-tree-select"
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
              />
            </Col>
            <Col span={12}>
              <FormSelect
                t={t}
                name="courseType"
                label={t('course:course_type')}
                isClearable={false}
                isSearchable={false}
                options={courseTypeAll}
                onChange={handleOnChange}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
              />
            </Col>
            <Col span={12}>
              <FormTreeSelect
                t={t}
                multiple
                name="listCourseIds"
                valueKey="courseId"
                labelKey="courseName"
                label={t('course')}
                options={listCourse}
                loading={isLoadingCourseList}
                disabled={isLoadingCourseList}
                onKeyDown={handleEnterSearch}
                filterTreeNode={handleSearchSelectTree}
                dropdownClassName="dropdown-tree-select"
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
              />
            </Col>
            <Col span={12}>
              <FormTreeSelect
                t={t}
                multiple
                name="listUnitIds"
                valueKey="unitId"
                labelKey="unitName"
                label={t('unit')}
                options={courseSelected.length > 0 ? uniqBy(listUnitAll, 'unitId') : []}
                onKeyDown={handleEnterSearch}
                filterTreeNode={handleSearchSelectTree}
                dropdownClassName="dropdown-tree-select"
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
              />
            </Col>
            <Col span={12}>
              <FormInput
                name="signinId"
                label={t('common:loginId')}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
              />
            </Col>
          </Row>
        </div>
      </HeaderSearch>
    </FormProvider>
  )
}

export default FilterBlock
