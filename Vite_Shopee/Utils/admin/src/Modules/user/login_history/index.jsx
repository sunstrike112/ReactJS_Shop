import React, { useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { HistoryOutlined } from '@ant-design/icons'

import { Table, Title } from 'Components'
import { useLoginHistory } from 'Hooks'
import { Wrapper } from 'Themes/facit'
import tableColumns from './column'
import FilterBlock from './components/FilterBlock'

const LoginHistoryScreen = () => {
  const { t } = useTranslation(['user'])
  const {
    histories,
    pagination,
    filter,
    loadLoginHistoriesAction,
    isLoading,
    resetLoginHistoriesAction
  } = useLoginHistory()
  const { total, limit: pageSize, page: currentPage } = pagination

  const handleTableChange = useCallback((tablePaging) => {
    loadLoginHistoriesAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize,
        filter
      }
    })
  }, [filter])

  const dataHistory = useMemo(
    () => histories.map((item, index) => ({ ...item, key: index })),
    [histories]
  )

  const columns = useMemo(
    () => tableColumns({ t, pagination }),
    [t, pagination]
  )

  return (
    <Wrapper>
      <Title
        icon={HistoryOutlined}
        title={t('login_history_management.title')}
      />
      <FilterBlock
        t={t}
        loadLoginHistoriesAction={loadLoginHistoriesAction}
        resetLoginHistoriesAction={resetLoginHistoriesAction}
        pageSize={pageSize}
      />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        rowKey={(record) => record.key}
        dataSource={dataHistory}
        columns={columns}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={handleTableChange}
        isHideDelete
        loading={isLoading}
        pagination={dataHistory.length > 0}
      />
    </Wrapper>
  )
}

export default LoginHistoryScreen
