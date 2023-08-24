import {
  LOAD_NOTIFICATION_LIST,
  LOAD_NOTIFICATION_LIST_SUCCESS,
  LOAD_NOTIFICATION_DETAIL,
  LOAD_NOTIFICATION_DETAIL_SUCCESS,
  LOAD_NOTICE_SUCCESS,
  LOAD_REPOS_ERROR,
  LOAD_NOTIFICATION_UNREAD,
  LOAD_NOTIFICATION_UNREAD_SUCCESS,
  LOAD_NOTIFICATION_UNREAD_FAILURE,
  DELETE_NOTIFICATION,
  DELETE_NOTIFICATION_SUCCESS
} from './constants'

export function loadNotifications(payload, isNotice = false) {
  return {
    type: LOAD_NOTIFICATION_LIST,
    payload,
    isNotice
  }
}

export function loadNotificationsSuccess(data) {
  return {
    type: LOAD_NOTIFICATION_LIST_SUCCESS,
    data
  }
}

export function loadNoticesSuccess(notices) {
  return {
    type: LOAD_NOTICE_SUCCESS,
    notices
  }
}

export function loadNotificationDetail(payload) {
  return {
    type: LOAD_NOTIFICATION_DETAIL,
    payload
  }
}

export function loadNotificationDetailSuccess(data) {
  return {
    type: LOAD_NOTIFICATION_DETAIL_SUCCESS,
    data
  }
}

export function loadNotificationUnread(payload) {
  return {
    type: LOAD_NOTIFICATION_UNREAD,
    payload
  }
}

export function loadNotificationUnreadSuccess(data) {
  return {
    type: LOAD_NOTIFICATION_UNREAD_SUCCESS,
    data
  }
}

export function loadNotificationUnreadFailure(error) {
  return {
    type: LOAD_NOTIFICATION_UNREAD_FAILURE,
    error
  }
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error
  }
}

export function deleteNotification(payload) {
  return {
    type: DELETE_NOTIFICATION,
    payload
  }
}

export function deleteNotificationSuccess(data) {
  return {
    type: DELETE_NOTIFICATION_SUCCESS,
    data
  }
}
