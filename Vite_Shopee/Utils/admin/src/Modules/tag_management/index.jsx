/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  TagOutlined
} from '@ant-design/icons'

import { Table, Title } from 'Components'
import { useTagManagement, useRoles, useAuth } from 'Hooks'
import {
  Wrapper
} from 'Themes/facit'

import tableColumns from './column'
import CreateTagModal from './components/CreateTagModal'
import EditTagModal from './components/EditTagModal'
import ConfirmDeleteModal from './components/ConfirmDeleteModal'
import FilterBlock from './components/FilterBlock'

const TagManagementScreen = () => {
  const { t } = useTranslation(['tagManagement'])
  const { isSuperAdmin } = useRoles()
  const {
    getListTagApi,
    createTagApi,
    updateTagApi,
    deleteTagApi,
    listTag,
    filter
  } = useTagManagement()
  const { metaData } = useAuth()
  const { roles } = metaData
  const { pagination, isLoading } = listTag
  const { total, limit: pageSize, page: currentPage } = pagination
  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })

  const [visibleCreateTag, setVisibleCreateTag] = useState(false)
  const [currentTag, setCurrentTag] = useState(false)
  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false)

  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })
  const handleTableChange = (tablePaging) => {
    getListTagApi({
      ...filter,
      page: tablePaging.current,
      limit: tablePaging.pageSize
    })
  }

  const handleConfirmDelete = () => {
    deleteTagApi({
      data: { ids: rowSelected.selectedRowKeys },
      filter,
      callback: {
        done: () => {
          setRowSelected({
            selectedRowKeys: [],
            selectedRows: []
          })
          setVisibleConfirmDelete(false)
        }
      }
    })
  }

  const handleVisibleCreateModal = () => {
    setVisibleCreateTag(true)
  }

  const columns = useMemo(
    () => tableColumns({ t, pagination, action: { setCurrentTag }, isSuperAdmin }).filter((item) => item.rules.includes(roles?.[0])),
    [t, pagination, roles]
  )

  return (
    <Wrapper>
      <Title
        icon={TagOutlined}
        title={t('menu:tag_management')}
      />
      <FilterBlock
        t={t}
        getListTagApi={getListTagApi}
        isSuperAdmin={isSuperAdmin}
      />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        rowSelection={!isSuperAdmin && {
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true
        }}
        rowKey={(record) => record.id}
        dataSource={listTag.result}
        columns={columns}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        selected={rowSelected.selectedRowKeys.length}
        onChange={handleTableChange}
        loading={isLoading}
        createText={!isSuperAdmin && t('create_button')}
        onDelete={() => setVisibleConfirmDelete(true)}
        isHideDelete={isSuperAdmin}
        onCreate={handleVisibleCreateModal}
      />

      {visibleCreateTag && (
      <CreateTagModal
        visible={visibleCreateTag}
        onClose={setVisibleCreateTag}
        createTagApi={createTagApi}
        getListTagApi={getListTagApi}
        pageSize={pageSize}
      />
      )}

      {currentTag && (
      <EditTagModal
        source={currentTag}
        visible={!!currentTag}
        onClose={setCurrentTag}
        updateTagApi={updateTagApi}
      />
      )}

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

export default TagManagementScreen
