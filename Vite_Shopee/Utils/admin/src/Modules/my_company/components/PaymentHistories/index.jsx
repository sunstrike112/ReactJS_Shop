/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Divider, TBody, Tr } from 'Themes/facit'
import { Select } from 'antd'
import moment from 'moment-timezone'

import { generateToken, logBeforeChangeCardAPI, noticePaymentSuccessAPI } from 'APIs'
import { useQuery } from 'Hooks/useQuery'
import { formatToCurrency } from 'Utils/number'
import { useMyCompany } from 'Hooks'
import { Text, Modal } from 'Components'
import TrialModal from 'Components/TrialModal'
import { ROBOT_PAYMENT_STORE_ID } from 'Constants'
import { StyledSubmitButton, SubmitButton } from '../../styled'
import PaymentHistoriesModal from '../PaymentHistoriesModal'
import { StyledPaymentHistories, StyledTable } from '../PaymentInfo/styled'
import { StyledTd, StyledTh } from '../CompanyInfos/styled'

const PaymentHistories = ({
  company,
  companyId,
  errorAPI,
  handleSelectPlan,
  isSuperAdmin,
  isVisibleTrialModal,
  selectedPlan,
  setIsVisibleTrialModal
}) => {
  const [t] = useTranslation(['myCompany', 'common'])
  const query = useQuery()
  const rst = query.get('rst') && parseInt(query.get('rst'), 10) // params from robot payment
  const ac1 = query.get('ac1') && parseInt(query.get('ac1'), 10) // params from robot payment

  const STATUS_PAYMENT = {
    'SUCCESS': 1,
    'FAILURE': 0
  }

  const STATUS_WAITING_PAYMENT = {
    'SUCCESS': 0,
    'PENDING': 1,
    'FAILURE': 2
  }

  const {
    loadPaymentHistories,
    paymentHistories,
    pagination,
    paymentHistoriesIsLoading,
    billStatus,
    isCardError,
    plans,
    loadCompanyInfo,
    dataCancel,
    isLoading
  } = useMyCompany()

  const [isFailModalShow, setIsFailModalShow] = useState(false)
  const [isPaymentHistoriesShowModal, setIsPaymentHistoriesShowModal] = useState(false)
  const [totalPayment, setTotalPayment] = useState(0)
  const [paymentStatus, setPaymentStatus] = useState(true)
  const [paymentDeadline, setPaymentDeadline] = useState(0)
  const [currentMonth, setCurrentMonth] = useState({
    value: moment().format('YYYY-MM'),
    label: t('dateTime', {
      year: moment().format('YYYY'),
      month: moment().format('MM')
    })
  })
  const [visibleChangeCard, setVisibleChangeCard] = useState(false)
  const [isWaitingPayment, setIsWaitingPayment] = useState(true)
  const [paymentData, setPaymentData] = useState(null)
  const [isLoadingPayment, setIsLoadingPayment] = useState(false)
  const [isLoggingBeforeChangeCard, setIsLoggingBeforeChangeCard] = useState(false)

  const formRef = useRef()
  const formChangeInfoRef = useRef()

  const cellPhoneNumber = useMemo(() => company.cellPhoneNumber?.replace(/-/g, ''), [company.cellPhoneNumber])

  const idOfCompany = useMemo(() => company.companyId, [company.companyId]) // id of account company

  useEffect(() => {
    if (idOfCompany && !isSuperAdmin) {
      loadPaymentHistories({
        month: currentMonth.value,
        companyId: idOfCompany
      })
    }
  }, [idOfCompany, isSuperAdmin, currentMonth.value])

  useEffect(() => {
    if (companyId && isSuperAdmin) {
      loadPaymentHistories({
        month: currentMonth.value,
        companyId
      })
    }
  }, [companyId, isSuperAdmin, currentMonth.value])
  // Handle waiting payment
  useEffect(() => {
    if (typeof rst === 'number') {
      if (rst === STATUS_PAYMENT.SUCCESS) {
        noticePaymentSuccessAPI({ params: { paymentProcessing: rst } }).finally(() => loadCompanyInfo())
      } else if (rst === STATUS_PAYMENT.FAILURE) {
        setIsFailModalShow(true)
        loadCompanyInfo()
      }
    } else if (dataCancel && !isLoading) {
      loadCompanyInfo()
    } else if (!isSuperAdmin) loadCompanyInfo()
  }, [rst, isSuperAdmin, dataCancel])

  const [callAgain, setCallAgain] = useState(false)

  useEffect(() => {
    setCallAgain(true)
    let timeoutId = null
    if (callAgain && company.paymentProcessing === STATUS_WAITING_PAYMENT.PENDING) {
      timeoutId = setTimeout(() => {
        setCallAgain(false)
        loadCompanyInfo()
      }, 5000)
    }
    return () => clearTimeout(timeoutId)
  }, [callAgain, company.paymentProcessing])

  useEffect(() => {
    if (company.paymentProcessing === STATUS_WAITING_PAYMENT.SUCCESS || company.paymentProcessing === STATUS_WAITING_PAYMENT.FAILURE) {
      setIsWaitingPayment(false)
    }
  }, [company.paymentProcessing])
  // Handle waiting payment

  const monthOptions = []
  for (let i = 0; i < 12; i += 1) {
    const time = moment(moment().subtract(i, 'months').format('YYYY-MM')).valueOf()
    const companyTime = moment(moment.unix(company?.registerDate / 1000).format('YYYY-MM')).valueOf()
    if (time >= companyTime) {
      monthOptions.push({
        value: `${moment().subtract(i, 'months').format('YYYY-MM')}`,
        label: t('dateTime', {
          year: moment().subtract(i, 'months').format('YYYY'),
          month: moment().subtract(i, 'months').format('MM')
        })
      })
    }
  }

  useEffect(() => {
    if (paymentHistories) {
      const payment = paymentHistories
        .reduce((result, item) => result + item.totalPayment, 0)
      setTotalPayment(payment)
      let paymentDeadlineTemp = paymentDeadline
      paymentHistories.forEach((his) => {
        if (his.toDate >= paymentDeadlineTemp) {
          paymentDeadlineTemp = his.toDate
        }
      })
      setPaymentDeadline(paymentDeadlineTemp)
      const isPaid = paymentHistories.find(({ fromDate }) => moment(moment.unix(fromDate / 1000))
        .tz('Asia/Tokyo').format('YYYY-MM') !== currentMonth.value)
      if (isPaid) {
        setPaymentStatus(false)
      }
    }
  }, [paymentHistories])

  useEffect(() => {
    if (query.get('isSelectPlan') && plans && query.get('isSelectPlan') === 'true') {
      handleSelectPlan(0)
    }
  }, [query, plans])

  const handleChangeMonth = (value) => {
    setCurrentMonth(monthOptions.find((month) => month.value === value))
  }

  const handleReloadPage = () => {
    window.location.replace('/my-company')
  }

  const handleRetry = () => {
    setIsFailModalShow(false)
    handleSelectPlan(0)
  }

  const handlePaymentErrorCard = async () => {
    setIsLoadingPayment(true)
    const result = await generateToken({
      params: {
        planId: 0,
        dataId: 0,
        changeCard: !!isCardError
      }
    })
    const { code, data: dataAPI } = result
    if (code === 200) {
      setPaymentData(dataAPI)
      setTimeout(() => {
        formRef.current.submit()
      }, 100)
    }
  }

  const handleLogBeforeChangeCard = useCallback(async () => {
    setIsLoggingBeforeChangeCard(true)
    await logBeforeChangeCardAPI({ params: {
      aid: ROBOT_PAYMENT_STORE_ID,
      gid: company.gid,
      tid: company.gid
    } })
    formChangeInfoRef.current.submit()
  }, [company.gid, formChangeInfoRef.current])

  const renderProductPayment = () => {
    if (company?.planDataPackageDto?.name !== '100GB') {
      return `プラン${company?.planPackageDto?.name}, データ容量: ${company?.planDataPackageDto?.name}`
    }
    return `プラン${company?.planPackageDto?.name}`
  }

  const paymentFailure = company.paymentProcessing === STATUS_WAITING_PAYMENT.FAILURE
  const renderContentStatusPayment = useMemo(() => {
    switch (true) {
      case company.paymentProcessing === STATUS_WAITING_PAYMENT.FAILURE:
        return 'message.payment_failure'
      case Boolean(ac1):
        return 'message.payment_success'
      default: return 'message.change_plan_success'
    }
  })

  return (
    <>
      <StyledPaymentHistories>
        <div className="planName">
          <Text.primary fontWeight="fw_600" fontSize="size_16">
            {t('paymentHistories')}
          </Text.primary>
          <div className="selectMonthBox">
            <Text.primary fontWeight="fw_600" fontSize="size_16">
              {t('selectMonth')}
            </Text.primary>
            <Select
              value={currentMonth.value}
              options={monthOptions}
              onChange={handleChangeMonth}
              className="selectMonth"
              style={{ width: '50%' }}
            />
          </div>
        </div>
        <Divider />
        <div className="paymentInfo">
          <div className="paymentDate">
            <StyledTable>
              <TBody>
                <Tr>
                  <StyledTh className="th">{t('paymentStatus')}</StyledTh>
                  <StyledTd color={billStatus?.toUpperCase() === 'FAIL' ? 'red' : ''}>{company?.isTrial || !billStatus ? '' : t(billStatus.toLowerCase())}</StyledTd>
                </Tr>
                <Tr>
                  <StyledTh className="th">{t('nextPlanInformation')}</StyledTh>
                  <StyledTd>
                    {!company?.isTrial && `${t('planWithOutCharacter',
                      { name: company?.nextPlanPackageDto?.name || '' })}/${company?.nextPlanDataPackageDto?.name || ''}`}
                  </StyledTd>
                </Tr>
              </TBody>
            </StyledTable>
          </div>
          <Text.primary className="textAlign" fontWeight="fw_600" fontSize="size_24" color="green_strong">
            {company.isTrial ? t('trial') : t('price', { value: formatToCurrency(totalPayment) })}
          </Text.primary>
          <div className="buttonGroup">
            {/* View payment detail */}
            {(!company.isTrial && !errorAPI) && (
              <StyledSubmitButton
                htmlType="button"
                title={t('paymentDetail')}
                onClick={() => setIsPaymentHistoriesShowModal(true)}
              />
            )}

            {/* Change card information */}
            {(!isSuperAdmin && !company.isTrial && !company.isCancellation) && (
            <StyledSubmitButton
              htmlType="button"
              onClick={() => setVisibleChangeCard(true)}
              title={t('change_card_information')}
              disabled={isCardError || company?.isCancellation}
            />
            )}

          </div>
          {/* Register contract */}
          {((company.isTrial || errorAPI) && !isSuperAdmin) && (
          <SubmitButton
            htmlType="button"
            title={t('registerContract')}
            onClick={() => handleSelectPlan(0)}
            disabled={errorAPI}
          />
          )}
          <Text.primary
            className="textAlign"
            fontWeight="fw_600"
            color="red"
            fontSize="size_14"
          >
            {errorAPI.message}
          </Text.primary>

          <Modal
            visible={visibleChangeCard}
            onSubmitText={t('common:next')}
            onSubmit={handleLogBeforeChangeCard}
            cancel={false}
            onCancel={() => setVisibleChangeCard(false)}
            isLoadingSubmit={isLoggingBeforeChangeCard}
          >
            <Text.primary
              fontWeight="fw_600"
              style={{ textAlign: 'center' }}
              fontSize="size_16"
            >
              {t('message.guide_fill_auto_billing_number')}
              <br />
              {t('message.auto_billing_number', { number: company?.acid })}
            </Text.primary>
          </Modal>
          <form ref={formChangeInfoRef} id="changeInfoCard" action="https://credit.j-payment.co.jp/link/creditcard/auto-charge/update" method="POST">
            <input type="HIDDEN" name="aid" value={ROBOT_PAYMENT_STORE_ID} />
            <input type="HIDDEN" name="tid" value={company?.gid} />
          </form>
          {/* {Payment for error card} */}
          {(((billStatus?.toUpperCase() === 'FAIL') || !paymentStatus)
            && !company?.isTrial
            && isCardError
            && !isSuperAdmin
						&& !company.isCancellation
          )
            ? (
              <div className="changePayment">
                <Text.primary fontWeight="fw_600" style={{ color: 'red' }} fontSize="size_14">
                  {t('paymentExplain')}
                </Text.primary>
                <form ref={formRef} action="https://credit.j-payment.co.jp/link/creditcard" method="POST">
                  <input type="HIDDEN" className="店舗ID" name="aid" value={ROBOT_PAYMENT_STORE_ID} />
                  <input type="HIDDEN" name="pt" value="1" />
                  <input type="HIDDEN" className="AMOUNT" name="am" value={paymentData?.amount} />
                  <input type="HIDDEN" className="SHIPPING FEE" name="sf" value="0" />
                  <input type="HIDDEN" className="TAX" name="tx" value={paymentData?.amountTax} />
                  <input type="HIDDEN" className="JOB" name="jb" value="CAPTURE" />
                  <input type="HIDDEN" className="自動課金周期" name="actp" value="4" />
                  <input type="HIDDEN" className="自動課金金額" name="acam" value={totalPayment} />
                  <input type="HIDDEN" className="商品名" name="inm" value={renderProductPayment()} />
                  <input type="HIDDEN" className="商品番号" name="iid2" value={paymentData?.uid || new Date().getTime()} />
                  <input type="HIDDEN" className="課金日指定" name="ac1" value="1" />
                  <input type="HIDDEN" name="em" value={company?.email} />
                  <input type="HIDDEN" name="pn" value={cellPhoneNumber} />
                  <input type="HIDDEN" value={paymentData?.token || ''} name="others" />
                </form>
                <SubmitButton
                  className="button__submit button__change__credit"
                  htmlType="button"
                  title={t('changeCredit')}
                  onClick={handlePaymentErrorCard}
                  loading={isLoadingPayment}
                />
              </div>
            )
            : null}
        </div>
      </StyledPaymentHistories>
      <PaymentHistoriesModal
        visible={isPaymentHistoriesShowModal}
        onClose={setIsPaymentHistoriesShowModal}
        pagination={pagination}
        paymentHistories={paymentHistories}
        paymentHistoriesIsLoading={paymentHistoriesIsLoading}
        currentMonth={currentMonth}
        company={company}
        isSuperAdmin={isSuperAdmin}
        companyId={companyId}
      />
      {!isSuperAdmin && (
        <>
          {isVisibleTrialModal && (
            <TrialModal
              visible={isVisibleTrialModal}
              onClose={setIsVisibleTrialModal}
              plan={selectedPlan}
            />
          )}
          <Modal
            visible={rst === STATUS_PAYMENT.SUCCESS || company?.paymentProcessing === STATUS_WAITING_PAYMENT.PENDING}
            onSubmitText={t(isWaitingPayment ? 'common:waiting' : 'common:yes')}
            cancel={false}
            onSubmit={handleReloadPage}
            onClose={isWaitingPayment ? null : handleReloadPage}
            type={paymentFailure ? 'error' : 'success'}
            isLoadingSubmit={isWaitingPayment}
          >
            <Text.primary
              fontWeight="fw_600"
              style={{ color: paymentFailure ? 'red' : '#00C271', textAlign: 'center' }}
              fontSize="size_16"
            >
              {t(renderContentStatusPayment)}
            </Text.primary>
          </Modal>
          <Modal
            visible={isFailModalShow}
            onSubmitText={t('common:yes')}
            onCancelText={t('common:cancel')}
            onSubmit={handleRetry}
            onClose={handleReloadPage}
            onCancel={handleReloadPage}
            type="error"
          >
            <Text.primary
              fontWeight="fw_600"
              style={{ color: 'red', textAlign: 'center' }}
              fontSize="size_16"
            >
              {t('message.change_plan_fail')}
            </Text.primary>
          </Modal>
        </>
      )}
    </>
  )
}

export default PaymentHistories
