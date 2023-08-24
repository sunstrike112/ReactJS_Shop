/* eslint-disable no-unused-vars */
import { put, takeLatest } from 'redux-saga/effects'
import {
  createDailyReportAPI,
  createTemplateAPI,
  deleteDailyReportAPI,
  deleteTemplateAPI,
  editTemplateAPI,
  getDailyReportAPI,
  getDailyReportsAPI,
  getTemplateDetailAPI,
  getTemplatesAPI,
  dislikeDailyReportAPI,
  editDailyReportAPI,
  likeDailyReportAPI,
  markReadDailyReportAPI,
  createDailyReportCommentAPI,
  searchCommentsDailyReportAPI,
  getUsersInteractedDailyReportAPI,
  editDailyReportCommentAPI,
  deleteDailyReportCommentAPI,
  likeDailyReportCommentAPI,
  dislikeDailyReportCommentAPI,
  getUsersInteractedDailyReportCommentAPI,
  setCompleteDailyReportAPI,
  getUnreadDailyReportAPI,
  getPrevNextDailyReportAPI
} from '../../../apis'
import { SORT_TYPE, ACTIONS_INTERACTIVE, ROUTES_NAME, DEFAULT_PAG } from '../../../constants'
import { loadingPortalRequest, loadingPortalStop } from '../../../routes/store/actions'
import { FAILURE, REQUEST, SUCCESS } from '../../../store'
import { repoLoadingError } from '../../course/store/actions'

import {
  CREATE_DAILY_REPORT,
  CREATE_TEMPLATE,
  DELETE_DAILY_REPORT,
  DELETE_TEMPLATE,
  EDIT_TEMPLATE,
  DISLIKE_DAILY_REPORT,
  EDIT_DAILY_REPORT,
  LIKE_DAILY_REPORT,
  LOAD_DAILY_REPORT,
  LOAD_DAILY_REPORTS,
  LOAD_TEMPLATES,
  LOAD_TEMPLATE_DETAIL,
  MARK_READ_DAILY_REPORT,
  LOAD_USERS_INTERACTED_DAILY_REPORT,
  CREATE_DAILY_REPORT_COMMENT,
  LOAD_COMMENTS_DAILY_REPORT,
  EDIT_DAILY_REPORT_COMMENT,
  SET_COMMENT_FOR_EDIT,
  DELETE_DAILY_REPORT_COMMENT,
  LIKE_DAILY_REPORT_COMMENT,
  DISLIKE_DAILY_REPORT_COMMENT,
  LOAD_USERS_INTERACTED_DAILY_REPORT_COMMENT,
  SET_COMPLETE_DAILY_REPORT,
  GET_UNREAD,
  GET_PREV_NEXT
} from './constants'

// Daily reports
export function* loadDailyReportsSaga({ payload }) {
  try {
    const { code, data: dataRes } = yield getDailyReportsAPI(payload.data)
    const { data, ...pagination } = dataRes
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_DAILY_REPORTS),
        data,
        pagination,
        filter: payload.data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_DAILY_REPORTS),
      error
    })
  }
}

export function* loadDailyReportSaga({ payload }) {
  yield put(loadingPortalRequest())
  try {
    const { code, data } = yield getDailyReportAPI(payload.dailyReportId)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_DAILY_REPORT),
        data
      })
      yield put({ type: REQUEST(GET_UNREAD) })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_DAILY_REPORT),
      error
    })
  } finally {
    yield put(loadingPortalStop())
  }
}

export function* createDailyReportSaga({ payload }) {
  const { data, callback } = payload
  yield put(loadingPortalRequest())
  try {
    const { code } = yield createDailyReportAPI(data)
    if (code === 200) {
      callback.done()
    }
  } catch (error) {
    yield put(repoLoadingError(error))
  } finally {
    yield put(loadingPortalStop())
  }
}

export function* editDailyReportSaga({ payload }) {
  const { data, dailyReportId, callback } = payload
  yield put(loadingPortalRequest())
  try {
    const { code } = yield editDailyReportAPI({ dailyReportId, data })
    if (code === 200) {
      callback.done()
    }
  } catch (error) {
    yield put(repoLoadingError(error))
  } finally {
    yield put(loadingPortalStop())
  }
}

export function* deleteDailyReportSaga({ payload }) {
  const { callback, filter, isLocatedAtDetailScreen } = payload
  try {
    const { code } = yield deleteDailyReportAPI(payload.dailyReportId)
    if (code === 200) {
      yield put({
        type: SUCCESS(DELETE_DAILY_REPORT)
      })
      if (isLocatedAtDetailScreen) {
        callback.redirectToDailyReports()
      } else {
        yield put({
          type: REQUEST(LOAD_DAILY_REPORTS),
          payload: { data: filter }
        })
      }
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_DAILY_REPORT),
      error
    })
  }
}

export function* loadUsersInteractedDailyReportSaga({ payload }) {
  try {
    if (payload.isLoadAll) {
      const response = yield Promise.all([
        getUsersInteractedDailyReportAPI(ACTIONS_INTERACTIVE.LIKE, payload.dailyReportId),
        getUsersInteractedDailyReportAPI(ACTIONS_INTERACTIVE.DISLIKE, payload.dailyReportId),
        getUsersInteractedDailyReportAPI(ACTIONS_INTERACTIVE.COMPLETE, payload.dailyReportId)
      ])
      if (response) {
        yield put({
          type: SUCCESS(LOAD_USERS_INTERACTED_DAILY_REPORT),
          data: { like: response[0].data, dislike: response[1].data, complete: response[2].data }
        })
      }
    } else {
      const { code, data } = yield getUsersInteractedDailyReportAPI(payload.action, payload.dailyReportId)
      if (code === 200) {
        yield put({
          type: SUCCESS(LOAD_USERS_INTERACTED_DAILY_REPORT),
          data: { [payload.action]: data }
        })
      }
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_USERS_INTERACTED_DAILY_REPORT),
      error
    })
  }
}

export function* likeDailyReportSaga({ payload }) {
  try {
    const { code, data } = yield likeDailyReportAPI(payload.dailyReportId)
    if (code === 200) {
      yield put({
        type: SUCCESS(LIKE_DAILY_REPORT),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LIKE_DAILY_REPORT),
      error
    })
  }
}

export function* dislikeDailyReportSaga({ payload }) {
  try {
    const { code, data } = yield dislikeDailyReportAPI(payload.dailyReportId)
    if (code === 200) {
      yield put({
        type: SUCCESS(DISLIKE_DAILY_REPORT),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(DISLIKE_DAILY_REPORT),
      error
    })
  }
}

export function* makReadDailyReportSaga({ payload }) {
  try {
    const { code, data } = yield markReadDailyReportAPI(payload.dailyReportId)
    if (code === 200) {
      yield put({
        type: SUCCESS(MARK_READ_DAILY_REPORT),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(MARK_READ_DAILY_REPORT),
      error
    })
  }
}

export function* loadCommentsDailyReportSaga({ payload }) {
  try {
    const { code, data: { page, limit, pages, total, result } } = yield searchCommentsDailyReportAPI(payload.data)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_COMMENTS_DAILY_REPORT),
        data: result,
        pagination: { page, limit, pages, total },
        filter: payload.data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_COMMENTS_DAILY_REPORT),
      error
    })
  }
}

export function* createDailyReportCommentSaga({ payload }) {
  try {
    const { code, data } = yield createDailyReportCommentAPI(payload.data)
    if (code === 200) {
      yield put({
        type: SUCCESS(CREATE_DAILY_REPORT_COMMENT),
        data
      })
      yield put({
        type: REQUEST(LOAD_COMMENTS_DAILY_REPORT),
        payload: { data: { page: 1, limit: 5, reportId: payload.dailyReportId, sortType: SORT_TYPE.DESC } }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_DAILY_REPORT_COMMENT),
      error
    })
  }
}

export function* editDailyReportCommentSaga({ payload }) {
  const { filter } = payload
  try {
    const { code, data } = yield editDailyReportCommentAPI(payload.commentId, payload.data)
    if (code === 200) {
      yield put({
        type: SUCCESS(EDIT_DAILY_REPORT_COMMENT),
        data
      })
      yield put({
        type: REQUEST(LOAD_COMMENTS_DAILY_REPORT),
        payload: { data: filter }
      })
      yield put({
        type: REQUEST(SET_COMMENT_FOR_EDIT),
        data: {}
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(EDIT_DAILY_REPORT_COMMENT),
      error
    })
  }
}

export function* deleteDailyReportCommentSaga({ payload }) {
  const { commentId, filter } = payload
  try {
    const { code, data } = yield deleteDailyReportCommentAPI(commentId)
    if (code === 200) {
      yield put({
        type: SUCCESS(DELETE_DAILY_REPORT_COMMENT),
        data
      })
      yield put({
        type: REQUEST(LOAD_COMMENTS_DAILY_REPORT),
        payload: { data: filter }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_DAILY_REPORT_COMMENT),
      error
    })
  }
}

export function* likeDailyReportCommentSaga({ payload }) {
  try {
    const { code, data } = yield likeDailyReportCommentAPI(payload.commentId)
    if (code === 200) {
      yield put({
        type: SUCCESS(LIKE_DAILY_REPORT_COMMENT),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LIKE_DAILY_REPORT_COMMENT),
      error
    })
  }
}

export function* dislikeDailyReportCommentSaga({ payload }) {
  try {
    const { code, data } = yield dislikeDailyReportCommentAPI(payload.commentId)
    if (code === 200) {
      yield put({
        type: SUCCESS(DISLIKE_DAILY_REPORT_COMMENT),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(DISLIKE_DAILY_REPORT_COMMENT),
      error
    })
  }
}

export function* loadUsersInteractedDailyReportCommentSaga({ payload }) {
  try {
    if (payload.isLoadAll) {
      const response = yield Promise.all([
        getUsersInteractedDailyReportCommentAPI(ACTIONS_INTERACTIVE.LIKE, payload.commentId),
        getUsersInteractedDailyReportCommentAPI(ACTIONS_INTERACTIVE.DISLIKE, payload.commentId)
      ])
      if (response) {
        yield put({
          type: SUCCESS(LOAD_USERS_INTERACTED_DAILY_REPORT_COMMENT),
          data: { like: response[0].data, dislike: response[1].data }
        })
      }
    } else {
      const { code, data } = yield getUsersInteractedDailyReportCommentAPI(payload.action, payload.commentId)
      if (code === 200) {
        yield put({
          type: SUCCESS(LOAD_USERS_INTERACTED_DAILY_REPORT_COMMENT),
          data: { [payload.action]: data }
        })
      }
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_USERS_INTERACTED_DAILY_REPORT_COMMENT),
      error
    })
  }
}

export function* setCompleteDailyReportSaga({ payload }) {
  try {
    const { code, data } = yield setCompleteDailyReportAPI(payload.dailyReportId)
    if (code === 200) {
      yield put({
        type: SUCCESS(SET_COMPLETE_DAILY_REPORT),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(SET_COMPLETE_DAILY_REPORT),
      error
    })
  }
}

export function* getUnreadDailyReportSaga() {
  try {
    const { data } = yield getUnreadDailyReportAPI()
    yield put({
      type: SUCCESS(GET_UNREAD),
      data
    })
  } catch (error) {
    yield put({
      type: FAILURE(GET_UNREAD),
      error
    })
  }
}

export function* getPrevNextDailyReportSaga({ payload }) {
  const { queriesParam, data, history } = payload
  const { currentId } = queriesParam
  try {
    const { data: { id: prevOrNextId } } = yield getPrevNextDailyReportAPI({ queriesParam, data })
    yield put({
      type: SUCCESS(GET_PREV_NEXT),
      data
    })
    if (Number(currentId) !== Number(prevOrNextId)) {
      history.push(`${ROUTES_NAME.DAILY_REPORT_DETAIL}/${prevOrNextId}`)
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_PREV_NEXT),
      error
    })
  }
}

// Templates
export function* loadTemplatesSaga({ payload }) {
  const { isKeepDefaultPaging } = payload
  try {
    const { code, data } = yield getTemplatesAPI(payload.params)
    const { result, total, limit, pages, page } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_TEMPLATES),
        data: result,
        pagination: isKeepDefaultPaging ? { ...DEFAULT_PAG } : { total, limit, pages, page },
        filter: payload.params || {}
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_TEMPLATES),
      error
    })
  }
}

export function* loadTemplateDetailSaga({ payload }) {
  const { callback } = payload
  try {
    const { code, data } = yield getTemplateDetailAPI(payload.templateId)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_TEMPLATE_DETAIL),
        data
      })
      if (callback?.setContentValue) {
        callback.setContentValue(data.description)
      }
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_TEMPLATE_DETAIL),
      error
    })
  }
}

export function* deleteTemplateReportSaga({ payload }) {
  try {
    const { code } = yield deleteTemplateAPI(payload.templateId)
    if (code === 200) {
      yield put({
        type: SUCCESS(DELETE_TEMPLATE),
        payload
      })
      yield put({
        type: REQUEST(LOAD_TEMPLATES),
        payload: { params: { ...payload.filter } }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_TEMPLATE),
      error
    })
  }
}

export function* createTemplateSaga({ payload }) {
  const { data, callback } = payload
  yield put(loadingPortalRequest())
  try {
    const { code } = yield createTemplateAPI(data)
    if (code === 200) {
      callback.done()
    }
  } catch (error) {
    yield put(repoLoadingError(error))
  } finally {
    yield put(loadingPortalStop())
  }
}

export function* editTemplateSaga({ payload }) {
  const { data, templateId, callback } = payload
  yield put(loadingPortalRequest())
  try {
    const { code } = yield editTemplateAPI(templateId, data)
    if (code === 200) {
      callback.done()
    }
  } catch (error) {
    yield put(repoLoadingError(error))
  } finally {
    yield put(loadingPortalStop())
  }
}

export default function* dailyReportsSaga() {
  yield takeLatest(REQUEST(LOAD_DAILY_REPORTS), loadDailyReportsSaga)
  yield takeLatest(REQUEST(LOAD_DAILY_REPORT), loadDailyReportSaga)
  yield takeLatest(REQUEST(CREATE_DAILY_REPORT), createDailyReportSaga)
  yield takeLatest(REQUEST(EDIT_DAILY_REPORT), editDailyReportSaga)
  yield takeLatest(REQUEST(DELETE_DAILY_REPORT), deleteDailyReportSaga)
  yield takeLatest(REQUEST(LOAD_USERS_INTERACTED_DAILY_REPORT), loadUsersInteractedDailyReportSaga)
  yield takeLatest(REQUEST(LIKE_DAILY_REPORT), likeDailyReportSaga)
  yield takeLatest(REQUEST(DISLIKE_DAILY_REPORT), dislikeDailyReportSaga)
  yield takeLatest(REQUEST(MARK_READ_DAILY_REPORT), makReadDailyReportSaga)
  yield takeLatest(REQUEST(LOAD_COMMENTS_DAILY_REPORT), loadCommentsDailyReportSaga)
  yield takeLatest(REQUEST(CREATE_DAILY_REPORT_COMMENT), createDailyReportCommentSaga)
  yield takeLatest(REQUEST(EDIT_DAILY_REPORT_COMMENT), editDailyReportCommentSaga)
  yield takeLatest(REQUEST(DELETE_DAILY_REPORT_COMMENT), deleteDailyReportCommentSaga)
  yield takeLatest(REQUEST(LIKE_DAILY_REPORT_COMMENT), likeDailyReportCommentSaga)
  yield takeLatest(REQUEST(DISLIKE_DAILY_REPORT_COMMENT), dislikeDailyReportCommentSaga)
  yield takeLatest(REQUEST(LOAD_USERS_INTERACTED_DAILY_REPORT_COMMENT), loadUsersInteractedDailyReportCommentSaga)
  yield takeLatest(REQUEST(SET_COMPLETE_DAILY_REPORT), setCompleteDailyReportSaga)
  yield takeLatest(REQUEST(GET_UNREAD), getUnreadDailyReportSaga)
  yield takeLatest(REQUEST(GET_PREV_NEXT), getPrevNextDailyReportSaga)

  yield takeLatest(REQUEST(LOAD_TEMPLATES), loadTemplatesSaga)
  yield takeLatest(REQUEST(LOAD_TEMPLATE_DETAIL), loadTemplateDetailSaga)
  yield takeLatest(REQUEST(DELETE_TEMPLATE), deleteTemplateReportSaga)
  yield takeLatest(REQUEST(CREATE_TEMPLATE), createTemplateSaga)
  yield takeLatest(REQUEST(EDIT_TEMPLATE), editTemplateSaga)
}
