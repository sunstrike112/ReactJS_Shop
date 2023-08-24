/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { EditOutlined } from '@ant-design/icons'

import { sortFullParams } from 'Utils'
import { Title } from 'Components'
import { useAuth, useReportResult, useRoles, useLoadCompanyAll, useHistories } from 'Hooks'
import { Wrapper } from 'Themes/facit'
import tableColumns from './column'
import { FilterBlock } from './components'
import { TableSort } from '../component'

const ReportHistories = () => {
  const { t } = useTranslation(['courseResult'])
  const {
    results,
    pagination,
    filter,
    isLoading,
    loadReportResultAction
  } = useReportResult()
  const history = useHistories()
  const { metaData } = useAuth()
  const { userId, roles } = metaData
  const { isSuperAdmin } = useRoles()
  const { companyAll } = useLoadCompanyAll()
  const { idOfNissokenCompany } = companyAll
  const { total, limit: pageSize, page: currentPage } = pagination

  const [sortInfor, setSortInfo] = useState(null)
  const [sortParams, setSortParams] = useState({})

  const handleTableChange = (tablePaging, _, tableSorter) => {
    const { field, order } = tableSorter
    let params = {
      ...filter,
      userId,
      page: tablePaging?.current,
      limit: tablePaging?.pageSize,
      sortBy: null,
      sortType: null
    }
    let fullParams = {
      userId,
      ...params
    }
    setSortInfo(tableSorter)
    setSortParams(sortFullParams(field, order, params, fullParams))
    loadReportResultAction(sortFullParams(field, order, params, fullParams))
  }

  const evaluation = (report) => {
    const { courseId, userId: UserId, reportId, created } = report
    history.push(`/course-result/report-histories/evaluate-report?courseId=${courseId}&userId=${UserId}&reportId=${reportId}&created=${created}`)
  }

  const columns = useMemo(
    () => tableColumns({ t, sortInfor, pagination, action: { evaluation }, isSuperAdmin }).filter((col) => col.rules.includes(roles?.[0])),
    [t, pagination, roles, isSuperAdmin]
  )

  const resultsData = useMemo(
    () => results.map((item, index) => ({ ...item, key: (pagination.page - 1) * pagination.limit + index + 1 })),
    [results, pagination]
  )

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('report_histories_title')}
      />
      <FilterBlock
        setSortInfo={setSortInfo}
        sortParams={sortParams}
        pageSize={pageSize}
        companyAll={companyAll}
      />
      <TableSort
        rowKey={(record) => record.key}
        dataSource={resultsData}
        columns={columns}
        loading={isLoading}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={handleTableChange}
      />
    </Wrapper>
  )
}

export default ReportHistories
