import React, { useState, useMemo } from 'react'
import { NotificationOutlined } from '@ant-design/icons'
import { Table, Title } from 'Components'
import { useLoadNotifi, useRoles, useLoadCompanyAll, useAuth, useHistories } from 'Hooks'
import { useTranslation } from 'react-i18next'
import { RoutesName } from 'Modules/notification/routes'
import { Wrapper } from 'Themes/facit'
import { USER_ROLE } from 'Constants/auth'
import { FilterBlock, ConfirmDeleteModal } from './components'
import tableColumns from './column'

const ScreenEmailHistories = () => {
  const { t } = useTranslation(['notification'])
  const {
    pagination,
    filter,
    isLoading,
    isSubmitting,
    deleteHistoryAction,
    loadSendHistoryAction,
    listSendHistory,
    resetEmailHistoriesAction
  } = useLoadNotifi()
  const { total, limit: pageSize, page: currentPage } = pagination
  const history = useHistories()
  const { isSuperAdmin } = useRoles()
  const { companyAll } = useLoadCompanyAll()
  const { metaData } = useAuth()
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
  const handleConfirmDelete = () => {
    deleteHistoryAction({
      data: {
        emailIds: rowSelected.selectedRowKeys
      },
      pagination,
      filter,
      callback: {
        done: () => {
          setRowSelected({ selectedRowKeys: [], selectedRows: [] })
          setVisibleConfirmDelete(false)
        }
      }
    })
  }

  const handleTableChange = (tablePaging, _, tableSorter) => {
    loadSendHistoryAction({
      params: {
        page: tablePaging.current || currentPage,
        limit: tablePaging.pageSize || pageSize,
        filter: {
          ...filter,
          sortCondition: tableSorter?.order?.toUpperCase(),
          companyId: isSuperAdmin && filter?.companyId
        }
      }
    })
  }

  const columns = useMemo(
    () => tableColumns({ t, pagination, history, RoutesName }).filter((col) => col.rules?.includes(roles?.[0])),
    [t, pagination, roles]
  )
  return (
    <Wrapper>
      <Title icon={NotificationOutlined} title={t('title_email_history')} />
      <FilterBlock
        t={t}
        loadSendHistoryAction={loadSendHistoryAction}
        resetEmailHistoriesAction={resetEmailHistoriesAction}
        pageSize={pageSize}
        isSuperAdmin={isSuperAdmin}
        companyAll={companyAll}
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
        rowKey={(record) => record.mailId}
        dataSource={listSendHistory}
        columns={columns}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        selected={rowSelected.selectedRowKeys.length}
        createText={t('management.compose_email')}
        onChange={handleTableChange}
        onCreate={() => history.push(RoutesName.SEND_EMAIL)}
        onDelete={() => setVisibleConfirmDelete(true)}
        loading={isLoading}
        pagination={listSendHistory.length > 0}
      />
      <ConfirmDeleteModal
        t={t}
        isVisible={visibleConfirmDelete}
        onSubmit={handleConfirmDelete}
        setIsVisible={setVisibleConfirmDelete}
        numberOfSelectedRecord={rowSelected.selectedRows.length}
        disabledSubmit={false}
        isLoadingSubmit={isSubmitting}
      />
    </Wrapper>
  )
}

export default ScreenEmailHistories
