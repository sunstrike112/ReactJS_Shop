/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  SnippetsOutlined
} from '@ant-design/icons'
import { Table, Title } from 'Components'
import { useAuth, useHistories, useRoles } from 'Hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useReportManagement } from 'Hooks/report_management'
import { Wrapper } from './styled'
import FilterBlock from './components/FilterBlock'
import tableColumns from './column'
import { RoutesName } from './routes'

const ReportManagementScreen = () => {
  const { t } = useTranslation(['reportTemplateManagement'])
  const {
    getListReportAction,
    listReport,
    filter
  } = useReportManagement()

  const history = useHistories()
  const { isSuperAdmin } = useRoles()
  const { metaData } = useAuth()
  const { roles, userId } = metaData
  const { pagination, isLoading } = listReport
  const { total, limit: pageSize, page: currentPage } = pagination
  const handleTableChange = (tablePaging) => {
    getListReportAction({
      ...filter,
      page: tablePaging.current,
      limit: tablePaging.pageSize
    })
  }

  const columns = React.useMemo(
    () => tableColumns({ t, pagination, history, isSuperAdmin, RoutesName }).filter((item) => item.rules.includes(roles?.[0])),
    [t, pagination, roles]
  )

  const dataReport = React.useMemo(() => listReport?.result?.map((report) => ({
    ...report
  })), [listReport])

  return (
    <Wrapper>
      <Title
        icon={SnippetsOutlined}
        title={t('report_title')}
      />
      <FilterBlock
        t={t}
        isSuperAdmin={isSuperAdmin}
      />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        dataSource={dataReport}
        columns={columns}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={handleTableChange}
        loading={isLoading}
        onDelete={() => setVisibleConfirmDelete(true)}
        isHideDelete
      />
    </Wrapper>
  )
}

export default ReportManagementScreen
