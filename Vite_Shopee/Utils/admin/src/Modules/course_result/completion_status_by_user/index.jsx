import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Title } from 'Components'
import { EditOutlined } from '@ant-design/icons'
import { useAuth, useUnitStatus, useRoles, useLoadCompanyAll } from 'Hooks'
import { STORAGE, getLocalStorage, sortFullParams } from 'Utils'
import { Wrapper } from 'Themes/facit'
import styled from 'styled-components'
import { downloadUnitResultCSV } from 'APIs'
import tableColumns from './column'
import { FilterBlock } from './components'
import { TableSort } from '../component'
import QuestionsModal from './ViewHistory/QuestionsModal'

const WrapperStyle = styled(Wrapper)`
  .ant-dropdown-menu {
    width: 300px;
    max-width: unset;
    position: absolute;
  }
  .table-container {
    .ant-table-thead {
      tr {
        .ant-table-selection-column {
          padding: 0;
        }
      }
    }
    .ant-table-tbody {
      tr {
        td {
          padding: 5px;
          max-width: 250px;
          p {
            margin: 0;
          }
        }
      }
    }
  }
`
const CompletionStatusByUserScreen = () => {
  const { t } = useTranslation(['courseResult'])
  const {
    unit,
    pagination,
    filter,
    isLoading,
    loadUnitStatusAction
  } = useUnitStatus()
  const { isSuperAdmin } = useRoles()
  const { companyAll } = useLoadCompanyAll()
  const { metaData } = useAuth()
  const { total, limit: pageSize, page: currentPage } = pagination
  const { roles } = metaData

  const [sortInfo, setSortInfo] = useState(null)
  const [sortParams, setSortParams] = useState({})
  const [csvLoading, setCsvLoading] = useState(false)
  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  const [visibleQuestionsModal, setVisibleQuestionsModal] = useState(false)
  const [recordId, setRecordId] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const language = getLocalStorage(STORAGE.LANGUAGE)

  const handleTableChange = (tablePaging, _, tableSorter) => {
    let params = {
      ...filter,
      page: tablePaging.current || currentPage,
      limit: tablePaging.pageSize || pageSize,
      sortBy: null,
      sortType: null,
      companyId: isSuperAdmin && filter?.companyId
    }
    let fullParams = {
      ...params
    }
    setSortInfo(tableSorter)
    setSortParams(sortFullParams(tableSorter?.field, tableSorter?.order, params, fullParams))
    loadUnitStatusAction(sortFullParams(tableSorter?.field, tableSorter?.order, params, fullParams))
  }

  const onSelectQuestions = useCallback((record) => {
    setRecordId(record.historyId)
    setSelectedType(record.unitType)
    setVisibleQuestionsModal(true)
  }, [])

  const columns = useMemo(
    () => tableColumns({ t, sortInfo, pagination, onSelectQuestions, language }).filter((col) => col.rules.includes(roles?.[0])),
    [t, pagination, roles]
  )

  const statusUnit = useMemo(
    () => unit.map((item, index) => ({ ...item, key: (pagination.page - 1) * pagination.limit + index + 1 })),
    [unit, pagination]
  )

  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })

  const onDownloadCSV = useCallback(() => {
    const data = rowSelected.selectedRows.length
      ? rowSelected.selectedRows.map((item) => ({ historyId: item.historyId, userId: item?.userId, companyId: item?.companyId }))
      : []
    setCsvLoading(true)
    downloadUnitResultCSV({
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
    <WrapperStyle>
      <Title
        icon={EditOutlined}
        title={t('completion_status_by_user')}
      />
      <FilterBlock
        setSortInfo={setSortInfo}
        sortParams={sortParams}
        isSuperAdmin={isSuperAdmin}
        companyAll={companyAll}
        setRowSelected={setRowSelected}
      />
      <TableSort
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true
        }}
        tableLayout="auto"
        scroll={{ x: 'max-content' }}
        loading={isLoading}
        dataSource={statusUnit}
        columns={columns}
        rowKey={({ key }) => key}
        selected={rowSelected.selectedRowKeys.length}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={handleTableChange}
        csv={statusUnit.length > 0 && ({
          text: t('common:download_csv'),
          onDownload: onDownloadCSV,
          loading: csvLoading || isLoading
        })}
        onSelectQuestions={onSelectQuestions}
      />
      {visibleQuestionsModal && <QuestionsModal recordId={recordId} typeSelected={selectedType} onClose={setVisibleQuestionsModal} />}
    </WrapperStyle>
  )
}

export default CompletionStatusByUserScreen
