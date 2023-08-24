import { useCompanyWaiting, useHistories } from 'Hooks'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { BlockOutlined } from '@ant-design/icons'
import { Table, Title } from 'Components'
import { Wrapper } from 'Themes/facit'
import tableColumns from './column'

const CompanyWaitingScreen = () => {
  // Use hooks
  const { t } = useTranslation(['company'])
  const history = useHistories()
  const {
    isLoading, data, filter, pagination,
    getCompanyListWaitingAction
  } = useCompanyWaiting()
  // End use hooks

  const { page, limit, total } = pagination

  const columns = useMemo(() => tableColumns({ t, pagination, history }), [t, pagination])

  const handleOnChange = (tablePaging) => {
    getCompanyListWaitingAction({
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize,
        filter
      }
    })
  }

  return (
    <Wrapper>
      <Title
        icon={BlockOutlined}
        title={t('waiting.title')}
      />
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        rowKey={(record) => `${record.companyId}`}
        columns={columns}
        dataSource={data}
        total={total}
        pageSize={limit}
        currentPage={page}
        onChange={handleOnChange}
        loading={isLoading}
        isHideDelete
      />
    </Wrapper>
  )
}

export default CompanyWaitingScreen
