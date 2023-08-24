/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 * @param  {state} login state
 * @param  {action} login action
 */
import { LOCATION_CHANGE } from 'connected-react-router'
import { DEFAULT_PAG } from '../../../constants'
import { createReducer, updateObject } from '../../../store'
import {
  LOAD_NOTIFICATION_LIST,
  LOAD_NOTIFICATION_LIST_SUCCESS,
  LOAD_NOTIFICATION_DETAIL,
  LOAD_NOTIFICATION_DETAIL_SUCCESS,
  LOAD_NOTICE_SUCCESS,
  LOAD_REPOS_ERROR,
  LOAD_NOTIFICATION_UNREAD_SUCCESS
} from './constants'

const notificationsInitial = {
  result: [],
  total: 0,
  limit: DEFAULT_PAG.limit,
  page: 1,
  pages: 1
}

const notificationsDetailInitial = {
  title: '',
  imgCreator: '',
  creatorName: '',
  publicationStart: 0,
  publicationEnd: 0,
  text: '',
  courseId: null
}

export const initialState = {
  notifications: {
    isLoading: false,
    data: notificationsInitial,
    unRead: 0,
    error: null
  },
  notificationsDetail: {
    isLoading: false,
    data: notificationsDetailInitial,
    error: null
  },
  notices: [],
  error: null
}

function loadNotifications(state, { isNotice }) {
  return updateObject(state, {
    notifications: {
      ...state.notifications,
      isLoading: !isNotice,
      isLoadingNotices: isNotice
    }
  })
}

function loadNotificationsSuccess(state, { data }) {
  return updateObject(state, {
    notifications: {
      ...state.notifications,
      data,
      isLoading: false
    }
  })
}

function loadNoticeSuccess(state, { notices }) {
  return updateObject(state, {
    notices,
    notifications: {
      ...state.notifications,
      isLoadingNotices: false
    }
  })
}

function loadNotificationDetail(state) {
  return updateObject(state, {
    notificationsDetail: {
      ...state.notificationsDetail,
      isLoading: true
    }
  })
}

function loadNotificationDetailSuccess(state, { data }) {
  return updateObject(state, {
    notificationsDetail: {
      ...state.notificationsDetail,
      isLoading: false,
      data
    }
  })
}

function repoLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function loadNotificationsUnreadSuccess(state, { data }) {
  return updateObject(state, {
    notifications: {
      ...state.notifications,
      unRead: data
    }
  })
}

function resetState(state) {
  return updateObject(state, {
    ...initialState,
    notifications: {
      ...initialState.notifications,
      unRead: state.notifications.unRead
    }
  })
}

export default createReducer(initialState, {
  [LOAD_NOTIFICATION_LIST]: loadNotifications,
  [LOAD_NOTIFICATION_LIST_SUCCESS]: loadNotificationsSuccess,

  [LOAD_NOTIFICATION_DETAIL]: loadNotificationDetail,
  [LOAD_NOTIFICATION_DETAIL_SUCCESS]: loadNotificationDetailSuccess,

  [LOAD_NOTICE_SUCCESS]: loadNoticeSuccess,

  [LOAD_NOTIFICATION_UNREAD_SUCCESS]: loadNotificationsUnreadSuccess,

  [LOAD_REPOS_ERROR]: repoLoadingError,

  [LOCATION_CHANGE]: resetState
})
