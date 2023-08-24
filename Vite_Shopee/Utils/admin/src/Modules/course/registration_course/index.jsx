import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Table, Title } from 'Components'
import { COURSE_ICON } from 'Assets'
import { useAuth, useRegistrationCourses, useLoadCompanyAll, useRoles, useHistories, useGetQuery, useWebview } from 'Hooks'
import { Wrapper } from 'Themes/facit'
import { SORT_BY_TYPE } from 'Constants/sorter'
import { USER_ROLE } from 'Constants/auth'
import tableColumns from './column'
import ConfirmDeleteModal from './components/ConfirmDeleteModal'
import SortModal from './components/SortModal'
import FilterBlock from './components/FilterBlock'
import { RoutesName } from '../routes'
import { RoutesName as RoutesNameSideBar } from '../../../Components/sideBarWebview/constant'

const RegistrationCourseScreen = () => {
  const { t } = useTranslation(['course'])
  const history = useHistories()
  const {
    courses,
    pagination,
    filter,
    categoriesOption,
    isLoadingCategoriesOption,
    loadCoursesAction,
    loadOrderCourseAction,
    deleteCoursesAction,
    loadAllCategoriesAction,
    selectCourseIdAction,
    setInfoCourseAction,
    isLoading
  } = useRegistrationCourses()
  const { isWebviewMode } = useWebview()
  const { queryWorkspaceID } = useGetQuery()
  const { companyAll } = useLoadCompanyAll()
  const { idOfNissokenCompany, companyOptions } = companyAll
  const { total, limit: pageSize, page: currentPage } = pagination
  const { sortType } = filter

  const { isSuperAdmin } = useRoles()
  const { metaData, profile } = useAuth()
  const { isWorkSpace } = profile
  const { roles } = metaData
  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })

  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false)
  const [visibleSortModal, setVisibleSortModal] = useState(false)
  const [isResetFilter, setIsResetFilter] = useState(false)

  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })

  const handleTableChange = (tablePaging, _, tableSorter) => {
    loadCoursesAction({
      params: {
        page: tablePaging.current || currentPage,
        limit: tablePaging.pageSize || pageSize,
        filter: {
          ...filter,
          sortType: !Object.keys(tablePaging).length ? SORT_BY_TYPE[tableSorter?.order] : sortType
        }
      }
    })
  }

  const handleConfirmDelete = () => {
    deleteCoursesAction({
      data: {
        ids: rowSelected.selectedRowKeys
      },
      pageSize,
      currentPage,
      callback: {
        done: () => {
          setRowSelected({
            selectedRowKeys: [],
            selectedRows: []
          })
        }
      }
    })
    setVisibleConfirmDelete(false)
  }

  const valueCompany = useMemo(() => {
    if (isSuperAdmin) {
      return companyOptions.find(({ value }) => value === filter?.companyId)
    }
    return null
  }, [filter, isSuperAdmin])

  const isShowSort = useMemo(() => {
    if (isSuperAdmin) {
      const { companyId } = filter

      return companyId === idOfNissokenCompany
    }
    return true
  }, [filter, isSuperAdmin])

  const onNavigation = useCallback((record) => {
    if (isSuperAdmin) {
      history.push(`${RoutesName.EDIT_COURSE}/${record.courseId}?createBy=${record.created}&companyId=${record.companyId}`)
    } else {
      history.push(`${RoutesName.EDIT_COURSE}/${record.courseId}`)
    }
  }, [isSuperAdmin])

  const columns = useMemo(
    () => tableColumns({ t, history, onNavigation, pagination, action: { selectCourseIdAction }, isSuperAdmin, valueCompany, isWorkSpace, isWebviewMode })
      .filter((col) => col.rules?.includes(roles?.[0])),
    [t, history, pagination, roles, isSuperAdmin, valueCompany, onNavigation, isWebviewMode]
  )

  useEffect(() => {
    loadAllCategoriesAction({ params: { companyId: isSuperAdmin && idOfNissokenCompany } })
    loadOrderCourseAction()
  }, [])

  return isWebviewMode ? (
    <Wrapper>
      <Title
        icon={COURSE_ICON}
        title={t('registration_course.management.title')}
        backRoute={isWebviewMode && `${RoutesNameSideBar.HOME}${queryWorkspaceID.ONLY}`}
        backRouteText=""
        active={isWebviewMode}
      />
      <FilterBlock
        t={t}
        metaData={metaData}
        loadCoursesAction={loadCoursesAction}
        loadAllCategoriesAction={loadAllCategoriesAction}
        categoriesOption={categoriesOption}
        isLoadingCategoriesOption={isLoadingCategoriesOption}
        setRowSelected={setRowSelected}
        companyAll={companyAll}
        isResetFilter={isResetFilter}
        setIsResetFilter={setIsResetFilter}
        isWebviewMode={isWebviewMode}
      />
      <Table
        locale={{
          emptyText: t('common:empty_data'),
          triggerDesc: t('common:sort_desc'),
          triggerAsc: t('common:sort_asc'),
          cancelSort: t('common:sort_cancel')
        }}
        rowSelection={!isWebviewMode && {
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true,
          getCheckboxProps: (record) => ({
            disabled: isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(record.created)
          })
        }}
        rowKey={(record) => record.courseId}
        dataSource={courses}
        columns={columns}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        selected={rowSelected.selectedRowKeys.length}
        createText={t('registration_course.management.create_button')}
        orderText={isShowSort && t('common:update_sort_order')}
        onChange={handleTableChange}
        onCreate={() => history.push(RoutesName.CREATE_COURSE)}
        onOrder={() => setVisibleSortModal(true)}
        onDelete={() => setVisibleConfirmDelete(true)}
        loading={isLoading}
        width="100%"
        isWebviewMode={isWebviewMode}
        onRow={(r) => ({
          onClick: () => {
            if (isWebviewMode) {
              setInfoCourseAction(r)
              history.push('/')
            }
          }
        })}
      />
    </Wrapper>
  ) : (
    <Wrapper>
      <Title
        icon={COURSE_ICON}
        title={t('registration_course.management.title')}
      />
      <FilterBlock
        t={t}
        metaData={metaData}
        loadCoursesAction={loadCoursesAction}
        loadAllCategoriesAction={loadAllCategoriesAction}
        categoriesOption={categoriesOption}
        isLoadingCategoriesOption={isLoadingCategoriesOption}
        setRowSelected={setRowSelected}
        companyAll={companyAll}
        isResetFilter={isResetFilter}
        setIsResetFilter={setIsResetFilter}
      />
      <Table
        locale={{
          emptyText: t('common:empty_data'),
          triggerDesc: t('common:sort_desc'),
          triggerAsc: t('common:sort_asc'),
          cancelSort: t('common:sort_cancel')
        }}
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true,
          getCheckboxProps: (record) => ({
            disabled: isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(record.created)
          })
        }}
        rowKey={(record) => record.courseId}
        dataSource={courses}
        columns={columns}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        selected={rowSelected.selectedRowKeys.length}
        createText={t('registration_course.management.create_button')}
        orderText={isShowSort && t('common:update_sort_order')}
        onChange={handleTableChange}
        onCreate={() => history.push(RoutesName.CREATE_COURSE)}
        onOrder={() => setVisibleSortModal(true)}
        onDelete={() => setVisibleConfirmDelete(true)}
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

      {visibleSortModal && (
      <SortModal
        visible={visibleSortModal}
        onClose={setVisibleSortModal}
        pageSize={pageSize}
        currentPage={currentPage}
        isSuperAdmin={isSuperAdmin}
        setIsResetFilter={setIsResetFilter}
      />
      )}
    </Wrapper>
  )
}

export default RegistrationCourseScreen
