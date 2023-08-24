/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'

import saga from 'Modules/notification/notify-management/store/saga'
import reducer from 'Modules/notification/notify-management/store/reducer'
import {
  createNotifi,
  loadFindUser,
  deleteNotifi,
  listUser, getNotifi, editNotifi, loadSendHistory, deleteHistory, getEmailDetail, resetNotifications, resetEmailHistories } from 'Modules/notification/notify-management/store/actions'
import { useInjectSaga, useInjectReducer } from 'Stores'
import { makeSelectRegistrationNotifi } from 'Modules/notification/notify-management/store/selectors'

export const useCreateNotify = () => {
  useInjectSaga({ key: 'registrationNotifi', saga })
  useInjectReducer({ key: 'registrationNotifi', reducer })

  const { isSubmitting, error, listDataUser, listDataUserAll, pagination, filter, isLoading, notifi } = useSelector(makeSelectRegistrationNotifi())

  const dispatch = useDispatch()
  const createNotifiAction = (payload) => dispatch(createNotifi(payload))
  const listUserAction = (payload) => dispatch(listUser(payload))
  const getNotifiAction = (payload) => dispatch(getNotifi(payload))
  const editNotifiAction = (payload) => dispatch(editNotifi(payload))

  return {
    notifi,
    isSubmitting,
    error,
    createNotifiAction,
    listUserAction,
    listDataUser,
    listDataUserAll,
    pagination,
    filter,
    isLoading,
    getNotifiAction,
    editNotifiAction
  }
}

export const useLoadNotifi = () => {
  useInjectSaga({ key: 'registrationNotifi', saga })
  useInjectReducer({ key: 'registrationNotifi', reducer })

  const { findUser, pagination, filter, isLoading, isSubmitting, error, listSendHistory, emailDetail } = useSelector(makeSelectRegistrationNotifi())

  const dispatch = useDispatch()
  const loadFindUserAction = (payload) => dispatch(loadFindUser(payload))
  const deleteNotifiAction = (payload) => dispatch(deleteNotifi(payload))
  const loadSendHistoryAction = (payload) => dispatch(loadSendHistory(payload))
  const getEmailDetailAction = (payload) => dispatch(getEmailDetail(payload))
  const deleteHistoryAction = (payload) => dispatch(deleteHistory(payload))
  const resetNotificationsAction = () => dispatch(resetNotifications())
  const resetEmailHistoriesAction = () => dispatch(resetEmailHistories())

  return {
    isLoading,
    isSubmitting,
    error,
    pagination,
    filter,
    findUser,
    listSendHistory,
    emailDetail,
    loadFindUserAction,
    deleteNotifiAction,
    loadSendHistoryAction,
    deleteHistoryAction,
    getEmailDetailAction,
    resetNotificationsAction,
    resetEmailHistoriesAction
  }
}
