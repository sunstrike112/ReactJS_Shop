import { useDispatch, useSelector } from 'react-redux'
import saga from 'Modules/payment_manager/store/saga'
import reducer from 'Modules/payment_manager/store/reducer'
import { useInjectSaga, useInjectReducer } from 'Stores'
import { makeSelectRegistrationPayment } from 'Modules/payment_manager/store/selectors'
import { loadPaymentHistoryList, resetState } from 'Modules/payment_manager/store/actions'

export const useLoadPaymentList = () => {
  useInjectSaga({ key: 'payment_manager', saga })
  useInjectReducer({ key: 'payment_manager', reducer })

  const dispatch = useDispatch()

  const { listPaymentHistory, pagination, filter, isLoading } = useSelector(makeSelectRegistrationPayment())

  const loadPaymentHistoryListAction = (payload) => dispatch(loadPaymentHistoryList(payload))
  const resetStateAction = () => dispatch(resetState())

  return {
    loadPaymentHistoryListAction,
    listPaymentHistory,
    pagination,
    filter,
    isLoading,
    resetStateAction
  }
}
