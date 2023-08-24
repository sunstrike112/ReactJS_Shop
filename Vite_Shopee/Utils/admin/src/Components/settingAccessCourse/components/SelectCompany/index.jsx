/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ModalNonForm, Table } from 'Components'
import React, { useCallback, useMemo, useState } from 'react'
import FilterBlock from '../FilterBlock'
import tableColumns from './column'

const CompanyModal = ({
  visibleCompanyModal,
  setVisibleCompanyModal,
  loadCompanyTypesAction,
  t,
  filter,
  pagination,
  companyTypes,
  isLoading,
  handleSelectCompany,
  loadCompanySelectedAction,
  isLoadingCompanySelected,
  listCompany
}) => {
  const { page: currentPage, limit: pageSize, total } = pagination

  const [rowSelected, setRowSelected] = useState(JSON.parse(JSON.stringify(listCompany)))

  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })

  const columns = useMemo(() => tableColumns({ t, pagination }), [t, pagination])

  const handleOnchangeTable = useCallback((tablePag) => {
    loadCompanyTypesAction({
      params: {
        page: tablePag.current,
        limit: tablePag.pageSize,
        filter
      }
    })
  }, [filter])
  return (
    <ModalNonForm
      visible={visibleCompanyModal}
      title={t('company:list_company')}
      t={t}
      onCancel={() => setVisibleCompanyModal(false)}
      onSubmit={() => {
        handleSelectCompany(rowSelected)
        if (rowSelected.selectedRowKeys.length) {
          loadCompanySelectedAction({
            params: { page: 1, limit: 100 },
            data: { ids: rowSelected.selectedRowKeys },
            callback: { done: () => setVisibleCompanyModal(false) }
          })
        } else {
          setVisibleCompanyModal(false)
        }
      }}
      titleIcon={false}
      onSubmitText={t('issue_permission:select_user.select_number', { number: rowSelected.selectedRowKeys.length })}
      onCancelText={t('common:create.close')}
      loadingSubmit
      isLoadingSubmit={isLoadingCompanySelected}
    >
      <FilterBlock
        t={t}
        filter={filter}
        pagination={pagination}
        loadCompanyTypesAction={loadCompanyTypesAction}
      />
      <Table
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true
        }}
        rowKey={(record) => record.companyId}
        locale={{ emptyText: t('common:empty_data') }}
        dataSource={companyTypes}
        columns={columns}
        selected={rowSelected.selectedRowKeys.length}
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
        onChange={handleOnchangeTable}
        loading={isLoading}
        width="100%"
        isHideDelete
      />
    </ModalNonForm>
  )
}

export default CompanyModal
