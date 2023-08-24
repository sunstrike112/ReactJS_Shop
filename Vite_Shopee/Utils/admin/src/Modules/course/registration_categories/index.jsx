import { yupResolver } from '@hookform/resolvers/yup'
import { EditOutlined } from '@ant-design/icons'
import { Table, Title } from 'Components'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useInjectReducer, useInjectSaga } from 'Stores'
import { Wrapper } from 'Themes/facit'
import { useAuth, useGetQuery, useLoadCompanyAll, useRoles, useHistories, useRegistrationCourses, useWebview } from 'Hooks'
import { USER_ROLE } from 'Constants/auth'
import { removeLocalStorage, STORAGE } from 'Utils'
import { RoutesName } from 'Components/sideBarWebview/constant'
import { COLUMNS } from 'Constants'
import tableColumns from './column'

import ConfirmDeleteModal from './components/ConfirmDeleteModal'
import ConfirmUpdateModal from './components/ConfirmUpdateModal'
import CreateCategoryModal from './components/CreateCategoryModal'
import FilterBlock from './components/FilterBlock'

import RegistrationCategoriesSchema from './schema'
import {
  createCourseCategory, deleteCourseCategories, editCourseCategory, loadAllCategories, loadCategories, loadCourseCategoryDetail, saveCategoryPreviewAction
} from './store/actions'
import reducer from './store/reducer'
import saga from './store/saga'
import {
  makeSelectAllCourseCategories,
  makeSelectCourseCategories,
  makeSelectCourseCreateSuccess,
  makeSelectPagination,
  makeSelectRegistrationCourseCategories,
  makeSelectFilter,
  makeSelectCategoryPreview
} from './store/selectors'

const RegistrationCategoriesScreen = () => {
  const { infoCourse } = useRegistrationCourses()
  const { t } = useTranslation(['course_category'])
  useInjectSaga({ key: 'registrationCourseCategories', saga })
  useInjectReducer({ key: 'registrationCourseCategories', reducer })

  const { metaData } = useAuth()
  const history = useHistories()
  const { isWebviewMode, isPreviewingResultOfWebview } = useWebview()
  const { roles } = metaData
  const { isSuperAdmin } = useRoles()
  const { companyAll } = useLoadCompanyAll()
  const { queryWorkspaceID } = useGetQuery()

  const { idOfNissokenCompany } = companyAll

  const form = useForm({
    resolver: yupResolver(RegistrationCategoriesSchema(t))
  })
  const { register, handleSubmit, setValue, formState: { errors }, reset, setError, clearErrors } = form

  const dispatch = useDispatch()
  const courseCategories = useSelector(makeSelectCourseCategories())
  const allCourseCategoriesRedux = useSelector(makeSelectAllCourseCategories())
  const { data: allCourseCategories } = allCourseCategoriesRedux
  const pagination = useSelector(makeSelectPagination())
  const filter = useSelector(makeSelectFilter())
  const isCreateOrEditSuccess = useSelector(makeSelectCourseCreateSuccess())
  const { isDeleteSuccess, isLoading } = useSelector(makeSelectRegistrationCourseCategories())
  const categoryPreview = useSelector(makeSelectCategoryPreview())
  const { page: currentPage, limit: pageSize, total } = pagination
  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  const options = useMemo(() => ([{
    courseCategoryId: null,
    label: t('select_parent_cateogry'),
    value: 'default'
  }, ...allCourseCategories]), [allCourseCategories, t])

  const [defaultDropdown, setDefaultDropdown] = useState('')
  const [itemEditing, setItemEditing] = useState(null)

  const [visible, setVisible] = useState(false)
  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false)
  const [visibleUpdateModal, setVisibleUpdateModal] = useState(false)
  const [isCreateSuccess, setIsCreateSuccess] = useState(false)

  const [isEditing, setIsEditing] = useState(false)

  const onCancel = () => {
    setVisible(false)
    setDefaultDropdown(options[0])
    setIsEditing(false)
    setItemEditing()
    reset({ courseParentId: null, courseCategoryName: '', imagePath: '' })
  }

  const openModal = () => setVisible(true)

  const OpenModalDelete = () => setVisibleConfirmDelete(true)

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setRowSelected({
      selectedRowKeys,
      selectedRows
    })
  }
  useEffect(() => {
    register('courseParentId')
    setValue('courseParentId', null)
    dispatch(loadAllCategories({ params: { companyId: isSuperAdmin && idOfNissokenCompany } }))
  }, [isSuperAdmin])

  const handleTableChange = (tablePaging) => {
    dispatch(loadCategories({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize,
        filter
      }
    }))
  }

  const onChangeDropdown = (item) => {
    setValue('courseParentId', item)
    if (item?.courseCategoryId !== itemEditing?.courseCategoryId) {
      clearErrors(['courseParentId'])
    } else if (itemEditing?.courseCategoryId && item.courseCategoryId === itemEditing.courseCategoryId) {
      setError('courseParentId', {
        type: 'manual',
        message: t('validate.same_category_selected')
      })
    }
  }

  const categoryChosenCourse = useMemo(() => courseCategories.filter((category) => category.courseCategoryId === infoCourse.courseCategoryId), [infoCourse, courseCategories])
  const isEmptyCategoryWebview = useMemo(() => !Object.keys(categoryPreview).length && !categoryChosenCourse.length, [categoryPreview, categoryChosenCourse])

  const onEdit = useCallback((item) => {
    dispatch(loadCourseCategoryDetail(item.courseCategoryId))
    setItemEditing(item)
    setValue('imagePath', item.imageCourseCategory)
    setValue('courseCategoryName', item.courseCategoryName)
    setIsEditing(true)
    openModal()
  }, [])

  const handleSaveCategoryData = useCallback((rowData) => {
    if (isWebviewMode) {
      const isAllowSelect = isPreviewingResultOfWebview === null
			|| (isPreviewingResultOfWebview === false && isEmptyCategoryWebview)
      if (isAllowSelect) {
        if (isPreviewingResultOfWebview === false) {
          removeLocalStorage(STORAGE.WEBVIEW_PREVIEW)
        }
        dispatch(saveCategoryPreviewAction(rowData))
        history.push(RoutesName.HOME)
      }
    }
  }, [isWebviewMode, isPreviewingResultOfWebview, isEmptyCategoryWebview])

  const columns = useMemo(
    () => {
      const result = tableColumns({ t, pagination, onEdit, isSuperAdmin, isWebviewMode, handleSaveCategoryData })
        .filter((col) => col.rules?.includes(roles?.[0]))
      if (isWebviewMode) {
        if (isPreviewingResultOfWebview === false && !isEmptyCategoryWebview) {
          return result.filter((column) => column.key !== COLUMNS.ORDER)
        }
        return result.filter((column) => column.key !== COLUMNS.ORDER && column.key !== COLUMNS.ACTIONS)
      }
      return result
    },
    [t, pagination, roles, isSuperAdmin, isWebviewMode, handleSaveCategoryData, isPreviewingResultOfWebview]
  )

  const onSubmitUpdate = (data) => {
    const { courseParentId } = data
    data.courseParentId = courseParentId?.courseCategoryId || 0
    if (!isEditing) {
      dispatch(createCourseCategory({
        data,
        params: {
          page: currentPage,
          limit: pageSize,
          filter: {
            companyId: isSuperAdmin && idOfNissokenCompany
          }
        },
        callBack: {
          done: () => {
            setIsCreateSuccess(true)
          }
        }
      }))
    } else {
      dispatch(editCourseCategory({
        data,
        id: itemEditing.courseCategoryId,
        params: {
          page: currentPage,
          limit: pageSize,
          filter: {
            ...filter,
            companyId: isSuperAdmin && filter.companyId
          }
        }
      }))
    }
    setVisibleUpdateModal(false)
  }

  useEffect(() => {
    if (itemEditing) {
      const found = options.find((ccObj) => ccObj?.childList?.some((child) => child.courseCategoryId
        === itemEditing.courseCategoryId))
      if (found) {
        setDefaultDropdown(found)
        setValue('courseParentId', found)
      } else {
        setDefaultDropdown(options[0])
        setValue('courseParentId', null)
      }
    }
  }, [itemEditing])

  // category preview updater
  useEffect(() => {
    if (courseCategories.length && Object.keys(categoryPreview).length) {
      const categoryPreviewInList = courseCategories.find((c) => c.courseCategoryId === categoryPreview.courseCategoryId)
      const isOutdate = categoryPreviewInList.courseCategoryName !== categoryPreview.courseCategoryName
				|| categoryPreviewInList.courseCategoryNameWithParent !== categoryPreview.courseCategoryNameWithParent
      if (isOutdate) {
        dispatch(saveCategoryPreviewAction(categoryPreviewInList))
      }
    }
  }, [courseCategories])

  const handleConfirmDelete = () => {
    dispatch(deleteCourseCategories({
      ids: rowSelected.selectedRowKeys,
      params: {
        page: (currentPage > 1 && rowSelected.selectedRowKeys.length === courseCategories.length)
          ? currentPage - 1 : currentPage,
        limit: pageSize,
        filter: {
          ...filter,
          companyId: isSuperAdmin && filter.companyId
        }
      }
    }))
    setVisibleConfirmDelete(false)
  }

  const handleFilterSelectedArray = () => {
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
  }

  const resetEditForm = () => {
    const found = options.find((ccObj) => ccObj?.childList?.some((child) => child.courseCategoryId === itemEditing?.courseCategoryId))
    if (found) {
      setDefaultDropdown(found)
      setValue('courseParentId', found)
    } else {
      setDefaultDropdown(options[0])
      setValue('courseParentId', null)
    }
    setValue('imagePath', itemEditing?.imageCourseCategory || '')
    setValue('courseCategoryName', itemEditing?.courseCategoryName || '')
    clearErrors()
  }

  const isShowCategoryFilter = useMemo(() => ((isWebviewMode && !isPreviewingResultOfWebview) || !isWebviewMode),
    [isPreviewingResultOfWebview, isWebviewMode])

  const dataCourseCategory = useMemo(() => {
    if (isPreviewingResultOfWebview === true) {
      if (categoryChosenCourse.length) return categoryChosenCourse
      return [categoryPreview]
    }
    if (isPreviewingResultOfWebview === false) {
      if (categoryChosenCourse.length) return categoryChosenCourse
      if (Object.keys(categoryPreview).length) return [categoryPreview]
    }
    return courseCategories
  }, [isPreviewingResultOfWebview, categoryChosenCourse, categoryPreview, courseCategories])

  useEffect(() => {
    if (isCreateOrEditSuccess) {
      onCancel()
    }
  }, [isCreateOrEditSuccess])

  useEffect(() => {
    if (isDeleteSuccess) {
      handleFilterSelectedArray()
    }
  }, [isDeleteSuccess])

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('title')}
        backRoute={isWebviewMode && `${RoutesName.HOME}${queryWorkspaceID.ONLY}`}
        backRouteText=""
        active={isWebviewMode}
      />
      {isShowCategoryFilter && (
        <FilterBlock
          onSearch={loadCategories}
          page={currentPage}
          limit={pageSize}
          setRowSelected={setRowSelected}
          isCreateSuccess={isCreateSuccess}
          setIsCreateSuccess={setIsCreateSuccess}
          companyAll={companyAll}
          isWebviewMode={isWebviewMode}
        />
      )}
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        rowSelection={!isWebviewMode && {
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true,
          getCheckboxProps: (record) => ({
            disabled: isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(record.created)
          })
        }}
        rowKey={(record) => record.courseCategoryId}
        dataSource={dataCourseCategory}
        isPreviewingResultOfWebview={isPreviewingResultOfWebview}
        columns={columns}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        selected={rowSelected.selectedRowKeys.length}
        createText={t('button_register')}
        onChange={handleTableChange}
        onDelete={OpenModalDelete}
        onCreate={openModal}
        disabledCreate={allCourseCategories.length === 0}
        loading={isLoading}
        width="100%"
      />
      <ConfirmDeleteModal
        t={t}
        isVisible={visibleConfirmDelete}
        onSubmit={handleConfirmDelete}
        setIsVisble={setVisibleConfirmDelete}
        numberOfSelectedRecord={rowSelected.selectedRows.length}
        disabledSubmit={false}
      />
      <CreateCategoryModal
        form={form}
        t={t}
        defaultDropdown={defaultDropdown}
        onChangeDropdown={onChangeDropdown}
        options={options}
        onCancel={onCancel}
        visible={visible}
        onSubmit={handleSubmit(onSubmitUpdate)}
        errors={errors}
        isEditing={isEditing}
        resetEditForm={resetEditForm}
        clearErrors={clearErrors}
        isWebviewMode={isWebviewMode}
      />
      <ConfirmUpdateModal
        isVisible={visibleUpdateModal}
        onSubmit={handleSubmit(onSubmitUpdate)}
        setIsVisble={setVisibleUpdateModal}
        title={isEditing ? t('confirm_update') : t('confirm_create')}
      />
    </Wrapper>
  )
}

export default RegistrationCategoriesScreen
