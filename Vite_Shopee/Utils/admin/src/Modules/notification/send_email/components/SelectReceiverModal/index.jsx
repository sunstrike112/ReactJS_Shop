/* eslint-disable react/prop-types */
import React, { useMemo, useState, useEffect } from 'react'
import { ModalNonForm, Table } from 'Components'
import { useReceiverEmail, useSendEmail, useAuth } from 'Hooks'
import FilterBlock from '../FilterBlock'
import tableColumns from './column'

const SelectReceiverModal = ({
  setVisible,
  visible,
  t,
  handleSelectRecipient,
  listUserIds,
  isSuperAdmin,
  companyAll
}) => {
  const {
    dataSourceReceiver,
    pagination,
    filter,
    sort,
    isLoadingReceiverEmail,
    loadReceiverEmailAction
  } = useReceiverEmail()
  const { isLoadingReceiverEmailSelected } = useSendEmail()
  const { metaData } = useAuth()
  const { roles } = metaData
  const { idOfNissokenCompany } = companyAll

  const { page: currentPage, limit: pageSize, total } = pagination

  const [rowSelected, setRowSelected] = useState(JSON.parse(JSON.stringify(listUserIds)))
  const [sortInfo, setSortInfo] = useState(null)
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    setDataSource(dataSourceReceiver)
  }, [dataSourceReceiver])

  const columns = useMemo(() => tableColumns({ t, pagination, sortInfo }).filter((col) => col.rules?.includes(roles?.[0])),
    [t, pagination, sortInfo, roles])

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    // Issue the same here: https://github.com/ant-design/ant-design/issues/7942#issuecomment-637214656
    const tmpSelectedRows = rowSelected.selectedRows.concat(selectedRows).filter((item) => item !== undefined)
    const totalSelectedRows = selectedRowKeys.map((key) => tmpSelectedRows.filter((item) => item.userId === key)[0])
    setRowSelected({
      selectedRowKeys,
      selectedRows: totalSelectedRows
    })
  }

  const handleOnChange = (tablePaging, _, tableSort) => {
    setDataSource([])
    const tableSortCustom = tableSort ? { ...tableSort, field: tableSort?.columnKey } : sort // custom to match API
    loadReceiverEmailAction({
      params: {
        page: tablePaging.current || currentPage,
        limit: tablePaging.pageSize || pageSize,
        sort: tableSortCustom,
        filter
      },
      loadAll: isSuperAdmin
    })
    setSortInfo(tableSortCustom)
  }

  const handleCancel = () => {
    setVisible(false)
    loadReceiverEmailAction({
      params: {
        limit: 100,
        filter: {
          companyId: isSuperAdmin && idOfNissokenCompany
        }
      },
      loadAll: isSuperAdmin
    })
  }

  const handleSubmit = () => {
    handleSelectRecipient(rowSelected)
  }

  // Filter selected by company
  const renderSelected = useMemo(() => {
    if (isSuperAdmin && filter.companyId) return rowSelected.selectedRows.filter((row) => row.companyId === filter.companyId).length
    return rowSelected.selectedRows.length
  }, [isSuperAdmin, rowSelected.selectedRows.length, filter.companyId])

  return (
    <>
      <ModalNonForm
        visible={visible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        title={t('send_email.title_select_receiver')}
        onSubmitText={t('issue_permission:select_user.select_number', { number: rowSelected.selectedRows.length })}
        onCancelText={t('common:create.close')}
        disabledSubmit={rowSelected.selectedRowKeys.length === 0}
        isLoadingSubmit={isLoadingReceiverEmailSelected}
      >
        <FilterBlock
          t={t}
          setRowSelected={setRowSelected}
          setSortInfo={setSortInfo}
          isSuperAdmin={isSuperAdmin}
          companyAll={companyAll}
          listUserIds={listUserIds}
          setDataSource={setDataSource}
        />
        <Table
          locale={{
            emptyText: t('common:empty_data'),
            triggerDesc: t('common:sort_desc'),
            triggerAsc: t('common:sort_asc'),
            cancelSort: t('common:sort_cancel')
          }}
          rowSelection={{
            selectedRowKeys: rowSelected?.selectedRowKeys,
            onChange: onSelectChange,
            preserveSelectedRowKeys: true
          }}
          rowKey={(record) => record.userId}
          dataSource={dataSource}
          columns={columns}
          total={total}
          pageSize={pageSize}
          currentPage={currentPage}
          onChange={handleOnChange}
          // selected={isSuperAdmin ? userSelected.length : rowSelected.selectedRows.length}
          selected={renderSelected}
          loading={isLoadingReceiverEmail}
          isHideDelete
          heightTable={350}
        />
      </ModalNonForm>
    </>
  )
}

export default SelectReceiverModal
