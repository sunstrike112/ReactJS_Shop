import {
  EditOutlined
} from '@ant-design/icons'
import { Table, Title } from 'Components'
import { useAuth, useDeleteIssuePermission, useSelectRecipient, useRoles, useHistories } from 'Hooks'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RoutesName } from '../routes'
import tableColumns from './column'
import ConfirmDeleteModal from './components/ConfirmDeleteModal'
import FilterBlock from './components/FilterBlock'
import { SORT_BY_FIELD, SORT_BY_TYPE } from './constants'
import {
  Wrapper
} from './styled'

const IssueStatusPermissionScreen = () => {
  const { t } = useTranslation(['issue_permission'])
  const history = useHistories()
  const { isSuperAdmin } = useRoles()

  const {
    list,
    pagination,
    filter,
    loadListIssuePermissionAction,
    isLoading
  } = useSelectRecipient()

  const {
    deleteIssuePermissionAction
  } = useDeleteIssuePermission()

  const { metaData } = useAuth()
  const { total, limit: pageSize, page: currentPage } = pagination
  const { sortField, sortType } = filter
  const { roles } = metaData

  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })

  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false)

  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })

  const handleTableChange = (tablePaging, _, tableSorter) => {
    loadListIssuePermissionAction({
      params: {
        page: tablePaging.current || currentPage,
        limit: tablePaging.pageSize || pageSize,
        filter: {
          ...filter,
          sortField: !Object.keys(tablePaging).length
            ? SORT_BY_FIELD[tableSorter.column?.key] : sortField,
          sortType: !Object.keys(tablePaging).length
            ? SORT_BY_TYPE[tableSorter?.order] : sortType
        }
      }
    })
  }

  const handleConfirmDelete = () => {
    deleteIssuePermissionAction({
      data: rowSelected.selectedRowKeys,
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

  const columns = useMemo(
    () => tableColumns({ t, history, pagination }).filter((col) => col.rules.includes(roles?.[0])),
    [t, history, pagination, roles]
  )

  const handleNavigateToUpdateScreen = () => {
    const listIdsEnrollment = rowSelected.selectedRows.map((v) => v.id)
    const listIdsEnrollmentJson = JSON.stringify(listIdsEnrollment)
    history.push(`${RoutesName.EDIT_ISSUE_PERMISSION}?listIdsEnrollment=${listIdsEnrollmentJson}`)
  }

  const action = [
    {
      text: t('management.change_attendance'),
      icon: <EditOutlined />,
      click: handleNavigateToUpdateScreen,
      disabled: !rowSelected.selectedRowKeys.length
    }
  ]
  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('management.title')}
      />
      <FilterBlock
        t={t}
        metaData={metaData}
        loadListIssuePermission={loadListIssuePermissionAction}
        setRowSelected={setRowSelected}
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
          preserveSelectedRowKeys: true
        }}
        selected={rowSelected.selectedRowKeys.length}
        rowKey={(record) => record.id}
        dataSource={list}
        columns={columns}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        action={isSuperAdmin ? [] : action}
        onChange={handleTableChange}
        createText={!isSuperAdmin && t('management.issue_attendance')}
        onDelete={() => setVisibleConfirmDelete(true)}
        onCreate={() => history.push(RoutesName.ISSUE_PERMISSION)}
        loading={isLoading}
        isHideDelete={isSuperAdmin}
      />
      <ConfirmDeleteModal
        t={t}
        isVisible={visibleConfirmDelete}
        onSubmit={handleConfirmDelete}
        setIsVisble={setVisibleConfirmDelete}
        numberOfSelectedRecord={rowSelected.selectedRows.length}
        disabledSubmit={false}
      />
    </Wrapper>
  )
}

export default IssueStatusPermissionScreen
