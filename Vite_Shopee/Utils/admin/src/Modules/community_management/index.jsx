/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  TagOutlined
} from '@ant-design/icons'
import { downloadTalkBoardCSV } from 'APIs'
import { Table, Title } from 'Components'
import {
  useAuth, useCommunityManagement, useHistories, useRoles
} from 'Hooks'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import tableColumns from './column'
import ConfirmDeleteModal from './components/ConfirmDeleteModal'
import FilterBlock from './components/FilterBlock'
import { RoutesName } from './routes'
import { Wrapper } from './styled'

const CommunityManagementScreen = () => {
  const { t } = useTranslation(['communityManagement'])
  const history = useHistories()
  const { isSuperAdmin } = useRoles()
  const {
    getListTalkBoardAction,
    deleteTalkBoardAction,
    listTalkBoard,
    filter
  } = useCommunityManagement()
  const { metaData } = useAuth()
  const { roles } = metaData
  const { pagination, isLoading } = listTalkBoard
  const { total, limit: pageSize, page: currentPage } = pagination
  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })

  const [csvLoading, setCsvLoading] = useState(false)
  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false)
  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })

  const handleTableChange = (tablePaging) => {
    getListTalkBoardAction({
      ...filter,
      page: tablePaging.current,
      limit: tablePaging.pageSize
    })
  }

  const handleConfirmDelete = () => {
    deleteTalkBoardAction({
      data: [...rowSelected.selectedRowKeys],
      filter,
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
  }

  const handleNavigateCreateTalkboard = () => {
    history.push(RoutesName.CREATE_TALKBOARD)
  }

  const columns = useMemo(
    () => tableColumns({ t, pagination, history, isSuperAdmin, RoutesName }).filter((item) => item.rules.includes(roles?.[0])),
    [t, pagination, roles]
  )

  const dataTalkBoard = useMemo(() => listTalkBoard.result
    .map((talkBoard) => ({
      ...talkBoard,
      creator: talkBoard.author.firstName
    })), [listTalkBoard])

  const onDownloadCSV = useCallback(() => {
    const data = rowSelected.selectedRows.length
      ? rowSelected.selectedRows.map((item) => item.id)
      : []
    setCsvLoading(true)
    downloadTalkBoardCSV({
      params: {
        ...filter,
        page: null,
        limit: null,
        timezone: new Date().getTimezoneOffset()
      },
      data
    }).finally(() => setCsvLoading(false))
  }, [rowSelected, filter])

  return (
    <Wrapper>
      <Title
        icon={TagOutlined}
        title={t('menu:topic_management')}
      />
      <FilterBlock
        t={t}
        isSuperAdmin={isSuperAdmin}
        setRowSelected={setRowSelected}
      />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true
        }}
        rowKey={(record) => record.id}
        dataSource={dataTalkBoard}
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
        onCreate={handleNavigateCreateTalkboard}
        csv={{
          text: t('common:download_csv'),
          onDownload: onDownloadCSV,
          loading: csvLoading || isLoading
        }}
      />
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

export default CommunityManagementScreen
