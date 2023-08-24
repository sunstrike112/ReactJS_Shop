import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Wrapper } from 'Themes/facit'
import { Table, Title } from 'Components'
import { KeyOutlined } from '@ant-design/icons'
import { useSettingPasswordPlan } from 'Hooks'
import { DEFAULT_PAG } from 'Utils'
import { STATUS_USE_PASSWORD } from 'Constants'
import tableColumns from './column'
import { ConfirmDeleteModal, CreatePasswordModal, FilterBlock } from './components'

const SettingPasswordPlanScreen = () => {
  const { t } = useTranslation(['settingPasswordPlan'])

  const {
    isLoading,
    isAdding,
    isDeleting,
    passwordsPlan,
    pagination,
    filter,
    getPasswordsAction,
    addPasswordAction,
    deletePasswordAction } = useSettingPasswordPlan()
  const { page: currentPage, limit: pageSize, total } = pagination

  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  const [visibleCreatePasswordModal, setVisibleCreatePasswordModal] = useState(false)
  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false)

  const columns = useMemo(() => tableColumns({ t, pagination }), [t, pagination])

  const getInitData = () => getPasswordsAction({ params: DEFAULT_PAG })

  const handleOnChange = (tablePaging) => {
    getPasswordsAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize,
        filter
      } })
  }

  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })

  const handleConfirmDelete = () => {
    deletePasswordAction({
      data: rowSelected.selectedRowKeys,
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

  return (
    <Wrapper>
      <Title
        icon={KeyOutlined}
        title={t('title')}
      />
      <FilterBlock
        t={t}
        setRowSelected={setRowSelected}
        getPasswordsAction={getPasswordsAction}
        getInitData={getInitData}
        pageSize={pageSize}
        isAdding={isAdding}
      />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true,
          getCheckboxProps: (record) => ({
            disabled: record.status === STATUS_USE_PASSWORD.USED
          })
        }}
        createText={t('create_new_password')}
        onCreate={() => setVisibleCreatePasswordModal(true)}
        onDelete={() => setVisibleConfirmDelete(true)}
        columns={columns}
        dataSource={passwordsPlan}
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
        onChange={handleOnChange}
        loading={isLoading}
        rowKey={({ id }) => id}
        selected={rowSelected.selectedRowKeys.length}
        pagination={passwordsPlan.length > 0}
      />
      {visibleCreatePasswordModal && (
        <CreatePasswordModal
          t={t}
          visible={visibleCreatePasswordModal}
          onClose={() => setVisibleCreatePasswordModal(false)}
          addPasswordAction={addPasswordAction}
          getInitData={getInitData}
          isAdding={isAdding}
        />
      )}
      {visibleConfirmDelete && (
        <ConfirmDeleteModal
          t={t}
          isDeleting={isDeleting}
          onClose={() => setVisibleConfirmDelete(false)}
          onSubmit={handleConfirmDelete}
          numberOfSelectedRecord={rowSelected.selectedRows.length}
        />
      )}
    </Wrapper>
  )
}

export default SettingPasswordPlanScreen
