/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  useLoadAutomaticAssignment,
  useDeleteCourseAssignment,
  useLoadCompanyAll,
  useRoles,
  useAuth,
  useHistories
} from 'Hooks'
import { RoutesName } from 'Modules/course/routes'

import { EditOutlined } from '@ant-design/icons'
import { Title, Table } from 'Components'
import { Wrapper } from 'Themes/facit'
import { FilterBlock, ConfirmDelete } from './components'
import tableColumns from './column'

const QuestionSettingScreen = () => {
  const { t } = useTranslation(['auto_assignment_course'])
  const history = useHistories()

  const {
    loadAutomaticAssignmentAction,
    autoAssignment,
    pagination,
    filter,
    isLoading
  } = useLoadAutomaticAssignment()
  const { deleteCourseAssignmentAction } = useDeleteCourseAssignment()
  const { companyAll } = useLoadCompanyAll()
  const { idOfNissokenCompany } = companyAll
  const { isSuperAdmin } = useRoles()
  const { metaData } = useAuth()
  const { roles } = metaData

  const { page, limit, total } = pagination

  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  const [companyId, setCompanyId] = useState(1)
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false)

  const dataSourceQuestion = useMemo(
    () => autoAssignment?.map((item, index) => ({
      ...item,
      index: index + 1,
      isEffective: item.isEffective ? t('common:enable') : t('common:disabled')
    })),
    [t, autoAssignment]
  )

  const navigateDetail = (record) => {
    if (isSuperAdmin) {
      history.push(`${RoutesName.EDIT_AUTOMATIC}/${record.assignId}?companyId=${record.companyId}`)
    } else {
      history.push(`${RoutesName.EDIT_AUTOMATIC}/${record.assignId}`)
    }
  }

  const columns = useMemo(
    () => tableColumns({ t, pagination, isSuperAdmin, navigateDetail }).filter((col) => col.rules?.includes(roles?.[0])),
    [t, pagination, roles, isSuperAdmin]
  )
  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })
  const handleOnChange = (tablePaging) => {
    loadAutomaticAssignmentAction({
      params: {
        Page: tablePaging.current,
        limit: tablePaging.pageSize,
        filter
      }
    })
  }
  const handleDeleteQuestion = () => {
    deleteCourseAssignmentAction({
      data: rowSelected.selectedRowKeys,
      params: {
        Page: page,
        limit,
        filter
      }
    })
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
    setVisibleDeleteModal(false)
  }

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('title')}
      />
      <FilterBlock
        t={t}
        setRowSelected={setRowSelected}
        companyAll={companyAll}
        isSuperAdmin={isSuperAdmin}
        setCompanyId={setCompanyId}
      />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true,
          getCheckboxProps: () => ({
            disabled: isSuperAdmin
          })
        }}
        rowKey={(record) => record.assignId}
        columns={columns}
        dataSource={dataSourceQuestion}
        total={total}
        pageSize={limit}
        currentPage={page}
        onChange={handleOnChange}
        selected={rowSelected.selectedRowKeys.length}
        onDelete={!isSuperAdmin && (() => setVisibleDeleteModal(true))}
        createText={!isSuperAdmin && t('register_auto_assignment')}
        onCreate={() => history.push(RoutesName.CREATE_AUTOMATIC)}
        loading={isLoading}
        isHideDelete={isSuperAdmin}
        pagination={dataSourceQuestion.length > 0}
      />
      <ConfirmDelete
        t={t}
        isVisible={visibleDeleteModal}
        setVisible={setVisibleDeleteModal}
        onSubmit={handleDeleteQuestion}
        numberOfSelectedRecord={rowSelected.selectedRows?.length}
      />
    </Wrapper>
  )
}

export default QuestionSettingScreen
