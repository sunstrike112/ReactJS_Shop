/* eslint-disable no-restricted-globals */
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import saga from 'Modules/course/auto_assignment/store/saga'
import reducer from 'Modules/course/auto_assignment/store/reducer'
import { useInjectSaga, useInjectReducer } from 'Stores'
import {
  createAssignment,
  deleteCourseAssignment,
  loadAutomaticAssignment,
  loadCourseAssignment,
  loadCourseCategory,
  loadDetailAssignment,
  loadTargetAttribute,
  loadTargetGroup,
  updateAssignment,
  resetAutoAssignments
} from 'Modules/course/auto_assignment/store/actions'
import {
  makeSelectAutoAssignment
} from 'Modules/course/auto_assignment/store/selectors'
import { COMPANY_NAME } from 'Constants/course'

export const useLoadAutomaticAssignment = () => {
  useInjectSaga({ key: 'autoAssignment', saga })
  useInjectReducer({ key: 'autoAssignment', reducer })

  const dispatch = useDispatch()

  const { autoAssignment, pagination, filter, isLoading } = useSelector(makeSelectAutoAssignment())

  const loadAutomaticAssignmentAction = (payload) => dispatch(loadAutomaticAssignment(payload))
  const resetAutoAssignmentsAction = (payload) => dispatch(resetAutoAssignments(payload))

  return {
    loadAutomaticAssignmentAction,
    resetAutoAssignmentsAction,
    autoAssignment,
    pagination,
    filter,
    isLoading
  }
}

export const useDeleteCourseAssignment = () => {
  useInjectSaga({ key: 'autoAssignment', saga })
  useInjectReducer({ key: 'autoAssignment', reducer })

  const dispatch = useDispatch()

  const { isSubmitting } = useSelector(makeSelectAutoAssignment())

  const deleteCourseAssignmentAction = (payload) => dispatch(deleteCourseAssignment(payload))

  return {
    deleteCourseAssignmentAction,
    isSubmitting
  }
}

export const useLoadCourseCategory = () => {
  useInjectSaga({ key: 'autoAssignment', saga })
  useInjectReducer({ key: 'autoAssignment', reducer })

  const dispatch = useDispatch()

  const { courseCategory: { isLoading: isLoadingCategory, data: courseCategoryOptions } } = useSelector(makeSelectAutoAssignment())

  const loadCourseCategoryAction = (payload) => dispatch(loadCourseCategory(payload))

  return {
    loadCourseCategoryAction,
    isLoadingCategory,
    courseCategoryOptions
  }
}

export const useLoadCourseAssignment = () => {
  useInjectSaga({ key: 'autoAssignment', saga })
  useInjectReducer({ key: 'autoAssignment', reducer })

  const dispatch = useDispatch()

  const { courseAssignment: courseAssignmentRedux, pagination, filter, isLoading } = useSelector(makeSelectAutoAssignment())

  const loadCourseAssignmentAction = (payload) => dispatch(loadCourseAssignment(payload))

  const courseAssignment = useMemo(() => courseAssignmentRedux.map((item) => ({
    ...item,
    courseType: item.courseType === 'NISSOKEN'
      ? COMPANY_NAME.NISSOKEN : COMPANY_NAME.COMPANY
  })), [courseAssignmentRedux])

  return {
    loadCourseAssignmentAction,
    courseAssignment,
    pagination,
    filter,
    isLoading
  }
}

export const useLoadTargetAutoAssignment = () => {
  useInjectSaga({ key: 'autoAssignment', saga })
  useInjectReducer({ key: 'autoAssignment', reducer })

  const dispatch = useDispatch()

  const { targetGroup, targetAttribute } = useSelector(makeSelectAutoAssignment())

  const loadTargetGroupAction = (payload) => dispatch(loadTargetGroup(payload))
  const loadTargetAttributeAction = (payload) => dispatch(loadTargetAttribute(payload))

  return {
    loadTargetGroupAction,
    loadTargetAttributeAction,
    targetGroup,
    targetAttribute
  }
}

export const useCreateAssignment = () => {
  useInjectSaga({ key: 'autoAssignment', saga })
  useInjectReducer({ key: 'autoAssignment', reducer })

  const dispatch = useDispatch()

  const { isSubmitting, isLoadingCreate } = useSelector(makeSelectAutoAssignment())

  const createAssignmentAction = (payload) => dispatch(createAssignment(payload))

  return {
    createAssignmentAction,
    isSubmitting,
    isLoadingCreate
  }
}

export const useEditAssignment = () => {
  useInjectSaga({ key: 'autoAssignment', saga })
  useInjectReducer({ key: 'autoAssignment', reducer })

  const dispatch = useDispatch()

  const { detailAssignment, isLoadingUpdate } = useSelector(makeSelectAutoAssignment())

  const loadDetailAssignmentAction = (payload) => dispatch(loadDetailAssignment(payload))
  const updateAssignmentAction = (payload) => dispatch(updateAssignment(payload))

  return {
    loadDetailAssignmentAction,
    updateAssignmentAction,
    detailAssignment,
    isLoadingUpdate
  }
}
