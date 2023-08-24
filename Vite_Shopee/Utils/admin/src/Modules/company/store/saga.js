import {
  deleteCompany,
  getAdminProfileAPI,
  getAmountOfCompanyUnapprovedApi,
  getCompanyAllAPI,
  getCompanyListRefusedAPI,
  getCompanyListWaitingAPI,
  getCompanyWaitingDetailAPI,
  loadCompanyListAPI,
  loadContractPlanAPI,
  moveCompanyRefusedToWaitingAPI,
  updateAdminProfileAPI,
  updateStatusForCompanyWaitingAPI
} from 'APIs'
import { FAILURE, REQUEST, SUCCESS } from 'Stores'
import { getResultWithPaging } from 'Utils'
import { notification } from 'antd'
import i18next from 'i18next'
import { put, takeLatest } from 'redux-saga/effects'
import {
  DELETE_COMPANY,
  GET_ADMIN_PROFILE,
  GET_AMOUNT_OF_COMPANY_UNAPPROVED,
  GET_COMPANY_LIST_REFUSED,
  GET_COMPANY_LIST_WAITING,
  GET_COMPANY_WAITING_DETAIL,
  LOAD_COMPANY_ALL,
  LOAD_COMPANY_LIST,
  LOAD_CONTRACT_PLAN,
  MOVE_COMPANY_REFUSED_TO_WAITING,
  UPDATE_ADMIN_PROFILE,
  UPDATE_STATUS_FOR_COMPANY_WAITING
} from './constants'

export function* loadContractPlanSaga({ payload }) {
  try {
    const { code, data } = yield loadContractPlanAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_CONTRACT_PLAN),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_CONTRACT_PLAN),
      error
    })
  }
}

export function* loadCompanyListSaga({ payload }) {
  try {
    const { code, data } = yield getResultWithPaging({ action: loadCompanyListAPI, payload })
    const { result: companyList, ...pagination } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_COMPANY_LIST),
        payload: {
          companyList,
          pagination,
          filter: payload?.params?.filter || {}
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_COMPANY_LIST),
      error
    })
  }
}

export function* loadAllCompanySaga({ payload }) {
  try {
    const { code, data } = yield getCompanyAllAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_COMPANY_ALL),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_COMPANY_ALL),
      error
    })
  }
}

export function* deleteCompanySaga({ payload }) {
  const { params: { filter, ...pagination }, companyId } = payload
  try {
    const { code } = yield deleteCompany({ companyId })
    if (code === 200) {
      yield put({ type: SUCCESS(DELETE_COMPANY) })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
      yield put({
        type: REQUEST(LOAD_COMPANY_LIST),
        payload: {
          params: { ...pagination, filter }
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_COMPANY),
      error
    })
  }
}

export function* getCompanyListWaitingSaga({ payload }) {
  const { params } = payload
  try {
    const { code, data } = yield getCompanyListWaitingAPI({ params })
    const { result, ...pagination } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_COMPANY_LIST_WAITING),
        payload: {
          result,
          pagination,
          filter: params.filter
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_COMPANY_LIST_WAITING),
      error
    })
  }
}

export function* getAmountOfCompanyUnapprovedSaga() {
  try {
    const { data: amountOfCompanyUnapproved } = yield getAmountOfCompanyUnapprovedApi()
    yield put({
      type: SUCCESS(GET_AMOUNT_OF_COMPANY_UNAPPROVED),
      data: { amountOfCompanyUnapproved, isNoticeToSuperAdmin: amountOfCompanyUnapproved > 0 }
    })
  } catch (error) {
    yield put({
      type: FAILURE(GET_AMOUNT_OF_COMPANY_UNAPPROVED),
      error
    })
  }
}

export function* getCompanyWaitingDetailSaga({ payload }) {
  try {
    const { data } = yield getCompanyWaitingDetailAPI(payload)
    yield put({
      type: SUCCESS(GET_COMPANY_WAITING_DETAIL),
      data
    })
  } catch (error) {
    yield put({
      type: FAILURE(GET_COMPANY_WAITING_DETAIL),
      error
    })
  }
}

export function* getCompanyListRefusedSaga({ payload }) {
  const { params } = payload
  try {
    const { code, data } = yield getResultWithPaging({ action: getCompanyListRefusedAPI, payload })
    const { result, ...pagination } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_COMPANY_LIST_REFUSED),
        payload: {
          result,
          pagination,
          filter: params.filter || {}
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_COMPANY_LIST_REFUSED),
      error
    })
  }
}

export function* getAdminProfileSaga() {
  try {
    const { data } = yield getAdminProfileAPI()
    yield put({
      type: SUCCESS(GET_ADMIN_PROFILE),
      data
    })
  } catch (error) {
    yield put({
      type: FAILURE(GET_ADMIN_PROFILE),
      error
    })
  }
}

export function* updateAdminProfileSaga({ payload }) {
  try {
    yield updateAdminProfileAPI(payload)
    yield put({
      type: SUCCESS(UPDATE_ADMIN_PROFILE)
    })
    notification.success({
      message: i18next.t('common:success'),
      description: i18next.t('common:message.update_success'),
      duration: 2
    })
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_ADMIN_PROFILE),
      error
    })
  }
}

export function* updateStatusForCompanyWaitingSaga({ payload }) {
  try {
    const { code } = yield updateStatusForCompanyWaitingAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(UPDATE_STATUS_FOR_COMPANY_WAITING)
      })

      payload.resolve()
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_STATUS_FOR_COMPANY_WAITING),
      error
    })
  }
}

export function* moveCompanyRefusedToWaitingSaga({ payload }) {
  try {
    const { page, limit } = payload.pagination
    const { companyId } = payload
    const { code } = yield moveCompanyRefusedToWaitingAPI({ companyId })
    yield put({
      type: SUCCESS(MOVE_COMPANY_REFUSED_TO_WAITING)
    })
    if (code === 200) {
      yield put({
        type: REQUEST(GET_COMPANY_LIST_REFUSED),
        payload: {
          params: {
            page,
            limit
          }
        }
      })
    }

    notification.success({
      message: i18next.t('common:success'),
      description: i18next.t('common:message.delete_success'),
      duration: 2
    })
  } catch (error) {
    yield put({
      type: FAILURE(MOVE_COMPANY_REFUSED_TO_WAITING),
      error
    })
  }
}

export default function* registrationCoursesSaga() {
  yield takeLatest(REQUEST(LOAD_CONTRACT_PLAN), loadContractPlanSaga)
  yield takeLatest(REQUEST(LOAD_COMPANY_LIST), loadCompanyListSaga)
  yield takeLatest(REQUEST(LOAD_COMPANY_ALL), loadAllCompanySaga)
  yield takeLatest(REQUEST(DELETE_COMPANY), deleteCompanySaga)
  yield takeLatest(REQUEST(GET_COMPANY_LIST_WAITING), getCompanyListWaitingSaga)
  yield takeLatest(REQUEST(GET_AMOUNT_OF_COMPANY_UNAPPROVED), getAmountOfCompanyUnapprovedSaga)
  yield takeLatest(REQUEST(GET_COMPANY_WAITING_DETAIL), getCompanyWaitingDetailSaga)
  yield takeLatest(REQUEST(GET_COMPANY_LIST_REFUSED), getCompanyListRefusedSaga)
  yield takeLatest(REQUEST(GET_ADMIN_PROFILE), getAdminProfileSaga)
  yield takeLatest(REQUEST(UPDATE_ADMIN_PROFILE), updateAdminProfileSaga)
  yield takeLatest(REQUEST(UPDATE_STATUS_FOR_COMPANY_WAITING), updateStatusForCompanyWaitingSaga)
  yield takeLatest(REQUEST(MOVE_COMPANY_REFUSED_TO_WAITING), moveCompanyRefusedToWaitingSaga)
}
