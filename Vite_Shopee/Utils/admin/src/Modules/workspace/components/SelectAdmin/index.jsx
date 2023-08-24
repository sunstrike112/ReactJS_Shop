/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useMemo, useState, useEffect } from 'react'
import { ModalNonForm, Table } from 'Components'
import { useLoadCourseCategory, useLoadCourseAssignment, useAdminsNissoken } from 'Hooks'
import { DEFAULT_PAG } from 'Utils'
import { FilterBlockSelectAdmin } from '..'

const SelectAdmin = ({ setVisible, visible, t, setAdminsAssigned, adminsAssigned }) => {
  const { data, isLoading, pagination, filter, getAdminsNissokenAction } = useAdminsNissoken()
  const { page: currentPage, limit: pageSize, total } = pagination

  const [rowSelected, setRowSelected] = useState({ ...adminsAssigned })

  useEffect(() => {
    getAdminsNissokenAction({ params: DEFAULT_PAG })
  }, [])

  const columns = useMemo(
    () => [
      {
        title: 'No.',
        align: 'right',
        width: 60,
        render: (text, record, index) => (
          <div>{(currentPage - 1) * pageSize + index + 1}</div>
        )
      },
      {
        title: t('common:email'),
        dataIndex: 'email',
        key: 'email',
        ellipsis: true
      },
      {
        title: t('common:loginId'),
        dataIndex: 'signinId',
        key: 'signinId',
        ellipsis: true
      }
    ],
    [t, pagination]
  )

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    for (let i = 0; i < selectedRowKeys.length; i += 1) {
      for (let j = 0; j < adminsAssigned.selectedRowKeys.length; j += 1) {
        if (selectedRowKeys[i] === adminsAssigned.selectedRowKeys[j]) {
          selectedRows[i] = adminsAssigned.selectedRows[j]
        }
      }
    }
    setRowSelected({ selectedRowKeys, selectedRows })
  }

  const handleOnChange = (tablePaging) => {
    getAdminsNissokenAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize,
        filter
      }
    })
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const handleSelectAdmin = () => {
    setAdminsAssigned(rowSelected)
    setVisible(false)
    setRowSelected({ selectedRowKeys: [], selectedRows: [] })
  }

  return (
    <>
      <ModalNonForm
        visible={visible}
        onCancel={handleCancel}
        title={t('select_admin_nissoken')}
        isNotFooterButton
      >
        <FilterBlockSelectAdmin
          t={t}
          setRowSelected={setRowSelected}
          getAdminsNissokenAction={getAdminsNissokenAction}
          pageSize={pageSize}
        />
        <Table
          rowSelection={{
            selectedRowKeys: rowSelected.selectedRowKeys,
            onChange: onSelectChange,
            preserveSelectedRowKeys: true
          }}
          rowKey={({ id }) => id}
          locale={{ emptyText: t('common:empty_data') }}
          dataSource={data}
          columns={columns}
          total={total}
          pageSize={pageSize}
          currentPage={currentPage}
          onChange={handleOnChange}
          selected={rowSelected.selectedRowKeys.length}
          createText={t('common:select')}
          onCreate={handleSelectAdmin}
          disabledCreate={!rowSelected.selectedRowKeys.length}
          loading={isLoading}
          width="100%"
          isHideDelete
        />
      </ModalNonForm>
    </>
  )
}

export default SelectAdmin
