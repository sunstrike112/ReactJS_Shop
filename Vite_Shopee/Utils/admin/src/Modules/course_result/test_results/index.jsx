import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Title } from 'Components'
import { EditOutlined } from '@ant-design/icons'
import { useAuth, useGetQuery, useTestResult } from 'Hooks'

import { STORAGE, getLocalStorage, sortFullParams } from 'Utils'
import { Wrapper } from 'Themes/facit'
import { downloadTestResultCSV } from 'APIs'
import tableColumns from './column'
import FilterBlock from './components/FilterBlock'
import { TableSort } from '../component'

const TestResultScreen = () => {
  const { t } = useTranslation(['courseResult'])
  const {
    testResult,
    pagination,
    filter,
    isLoading,
    loadTestResultAction
  } = useTestResult()
  const { metaData } = useAuth()
  const { total, limit: pageSize, page: currentPage } = pagination
  const { userId, roles } = metaData
  const { queryWorkspaceID } = useGetQuery()
  const language = getLocalStorage(STORAGE.LANGUAGE)

  const [sortInfor, setSortInfo] = useState(null)
  const [sortParams, setSortParams] = useState({})
  const [csvLoading, setCsvLoading] = useState(false)
  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })

  const handleTableChange = (tablePaging, tableFilter, tableSorter) => {
    const { field, order } = tableSorter
    let params = {
      ...filter,
      userId,
      page: tablePaging.current || currentPage,
      limit: tablePaging.pageSize || pageSize,
      sortBy: null,
      sortType: null,
      isAscending: null
    }
    let fullParams = {
      userId,
      ...params
    }
    setSortInfo(tableSorter)
    setSortParams(sortFullParams(field, order, params, fullParams))
    loadTestResultAction(sortFullParams(field, order, params, fullParams))
  }

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  //   loadTestResultAction({
  //     params: {
  //       page: 1,
  //       limit: 100,
  //       courseType: 'COMPANY'
  //     }
  //   })
  // }, [])

  const columns = useMemo(
    () => tableColumns({ t, sortInfor, pagination, roles, queryWorkspaceID, language }).filter((col) => col.rules.includes(roles?.[0])),
    [t, pagination, roles, queryWorkspaceID]
  )

  const testResultData = useMemo(
    () => testResult.map((item, index) => ({
      ...item,
      key: (pagination.page - 1) * pagination.limit + index + 1,
      highestScore: (item?.qualityCorrectUnitTestResult === null || item.qualityTotalUnitTestResult === null) ? '' : `${item?.qualityCorrectUnitTestResult}/${item?.qualityTotalUnitTestResult}`
    })),
    [testResult, pagination]
  )

  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })

  const onDownloadCSV = useCallback(() => {
    let data = rowSelected.selectedRows.length
      ? rowSelected.selectedRows.map((item) => ({ id: item.unitTestId, userId: item.userId }))
      : []
    setCsvLoading(true)
    downloadTestResultCSV({
      params: {
        ...filter,
        page: null,
        limit: null,
        timezone: new Date().getTimezoneOffset()
      },
      data
    }).finally(() => setCsvLoading(false))
  }, [rowSelected.selectedRows, filter])

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('test_results')}
      />
      <FilterBlock
        setSortInfo={setSortInfo}
        sortParams={sortParams}
        setRowSelected={setRowSelected}
      />
      <TableSort
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true
        }}
        dataSource={testResultData}
        loading={isLoading}
        columns={columns}
        selected={rowSelected.selectedRowKeys.length}
        rowKey={(item) => item.key}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={handleTableChange}
        csv={testResultData.length > 0 && ({
          text: t('common:download_csv'),
          onDownload: onDownloadCSV,
          loading: csvLoading || isLoading
        })}
      />
    </Wrapper>
  )
}

export default TestResultScreen
