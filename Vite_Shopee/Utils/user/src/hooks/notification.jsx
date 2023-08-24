/* eslint-disable no-console */
import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'
import { useInjectSaga, useInjectReducer } from '../store'
import saga from '../modules/notification/store/saga'
import reducer from '../modules/notification/store/reducer'
import {
  makeSelectNotification,
  makeSelectNotices,
  makeSelectNotificationDetail,
  makeSelectError
} from '../modules/notification/store/selectors'
import {
  loadNotifications,
  loadNotificationDetail,
  loadNotificationUnread,
  deleteNotification
} from '../modules/notification/store/actions'
import { useHistories, usePageNotFound } from '.'
import { STORAGE } from '../utils'
import { getCourseDetail } from '../apis'
import { ROUTES_NAME } from '../constants'
import { getNotificationDetail as getNotificationDetailApi } from '../apis/notification.api'

export const useNotification = ({ userId }) => {
  useInjectSaga({ key: 'notificationStore', saga })
  useInjectReducer({ key: 'notificationStore', reducer })
  const dispatch = useDispatch()
  const history = useHistories()
  const { courseId: courseIdInParams } = useParams()
  const { data: notifications, unRead, isLoadingNotices, isLoading: isLoadingNotifications } = useSelector(makeSelectNotification())
  const { data: notificationDetail, isLoading: noticeDetailLoading } = useSelector(makeSelectNotificationDetail())
  const errorNotification = useSelector(makeSelectError())

  usePageNotFound({ error: errorNotification })

  const notices = useSelector(makeSelectNotices())
  const getNotification = (query = {}) => dispatch(loadNotifications({ loginId: userId, ...query }))
  const getNotices = () => dispatch(loadNotifications({ loginId: userId, limit: 5, page: 1 }, true))

  const getNotificationDetail = (newsId) => dispatch(loadNotificationDetail({ loginId: userId, newsId }))

  const getNotificationUnread = () => dispatch(loadNotificationUnread({ loginId: userId }))

  const deleteNotifications = (ids) => dispatch(deleteNotification({ ids }))

  const handleViewDetailNotification = async ({ notification }) => {
    localStorage.setItem(STORAGE.SOURCE_PATH, history.location.pathname)
    const { reportId, talkBoardId } = notification
    if (reportId) {
      history.push(`${ROUTES_NAME.DAILY_REPORT_DETAIL}/${reportId}`)
    } else {
      history.push(`${ROUTES_NAME.TALK_BOARD}/${talkBoardId}`)
    }
    return null
  }

  const handleRedirectToNotification = async ({ notification }) => {
    localStorage.setItem(STORAGE.SOURCE_PATH, history.location.pathname)
    const { courseId, newsId } = notification
    if (courseId) {
      try {
        const { code } = await getCourseDetail({
          userId,
          courseId,
          flagCount: true
        })
        if (code === 200) {
          await getNotificationDetailApi({ loginId: userId, newsId })
        }
        if (Number(courseId) !== Number(courseIdInParams)) {
          history.push(`${ROUTES_NAME.COURSE_DETAIL}/${courseId}`)
        }
      } catch (error) {
        console.log('error:', error)
      }
    } else {
      history.push(`${ROUTES_NAME.NOTIFICATION}/${newsId}`)
    }
    return null
  }

  return {
    unRead,
    notices,
    notifications,
    notificationDetail,
    noticeDetailLoading,
    isLoadingNotifications,
    isLoadingNotices,
    getNotification,
    getNotificationDetail,
    getNotices,
    getNotificationUnread,
    deleteNotifications,
    handleViewDetailNotification,
    handleRedirectToNotification
  }
}
