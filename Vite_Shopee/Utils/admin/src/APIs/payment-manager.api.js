import { parseFilter } from 'Utils'
import AxiosClient from './api'
import END_POINT from './constants'

function getListPaymentHistory({ params }) {
  params = parseFilter(params)
  return AxiosClient.get(END_POINT.PAYMENT_MANAGER.PAYMENT_HISTORY, '', { params })
    .then((res) => res.data)
}

export {
  getListPaymentHistory
}
