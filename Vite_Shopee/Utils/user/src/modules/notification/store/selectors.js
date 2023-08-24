import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectNotificationState = (state) => state.notificationStore || initialState

const makeSelectNotification = () => createSelector(
  selectNotificationState,
  (state) => state.notifications
)

const makeSelectNotices = () => createSelector(
  selectNotificationState,
  (state) => state.notices
)

const makeSelectNotificationDetail = () => createSelector(
  selectNotificationState,
  (state) => state.notificationsDetail
)

const makeSelectError = () => createSelector(
  selectNotificationState,
  (state) => state.error
)

export {
  selectNotificationState,
  makeSelectNotification,
  makeSelectNotificationDetail,
  makeSelectNotices,
  makeSelectError
}
