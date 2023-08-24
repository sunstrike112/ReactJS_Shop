/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment-timezone'

import { useQuery } from 'Hooks/useQuery'
import { useMyCompany } from 'Hooks'
import PaymentHistories from '../PaymentHistories'
import PlanPackageInfo from '../PlanPackage'
import { StyledWrapper } from './styled'

const PaymentInfo = ({
  company,
  isSuperAdmin,
  errorAPI,
  companyId
}) => {
  // Use hooks
  const [t] = useTranslation(['myCompany', 'common'])
  const query = useQuery()
  const rst = query.get('rst') && parseInt(query.get('rst'), 10) // params from robot payment
  const {
    loadPlans,
    loadDataPlans,
    plans
  } = useMyCompany()
  // End use hooks

  // Use states
  const [isPlanLisShowModal, setIsPlanListShowModal] = useState(false)
  const [isDestroyModal, setIsDestroyModal] = useState(false)
  const [isChangePlanShowModal, setIsChangePlanModal] = useState(false)
  const [isVisibleTrialModal, setIsVisibleTrialModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [selectedDataPlan, setSelectedDataPlan] = useState(null)
  // End use states

  const cellPhoneNumber = useMemo(() => company?.cellPhoneNumber?.replace(/-/g, ''), [company])

  const handleSelectPlan = (planId) => {
    if (company?.isTrial) {
      setIsVisibleTrialModal(true)
    } else {
      setIsChangePlanModal(true)
    }
    setIsPlanListShowModal(false)
    setSelectedPlan(plans.find((plan) => plan.id === planId))
    setSelectedDataPlan({
      ...company?.planDataPackageDto,
      price: company?.planDataPackageDto?.price + company?.planDataPackageDto?.tax
    })
  }

  useEffect(() => {
    loadPlans('PLAN_USER')
    loadDataPlans('PLAN_DATA')
  }, [])

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
    if (query.get('isSelectPlan') && plans && query.get('isSelectPlan') === 'true') {
      handleSelectPlan(0)
    }
  }, [query, plans])

  return (
    <StyledWrapper>
      <PlanPackageInfo
        company={company}
        errorAPI={errorAPI}
        handleSelectPlan={handleSelectPlan}
        isChangePlanShowModal={isChangePlanShowModal}
        isPlanLisShowModal={isPlanLisShowModal}
        isSuperAdmin={isSuperAdmin}
        rst={rst}
        selectedDataPlan={selectedDataPlan}
        selectedPlan={selectedPlan}
        setIsChangePlanModal={setIsChangePlanModal}
        setIsPlanListShowModal={setIsPlanListShowModal}
        isDestroyModal={isDestroyModal}
        setIsDestroyModal={setIsDestroyModal}
        cellPhoneNumber={cellPhoneNumber}
      />
      <PaymentHistories
        company={company}
        companyId={companyId}
        errorAPI={errorAPI}
        handleSelectPlan={handleSelectPlan}
        isSuperAdmin={isSuperAdmin}
        isVisibleTrialModal={isVisibleTrialModal}
        selectedPlan={selectedPlan}
        setIsVisibleTrialModal={setIsVisibleTrialModal}
      />
    </StyledWrapper>

  )
}

export default PaymentInfo
