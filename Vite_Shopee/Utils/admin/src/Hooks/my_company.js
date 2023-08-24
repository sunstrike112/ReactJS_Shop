import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import saga from 'Modules/my_company/store/saga'
import reducer from 'Modules/my_company/store/reducers'
import { useInjectSaga, useInjectReducer } from 'Stores'
import {
  makeSelectMyCompany,
  makeSelectPaymentHistories,
  makeSelectPlans,
  makeSelectDataPlans,
  makeSelectBillStatus,
  makeSelectCancelData,
  makeSelectIsCardError
} from 'Modules/my_company/store/selectors'
import {
  loadCompanyInfo as loadCompanyInfoAction,
  loadPaymentHistories as loadPaymentHistoriesAction,
  loadPlans as loadPlansAction,
  loadDataPlans as loadDataPlansAction,
  loadCompanyDetail,
  blockCompany,
  updateTrialTime,
  cancelPlan,
  updateCompanyInfo,
  updateCompanyPushNotification
} from 'Modules/my_company/store/actions'
import { useTranslation } from 'react-i18next'
import { COMPANY_NAME } from 'Constants/course'
import { useParams } from 'react-router-dom'
import { useRoles } from './auth'

export const useMyCompany = (nameCompanySelected) => {
  useInjectSaga({ key: 'myCompany', saga })
  useInjectReducer({ key: 'myCompany', reducer })

  const { isWorkspaceAdmin } = useRoles()

  const { t } = useTranslation('common')
  const dispatch = useDispatch()

  const { isLoading, companyInfo, error: errorAPI, companyDetail, isBlocking, isUpdateTrialTime, updatePushNotification } = useSelector(makeSelectMyCompany())
  const { isLoading: isLoadingCancel, data: dataCancel } = useSelector(makeSelectCancelData())

  const { data: paymentHistories, pagination, isLoading: paymentHistoriesIsLoading } = useSelector(makeSelectPaymentHistories())
  const { data: plansRedux } = useSelector(makeSelectPlans())
  const { data: dataPlansRedux } = useSelector(makeSelectDataPlans())
  const billStatus = useSelector(makeSelectBillStatus())
  const isCardError = useSelector(makeSelectIsCardError())

  const plans = useMemo(() => plansRedux?.map((item) => (
    { ...item, price: item.price + item.tax })), [plansRedux])

  const dataPlans = useMemo(() => dataPlansRedux?.map((item) => (
    { ...item, price: item.price + item.tax })), [dataPlansRedux])

  const COMPANY = (nameCompanySelected === COMPANY_NAME.NISSOKEN) ? '' : COMPANY_NAME.COMPANY

  const courseTypeAll = useMemo(() => [
    { value: 'ALL', label: t('select_all') },
    { value: 'COMPANY', label: (companyInfo?.companyName || isWorkspaceAdmin) ? COMPANY_NAME.COMPANY : COMPANY },
    { value: 'NISSOKEN', label: COMPANY_NAME.NISSOKEN }
  ].filter(({ label }) => !!label), [companyInfo, t, nameCompanySelected])

  const loadCompanyInfo = () => dispatch(loadCompanyInfoAction())
  const loadPaymentHistories = (payload) => dispatch(loadPaymentHistoriesAction(payload))
  const loadPlans = (payload) => dispatch(loadPlansAction(payload))
  const loadDataPlans = (payload) => dispatch(loadDataPlansAction(payload))
  const loadCompanyDetailAction = (payload) => dispatch(loadCompanyDetail(payload))
  const blockCompanyAction = (payload) => dispatch(blockCompany(payload))
  const updateTrialTimeAction = (payload) => dispatch(updateTrialTime(payload))
  const updateCompanyInfoAction = (payload) => dispatch(updateCompanyInfo(payload))
  const cancelPlanAction = (payload) => dispatch(cancelPlan(payload))
  const updateCompanyPushNotificationAction = useCallback((payload) => dispatch(updateCompanyPushNotification(payload)), [])

  return {
    loadCompanyInfo,
    loadCompanyDetailAction,
    loadPaymentHistories,
    loadPlans,
    loadDataPlans,
    blockCompanyAction,
    updateTrialTimeAction,
    updateCompanyInfoAction,
    updateCompanyPushNotificationAction,
    companyInfo,
    companyDetail,
    isLoading,
    paymentHistoriesIsLoading,
    errorAPI,
    paymentHistories,
    plans,
    dataPlans,
    pagination,
    billStatus,
    courseTypeAll,
    isCardError,
    isBlocking,
    isUpdateTrialTime,
    updatePushNotification,

    // cancel plan
    cancelPlanAction,
    isLoadingCancel,
    dataCancel
  }
}

export const useCompanyDetail = () => {
  useInjectSaga({ key: 'myCompany', saga })
  useInjectReducer({ key: 'myCompany', reducer })

  const { companyId } = useParams()
  const dispatch = useDispatch()
  const { companyDetail, isLoading, error } = useSelector(makeSelectMyCompany())

  useEffect(() => {
    if (companyId) {
      dispatch(loadCompanyDetail({ companyId }))
    }
  }, [companyId])

  return {
    isLoading,
    companyDetail,
    error
  }
}
