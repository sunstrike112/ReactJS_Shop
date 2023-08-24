import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  TagOutlined
} from '@ant-design/icons'

import { Table, Title } from 'Components'
import { useGroupAttribute } from 'Hooks/user'
import {
  Wrapper
} from 'Themes/facit'
import tableColumns from './column'
import CreateAttributeModal from './components/CreateAttributeModal'
import EditAttributeModal from './components/EditAttributeModal'
import ConfirmDeleteModal from './components/ConfirmDeleteModal'
import FilterBlock from './components/FilterBlock'

const AttributeManagementScreen = () => {
  const { t } = useTranslation(['user'])
  const {
    isLoading,
    attributes,
    pagination,
    filter,
    loadAttributesAction,
    createAttributeAction,
    updateAttributeAction,
    deleteAttributesAction
  } = useGroupAttribute()
  const { total, limit: pageSize, page: currentPage } = pagination

  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  const [isReloading, setIsReloading] = useState(false)

  const [visibleCreateAttribute, setVisibleCreateAttribute] = useState(false)
  const [currentAttribute, setCurrentAttribute] = useState(false)
  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false)

  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })

  const handleTableChange = (tablePaging) => {
    loadAttributesAction({
      params: {
        ...filter,
        page: tablePaging.current,
        limit: tablePaging.pageSize
      }
    })
  }

  const handleConfirmDelete = () => {
    deleteAttributesAction({
      data: {
        ids: rowSelected.selectedRowKeys
      },
      pagination,
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
    setIsReloading(true)
  }

  const handleVisibleCreateModal = () => {
    setVisibleCreateAttribute(true)
    setIsReloading(false)
  }

  const columns = useMemo(
    () => tableColumns({ t, pagination, action: { setCurrentAttribute, setIsReloading } }),
    [t, pagination]
  )

  return (
    <Wrapper>
      <Title
        icon={TagOutlined}
        title={t('attribute.title')}
      />
      <FilterBlock
        t={t}
        loadAttributesAction={loadAttributesAction}
        isReloading={isReloading}
      />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true
        }}
        rowKey={(record) => record.attributeId}
        dataSource={attributes}
        columns={columns}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        selected={rowSelected.selectedRowKeys.length}
        onChange={handleTableChange}
        createText={t('attribute.create_button')}
        onDelete={() => {
          setVisibleConfirmDelete(true)
          setIsReloading(false)
        }}
        onCreate={handleVisibleCreateModal}
        width="100%"
        loading={isLoading}
      />

      {visibleCreateAttribute && (
      <CreateAttributeModal
        visible={visibleCreateAttribute}
        onClose={setVisibleCreateAttribute}
        addNewAttribute={createAttributeAction}
        pageSize={pageSize}
        setIsReloading={setIsReloading}
      />
      )}

      {currentAttribute && (
      <EditAttributeModal
        source={currentAttribute}
        visible={!!currentAttribute}
        onClose={setCurrentAttribute}
        updateAttribute={updateAttributeAction}
        setIsReloading={setIsReloading}
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

export default AttributeManagementScreen
