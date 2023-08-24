/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useCompanyManagement, useHistories, useLoadContractPlan } from 'Hooks'

import { Title, Table } from 'Components'
import { downloadCompanyCSV } from 'APIs'
import { EditOutlined } from '@ant-design/icons'
import { Wrapper } from 'Themes/facit'
import { PLAN_TYPE } from 'Constants'
import { DEFAULT_PAG } from 'Utils'
import { FilterBlock } from './components'
import tableColumns from './column'

const CompanyManagementScreen = () => {
  const { t, i18n: { language } } = useTranslation(['company'])
  const history = useHistories()

  const {
    loadCompanyListAction,
    companyList,
    pagination,
    filter,
    isLoading,
    deleteCompanyAction
  } = useCompanyManagement()
  const [isReloadTable, setIsReloadTable] = useState(false)
  const [filterDownloadCSV, setFilterDownloadCSV] = useState({})
  const [csvLoading, setCsvLoading] = useState(false)
  const { page, limit, total } = pagination

  const { loadContractPlanAction } = useLoadContractPlan()

  useEffect(() => {
    loadContractPlanAction({ params: { type: PLAN_TYPE.PLAN_USER } })
  }, [])

  const handleDelete = useCallback(
    (company) => {
      deleteCompanyAction({
        companyId: company.companyId,
        params: {
          ...pagination,
          filter
        }
      })
    },
    [pagination, filter]
  )

  const columns = useMemo(
    () => tableColumns({ t, pagination, history, handleDelete }),
    [t, pagination, handleDelete]
  )

  const handleOnChange = (tablePaging) => {
    loadCompanyListAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize,
        filter
      }
    })
  }

  const onDownloadCSV = useCallback(
    () => {
      setCsvLoading(true)
      downloadCompanyCSV({
        ...filterDownloadCSV,
        timezone: new Date().getTimezoneOffset()
      }).finally(() => setCsvLoading(false))
    },
    [filterDownloadCSV]
  )

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('title')}
      />
      <FilterBlock
        t={t}
        isReloadTable={isReloadTable}
        setFilterDownloadCSV={setFilterDownloadCSV}
        limit={limit}
      />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        columns={columns}
        dataSource={companyList}
        total={total}
        pageSize={limit}
        currentPage={page}
        onChange={handleOnChange}
        loading={isLoading}
        isHideDelete
        csv={companyList.length > 0 ? {
          text: t('common:download_csv'),
          onDownload: onDownloadCSV,
          loading: csvLoading || isLoading
        } : null}
        rowKey="companyId"
        pagination={companyList.length > 0}
      />
    </Wrapper>
  )
}

export default CompanyManagementScreen
