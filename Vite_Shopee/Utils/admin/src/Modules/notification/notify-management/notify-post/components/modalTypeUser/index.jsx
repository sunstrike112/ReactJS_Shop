/* eslint-disable react/prop-types */

import React, { useState, useEffect, useMemo } from 'react'
import {
  Modal,
  Table
} from 'Components'
import { useCreateNotify, useRoles } from 'Hooks'
import tableColumns from './column'
import FilterBlock from './FilterBlock'

const ModalTypeUser = ({ t, visible, onCancel, getValueSelect, lstUser, listDataUserAll }) => {
  const { listDataUser, pagination, filter, listUserAction, isLoading } = useCreateNotify()
  const { total, limit: pageSize, page: currentPage } = pagination
  const { isSuperAdmin, isAdmin } = useRoles()
  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    for (let i = 0; i < selectedRowKeys.length; i += 1) {
      for (let j = 0; j < rowSelected.selectedRowKeys.length; j += 1) {
        if (selectedRowKeys[i] === rowSelected.selectedRowKeys[j]) {
          selectedRows[i] = rowSelected.selectedRows[j]
        }
      }
    }
    setRowSelected({ selectedRowKeys, selectedRows })
  }

  useEffect(() => {
    if (lstUser && lstUser.length) {
      setRowSelected({
        selectedRowKeys: lstUser.map((item) => `${item.id}-${item.companyId}`),
        selectedRows: lstUser
      })
    }
  }, [lstUser])

  const handleTableChange = (tablePaging) => {
    listUserAction({
      params: {
        ...filter,
        page: tablePaging.current,
        limit: tablePaging.pageSize
      },
      loadAll: isSuperAdmin || isAdmin
    })
  }

  const columns = useMemo(
    () => tableColumns({ t, pagination, isSuperAdmin, isAdmin }).filter((item) => !!item),
    [t, pagination]
  )

  // Filter userSelected by company
  const userSelected = useMemo(() => listDataUserAll.filter((user) => rowSelected.selectedRowKeys.indexOf(`${user.id}-${user.companyId}`) !== -1),
    [listDataUserAll, rowSelected.selectedRowKeys])

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={t('post.create.titleNotifi')}
      onCancelText={t('common:cancel')}
      onSubmitText={t('post.create.Ok')}
      onSubmit={() => getValueSelect(rowSelected)}
    >
      <FilterBlock
        t={t}
        listUserAction={listUserAction}
        setRowSelected={setRowSelected}
        lstUser={lstUser}
      />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true
        }}
        rowKey={(record) => `${record.id}-${record.companyId}`}
        dataSource={listDataUser}
        columns={columns}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        selected={(isSuperAdmin || isAdmin) ? userSelected.length : rowSelected.selectedRowKeys.length}
        onChange={handleTableChange}
        loading={isLoading}
        isHideDelete
        heightTable={400}
      />
    </Modal>
  )
}

export default ModalTypeUser
