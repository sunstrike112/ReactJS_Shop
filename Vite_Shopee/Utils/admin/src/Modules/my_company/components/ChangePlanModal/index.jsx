/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Select, Row, Spin, ConfigProvider, Popconfirm } from 'antd'
import { formatToCurrency } from 'Utils/number'
import { FormProvider, useForm } from 'react-hook-form'

import { changePlan, generateToken } from 'APIs'
import { useMyCompany, useSettingPasswordPlan } from 'Hooks'
import './index.css'
import { FormInput, Modal, Text } from 'Components'
import { ROBOT_PAYMENT_STORE_ID } from 'Constants'
import { CancelButton, ModalWrapper, PlanBox, PlanWrapper, SubmitButton, ButtonWrapper } from './styled'

const ChangePlanModal = ({
  company,
  onClose,
  visible,
  errors,
  plan,
  plans,
  dataPlan,
  dataPlans,
  priceCurrentPlan,
  priceCurrentDataPlan,
  priceNextPlan,
  priceNextDataPlan,
  isCardError
}) => {
  const { loadCompanyInfo } = useMyCompany()
  const { applyPlanZZAction } = useSettingPasswordPlan()
  const { t } = useTranslation(['myCompany', 'common'])

  const [selectedPlan, setSelectedPlan] = useState(plan)
  const [selectedDataPlan, setSelectedDataPlan] = useState(dataPlan)
  const [isError, setIsError] = useState(false)
  const [paymentData, setPaymentData] = useState('')
  const [descriptionText, setDescriptionText] = useState('')
  const [messageConfirm, setMessageConfirm] = useState('')
  const [isLoading, setIsLoading] = useState('')
  const [isPayment, setIsPayment] = useState(false)

  const form = useForm()
  const { handleSubmit, watch, reset } = form

  const { passwordPlanzz: passwordPlanzzWatch } = watch()

  const planOptions = useMemo(() => {
    if (plans) {
      if (company?.isTrial && !plans.find((planData) => planData.id === 0)) {
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

  const cellPhoneNumber = useMemo(() => company?.cellPhoneNumber?.replace(/-/g, ''), [company])

  const isSelectedNextPlan = useMemo(() => (selectedPlan?.price === priceNextPlan && selectedDataPlan?.price === priceNextDataPlan) && true,
    [selectedPlan?.price, selectedDataPlan?.price])

  const dataPlanOptions = useMemo(() => {
    if (dataPlans) {
      return dataPlans.map(({ id, name, price }) => ({
        value: id,
        label: `${name} - ${t('price', { value: formatToCurrency(price) })}`
      }))
    }
    return []
  }, [dataPlans, t])

  const handleGetPaymentData = async (selectedPlanId = 0, selectedDataPlanId = 0) => {
    if ((!selectedPlanId && !selectedDataPlanId)
      || ((selectedPlanId === company?.planPackageDto?.id) && !selectedDataPlanId)) {
      return setPaymentData(null)
    }
    selectedPlanId = (selectedPlanId === company?.planPackageDto?.id) ? 0 : selectedPlanId
    const data = await generateToken({
      params: {
        planId: selectedPlanId,
        dataId: selectedDataPlanId
      }
    })
    if (data?.code === 200) {
      return setPaymentData(data.data)
    }
    return false
  }

  useEffect(() => {
    if (plan && dataPlan) {
      setSelectedPlan(plan)
      setSelectedDataPlan(dataPlan)
      handleGetPaymentData(plan?.id, dataPlan?.id)
    }
  }, [plan, dataPlan])

  useEffect(() => {
    if (((selectedPlan?.price > priceCurrentPlan || selectedDataPlan?.price > priceCurrentDataPlan) && !company?.isPlanzz) // Redirect to the robot payment when choose plan large more than current plan
    || (!passwordPlanzzWatch && company?.isPlanzz) // when user not typing password & company is applying planZZ, redirect to robot payment for reset
    || (!company?.isPlanzz && company?.isCancelPlanzz)) { // Always redirect to the robot payment page when cancel planZz
      setIsPayment(true)
    } else {
      setIsPayment(false)
    }
  }, [selectedPlan, selectedDataPlan, passwordPlanzzWatch, company])

  const handleMessageConfirm = (selPlan, selDataPlan) => {
    if (selPlan?.price !== priceNextPlan
      && selDataPlan?.price !== priceNextDataPlan) {
      setMessageConfirm(t('message.change_plan_and_data_confirm', {
        plan: selPlan?.name,
        data: selDataPlan?.name
      }))
    }

    if (selPlan?.price !== priceNextPlan
      && selDataPlan?.price === priceNextDataPlan) {
      setMessageConfirm(t('message.change_plan_confirm', {
        plan: selPlan?.name
      }))
    }

    if (selPlan?.price === priceNextPlan
      && selDataPlan?.price !== priceNextDataPlan) {
      setMessageConfirm(t('message.change_data_confirm', {
        data: selDataPlan?.name
      }))
    }
  }

  useEffect(() => {
    handleMessageConfirm(plan, dataPlan)
    if (plan?.userUse < company?.numberOfUserJoined
      && plan?.id !== company?.planPackageDto?.id) {
      setDescriptionText(t('message.numberUserOfPlanlessThenNumberUserOfCompany'))
      setIsError(true)
    }
  }, [plan, dataPlan])

  const resetModal = async () => {
    setDescriptionText('')
    setIsError(false)
  }

  const validate = useCallback((selPlan, selDataPlan) => {
    if (!selPlan?.id && !selDataPlan?.id && !company?.isTrial) {
      setDescriptionText(t('message.cantSelectTrialPlan'))
      setIsError(true)
      return false
    }

    if (!selPlan?.id && selDataPlan?.id && company?.isTrial) {
      setDescriptionText(t('message.changePlanBeforeBuyMoreData'))
      setIsError(true)
      return false
    }

    if ((selPlan?.id === company?.nextPlanPackageDto?.id && selDataPlan?.id === company?.nextPlanDataPackageDto?.id) && !company?.isPlanzz) {
      setDescriptionText(t('message.cantSelectCurrentPlan'))
      setIsError(true)
      return false
    }

    if (selPlan.userUse < company?.numberOfUserJoined
      && selPlan?.id !== company?.planPackageDto?.id) {
      setDescriptionText(t('message.numberUserOfPlanlessThenNumberUserOfCompany'))
      setIsError(true)
      return false
    }

    if (selDataPlan?.memory < company?.memoryUsed
      && selDataPlan?.id !== company?.planDataPackageDto?.id) {
      setDescriptionText(t('message.numberDataOfPlanlessThenNumberDataUsed'))
      setIsError(true)
      return false
    }

    setDescriptionText(t('message.changePlanConfirm'))
    setIsError(false)
    return true
  }, [company, priceNextPlan, priceNextDataPlan])

  const handleChangePlan = useCallback((value) => {
    resetModal()
    const selPlan = plans.find(({ id }) => id === value)
    setSelectedPlan(selPlan)
    validate(selPlan, selectedDataPlan)
    handleGetPaymentData(value, selectedDataPlan?.id)
    handleMessageConfirm(selPlan, selectedDataPlan)
  }, [selectedDataPlan, plans])

  const handleChangeDataPlan = useCallback((value) => {
    resetModal()
    const selDataPlan = dataPlans.find(({ id }) => id === value)
    setSelectedDataPlan(selDataPlan)
    validate(selectedPlan, selDataPlan)
    handleGetPaymentData(selectedPlan?.id, value)
    handleMessageConfirm(selectedPlan, selDataPlan)
  }, [selectedPlan, plans])

  const handleSubmitChangePlan = useCallback(async () => {
    if (!company?.isTrial && validate(selectedPlan, selectedDataPlan)) {
      setIsLoading(true)
      const planIds = []
      planIds.push(selectedPlan?.id)
      planIds.push(selectedDataPlan?.id)
      const data = await changePlan(planIds)
      if (data.code === 200) {
        setSelectedPlan(selectedPlan)
        setSelectedDataPlan(selectedDataPlan)
        setIsLoading(false)
        onClose(false)
        loadCompanyInfo()
      }
    }
  }, [selectedPlan, selectedDataPlan])

  const handleClose = () => {
    loadCompanyInfo()
    onClose(false)
    reset()
  }

  const onSubmitPlanZZ = (formData) => {
    const { passwordPlanzz } = formData
    applyPlanZZAction({
      companyId: company.companyId,
      data: {
        passwordPlanzz,
        planDataId: selectedDataPlan.id,
        planId: selectedPlan.id
      },
      callback: () => handleClose()
    })
  }

  const renderPlan = () => (
    <PlanBox>
      <div className="planBox">
        <Text.primary className="title" fontSize="size_16">{t('userPlanTitle')}</Text.primary>
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

  const renderDataPlans = () => (
    <PlanBox>
      <div className="planBox">
        <Text.primary className="title" fontSize="size_16">{t('dataPlanTitle')}</Text.primary>
        <div id="selectDataPlan">
          <ConfigProvider getPopupContainer={() => document.getElementById('selectDataPlan')}>
            <Select
              value={selectedDataPlan?.id || 0}
              options={dataPlanOptions}
              onChange={handleChangeDataPlan}
              className="selectPlan"
              style={{ width: '100%' }}
            />
          </ConfigProvider>
        </div>
        {!!selectedDataPlan && (
          <Text.primary className="title" fontSize="size_16">
            {`${t('planInfo.dataUsageInfo')}: `}
            <span>{selectedDataPlan?.name}</span>
          </Text.primary>
        )}

        {!!selectedDataPlan && (
          <Text.primary className="title" fontSize="size_16">
            {`${t('priceInfo')}: `}
            <span>{t('price', { value: formatToCurrency(selectedDataPlan?.price) })}</span>
          </Text.primary>
        )}
      </div>
    </PlanBox>
  )

  const renderPlanZZ = () => (
    <PlanBox>
      <div className="planBox">
        <Text.primary className="title" fontSize="size_16">{t('common:type_password')}</Text.primary>
        <div id="selectPlan">
          <FormProvider {...form}>
            <FormInput name="passwordPlanzz" />
          </FormProvider>
        </div>
      </div>
    </PlanBox>
  )

  const renderProductPayment = () => {
    if (selectedDataPlan?.price > priceCurrentDataPlan
        && (selectedPlan?.price === priceCurrentPlan || selectedPlan?.price < priceCurrentPlan)) {
      return `データ容量: ${selectedDataPlan?.name}`
    }
    if ((selectedDataPlan?.price > priceCurrentDataPlan)
      && (selectedPlan?.price > priceCurrentPlan)) {
      return `プラン${selectedPlan?.name}, データ容量: ${selectedDataPlan?.name}`
    }
    if (isCardError && company?.planDataPackageDto?.name !== '100GB') {
      return `プラン${selectedPlan?.name}, データ容量: ${selectedDataPlan?.name}`
    }

    return `プラン${selectedPlan?.name}`
  }

  const renderButtonSubmit = () => {
    const disabledButton = isError || isSelectedNextPlan
    if (!isError && isPayment) {
      return (
        <SubmitButton
          htmlType="submit"
          form={!isCardError ? 'upgradePayment-form' : 'payment-form'}
          title={t('change')}
        />
      )
    }
    if (passwordPlanzzWatch) {
      return (
        <SubmitButton
          htmlType="submit"
          onClick={handleSubmit(onSubmitPlanZZ)}
          title={t('change')}
        />
      )
    }
    return (
      <Popconfirm
        title={messageConfirm}
        onConfirm={handleSubmitChangePlan}
      >
        <SubmitButton
          htmlType="button"
          title={t('change')}
          disabled={disabledButton}
        />
      </Popconfirm>
    )
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleClose}
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
          <Text.primary className="title" fontSize="size_14">{t('change_plan_introduce')}</Text.primary>
        </Row>
        <PlanWrapper>
          {renderPlan()}
          {renderDataPlans()}
          {company?.isPlanzz && renderPlanZZ()}
          <Row justify="center" align="middle" className="modal-header" style={{ width: '100%' }} gutter={[4, 4]}>
            {isError ? (<Text.primary className="title" fontSize="size_14" color="error_ant">{descriptionText}</Text.primary>) : null}
            {isLoading && <Spin />}
          </Row>
          <ButtonWrapper>
            {!isError && (
            <CancelButton
              className="button__submit"
              htmlType="button"
              title={t('close')}
              disabled={isError}
              onClick={handleClose}
            />
            )}
            {renderButtonSubmit()}
          </ButtonWrapper>
          {(!isError && !isCardError) ? (
            <form id="upgradePayment-form" action="https://credit.j-payment.co.jp/link/creditcard" method="POST">
              <input className="店舗ID" type="HIDDEN" name="aid" value={ROBOT_PAYMENT_STORE_ID} />
              <input className="AMOUNT" type="HIDDEN" name="am" value={paymentData?.amount} />
              <input className="TAX" type="HIDDEN" name="tx" value={paymentData?.amountTax} />
              <input className="SHIPPING FEE" type="HIDDEN" name="sf" value="0" />
              <input className="JOB" type="HIDDEN" name="jb" value="CAPTURE" />
              <input className="商品名" type="HIDDEN" name="inm" value={renderProductPayment()} />
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
              <input className="商品名" type="HIDDEN" name="inm" value={renderProductPayment()} />
              <input type="HIDDEN" name="iid2" value={paymentData?.uid || new Date().getTime()} />
              <input className="課金日指定" type="HIDDEN" name="ac1" value="1" />
              <input type="HIDDEN" name="em" value={company?.email} />
              <input type="HIDDEN" name="pn" value={cellPhoneNumber} />
              <input type="hidden" value={paymentData?.token || ''} name="others" />
            </form>
          )}
        </PlanWrapper>
      </ModalWrapper>
    </Modal>
  )
}

export default ChangePlanModal
