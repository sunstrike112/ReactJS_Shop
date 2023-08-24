import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useInjectSaga, useInjectReducer } from '../store'
import courseListSaga from '../modules/course-list/store/saga'
import courseListReducer from '../modules/course-list/store/reducer'

import {
  loadUserCategories,
  loadCourseCategories
} from '../modules/course-list/store/actions'

import {
  makeSelectUserCategories,
  makeSelectCourseCategories
} from '../modules/course-list/store/selectors'

export const useUserCategories = ({ userId, workspaceid }) => {
  useInjectSaga({ key: 'courseListStore', saga: courseListSaga })
  useInjectReducer({ key: 'courseListStore', reducer: courseListReducer })

  const dispatch = useDispatch()
  const { data: userCategories } = useSelector(makeSelectUserCategories())

  const companyCategories = useMemo(() => userCategories.listCompany.map((item) => ({
    title: item?.courseCategoryName,
    key: item?.courseCategoryId,
    children: item?.childList?.map((itemChild) => ({
      title: itemChild?.courseCategoryName,
      key: itemChild?.courseCategoryId
    }))
  })), [userCategories])

  const nissokenCategories = useMemo(() => userCategories.listNisoken.map((item) => ({
    title: item.courseCategoryName,
    key: item.courseCategoryId,
    children: item?.childList?.map((itemChild) => ({
      title: itemChild.courseCategoryName,
      key: itemChild.courseCategoryId
    }))
  })), [userCategories])

  useEffect(() => {
    if (userId) {
      dispatch(loadUserCategories(userId))
    }
  }, [userId, workspaceid]) // queries workspaceId will changed when choose WS in header ==> so must reload data categories

  return {
    userCategories,
    companyCategories,
    nissokenCategories
  }
}

export const useCourseCategories = ({ userId }) => {
  useInjectSaga({ key: 'courseListStore', saga: courseListSaga })
  useInjectReducer({ key: 'courseListStore', reducer: courseListReducer })

  const dispatch = useDispatch()
  const { data: courseCategories } = useSelector(makeSelectCourseCategories())

  useEffect(() => {
    if (userId) {
      dispatch(loadCourseCategories(userId))
    }
  }, [userId])

  return {
    courseCategories
  }
}
