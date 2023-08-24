import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useCompanyRefused } from 'Hooks'

import { Title, Table } from 'Components'
import { CloseCircleOutlined } from '@ant-design/icons'
import { Wrapper } from 'Themes/facit'
import tableColumns from './column'

const CompanyRefuseScreen = () => {
  // Use hooks
  const { t } = useTranslation(['company'])
  const { isLoading, data, pagination, filter, getCompanyListRefusedAction, moveCompanyRefusedToWaitingAction } = useCompanyRefused()
  // End use hooks

  const { page, limit, total } = pagination

  const columns = useMemo(() => tableColumns({ t, pagination, moveCompanyRefusedToWaitingAction }),
    [t, pagination, moveCompanyRefusedToWaitingAction])

  const handleOnChange = (tablePaging) => {
    getCompanyListRefusedAction({
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
        icon={CloseCircleOutlined}
        title={t('refused.title')}
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

export default CompanyRefuseScreen
