import React from 'react'
import { formatToCurrency } from 'Utils/number'
import { formatDate } from 'Utils'
import { FORMAT_TIME } from 'Constants/formatTime'
import { Column } from 'Constants'
import { Box, ButtonDetail } from './styled'

export default ({ t, pagination, handleDetailPayment, history }) => {
  const column = [
    {
      title: t('manager.payment_code'),
      dataIndex: 'gid',
      key: 'gid',
      ellipsis: true,
      width: 150
    },
    {
      title: t('manager.automatic_payment_code'),
      dataIndex: 'acid',
      key: 'acid',
      ellipsis: true,
      width: 200
    },
    {
      title: t('manager.company_name'),
      dataIndex: '',
      key: '',
      render: (record) => (
        <ButtonDetail
          onClick={() => history.push(`/company-management/company-detail?companyId=${record.companyId}`)}
        >
          {record?.companyName}
        </ButtonDetail>
      ),
      ellipsis: true,
      width: 300
    },
    {
      title: t('manager.amount'),
      dataIndex: 'amountOfMoney',
      key: 'amountOfMoney',
      render: (text) => t('manager.price', { value: formatToCurrency(text) }),
      ellipsis: true,
      width: 300
    },
    {
      title: t('manager.payment_completion_date'),
      dataIndex: '',
      key: '',
      width: 250,
      render: (action) => (
        <Box>
          {action?.paidDate ? formatDate(new Date(action?.paidDate), FORMAT_TIME.DATE_HOUR_MINUTES_SECOND) : ''}
        </Box>
      )
    },
    {
      title: t('manager.payment_results'),
      dataIndex: '',
      key: '',
      width: 150,
      render: (action) => (
        <Box>
          {t(`manager.${action?.paidStatus}`)}
        </Box>
      )
    },
    {
      title: t('manager.error_code'),
      dataIndex: 'errorCode',
      key: 'errorCode',
      width: 150,
      ellipsis: true
    }
  ]

  const onView = (record) => handleDetailPayment(record.errorCode, record.companyId)

  return [
    ...Column.orderAction({
      t,
      pagination,
      onView
    }),
    ...column
  ]
}
