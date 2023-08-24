/* eslint-disable no-unused-vars */
import { put, takeLatest } from 'redux-saga/effects'
import { ERRORS_82_105, signOut } from 'Utils'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  blockCompanyAPI,
  getCompanyDetailAPI,
  getCompanyInfo,
  getPaymentHistories,
  getPlans,
  updateCompanyInfoAPI,
  cancelPlanAPI,
  updateTrialTimeAPI
} from 'APIs'

import { notification } from 'antd'
import i18next from 'I18n'
import { updateCompanyPushNotificationAPI } from 'APIs/company.api'
import { updateApi82105 } from 'Modules/store/actions'
import {
  LOAD_COMPANY_INFO,
  LOAD_COMPANY_PAYMENT_HISTORIES,
  LOAD_DATA_PLAN,
  LOAD_PLAN,
  LOAD_COMPANY_DETAIL,
  BLOCK_COMPANY,
  UPDATE_TRIAL_TIME,
  CANCEL_PLAN,
  UPDATE_COMPANY_INFO,
  UPDATE_PUSH_NOTIFICATION
} from './constants'

export function* loadCompanyInfo() {
  try {
    const { code, data: companyInfo } = yield getCompanyInfo()

    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_COMPANY_INFO),
        companyInfo
      })
    }
  } catch (error) {
    if (ERRORS_82_105.includes(error.error)) {
      yield put(updateApi82105({ isRequiredLogout: true }))
    }
    yield put({
      type: FAILURE(LOAD_COMPANY_INFO),
      error
    })
  }
}

export function* loadCompanyDetailSaga({ payload }) {
  try {
    const { code, data: companyDetail } = yield getCompanyDetailAPI(payload)

    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_COMPANY_DETAIL),
        companyDetail
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_COMPANY_DETAIL),
      error
    })
  }
}

export function* loadPaymentHistoriesSaga({ payload }) {
  try {
    const { code, data } = yield getPaymentHistories(payload)
    const { result: results, ...pagination } = data.paymentHistories
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_COMPANY_PAYMENT_HISTORIES),
        data: results,
        pagination,
        billStatus: data.status,
        isCardError: data.isCardError
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_COMPANY_PAYMENT_HISTORIES),
      error
    })
  }
}

export function* loadPlansSaga({ planType }) {
  try {
    const { code, data } = yield getPlans({ planType })

    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_PLAN),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_PLAN),
      error
    })
  }
}

export function* loadDataPlansSaga({ planType }) {
  try {
    const { code, data } = yield getPlans({ planType })

    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_DATA_PLAN),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_DATA_PLAN),
      error
    })
  }
}

export function* blockCompanySaga({ payload }) {
  try {
    const { callback, data } = payload
    const { code } = yield blockCompanyAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(BLOCK_COMPANY)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield put({
        type: REQUEST(LOAD_COMPANY_DETAIL),
        payload: {
          companyId: data[0]
        }
      })
      callback()
    }
  } catch (error) {
    yield put({
      type: FAILURE(BLOCK_COMPANY),
      error
    })
  }
}

export function* updateTrialTimeSaga({ payload }) {
  const { callback } = payload
  try {
    const { code, data } = yield updateTrialTimeAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(UPDATE_TRIAL_TIME),
        data
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_TRIAL_TIME),
      error
    })
  }
}

export function* updateCompanyInfoSaga({ payload }) {
  const { callback } = payload
  try {
    const { code } = yield updateCompanyInfoAPI(payload)
    if (code === 200) {
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      callback.done()
    }
  } catch (error) {
    if (error?.error === '条件に一致する契約管理者の企業登録はありません。') {
      notification.error({
        message: i18next.t('common:error'),
        description: error.message,
        duration: 2
      })
    }
    yield put({
      type: FAILURE(UPDATE_COMPANY_INFO),
      error
    })
  }
}

export function* cancelPlanSaga({ payload }) {
  try {
    const { code, data } = yield cancelPlanAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(CANCEL_PLAN),
        data
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('myCompany:destroy_plan_success', { planName: payload.planName }),
        duration: 3
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(CANCEL_PLAN),
      error
    })
  }
}

export function* updateCompanyPushNotificationSaga({ payload }) {
  const { params, headers, isSuperAdmin, companyId } = payload
  try {
    const { code } = yield updateCompanyPushNotificationAPI({ params, headers })
    if (code === 200) {
      if (isSuperAdmin) {
        yield put({ type: REQUEST(LOAD_COMPANY_DETAIL), payload: { companyId } })
      } else {
        yield put({ type: REQUEST(LOAD_COMPANY_INFO) })
      }
      yield put({ type: SUCCESS(UPDATE_PUSH_NOTIFICATION) })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_PUSH_NOTIFICATION),
      error
    })
  }
}

export default function* registrationCoursesSaga() {
  yield takeLatest(REQUEST(LOAD_COMPANY_INFO), loadCompanyInfo)
  yield takeLatest(REQUEST(LOAD_COMPANY_PAYMENT_HISTORIES), loadPaymentHistoriesSaga)
  yield takeLatest(REQUEST(LOAD_PLAN), loadPlansSaga)
  yield takeLatest(REQUEST(LOAD_DATA_PLAN), loadDataPlansSaga)
  yield takeLatest(REQUEST(LOAD_COMPANY_DETAIL), loadCompanyDetailSaga)
  yield takeLatest(REQUEST(BLOCK_COMPANY), blockCompanySaga)
  yield takeLatest(REQUEST(UPDATE_TRIAL_TIME), updateTrialTimeSaga)
  yield takeLatest(REQUEST(UPDATE_COMPANY_INFO), updateCompanyInfoSaga)
  yield takeLatest(REQUEST(CANCEL_PLAN), cancelPlanSaga)
  yield takeLatest(REQUEST(UPDATE_PUSH_NOTIFICATION), updateCompanyPushNotificationSaga)
}
