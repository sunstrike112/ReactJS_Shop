/* eslint-disable react/prop-types */
import React, { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Divider, TBody, Tr } from 'Themes/facit'
import { Progress } from 'antd'

import { formatToCurrency } from 'Utils/number'
import { Text } from 'Components'
import { bytesToSize } from 'Utils'
import { HELP_ICON } from 'Assets'
import { useMyCompany } from 'Hooks'
import { ROBOT_PAYMENT_STORE_ID } from 'Constants'
import { generateToken } from 'APIs'
import { SubmitButton } from '../../styled'
import PlanListModal from '../PlanListModal'
import ChangePlanModal from '../ChangePlanModal'
import DestroyPlanModal from './DestroyPlanModal'
import { StyledPlanPackage, StyledTable } from '../PaymentInfo/styled'
import { StyledTd, StyledTh } from '../CompanyInfos/styled'

const PlanPackageInfo = ({
  company,
  errorAPI,
  handleSelectPlan,
  isChangePlanShowModal,
  isPlanLisShowModal,
  isSuperAdmin,
  rst,
  selectedDataPlan,
  selectedPlan,
  setIsChangePlanModal,
  setIsPlanListShowModal,
  isDestroyModal,
  setIsDestroyModal,
  cellPhoneNumber
}) => {
  // Use hooks
  const [t] = useTranslation(['myCompany', 'common'])
  const {
    isCardError,
    plans,
    dataPlans
  } = useMyCompany()
  const formPaymentForDebtRef = useRef()
  // End use hooks

  // Use states
  const [paymentData, setPaymentData] = useState({})
  const [isLoadingPaymentForDebt, setIsLoadingPaymentForDebt] = useState(false)
  // End use states

  const priceCurrentPlan = (company.planPackageDto?.price + company.planPackageDto?.tax) || 0
  const priceCurrentDataPlan = company.planDataPackageDto?.price + company.planDataPackageDto?.tax
  const priceNextPlan = (company.nextPlanPackageDto?.price + company.nextPlanPackageDto?.tax) || 0
  const priceNextDataPlan = company.nextPlanDataPackageDto?.price + company.nextPlanDataPackageDto?.tax
  const paymentDebtData = useMemo(() => {
    if (paymentData.debtPaymentLastMonth) {
      const data = paymentData.debtPaymentLastMonth.reduce((result, item) => {
        const paymentDebt = result.paymentDebt + item.paymentDebt
        const paymentDebtTax = result.paymentDebtTax + (item.totalPaymentDebt - item.paymentDebt)
        return { paymentDebt, paymentDebtTax }
      }, { paymentDebt: 0, paymentDebtTax: 0 })
      return data
    }
    return { paymentDebt: 0, paymentDebtTax: 0 }
  }, [paymentData.debtPaymentLastMonth])

  const renderProductPaymentForDebt = useMemo(() => {
    if (company.planDataPackageDto?.name !== '100GB') {
      return `プラン${company.planPackageDto?.name}, データ容量: ${company.planDataPackageDto?.name}`
    }
    return `プラン${company.planPackageDto?.name}`
  }, [company.planPackageDto])

  const handlePaymentForDebt = async () => {
    setIsLoadingPaymentForDebt(true)
    const { data } = await generateToken({ params: { isSolveDebtForAccountCancelled: true } })
    setPaymentData(data)
    formPaymentForDebtRef.current.submit()
  }

  return (
    <StyledPlanPackage>
      <div className="planName">
        <Text.primary fontWeight="fw_600" fontSize="size_16">
          {!company.isTrial ? t('plan', { name: company.planPackageDto?.name }) : t('trial')}
        </Text.primary>
        {!isSuperAdmin && (
          <div>
            <HELP_ICON
              width={24}
              onClick={errorAPI ? null : () => setIsPlanListShowModal(true)}
              height={24}
            />
          </div>
        )}
      </div>
      <Divider />
      <div className="planInfo">
        <StyledTable>
          <TBody>
            <Tr>
              <StyledTh className="th">{t('userUsageInfo')}</StyledTh>
              <StyledTd>
                {t('userUsage', {
                  used: company.numberOfUserJoined,
                  plan: company.userUse
                })}
              </StyledTd>
            </Tr>
            <Tr>
              <StyledTh className="th">{t('priceInfo')}</StyledTh>
              <StyledTd>{!company.isTrial
                ? t('price', { value: formatToCurrency(priceCurrentPlan || 0) })
                : t('free')}
              </StyledTd>
            </Tr>
          </TBody>
        </StyledTable>
        <Divider />
        <StyledTable>
          <TBody>
            <Tr>
              <StyledTh className="th">{t('dataUsageInfo')}</StyledTh>
              <StyledTd>
                <Progress percent={parseFloat(((company.memoryUsed || 0) / (!company.isTrial ? company.memory : 100 * 1024 * 1024 * 1024)) * 100).toFixed(2)} trailColor="grey" />
                <Text.primary fontWeight="fw_400" fontSize="size_14">
                  {t('dataUsage', {
                    used: bytesToSize(company.memoryUsed || 0),
                    total: !company.isTrial ? bytesToSize(company.memory) : '100GB'
                  })}
                </Text.primary>
              </StyledTd>
            </Tr>
            <Tr>
              <StyledTh className="th">{t('priceInfo_ver2')}</StyledTh>
              <StyledTd>{!company.isTrial
                ? t('price', { value: formatToCurrency(priceCurrentDataPlan || 0) })
                : t('free')}
              </StyledTd>
            </Tr>
          </TBody>
        </StyledTable>
        <Divider />
        <StyledTable>
          <TBody>
            <Tr>
              <StyledTh className="th">{t('totalPriceBilling')}</StyledTh>
              <StyledTd>{!company.isTrial
                ? t('price', { value: formatToCurrency((priceCurrentPlan + priceCurrentDataPlan) || 0) }) : t('free')}
              </StyledTd>
            </Tr>
          </TBody>
        </StyledTable>
      </div>
      {/* Payment for  debt with account cancelled */}
      {(Boolean(company.isCancellation) && Boolean(isCardError) && !isSuperAdmin) && (
      <SubmitButton
        htmlType="button"
        title={t('payForDebt')}
        onClick={handlePaymentForDebt}
        loading={isLoadingPaymentForDebt}
      />
      )}
      {(!rst && !isSuperAdmin && !company.isCancellation) && (
        <>
          {/* Change plan/data */}
          <SubmitButton
            htmlType="button"
            title={t('changePlan')}
            onClick={() => handleSelectPlan(company.planPackageDto?.id || 0)}
            disabled={errorAPI || company.isCancellation}
          />
          {/* Cancel contract */}
          {(!company.isCancellation && !company.isTrial && company.isEnoughOneYearCompany) && (
            <SubmitButton
              className="btn_cancel"
              htmlType="button"
              title={t('cancel_plan')}
              onClick={() => setIsDestroyModal(true)}
              disabled={errorAPI}
            />
          )}
        </>
      )}
      {/* Form of payment for debt with account cancelled */}
      <form ref={formPaymentForDebtRef} action="https://credit.j-payment.co.jp/link/creditcard" method="POST">
        <input className="店舗ID" type="HIDDEN" name="aid" value={ROBOT_PAYMENT_STORE_ID} />
        <input className="AMOUNT" type="HIDDEN" name="am" value={paymentDebtData.paymentDebt} />
        <input className="TAX" type="HIDDEN" name="tx" value={paymentDebtData.paymentDebtTax} />
        <input className="SHIPPING FEE" type="HIDDEN" name="sf" value="0" />
        <input className="JOB" type="HIDDEN" name="jb" value="CAPTURE" />
        <input className="商品名" type="HIDDEN" name="inm" value={renderProductPaymentForDebt} />
        <input type="HIDDEN" name="iid2" value={paymentData.uid || new Date().getTime()} />
        <input type="HIDDEN" name="em" value={company.email} />
        <input type="HIDDEN" name="pn" value={cellPhoneNumber} />
        <input type="hidden" value={paymentData.token || ''} name="others" />
      </form>
      {!isSuperAdmin && (
        <>
          <PlanListModal
            visible={isPlanLisShowModal}
            onClose={setIsPlanListShowModal}
            handleSelectPlan={handleSelectPlan}
            company={company}
            plans={plans}
          />
          <ChangePlanModal
            visible={isChangePlanShowModal}
            onClose={setIsChangePlanModal}
            plan={selectedPlan}
            dataPlan={selectedDataPlan}
            company={company}
            priceCurrentPlan={priceCurrentPlan}
            priceCurrentDataPlan={priceCurrentDataPlan}
            priceNextPlan={priceNextPlan}
            priceNextDataPlan={priceNextDataPlan}
            isCardError={isCardError}
            plans={plans}
            dataPlans={dataPlans}
          />
          <DestroyPlanModal
            visible={isDestroyModal}
            onClose={() => setIsDestroyModal(false)}
            companyId={company.companyId}
            plan={company.planPackageDto}
            localDatetimeSystem={company.localDatetimeSystem}
          />
        </>
      )}
    </StyledPlanPackage>
  )
}

export default PlanPackageInfo
