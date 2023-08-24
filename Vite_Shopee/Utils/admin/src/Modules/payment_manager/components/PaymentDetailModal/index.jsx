import React, { useCallback } from 'react'
import { Modal, Table } from 'Components'
import { useMyCompany } from 'Hooks'
import moment from 'moment-timezone'
import PropTypes from 'prop-types'
import { formatToCurrency } from 'Utils/number'
import { formatDate } from 'Utils'
import { FORMAT_TIME } from 'Constants/formatTime'
import { WrapperError, WrapperModal } from './styled'

const PaymentDetailModal = ({ t, showModal, setShowModal, errorCodeMassage, companyId, filter }) => {
  const {
    loadPaymentHistories,
    paymentHistories,
    pagination,
    paymentHistoriesIsLoading
  } = useMyCompany()
  const { total, limit: pageSize, page: currentPage } = pagination
  const checkIsPreMonth = (record) => moment(moment.unix(record.fromDate / 1000)).tz('Asia/Tokyo').format('MM') !== moment(`${filter?.month}-01`).format('MM')

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
      title: t('manager.paymentDate'),
      dataIndex: 'paymentDeadline',
      key: 'paymentDeadline',
      render: (text, record) => (
        <div>{formatDate(moment.unix(record.fromDate / 1000), FORMAT_TIME.DATE_HOUR_MINUTES_SECOND)}</div>
      )
    },
    {
      title: t('manager.overview'),
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => (
        <div className={checkIsPreMonth(record) ? 'highlight' : ''}>{record.description}</div>
      )
    },
    {
      title: t('manager.amount'),
      dataIndex: 'totalPayment',
      key: 'totalPayment',
      render: (text) => (
        <div>{t('manager.price', { value: formatToCurrency(text) })}</div>
      )
    }
  ]

  const handleTableChange = useCallback((tablePaging) => {
    loadPaymentHistories({
      page: tablePaging.current,
      limit: tablePaging.pageSize,
      companyId,
      month: filter?.month
    })
  }, [filter, companyId])

  return (
    <Modal
      visible={showModal}
      onCancel={() => setShowModal(false)}
      title={t('manager.usage_details')}
      onCancelText={t('manager.close_up')}
      ok={false}
    >
      <WrapperModal>
        {errorCodeMassage && (
          <WrapperError>
            <b>
              {`${errorCodeMassage}: ${t(`error_payment.${errorCodeMassage}_info`)}`}
              <br />
              {t(`error_payment.${errorCodeMassage}_treatment`)}
            </b>
          </WrapperError>
        )}
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
          onChange={handleTableChange}
          isHideDelete
        />
      </WrapperModal>
    </Modal>
  )
}

export default PaymentDetailModal

PaymentDetailModal.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.string,
  errorCodeMassage: PropTypes.string,
  companyId: PropTypes.string,
  filter: PropTypes.object
}
