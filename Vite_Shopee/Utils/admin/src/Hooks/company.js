/* eslint-disable no-restricted-globals */
import { COMPANY_NAME } from 'Constants/course'
import { useRoles } from 'Hooks'
import {
  closeNoticeToSuperAdmin,
  deleteCompany,
  getAdminProfile,
  getAmountOfCompanyUnapproved,
  getCompanyListRefused,
  getCompanyListWaiting,
  getCompanyWaitingDetail,
  loadCompanyAll,
  loadCompanyList,
  loadContractPlan,
  moveCompanyRefusedToWaiting,
  resetCompaniesManagement,
  updateAdminProfile,
  updateStatusForCompanyWaiting
} from 'Modules/company/store/actions'
import reducer from 'Modules/company/store/reducer'
import saga from 'Modules/company/store/saga'
import { makeSelectCompany } from 'Modules/company/store/selectors'
import { useInjectReducer, useInjectSaga } from 'Stores'
import { DEFAULT_PAG } from 'Utils'
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const useLoadContractPlan = () => {
  useInjectSaga({ key: 'company', saga })
  useInjectReducer({ key: 'company', reducer })

  const dispatch = useDispatch()

  const { contractPlan } = useSelector(makeSelectCompany())
  const { isLoading, data, error } = contractPlan

  const loadContractPlanAction = (payload) => dispatch(loadContractPlan(payload))

  const contractPlanData = useMemo(() => (
    data.map(({ id, name }) => ({ value: id, label: name }))
  ), [data])

  return {
    loadContractPlanAction,
    contractPlanData,
    isLoading,
    error
  }
}

export const useCompanyManagement = () => {
  useInjectSaga({ key: 'company', saga })
  useInjectReducer({ key: 'company', reducer })

  const dispatch = useDispatch()

  const { companyList, pagination, filter, isLoading, companyListWaiting } = useSelector(makeSelectCompany())

  const loadCompanyListAction = (payload) => dispatch(loadCompanyList(payload))
  const deleteCompanyAction = (payload) => dispatch(deleteCompany(payload))
  const getCompanyListWaitingAction = useCallback((payload) => {
    dispatch(getCompanyListWaiting(payload))
  }, [])
  const resetCompaniesManagementAction = useCallback(() => {
    dispatch(resetCompaniesManagement())
  }, [])

  return {
    loadCompanyListAction,
    deleteCompanyAction,
    getCompanyListWaitingAction,
    resetCompaniesManagementAction,
    companyList,
    pagination,
    filter,
    isLoading,
    companyListWaiting
  }
}

export const useLoadCompanyAll = (payload) => {
  useInjectSaga({ key: 'company', saga })
  useInjectReducer({ key: 'company', reducer })

  const dispatch = useDispatch()
  const { isSuperAdmin, isAdmin } = useRoles()

  const { companyAll: companyAllRedux } = useSelector(makeSelectCompany())
  const { isLoading: isLoadingCompanyAll, data: companyList, error } = companyAllRedux

  let companyOptionsExceptSelectAll = []

  const Company = (data) => {
    const idOfNissokenCompany = 1 // default = 1 on API
    const companyOptions = data
      .filter((item) => !!item.companyName)
      .map(({ companyId, companyName }) => ({
        label: companyName,
        value: companyId
      }))

    companyOptionsExceptSelectAll = [...companyOptions]

    companyOptions.unshift({ label: 'select_all', value: null, isAllCompany: true }) // E-5424 for more detail

    const valueOfNissokenCompany = { label: COMPANY_NAME.NISSOKEN, value: idOfNissokenCompany } // Always is this value on API, if not update by BE

    return {
      companyOptions,
      valueOfNissokenCompany,
      idOfNissokenCompany,
      companyOptionsExceptSelectAll
    }
  }

  const companyAll = useMemo(() => Company(companyList), [companyList])

  const loadCompanyAllAction = () => dispatch(loadCompanyAll(payload))

  useEffect(() => {
    if (isSuperAdmin || isAdmin) {
      loadCompanyAllAction()
    }
  }, [isSuperAdmin, isAdmin])

  return {
    loadCompanyAllAction,
    isLoadingCompanyAll,
    companyAll,
    error
  }
}

export const useCompanyWaiting = () => {
  useInjectSaga({ key: 'company', saga })
  useInjectReducer({ key: 'company', reducer })
  const dispatch = useDispatch()

  const { companyListWaiting: { isLoading, data, pagination, filter, error } } = useSelector(makeSelectCompany())

  const getCompanyListWaitingAction = useCallback((payload) => {
    dispatch(getCompanyListWaiting(payload))
  }, [])

  useEffect(() => {
    getCompanyListWaitingAction({ params: { page: DEFAULT_PAG.page, limit: DEFAULT_PAG.limit } })
  }, [])

  return {
    isLoading,
    data,
    pagination,
    filter,
    error,
    getCompanyListWaitingAction
  }
}

export const useCompanyWaitingDetail = () => {
  useInjectSaga({ key: 'company', saga })
  useInjectReducer({ key: 'company', reducer })
  const dispatch = useDispatch()
  const { companyId } = useParams()

  const { companyWaitingDetail: { isLoading, isUpdating, updateStatusType, data, error } } = useSelector(makeSelectCompany())

  const getCompanyWaitingDetailAction = useCallback((payload) => {
    dispatch(getCompanyWaitingDetail(payload))
  }, [])
  const updateStatusForCompanyWaitingAction = useCallback((payload) => {
    dispatch(updateStatusForCompanyWaiting(payload))
  }, [])

  useEffect(() => {
    if (companyId) {
      getCompanyWaitingDetailAction({ companyId })
    }
  }, [companyId])

  return {
    isLoading,
    isUpdating,
    updateStatusType,
    data,
    error,
    companyId,
    getCompanyWaitingDetailAction,
    updateStatusForCompanyWaitingAction
  }
}

export const useAmountOfCompanyUnapproved = () => {
  useInjectSaga({ key: 'company', saga })
  useInjectReducer({ key: 'company', reducer })
  const dispatch = useDispatch()

  const { companyListWaiting: { amountOfCompanyUnapproved, isNoticeToSuperAdmin } } = useSelector(makeSelectCompany())

  const getAmountOfCompanyUnapprovedAction = useCallback((payload) => {
    dispatch(getAmountOfCompanyUnapproved(payload))
  }, [])
  const closeNoticeToSuperAdminAction = useCallback(() => {
    dispatch(closeNoticeToSuperAdmin())
  }, [])

  return {
    amountOfCompanyUnapproved,
    isNoticeToSuperAdmin,
    getAmountOfCompanyUnapprovedAction,
    closeNoticeToSuperAdminAction
  }
}

export const useCompanyRefused = () => {
  useInjectSaga({ key: 'company', saga })
  useInjectReducer({ key: 'company', reducer })
  const dispatch = useDispatch()

  const { companyListRefused: { isLoading, isDeleting, data, pagination, filter, error } } = useSelector(makeSelectCompany())

  const getCompanyListRefusedAction = useCallback((payload) => {
    dispatch(getCompanyListRefused(payload))
  }, [])
  const moveCompanyRefusedToWaitingAction = useCallback((payload) => {
    dispatch(moveCompanyRefusedToWaiting(payload))
  }, [])

  useEffect(() => {
    getCompanyListRefusedAction({ params: { page: DEFAULT_PAG.page, limit: DEFAULT_PAG.limit } })
  }, [])

  return {
    isLoading,
    isDeleting,
    data,
    pagination,
    filter,
    error,
    getCompanyListRefusedAction,
    moveCompanyRefusedToWaitingAction
  }
}

export const useAdminProfile = () => {
  useInjectSaga({ key: 'company', saga })
  useInjectReducer({ key: 'company', reducer })
  const dispatch = useDispatch()

  const { adminProfile: { isLoading, isUpdating, data, error } } = useSelector(makeSelectCompany())

  const getAdminProfileAction = useCallback((payload) => {
    dispatch(getAdminProfile(payload))
  }, [])
  const updateAdminProfileAction = useCallback((payload) => {
    dispatch(updateAdminProfile(payload))
  }, [])

  useEffect(() => {
    if (!isUpdating) {
      getAdminProfileAction()
    }
  }, [isUpdating])

  return {
    isLoading,
    isUpdating,
    data,
    error,
    updateAdminProfileAction
  }
}
