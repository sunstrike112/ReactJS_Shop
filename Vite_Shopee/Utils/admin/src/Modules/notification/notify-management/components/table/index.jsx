/* eslint-disable react/prop-types */
import { NotificationOutlined } from '@ant-design/icons'
import { Table, Title } from 'Components'
import { USER_ROLE } from 'Constants'
import { useHistories, useLoadCompanyAll, useLoadNotifi, useRoles } from 'Hooks'
import { RoutesName } from 'Modules/notification/routes'
import React, { useMemo, useState } from 'react'
import { Wrapper } from 'Themes/facit'
import ConfirmDeleteModal from '../ConfirmDeleteModal'
import { FilterBlock } from '../index'
import tableColumns from './column'

const TableNotification = ({ t }) => {
  const {
    findUser,
    pagination,
    filter,
    isLoading,
    isSubmitting,
    deleteNotifiAction,
    loadFindUserAction,
    resetNotificationsAction
  } = useLoadNotifi()

  const { companyAll } = useLoadCompanyAll()
  const { idOfNissokenCompany } = companyAll
  const [isReloading, setIsReloading] = useState(false)
  const { total, limit: pageSize, page: currentPage } = pagination
  const history = useHistories()
  const { isSuperAdmin, isAdmin, isCompany } = useRoles()

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
    deleteNotifiAction({
      data: {
        ids: rowSelected.selectedRowKeys
      },
      pagination,
      filter,
      callback: {
        done: () => {
          setVisibleConfirmDelete(false)
          setIsReloading(true)
          setRowSelected({
            selectedRowKeys: [],
            selectedRows: []
          })
        }
      },
      isAdmin,
      isSuperAdmin,
      idOfNissokenCompany
    })
  }

  const handleTableChange = (tablePaging) => {
    loadFindUserAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize,
        filter
      }
    })
  }

  const columns = useMemo(
    () => tableColumns({ t, pagination, history, isSuperAdmin, isAdmin, isCompany }),
    [t, pagination, isSuperAdmin, isAdmin, isCompany]
  )

  return (
    <Wrapper>
      <Title icon={NotificationOutlined} title={t('management.list_title')} />
      <FilterBlock
        t={t}
        loadFindUserAction={loadFindUserAction}
        resetNotificationsAction={resetNotificationsAction}
        pageSize={pageSize}
        isReloading={isReloading}
        setIsReloading={setIsReloading}
        companyAll={companyAll}
      />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        rowSelection={
          ((isSuperAdmin || isAdmin))
            ? !([USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(findUser[0]?.created)) && {
              selectedRowKeys: rowSelected.selectedRowKeys,
              onChange: onSelectChange,
              preserveSelectedRowKeys: true
            }
            : {
              selectedRowKeys: rowSelected.selectedRowKeys,
              onChange: onSelectChange,
              preserveSelectedRowKeys: true
            }
        }
        rowKey={(record) => record.id}
        dataSource={findUser}
        columns={columns?.filter((item) => !!item)}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        selected={rowSelected.selectedRowKeys.length}
        createText={t('management.post')}
        onChange={handleTableChange}
        onCreate={() => history.push(RoutesName.NOTIFY_POST)}
        onDelete={() => setVisibleConfirmDelete(true)}
        loading={isLoading}
        pagination={findUser.length > 0}
      />
      <ConfirmDeleteModal
        t={t}
        isVisible={visibleConfirmDelete}
        onSubmit={handleConfirmDelete}
        setIsVisble={setVisibleConfirmDelete}
        numberOfSelectedRecord={rowSelected.selectedRows.length}
        disabledSubmit={false}
        isSubmitting={isSubmitting}
      />
    </Wrapper>
  )
}

export default TableNotification
