/* eslint-disable react/prop-types */
import React from 'react'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import moment from 'moment-timezone'

import './index.css'
import { formatToCurrency } from 'Utils/number'
import { Modal, Table } from 'Components'
import { FORMAT_TIME } from 'Constants/formatTime'
import { formatDate } from 'Utils'
import { ModalWrapper } from './styled'

const PaymentHistoriesModal = ({
  pagination = {},
  paymentHistories,
  currentMonth,
  onClose,
  visible,
  errors,
  paymentHistoriesIsLoading = false
}) => {
  const { t } = useTranslation(['myCompany'])
  const { total, limit: pageSize, page: currentPage } = pagination

  const checkIsPreMonth = (record) => moment(moment.unix(record.fromDate / 1000))
    .tz('Asia/Tokyo').format('MM') !== moment(`${currentMonth?.value}-01`).format('MM')

  // const createOverview = (record) => {
  //   if (checkIsPreMonth(record)) {
  //     return t('payment_for_previous_month', { value: moment(moment.unix(record.fromDate / 1000)).tz('Asia/Tokyo').format('MM') })
  //   }
  //   switch (record.type) {
  //     case PLAN_TYPE.PLAN_DATA: {
  //       return t('payment_for_data', { value: record.planName })
  //     }
  //     case PLAN_TYPE.PLAN_USER: {
  //       return t('payment_for_package', { value: record.planName })
  //     }
  //     default: {
  //       return t('initial_cost')
  //     }
  //   }
  // }

  const columns = [
    {
      title: 'No.',
      dataIndex: 'userId',
      key: 'userId',
      width: 60,
      align: 'right',
      render: (text, record, index) => (
        <div>{`${(pagination.page - 1) * pagination.limit + index + 1}`}</div>
      )
    },
    {
      title: t('paymentDate'),
      dataIndex: 'paymentDeadline',
      key: 'paymentDeadline',
      render: (text, record) => (
        <div>{formatDate(moment.unix(record.fromDate / 1000), FORMAT_TIME.YEAR_MONTH_DATE)}</div>
      )
    },
    {
      title: t('overview'),
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => (
        <div className={checkIsPreMonth(record) ? 'highlight' : ''}>{record.description}</div>
      )
    },
    {
      title: t('amount'),
      dataIndex: 'totalPayment',
      key: 'totalPayment',
      render: (text) => (
        <div>{t('price', { value: formatToCurrency(text) })}</div>
      )
    }
  ]

  return (
    <Modal
      visible={visible}
      onCancel={() => onClose(false)}
      title={t('paymentHistoriesDetail')}
      onCancelText={t('close')}
      ok={false}
      destroyOnClose
      forceRender
      disabledSubmit={!isEmpty(errors)}
      titleIcon={false}
    >
      <ModalWrapper>
        <Table
          locale={{ emptyText: t('common:empty_data') }}
          rowKey={(record) => record.paymentId}
          dataSource={paymentHistories}
          columns={columns}
          total={total}
          currentPage={currentPage}
          pageSize={pageSize}
          pagination={false}
          loading={paymentHistoriesIsLoading}
          isHideDelete
        />
      </ModalWrapper>

    </Modal>
  )
}

export default PaymentHistoriesModal
