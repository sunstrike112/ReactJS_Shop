/* eslint-disable no-unused-vars */

import { notification } from 'antd'
import {
  createSeminar,
  deleteSeminar,
  getDetailSeminar,
  getListSeminar,
  updateSeminar,
  getCompanies
} from 'APIs'
import i18next from 'I18n'
import { omit } from 'lodash'
import { RoutesName } from 'Modules/company/routes'
import {
  put, takeLatest, select
} from 'redux-saga/effects'
import { FAILURE, REQUEST, SUCCESS } from 'Stores'
import {
  CREATE_SEMINAR,
  DELETE_SEMINAR,
  EDIT_SEMINAR,
  LOAD_DETAIL_SEMINAR,
  LOAD_LIST_SEMINAR,
  LOAD_ALL_COMPANY
} from './constants'
import { makeSelectCompanySeminar } from './selectors'

i18next.loadNamespaces(['common'])

export function* loadListSeminar({ payload }) {
  try {
    const { data } = yield getListSeminar(payload.params)
    const payloadSuccess = {
      filter: payload.params
    }
    if (data) {
      const { result: listIssuePermission, ...pagination } = data
      payloadSuccess.data = listIssuePermission
      payloadSuccess.pagination = pagination
    } else {
      payloadSuccess.data = []
      payloadSuccess.pagination = {
        limit: 100,
        page: 1,
        total: 0
      }
    }
    yield put({
      type: SUCCESS(LOAD_LIST_SEMINAR),
      payload: payloadSuccess
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_LIST_SEMINAR),
      error
    })
  }
}

export function* createSeminarSaga({ payload }) {
  let { data } = payload
  const { isAdmin, isSuperAdmin, idOfNissokenCompany } = data
  data = omit(data, ['isSuperAdmin', 'isAdmin', 'idOfNissokenCompany'])

  const { history } = payload

  try {
    const { code } = yield createSeminar(data)
    if (code === 200) {
      yield put({
        type: SUCCESS(CREATE_SEMINAR)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
      yield history.push(RoutesName.SEMINAR_MANAGEMENT)
      const { list: { pagination, filter } } = yield select(makeSelectCompanySeminar())
      if ((isSuperAdmin || isAdmin)) {
        yield put({
          type: REQUEST(LOAD_LIST_SEMINAR),
          payload: {
            params: {
              ...pagination,
              ...filter,
              companyId: idOfNissokenCompany
            }
          }
        })
      } else {
        yield put({
          type: REQUEST(LOAD_LIST_SEMINAR),
          payload: {
            params: {
              ...pagination,
              ...filter
            }
          }
        })
      }
    }
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_SEMINAR),
      error
    })
  }
}

export function* deleteSeminarSaga({ payload }) {
  const { callback } = payload
  try {
    const { code } = yield deleteSeminar(payload)
    let { list: { pagination, filter } } = yield select(makeSelectCompanySeminar())
    if (code === 200) {
      yield put({
        type: SUCCESS(DELETE_SEMINAR)
      })

      if (filter.total - 1 <= filter.limit && filter.page > 1) {
        filter.page -= 1
      }
      yield put({
        type: REQUEST(LOAD_LIST_SEMINAR),
        payload: {
          params: {
            ...pagination,
            ...filter
          }
        }
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_SEMINAR),
      error
    })
  }
}

export function* loadIssuePermissionSaga({ payload }) {
  try {
    const { data } = yield getDetailSeminar(payload)
    yield put({
      type: SUCCESS(LOAD_DETAIL_SEMINAR),
      payload: {
        data
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_DETAIL_SEMINAR),
      error
    })
  }
}

export function* editSeminarSaga({ payload }) {
  let { data } = payload
  const { isAdmin, isSuperAdmin, idOfNissokenCompany } = data
  data = omit(data, ['isSuperAdmin', 'isAdmin', 'idOfNissokenCompany'])

  const { history } = payload

  try {
    const { code } = yield updateSeminar(data)
    if (code === 200) {
      yield put({
        type: SUCCESS(EDIT_SEMINAR)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield history.push(RoutesName.SEMINAR_MANAGEMENT)
      const { list: { pagination, filter } } = yield select(makeSelectCompanySeminar())
      if ((isSuperAdmin || isAdmin)) {
        yield put({
          type: REQUEST(LOAD_LIST_SEMINAR),
          payload: {
            params: {
              ...pagination,
              ...filter,
              companyId: idOfNissokenCompany
            }
          }
        })
      } else {
        yield put({
          type: REQUEST(LOAD_LIST_SEMINAR),
          payload: {
            params: {
              ...pagination,
              ...filter
            }
          }
        })
      }
    }
  } catch (error) {
    yield put({
      type: FAILURE(EDIT_SEMINAR),
      error
    })
  }
}

export function* loadCompaniesSaga({ payload }) {
  try {
    const { data: companies } = yield getCompanies(payload)
    yield put({
      type: SUCCESS(LOAD_ALL_COMPANY),
      companies
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_ALL_COMPANY),
      error
    })
  }
}

export default function* companySeminarSaga() {
  yield takeLatest(REQUEST(LOAD_LIST_SEMINAR), loadListSeminar)
  yield takeLatest(REQUEST(CREATE_SEMINAR), createSeminarSaga)
  yield takeLatest(REQUEST(DELETE_SEMINAR), deleteSeminarSaga)
  yield takeLatest(REQUEST(LOAD_DETAIL_SEMINAR), loadIssuePermissionSaga)
  yield takeLatest(REQUEST(EDIT_SEMINAR), editSeminarSaga)
  yield takeLatest(REQUEST(LOAD_ALL_COMPANY), loadCompaniesSaga)
}
