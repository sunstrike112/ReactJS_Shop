import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Title } from 'Components'
import { EditOutlined } from '@ant-design/icons'
import { useAuth, useCourseStatus, useRoles, useLoadCompanyAll, useHistories } from 'Hooks'

import { sortFullParams } from 'Utils'
import { Wrapper } from 'Themes/facit'
import { downloadCourseResultCSV } from 'APIs'
import QueryString from 'qs'
import { COMPANY_NAME } from 'Constants'
import tableColumns from './column'
import { FilterBlock } from './components'
import { TableSort } from '../component'
import { RoutesName } from '../routes'

const StatusLearnCourseScreen = () => {
  const { t } = useTranslation(['courseResult'])
  const history = useHistories()
  const {
    courses,
    pagination,
    filter,
    isLoading,
    loadCourseStatusAction
  } = useCourseStatus()
  const { metaData } = useAuth()
  const { isSuperAdmin } = useRoles()
  const { companyAll } = useLoadCompanyAll()
  const { idOfNissokenCompany } = companyAll

  const { total, limit: pageSize, page: currentPage } = pagination
  const { userId, roles } = metaData
  const [sortInfo, setSortInfo] = useState(null)
  const [sortParams, setSortParams] = useState({})
  const [csvLoading, setCsvLoading] = useState(false)
  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  const [filterValues, setFilterValues] = useState({
    companyId: { label: COMPANY_NAME.NISSOKEN, value: idOfNissokenCompany }
  })

  const handleTableChange = (tablePaging, _, tableSorter) => {
    const { field, order } = tableSorter
    let params = {
      ...filter,
      userId,
      page: tablePaging?.current,
      limit: tablePaging?.pageSize,
      sortBy: null,
      sortType: null,
      companyId: isSuperAdmin && filter?.companyId
    }
    let fullParams = {
      userId,
      ...params
    }
    setSortInfo(tableSorter)
    setSortParams(sortFullParams(field, order, params, fullParams))
    loadCourseStatusAction(sortFullParams(field, order, params, fullParams))
  }

  const onRedirectToUnitResult = useCallback((record) => {
    const queryParams = QueryString.stringify({
      ...filterValues,
      listCourseIds: [{ value: record.courseId, label: record.courseName }],
      signinId: record.signinId
    })
    history.push(`${RoutesName.COMPLETION_STATUS_BY_USER}?${queryParams}`)
  }, [filterValues])

  const columns = useMemo(
    () => tableColumns({ t, sortInfo, pagination, onRedirectToUnitResult }).filter((col) => col.rules.includes(roles?.[0])),
    [t, pagination, roles, onRedirectToUnitResult]
  )

  const statusCourse = useMemo(
    () => courses.map((item, index) => ({ ...item, key: (pagination.page - 1) * pagination.limit + index + 1 })),
    [courses]
  )

  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({
    selectedRowKeys,
    selectedRows
  })

  const onDownloadCSV = useCallback(() => {
    let data = rowSelected.selectedRows.length
      ? rowSelected.selectedRows.map((item) => ({ id: item.courseId, userId: item.userId, companyId: filter.companyId || item.companyId }))
      : []
    setCsvLoading(true)
    downloadCourseResultCSV({
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
        title={t('status_learn_course_of_user')}
      />
      <FilterBlock
        setSortInfo={setSortInfo}
        sortParams={sortParams}
        isSuperAdmin={isSuperAdmin}
        companyAll={companyAll}
        setRowSelected={setRowSelected}
        setFilterValues={setFilterValues}
      />
      <TableSort
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true
        }}
        dataSource={statusCourse}
        loading={isLoading}
        columns={columns}
        rowKey={(item) => item.key}
        selected={rowSelected.selectedRowKeys.length}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={handleTableChange}
        csv={statusCourse.length > 0 && ({
          text: t('common:download_csv'),
          onDownload: onDownloadCSV,
          loading: csvLoading || isLoading
        })}
      />
    </Wrapper>
  )
}

export default StatusLearnCourseScreen
