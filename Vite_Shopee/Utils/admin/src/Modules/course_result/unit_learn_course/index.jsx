import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Title } from 'Components'
import { EditOutlined } from '@ant-design/icons'
import { useAuth, useRoles, useLoadCompanyAll, useHistories, useUnitLearnCourseStatus } from 'Hooks'
import { sortFullParams } from 'Utils'
import { Wrapper } from 'Themes/facit'
import styled from 'styled-components'
import { downloadUnitLearnCourseResultCSV } from 'APIs'
import tableColumns from './column'
import FilterBlock from './components/FilterBlock'
import { TableSort } from '../component'

const WrapperStyle = styled(Wrapper)`
  .ant-dropdown-menu {
    width: 300px;
    max-width: unset;
    position: absolute;
  }
`
const UnitLearnCourseScreen = () => {
  const { t } = useTranslation(['courseResult'])
  const {
    unit,
    pagination,
    filter,
    isLoading,
    loadUnitStatusAction
  } = useUnitLearnCourseStatus()
  const history = useHistories()
  const { isSuperAdmin } = useRoles()
  const { companyAll } = useLoadCompanyAll()
  const { metaData } = useAuth()
  const { total, limit: pageSize, page: currentPage } = pagination
  const { userId, roles } = metaData

  const [sortInfo, setSortInfo] = useState(null)
  const [sortParams, setSortParams] = useState({})
  const [csvLoading, setCsvLoading] = useState(false)

  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })

  const handleTableChange = (tablePaging, _, tableSorter) => {
    const defaultParams = {
      params: {
        ...filter,
        page: tablePaging.current || currentPage,
        limit: tablePaging.pageSize || pageSize,
        companyId: isSuperAdmin && filter?.companyId
      }
    }
    let params = {
      ...filter,
      userId,
      page: tablePaging.current || currentPage,
      limit: tablePaging.pageSize || pageSize,
      sortBy: null,
      sortType: null,
      companyId: isSuperAdmin && filter?.companyId
    }
    let fullParams = {
      userId,
      ...params
    }
    setSortInfo(tableSorter)
    setSortParams(sortFullParams(tableSorter?.field, tableSorter?.order, params, fullParams))
    if (tableSorter?.order) {
      loadUnitStatusAction(sortFullParams(tableSorter?.field, tableSorter?.order, params, fullParams))
    } else {
      loadUnitStatusAction(defaultParams)
    }
  }

  const columns = useMemo(
    () => tableColumns({ t, sortInfo, pagination, history }).filter((col) => col.rules.includes(roles?.[0])),
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
      ? rowSelected.selectedRows.map((item) => ({
        id: item.unitId,
        userId: item.userId,
        unitType: item.unitType,
        employeeNumber: item.employeeNumber
      }))
      : []
    setCsvLoading(true)
    downloadUnitLearnCourseResultCSV({
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
        title={t('unit_learn_course_of_user')}
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
        loading={isLoading}
        dataSource={statusUnit}
        columns={columns}
        rowKey={({ key }) => key}
        selected={rowSelected.selectedRowKeys.length}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={handleTableChange}
        csv={{
          text: t('common:download_csv'),
          onDownload: onDownloadCSV,
          loading: csvLoading || isLoading
        }}
      />
      {/* <HistoryUnitModal
        visible={visibleHistoryUnitModal}
        onClose={onCloseHistoryUnitModal}
        unitSelected={unitSelected}
      /> */}
    </WrapperStyle>
  )
}

export default UnitLearnCourseScreen
