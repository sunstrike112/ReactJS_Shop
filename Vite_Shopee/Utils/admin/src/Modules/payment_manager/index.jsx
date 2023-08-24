import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistories, useLoadPaymentList, useMyCompany } from 'Hooks'

import { Title, Table } from 'Components'
import { EditOutlined } from '@ant-design/icons'
import { Wrapper } from 'Themes/facit'
import tableColumns from './column'
import { FilterBlock, PaymentDetailModal } from './components'
import { WrapperTable } from './styled'

const PaymentManagementScreen = () => {
  const { t } = useTranslation(['paymentManager'])
  const history = useHistories()

  const {
    loadPaymentHistoryListAction,
    listPaymentHistory,
    pagination,
    filter,
    isLoading
  } = useLoadPaymentList()
  const { page, limit, total } = pagination
  const { loadPaymentHistories } = useMyCompany()

  const [showModal, setShowModal] = useState(false)
  const [errorCodeMassage, setErrorCodeMassage] = useState('')
  const [companyIds, setCompanyIds] = useState('')

  const handleDetailPayment = async (value, companyId) => {
    await loadPaymentHistories({
      month: filter?.month,
      companyId
    })
    setCompanyIds(companyId)
    setErrorCodeMassage(value)
    setShowModal(true)
  }

  const columns = useMemo(() => tableColumns({ t, pagination, history, setShowModal, handleDetailPayment }),
    [t, pagination])

  const handleOnChangePag = useCallback(({ current, pageSize }) => {
    loadPaymentHistoryListAction({
      params: {
        page: current,
        limit: pageSize,
        filter
      }
    })
  }, [filter])

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('title')}
      />
      <FilterBlock t={t} />
      <WrapperTable>
        <Table
          locale={{ emptyText: t('common:empty_data') }}
          columns={columns}
          dataSource={listPaymentHistory}
          total={total}
          pageSize={limit}
          currentPage={page}
          onChange={handleOnChangePag}
          loading={isLoading}
          rowClassName={({ paidStatus }) => (paidStatus === 'FAIL' ? 'highlight-row' : '')}
          isHideDelete
          pagination={listPaymentHistory.length > 0}
        />
      </WrapperTable>
      <PaymentDetailModal
        t={t}
        showModal={showModal}
        setShowModal={setShowModal}
        errorCodeMassage={errorCodeMassage}
        companyId={companyIds}
        filter={filter}
      />
    </Wrapper>
  )
}

export default PaymentManagementScreen
