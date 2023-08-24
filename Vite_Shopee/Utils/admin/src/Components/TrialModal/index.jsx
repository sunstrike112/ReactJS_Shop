/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Select, Row, Spin, ConfigProvider, Checkbox } from 'antd'

import { changePlan, generateToken } from 'APIs'
import PlanListModal from 'Components/PlanListModal'
import { useAuth, useMyCompany, useSettingPasswordPlan } from 'Hooks'
import './index.css'
import { FormInput, Modal, Text } from 'Components'
import { formatToCurrency } from 'Utils/number'
import { FORMAT_TIME, PLAN_TYPE, ROBOT_PAYMENT_STORE_ID, USER_ROLE } from 'Constants'
import { sanitize } from 'dompurify'
import { FormProvider, useForm } from 'react-hook-form'
import moment from 'moment'
import {
  ModalWrapper,
  PlanBox,
  PlanWrapper,
  SubmitButton,
  FeeWrapper,
  TableWrapper,
  TablePolicy,
  TableContract,
  PlanZZWrapper
} from './styled'
import { content } from './content'

const FEES = { INITIAL: 55000, NISSOKEN_EMPLOYEE: 33000 }
const PLAN_DATA_100GB_ID = 32

const TrialModal = ({ onClose, visible, plan }) => {
  const { plans, loadCompanyInfo, loadPlans, companyInfo } = useMyCompany()
  const { t } = useTranslation(['myCompany', 'common'])
  const { applyPlanZZAction } = useSettingPasswordPlan()
  const { profile } = useAuth()

  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [openPlanListModal, setOpenPlanListModal] = useState(false)
  const [isError, setIsError] = useState(false)
  const [paymentData, setPaymentData] = useState({
    debtPaymentLastMonth: [],
    paymentNotInformationInMonth: [],
    amount: 0,
    amountTax: 0,
    amountPlan: 0,
    amountPlanTax: 0,
    amountData: 0,
    amountDataTax: 0
  })
  const [descriptionText, setDescriptionText] = useState('')
  const [isChangePlanSuccess, setChangePlanIsSuccess] = useState(false)
  const [successContent, setSuccessContent] = useState('')
  const [isLoading, setIsLoading] = useState('')
  const [isAgree, setIsAgree] = useState(false)
  const [isAgreePolicy, setIsAgreePolicy] = useState(false)
  const [firstStep, setFirstStep] = useState(true)

  const form = useForm()

  const { handleSubmit, watch } = form

  const { passwordPlanzz: passwordPlanzzWatch } = watch()

  const cellPhoneNumber = useMemo(() => companyInfo.cellPhoneNumber?.replace(/-/g, ''), [companyInfo])
  const admissionFee = useMemo(() => (companyInfo.memberType === 1 ? FEES.INITIAL : FEES.NISSOKEN_EMPLOYEE), [companyInfo])

  const priceCurrentPlan = companyInfo.planPackageDto?.price + companyInfo.planPackageDto?.tax

  const planOptions = useMemo(() => {
    if (plans) {
      if (companyInfo.isTrial && !plans.find((planData) => planData.id === 0)) {
        plans.unshift({
          id: 0,
          label: t('trial')
        })
      } else {
        // reset value trial when change language
        plans.forEach(({ id }) => {
          if (id === 0) {
            plans[id] = { id: 0, label: t('trial') }
          }
        })
      }
      let minUser = 1
      return plans.map(({ id, name, price, label, userUse: maxUser }) => {
        const item = {
          value: id,
          label: id ? `${name} - ${t('userUse', { minUser: minUser || 1, maxUser })}\u00A0\u00A0\u00A0\u00A0\u00A0${t('price', { value: formatToCurrency(price) })}` : label,
          disabled: Boolean(companyInfo.isCancellation) && price < priceCurrentPlan
        }
        minUser = maxUser + 1
        return item
      })
    }
    return []
  }, [plans, companyInfo, t])

  const handleGetPaymentData = async (selectedPlanId = 0, selectedDataPlanId = 0) => {
    if ((!selectedPlanId && !selectedDataPlanId)
     || (selectedPlanId === companyInfo.planPackageDto?.id && !selectedDataPlanId && !companyInfo.isCancellation && !companyInfo.isPlanzz)) {
      return null
    }
    selectedPlanId = selectedPlanId === companyInfo.planPackageDto?.id ? 0 : selectedPlanId
    const data = await generateToken({
      params: {
        planId: selectedPlanId,
        dataId: selectedDataPlanId
      }
    })
    if (data?.code === 200) {
      return setPaymentData(data.data)
    }
    return null
  }

  useEffect(() => {
    if (profile.role && profile.role !== USER_ROLE.SUB_ADMINISTRATOR) {
      loadPlans(PLAN_TYPE.PLAN_USER)
    }
  }, [profile.role])

  useEffect(() => {
    if (plan && companyInfo.isTrial) {
      setSelectedPlan(plan)
      handleGetPaymentData(plan?.id)
    } else if (companyInfo.isCancellation) {
      const currentPlan = (plans || []).find(({ id }) => id === companyInfo.planPackageDto?.id)
      if (currentPlan) {
        setSelectedPlan(currentPlan)
        handleGetPaymentData(currentPlan.id)
      }
    } else {
      setSelectedPlan({ id: 0, label: t('trial') })
    }
  }, [plan, plans, companyInfo])

  useEffect(() => {
    setIsVisible(visible)
  }, [visible])

  const setSuccessMessage = () => {
    if (selectedPlan?.id !== companyInfo.planPackageDto?.id) {
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

  const validate = (selPlan, selDataPlan) => {
    if (!selPlan?.id && !companyInfo.isTrial) {
      setDescriptionText(t('message.cantSelectTrialPlan'))
      setIsError(true)
      return false
    }

    if (selPlan?.id === companyInfo.planPackageDto?.id && selDataPlan?.id === companyInfo.planDataPackageDto?.id) {
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
    setSelectedPlan(plans.find(({ id }) => id === value))
    validate(plans.find(({ id }) => id === value))
    await handleGetPaymentData(value)
    return false
  }

  const onSubmitPlanZZ = (formData) => {
    const { passwordPlanzz } = formData
    applyPlanZZAction({
      companyId: companyInfo.companyId,
      data: {
        passwordPlanzz,
        planDataId: PLAN_DATA_100GB_ID, // ID of plan data 100GB is 32
        planId: selectedPlan.id
      },
      callback: () => {
        onClose(false)
        loadCompanyInfo()
      }
    })
  }

  const handleSubmitChangePlan = async () => {
    if (firstStep) {
      setFirstStep(false)
    } else if (passwordPlanzzWatch) {
      handleSubmit(onSubmitPlanZZ)()
    } else if (!companyInfo.isTrial && validate(selectedPlan) && !companyInfo.isCancellation) {
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
    if (firstStep) {
      loadCompanyInfo()
      onClose(false)
    }
    setFirstStep(true)
    setIsAgree(false)
  }

  const handleOpenPlanList = () => {
    setOpenPlanListModal(true)
  }

  const handleClosePlanList = () => {
    setIsVisible(true)
    setOpenPlanListModal(false)
  }

  const renderPlan = () => (
    <PlanBox>
      <div className="planBox">
        {!companyInfo.isCancellation && <Text.primary className="title" fontWeight="fw_600" fontSize="size_14">{t('userPlanTitle')}</Text.primary>}
        {!companyInfo.isCancellation && (
        <div id="selectPlan">
          <ConfigProvider getPopupContainer={() => document.getElementById('selectPlan')}>
            <Select
              value={selectedPlan?.id}
              options={planOptions}
              onChange={handleChangePlan}
              className="selectPlan"
              style={{ width: '100%' }}
            />
          </ConfigProvider>
        </div>
        )}

        {!!selectedPlan?.id && (
        <>
          <Text.primary className="title" fontSize="size_14">{`${t('planName')}: `}<span>{selectedPlan?.name}</span></Text.primary>
          <Text.primary className="title" fontSize="size_14">
            {`${t('planInfo.userUsageInfo')}: `}
            <span>{t('planInfo.userUsage', { value: selectedPlan?.userUse })}</span>
          </Text.primary>
          <Text.primary className="title" fontSize="size_14">
            {`${t('priceInfo')}: `}
            <span>{t('price', { value: formatToCurrency(selectedPlan?.price) })}</span>
          </Text.primary>
          <Text.primary className="title" fontSize="size_14">
            {`${t('planInfo.dataUsageInfo')}: `}
            <span>{companyInfo.isCancellation ? companyInfo.planDataPackageDto?.name : '100GB'}</span>
          </Text.primary>
        </>
        )}
        {!companyInfo.isCancellation && (
        <SubmitButton
          className="button__submit button__change__credit"
          htmlType="button"
          onClick={handleOpenPlanList}
          title={t('openPlanList1')}
        />
        )}

      </div>
    </PlanBox>
  )

  const renderDataPlans = () => (
    <PlanBox>
      <div className="planBox">
        <Text.primary className="title" fontWeight="fw_600" fontSize="size_14">{t('functionCanUse')}</Text.primary>
        <div id="selectDataPlan">
          <ul>
            <li><Text.primary className="title" fontSize="size_14">{t('feature1')}</Text.primary></li>
            <li><Text.primary className="title" fontSize="size_14">{t('feature2')}</Text.primary></li>
            <li><Text.primary className="title" fontSize="size_14">{t('feature3')}</Text.primary></li>
            <li><Text.primary className="title" fontSize="size_14">{t('feature4')}</Text.primary></li>
          </ul>
        </div>
      </div>
    </PlanBox>
  )

  const renderProductPayment = useMemo(() => {
    if (companyInfo.isCancellation) return `プラン${selectedPlan?.name}, データ容量: ${companyInfo.planDataPackageDto?.name}, 初期導入費用`
    return `プラン${selectedPlan?.name}, 初期導入費用`
  }, [companyInfo.isCancellation, companyInfo.planDataPackageDto?.name, selectedPlan?.name])

  const renderUnpaidPaymentLastMonths = useMemo(() => {
    if (paymentData.debtPaymentLastMonth) {
      const paymentPlansUnpaid = paymentData.debtPaymentLastMonth.filter((planUnpaid) => planUnpaid.planType === PLAN_TYPE.PLAN_USER)
      const paymentPlansDataUnpaid = paymentData.debtPaymentLastMonth.filter((planUnpaid) => planUnpaid.planType === PLAN_TYPE.PLAN_DATA)
      return (
        <>
          {paymentPlansUnpaid.map((planUser) => (
            <tr>
              <td>{t('unpaid_plan_monthly', { planName: planUser.planName, month: moment(planUser.monthDebt).format(FORMAT_TIME.MONTH) })}</td>
              <td>{t('fees', { number: formatToCurrency(planUser.totalPaymentDebt) })}</td>
            </tr>
          ))}
          {paymentPlansDataUnpaid.map((planData) => (
            <tr>
              <td>{t('unpaid_data_monthly', { dataName: planData.planName, month: moment(planData.monthDebt).format(FORMAT_TIME.MONTH) })}</td>
              <td>{t('fees', { number: formatToCurrency(planData.totalPaymentDebt) })}</td>
            </tr>
          ))}
        </>
      )
    }
    return null
  }, [paymentData.debtPaymentLastMonth])

  const renderUnpaidPaymentCurrentMonth = useMemo(() => {
    if (paymentData.paymentNotInformationInMonth) {
      const paymentPlansUnpaid = paymentData.paymentNotInformationInMonth.filter((planUnpaid) => planUnpaid.planType === PLAN_TYPE.PLAN_USER)
      const paymentPlansDataUnpaid = paymentData.paymentNotInformationInMonth.filter((planUnpaid) => planUnpaid.planType === PLAN_TYPE.PLAN_DATA)
      return (
        <>
          {paymentPlansUnpaid.map((planUser) => (
            <tr>
              <td>{t('unpaid_plan_monthly', { planName: planUser.planName, month: moment(planUser.month).format(FORMAT_TIME.MONTH) })}</td>
              <td>{t('fees', { number: formatToCurrency(planUser.totalPaymentDebt) })}</td>
            </tr>
          ))}
          {paymentPlansDataUnpaid.map((planData) => (
            <tr>
              <td>{t('unpaid_data_monthly', { dataName: planData.planName, month: moment(planData.month).format(FORMAT_TIME.MONTH) })}</td>
              <td>{t('fees', { number: formatToCurrency(planData.totalPaymentDebt) })}</td>
            </tr>
          ))}
        </>
      )
    }
    return null
  }, [paymentData.paymentNotInformationInMonth])

  return (
    <Modal
      visible={isVisible}
      onCancel={handleClose}
      title={t('trialTitle')}
      disabledSubmit={firstStep ? (isError || !selectedPlan?.id || !isAgreePolicy) : (!isAgree)}
      onSubmit={handleSubmitChangePlan}
      form={((companyInfo.isTrial || companyInfo.isCancellation) && !firstStep && !passwordPlanzzWatch) && 'payment-form'}
      onSubmitText={firstStep ? t('common:next') : t('starting')}
      onCancelText={firstStep ? t('closeModal') : t('common:back')}
      destroyOnClose
      forceRender
      titleIcon={false}
    >
      <ModalWrapper>
        {firstStep
          ? (
            <>
              <Row justify="center" align="middle" className="modal-header" gutter={[4, 4]}>
                <Text.primary className="title" fontSize="size_14">
                  {companyInfo.isCancellation ? t('cancelContractDescription') : t('trialDescription')}
                </Text.primary>
              </Row>
              <PlanWrapper>
                {renderPlan()}
                {renderDataPlans()}
              </PlanWrapper>
              <FeeWrapper>
                <Text.primary fontSize="size_14">■{t('admission_fee')}</Text.primary>
                <table>
                  <tbody>
                    <tr>
                      <td>&nbsp;&nbsp;&nbsp;{t('fee_member', { number: formatToCurrency(FEES.INITIAL) })}</td>
                    </tr>
                    <tr>
                      <td>&nbsp;&nbsp;&nbsp;{t('nissoken_member')}:</td>
                      <td>{t('fee_member', { number: formatToCurrency(FEES.NISSOKEN_EMPLOYEE) })}</td>
                    </tr>
                  </tbody>
                </table>
              </FeeWrapper>
              {companyInfo.isPlanzz && (
                <PlanZZWrapper>
                  <Text.primary fontSize="size_14">■{t('common:type_password')}</Text.primary>
                  <FormProvider {...form}>
                    <FormInput name="passwordPlanzz" />
                  </FormProvider>
                </PlanZZWrapper>
              )}
              <Text.primary fontSize="size_14">{t('policy_title')}</Text.primary>
              <TableWrapper className="policy">
                <TablePolicy>
                  <tbody>
                    <tr>
                      <td>1、</td>
                      <td>
                        <Text.primary className="title" fontSize="size_12">{t('policy1')}</Text.primary>
                      </td>
                    </tr>
                    <tr>
                      <td>2、</td>
                      <td>
                        <Text.primary className="title" fontSize="size_12">{t('policy2')}</Text.primary>
                      </td>
                    </tr>
                    <tr>
                      <td>3、</td>
                      <td>
                        <Text.primary className="title" fontSize="size_12">{t('policy3')}</Text.primary>
                      </td>
                    </tr>
                    <tr>
                      <td>4、</td>
                      <td>
                        <Text.primary className="title" fontSize="size_12">{t('policy4')}</Text.primary>
                      </td>
                    </tr>
                  </tbody>
                </TablePolicy>
              </TableWrapper>
              <Row justify="center" align="middle" style={{ width: '100%', justifyContent: 'start', padding: '10px 15px' }} gutter={[4, 4]}>
                <div>
                  <Checkbox value={isAgree} onChange={() => setIsAgreePolicy(!isAgreePolicy)} style={{ marginRight: 5 }} checked={isAgreePolicy} />
                  <span style={{ fontWeight: 600 }}>{t('policy_confirm')}</span>
                </div>
              </Row>
              <Row justify="center" align="middle" style={{ width: '100%' }} gutter={[4, 4]}>
                {isError ? (<Text.primary className="title" fontSize="size_14" color="error_ant">{descriptionText}</Text.primary>) : null}
                {(isChangePlanSuccess && successContent) ? (<Text.primary className="title" fontSize="size_14" color="success_ant">{successContent}</Text.primary>) : null}
                {isLoading && <Spin />}
              </Row>
            </>
          )
          : (
            <>
              <Text.primary className="confirm_contract" fontSize="size_14">{t('confirm_contract')}</Text.primary>
              <TableWrapper>
                <TableContract>
                  <tbody>
                    <tr>
                      <td>{t('data_monthly', { data: selectedPlan?.name })}</td>
                      <td>{t('fees', { number: formatToCurrency(paymentData.amountPlan + paymentData.amountPlanTax) })}</td>
                    </tr>
                    <tr>
                      <td>{t('data_monthly_fee', { data: companyInfo.isCancellation ? companyInfo.planDataPackageDto?.name : '100GB' })}</td>
                      <td>
                        {t(companyInfo.isCancellation ? 'fees' : 'fee',
                          { number: companyInfo.isCancellation ? formatToCurrency(paymentData.amountData + paymentData.amountDataTax) : '0' })}
                      </td>
                    </tr>
                    <tr>
                      <td>{t('admission_fee')}</td>
                      <td>{t('fees', { number: formatToCurrency(admissionFee) })}</td>
                    </tr>
                    {Boolean(companyInfo.isCancellation) && renderUnpaidPaymentLastMonths }
                    {Boolean(companyInfo.isCancellation) && renderUnpaidPaymentCurrentMonth }
                    <tr>
                      <td>{t('common:total')}</td>
                      <td>
                        {t('fees', { number: formatToCurrency(paymentData.amount + paymentData.amountTax) })}
                      </td>
                    </tr>
                  </tbody>
                </TableContract>
              </TableWrapper>
              <FeeWrapper>
                <Text.primary fontSize="size_14">{t('total_month')}</Text.primary>
                <table>
                  <tbody>
                    <tr>
                      <td>&nbsp;&nbsp;&nbsp;{t('total_month1')}</td>
                    </tr>
                    <tr>
                      <td>&nbsp;&nbsp;&nbsp;{t('total_month2')}</td>
                    </tr>
                  </tbody>
                </table>
              </FeeWrapper>
              <TableWrapper className="policy">
                <TablePolicy>
                  <div className="content" dangerouslySetInnerHTML={{ __html: sanitize(content) }} />
                </TablePolicy>
              </TableWrapper>
              <Row justify="center" align="middle" style={{ width: '100%', justifyContent: 'start', padding: '10px 15px' }} gutter={[4, 4]}>
                <div style={{ marginLeft: 70 }}>
                  <Checkbox value={isAgree} onChange={() => setIsAgree(!isAgree)} style={{ marginRight: 5 }} checked={isAgree} />
                  <span>{t('termOfUse1')}</span>
                  <span>{t('termOfUse2')}</span>
                  <span>{t('termOfUse3')}</span>
                  <Text.primary fontSize="size_14">{t('confirm_contract_guide')}</Text.primary>
                </div>
              </Row>
            </>
          )}
        {!isError ? (
          <form id="payment-form" action="https://credit.j-payment.co.jp/link/creditcard" method="POST">
            <input className="店舗ID" type="HIDDEN" name="aid" value={ROBOT_PAYMENT_STORE_ID} />
            <input type="HIDDEN" name="pt" value="1" />
            <input className="AMOUNT" type="HIDDEN" name="am" value={paymentData.amount} />
            <input className="SHIPPING FEE" type="HIDDEN" name="sf" value="0" />
            <input className="TAX" type="HIDDEN" name="tx" value={paymentData.amountTax} />
            <input className="JOB" type="HIDDEN" name="jb" value="CAPTURE" />
            <input className="自動課金周期" type="HIDDEN" name="actp" value="4" />
            <input className="自動課金金額" type="HIDDEN" name="acam" value={1000} />
            <input className="商品名" type="HIDDEN" name="inm" value={renderProductPayment} />
            <input type="HIDDEN" name="iid2" value={paymentData.uid || new Date().getTime()} />
            <input className="課金日指定" type="HIDDEN" name="ac1" value="1" />
            <input type="HIDDEN" name="em" value={companyInfo.email} />
            <input type="HIDDEN" name="pn" value={cellPhoneNumber} />
            <input type="hidden" value={paymentData.token || ''} name="others" />
          </form>
        ) : null}
      </ModalWrapper>
      <PlanListModal
        visible={openPlanListModal}
        onClose={handleClosePlanList}
        handleSelectPlan={handleChangePlan}
        plans={plans}
        companyInfo={companyInfo}
        priceCurrentPlan={priceCurrentPlan}
      />
    </Modal>
  )
}

export default TrialModal
