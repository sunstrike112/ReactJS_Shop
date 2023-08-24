import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useGetWorkSpaceAll, useHistories } from 'Hooks'

import { Title, Table } from 'Components'
import { EditOutlined } from '@ant-design/icons'
import { Wrapper } from 'Themes/facit'
import { ConfirmDelete, FilterBlock } from './components'
import tableColumns from './column'
import { RoutesName } from './routes'

const WorkspaceManagementScreen = () => {
  const { t } = useTranslation(['workspace'])
  const history = useHistories()

  const {
    getWorkspaceAllAction,
    data,
    pagination,
    filter,
    isLoading,
    isDeleting,
    deleteWorkSpaceAction,
    resetWorkspacesAction
  } = useGetWorkSpaceAll()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false)

  const { page, limit, total } = pagination

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    preserveSelectedRowKeys: true
  }

  const handleRedirect = (route) => history.push(route)

  const columns = useMemo(
    () => tableColumns({ t, pagination, history, handleRedirect }),
    [t, pagination]
  )

  const handleOnChange = (tablePaging) => {
    getWorkspaceAllAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize,
        workSpaceName: filter
      },
      workSpaceName: filter
    })
  }

  const onDelete = () => {
    deleteWorkSpaceAction({
      data: { ids: selectedRowKeys },
      pagination,
      filter: { workSpaceName: null },
      callback: {
        done: () => {
          setSelectedRowKeys([])
          setVisibleConfirmDelete(false)
        }
      }
    })
  }

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('title')}
      />
      <FilterBlock
        t={t}
        limit={limit}
        resetWorkspacesAction={resetWorkspacesAction}
      />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        columns={columns}
        dataSource={data.result}
        total={total}
        pageSize={limit}
        currentPage={page}
        onChange={handleOnChange}
        loading={isLoading}
        onCreate={() => handleRedirect(RoutesName.CREATE_WORKSPACE)}
        rowKey="id"
        createText={t('create_button')}
        rowSelection={rowSelection}
        onDelete={() => setVisibleConfirmDelete(true)}
        selected={selectedRowKeys.length}
        pagination={data.result?.length > 0}
      />
      <ConfirmDelete
        t={t}
        isVisible={visibleConfirmDelete}
        isDeleting={isDeleting}
        onSubmit={onDelete}
        setVisible={setVisibleConfirmDelete}
        numberOfSelectedRecord={selectedRowKeys.length}
      />
    </Wrapper>
  )
}

export default WorkspaceManagementScreen
