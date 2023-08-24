/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Select, Row, Spin, ConfigProvider, Popconfirm } from 'antd'
import moment from 'moment-timezone'

import { changePlan, generateToken } from 'APIs'
import PlanListModal from 'Components/PlanListModal'
import { useMyCompany } from 'Hooks'
import './index.css'
import { Modal, Text } from 'Components'
import { formatToCurrency } from 'Utils/number'
import { PLAN_TYPE, ROBOT_PAYMENT_STORE_ID } from 'Constants'
import { CancelButton, ModalWrapper, PlanBox, PlanWrapper, SubmitButton, ButtonWrapper } from './styled'

const ChangePlanModal = ({ company, onClose, visible, errors, plan = null }) => {
  const { plans, loadCompanyInfo, loadPlans, loadPaymentHistories, isCardError } = useMyCompany()
  const { t } = useTranslation(['myCompany', 'common'])
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [openPlanListModal, setOpenPlanListModal] = useState(false)
  const [isError, setIsError] = useState(false)
  const [paymentData, setPaymentData] = useState('')
  const [descriptionText, setDescriptionText] = useState('')
  const [isChangePlanSuccess, setChangePlanIsSuccess] = useState(false)
  const [successContent, setSuccessContent] = useState('')
  const [isLoading, setIsLoading] = useState('')
  const [isPayment, setIsPayment] = useState(false)

  const priceCurrentPlan = (company?.planPackageDto?.price + company?.planPackageDto?.tax) || 0

  const cellPhoneNumber = useMemo(() => company?.cellPhoneNumber?.replace(/-/g, ''), [company])

  const planOptions = useMemo(() => {
    if (plans) {
      if (company?.isTrial) {
        plans.push({ id: 0, label: t('trial') })
      }
      let minUser = 1
      return plans.map(({ id, name, price, label, userUse: maxUser }) => {
        const item = {
          value: id,
          label: id ? `${name} - ${t('userUse', { minUser, maxUser })}\u00A0\u00A0\u00A0\u00A0\u00A0${t('price', { value: formatToCurrency(price) })}` : label
        }
        minUser = maxUser + 1
        return item
      })
    }
    return []
  }, [plans, company, t])

  const handleGetPaymentData = async (selectedPlanId = 0) => {
    if (!selectedPlanId) {
      return setPaymentData(null)
    }
    const data = await generateToken({
      params: {
        planId: selectedPlanId,
        changeCard: !!isCardError
      }
    })
    if (data?.code === 200) {
      return setPaymentData(data.data)
    }
    return false
  }

  const setSuccessMessage = () => {
    if (selectedPlan?.id !== company?.planPackageDto?.id) {
      return setSuccessContent(t('message.change_plan_success'))
    }
    return setSuccessContent('')
  }

  const reset = async () => {
    setDescriptionText('')
    setIsError(false)
    setSuccessContent('')
    setChangePlanIsSuccess(false)
  }

  const validate = (selPlan) => {
    if (!selPlan?.id && !company?.isTrial) {
      setDescriptionText(t('message.cantSelectTrialPlan'))
      setIsError(true)
      return false
    }

    if (selPlan.userUse < company?.numberOfUserJoined
      && selPlan?.id !== company?.planPackageDto?.id) {
      setDescriptionText(t('message.numberUserOfPlanlessThenNumberUserOfCompany'))
      setIsError(true)
      return false
    }

    if (selPlan?.id === company?.nextPlanPackageDto?.id) {
      setDescriptionText(t('message.cantSelectCurrentPlan'))
      setIsError(true)
      return false
    }

    setDescriptionText(t('message.changePlanConfirm'))
    setIsError(false)
    return true
  }

  const handleChangePlan = async (value) => {
    setOpenPlanListModal(false)
    reset()
    const valuePlan = plans.find((planData) => planData.id === value)
    setSelectedPlan(valuePlan)
    validate(valuePlan)
    await handleGetPaymentData(value)
    return false
  }

  const handleSubmitChangePlan = async () => {
    if (!company?.isTrial && validate(selectedPlan)) {
      setIsLoading(true)
      const planIds = []
      if (selectedPlan) {
        planIds.push(selectedPlan?.id)
      }

      const data = await changePlan(planIds)
      if (data.code === 200) {
        setSuccessMessage()
        setChangePlanIsSuccess(data.code === 200)
        setSelectedPlan(selectedPlan)
        setIsLoading(false)
      }
    }
  }

  const handleClose = () => {
    loadCompanyInfo()
    onClose(false)
  }

  const renderPlan = () => (
    <PlanBox>
      <div className="planBox">
        <Text.primary className="title" fontSize="size_16">{t('selectPlan')}</Text.primary>
        <div id="selectPlan">
          <ConfigProvider getPopupContainer={() => document.getElementById('selectPlan')}>
            <Select
              value={selectedPlan?.id || 0}
              options={planOptions}
              onChange={handleChangePlan}
              className="selectPlan"
              style={{ width: '100%' }}
            />
          </ConfigProvider>
        </div>
        {!!selectedPlan?.id && (
          <>
            <Text.primary className="title" fontSize="size_16">{`${t('planName')}: `}<span>{selectedPlan?.name}</span></Text.primary>
            <Text.primary className="title" fontSize="size_16">
              {`${t('planInfo.userUsageInfo')}: `}
              <span>{t('planInfo.userUsage', { value: selectedPlan?.userUse })}</span>
            </Text.primary>
            <Text.primary className="title" fontSize="size_16">
              {`${t('priceInfo')}: `}
              <span>{t('price', { value: formatToCurrency(selectedPlan?.price) })}</span>
            </Text.primary>
          </>
        )}
      </div>
    </PlanBox>
  )

  useEffect(() => {
    if (company?.isTrial) {
      setSelectedPlan({ id: 0, label: t('trial') })
    }
    if (plans && plan) {
      const selPlan = plans.find(({ id }) => id === plan.id)
      setSelectedPlan(selPlan)
      validate(selPlan)
    }
  }, [company, plan])

  useEffect(() => {
    if (selectedPlan?.price > priceCurrentPlan) {
      setIsPayment(true)
    } else {
      setIsPayment(false)
    }
  }, [selectedPlan])

  useEffect(async () => {
    if (company.companyId) {
      loadPaymentHistories({
        month: moment().format('YYYY-MM'),
        companyId: company.companyId
      })
    }
  }, [company.companyId])

  useEffect(() => {
    loadPlans(PLAN_TYPE.PLAN_USER)
  }, [])

  return (
    <Modal
      visible={visible}
      onCancel={() => handleClose(false)}
      title={company?.isTrial ? t('registerContract') : t('changePlan')}
      disabledSubmit={!isEmpty(errors)}
      isNotFooterButton
      destroyOnClose
      forceRender
      overflow="visible"
      titleIcon={false}
    >
      <ModalWrapper>
        <Row justify="center" align="middle" className="modal-header" gutter={[4, 4]}>
          <Text.primary className="title" fontSize="size_14">{t('upgradePlanText')}</Text.primary>
        </Row>
        <Row justify="center" align="middle" className="modal-header" gutter={[4, 4]}>
          <Text.primary className="title" fontSize="size_14">
            {t('askUpgradePlan')}
            <SubmitButton
              className="button__submit button__change__credit"
              htmlType="button"
              onClick={() => setOpenPlanListModal(true)}
              title={t('openPlanList')}
            />
          </Text.primary>
        </Row>
        <PlanWrapper>
          {renderPlan()}
          <Row justify="center" align="middle" className="modal-header" style={{ width: '80%' }} gutter={[4, 4]}>
            {isError && (
              <Text.primary className="title" fontSize="size_14" color="error_ant">
                {descriptionText}
              </Text.primary>
            )}
            {(isChangePlanSuccess && successContent)
              && (
              <Text.primary className="title" fontSize="size_14" color="bd_success">
                {successContent}
              </Text.primary>
              )}
            {isLoading && <Spin />}
          </Row>
          <ButtonWrapper>
            {!isError && (
              <>
                <CancelButton
                  className="button__submit"
                  htmlType="button"
                  title={t('close')}
                  disabled={isError}
                  onClick={handleClose}
                />
                {(company?.isTrial || isCardError)
                  ? (
                    <SubmitButton
                      className="button__submit"
                      htmlType="submit"
                      form="payment-form"
                      disabled={isError || !selectedPlan?.id}
                      title={t('payment')}
                    />
                  )
                  : (isPayment
                    ? (
                      <SubmitButton
                        className="button__submit"
                        htmlType="submit"
                        form="upgradePayment-form"
                        disabled={isError || !selectedPlan?.id}
                        title={t('payment')}
                      />
                    )
                    : (
                      <Popconfirm
                        title={t('message.change_plan_confirm', {
                          plan: selectedPlan?.name
                        })}
                        onConfirm={handleSubmitChangePlan}
                      >
                        <SubmitButton
                          className="button__submit"
                          htmlType="button"
                          title={t('change')}
                          disabled={isError}
                        />
                      </Popconfirm>
                    )
                  )}
              </>
            )}
          </ButtonWrapper>
          {(!isError && !company?.isTrial && !isCardError) ? (
            <form id="upgradePayment-form" action="https://credit.j-payment.co.jp/link/creditcard" method="POST">
              <input className="店舗ID" type="HIDDEN" name="aid" value={ROBOT_PAYMENT_STORE_ID} />
              <input className="AMOUNT" type="HIDDEN" name="am" value={paymentData?.amount} />
              <input className="TAX" type="HIDDEN" name="tx" value={paymentData?.amountTax} />
              <input className="SHIPPING FEE" type="HIDDEN" name="sf" value="0" />
              <input className="JOB" type="HIDDEN" name="jb" value="CAPTURE" />
              <input className="商品名" type="HIDDEN" name="inm" value={`プラン${selectedPlan?.name}`} />
              <input type="HIDDEN" name="iid2" value={paymentData?.uid || new Date().getTime()} />
              <input type="HIDDEN" name="em" value={company?.email} />
              <input type="HIDDEN" name="pn" value={cellPhoneNumber} />
              <input type="hidden" value={paymentData?.token || ''} name="others" />
            </form>
          ) : (
            <form id="payment-form" action="https://credit.j-payment.co.jp/link/creditcard" method="POST">
              <input className="店舗ID" type="HIDDEN" name="aid" value={ROBOT_PAYMENT_STORE_ID} />
              <input type="HIDDEN" name="pt" value="1" />
              <input className="AMOUNT" type="HIDDEN" name="am" value={paymentData?.amount} />
              <input className="SHIPPING FEE" type="HIDDEN" name="sf" value="0" />
              <input className="TAX" type="HIDDEN" name="tx" value={paymentData?.amountTax} />
              <input className="JOB" type="HIDDEN" name="jb" value="CAPTURE" />
              <input className="自動課金周期" type="HIDDEN" name="actp" value="4" />
              <input className="自動課金金額" type="HIDDEN" name="acam" value={1000} />
              <input className="商品名" type="HIDDEN" name="inm" value={`プラン${selectedPlan?.name}`} />
              <input type="HIDDEN" name="iid2" value={paymentData?.uid || new Date().getTime()} />
              <input className="課金日指定" type="HIDDEN" name="ac1" value="1" />
              <input type="HIDDEN" name="em" value={company?.email} />
              <input type="HIDDEN" name="pn" value={cellPhoneNumber} />
              <input type="hidden" value={paymentData?.token || ''} name="others" />
            </form>
          )}
        </PlanWrapper>
      </ModalWrapper>
      <PlanListModal
        visible={openPlanListModal}
        onClose={setOpenPlanListModal}
        handleSelectPlan={handleChangePlan}
        plans={plans}
        company={company}
      />
    </Modal>
  )
}

export default ChangePlanModal
