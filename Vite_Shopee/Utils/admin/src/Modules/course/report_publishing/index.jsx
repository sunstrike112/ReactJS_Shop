import React, { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistories, useLoadReports } from 'Hooks'

import { Title, Table } from 'Components'
import { FilterBlock } from './components'
import { Wrapper } from './styled'
import tableColumns from './column'

const ReportPublishingScreen = () => {
  const { t } = useTranslation(['report_setting'])
  const history = useHistories()
  const { loadReportsAction, reports, pagination, filter } = useLoadReports()

  useEffect(() => {
    loadReportsAction({ params: { limit: 100 } })
  }, [])

  const dataSourceReport = useMemo(
    () => reports?.map((item, index) => ({
      ...item,
      index: index + 1,
      publicSetting: item.publicSetting === 'PRIVATE' ? t('do_not_publish') : t('publish')
    })),
    [t, reports]
  )

  const columns = useMemo(
    () => tableColumns({ t, pagination, history }),
    [t, pagination]
  )

  const handleOnChange = useCallback((tablePaging) => (
    loadReportsAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize,
        filter
      }
    })
  ), [filter])

  return (
    <Wrapper>
      <Title
        title={t('title')}
      />
      <FilterBlock />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        columns={columns}
        dataSource={dataSourceReport}
        total={pagination.total}
        pageSize={pagination.limit}
        currentPage={pagination.page}
        onChange={handleOnChange}
      />
    </Wrapper>
  )
}

export default ReportPublishingScreen
