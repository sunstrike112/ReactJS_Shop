/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'

import saga from 'Modules/course/registration_course/store/saga'
import reducer from 'Modules/course/registration_course/store/reducer'
import categoriesSaga from 'Modules/course/registration_categories/store/saga'
import categoriesReducer from 'Modules/course/registration_categories/store/reducer'
import unitSettingSaga from 'Modules/course/unit_settings/store/saga'
import unitSettingReducer from 'Modules/course/unit_settings/store/reducer'
import {
  makeSelectOrderCourse,
  makeSelectRegistrationCourses
} from 'Modules/course/registration_course/store/selectors'
import {
  loadCourses,
  loadOrderCourse,
  updateOrderCourse,
  loadCourse,
  createCourse,
  editCourse,
  deleteCourses,
  saveFilter,
  saveInfoCourse,
  saveInfoCourseToAssign,
  disabledIssueCourse,
  resetState
} from 'Modules/course/registration_course/store/actions'
import { useInjectSaga, useInjectReducer } from 'Stores'
import { loadAllCategories } from 'Modules/course/registration_categories/store/actions'
import { makeSelectRegistrationCourseCategories, makeSelectAllCourseCategories } from 'Modules/course/registration_categories/store/selectors'
import { selectCourseId } from 'Modules/course/unit_settings/store/actions'

export const useRegistrationCourses = () => {
  useInjectSaga({ key: 'registrationCourses', saga })
  useInjectReducer({ key: 'registrationCourses', reducer })

  useInjectSaga({ key: 'registrationCourseCategories', saga: categoriesSaga })
  useInjectReducer({ key: 'registrationCourseCategories', reducer: categoriesReducer })

  useInjectSaga({ key: 'unitSetting', saga: unitSettingSaga })
  useInjectReducer({ key: 'unitSetting', reducer: unitSettingReducer })

  const { courses, pagination, filter, isLoading, error, infoCourse, infoCourseToAssign, isDisabledIssueCourse } = useSelector(makeSelectRegistrationCourses())
  const { isLoading: isLoadingCategories, error: categoriesError } = useSelector(makeSelectRegistrationCourseCategories())
  const categoriesRedux = useSelector(makeSelectAllCourseCategories())
  const { data: categoriesOption, isLoading: isLoadingCategoriesOption } = categoriesRedux

  const dispatch = useDispatch()
  const loadCoursesAction = (payload) => dispatch(loadCourses(payload))
  const loadOrderCourseAction = (payload) => dispatch(loadOrderCourse(payload))
  const updateOrderCourseAction = (payload) => dispatch(updateOrderCourse(payload))
  const deleteCoursesAction = (payload) => dispatch(deleteCourses(payload))
  const loadAllCategoriesAction = (payload) => dispatch(loadAllCategories(payload))
  const selectCourseIdAction = (selected) => dispatch(selectCourseId({ selectedCourse: selected }))
  const loadSaveFilterAction = (payload) => dispatch(saveFilter(payload))
  const setInfoCourseAction = (payload) => dispatch(saveInfoCourse(payload))
  const saveInfoCourseToAssignAction = (payload) => dispatch(saveInfoCourseToAssign(payload))
  const disableIssueCourseAction = () => dispatch(disabledIssueCourse())
  const resetStateAction = () => dispatch(resetState())

  return {
    courses,
    pagination,
    filter,
    isLoading,
    error,
    isLoadingCategories,
    isLoadingCategoriesOption,
    categoriesError,
    categoriesOption,
    infoCourse,
    infoCourseToAssign,
    isDisabledIssueCourse,
    loadCoursesAction,
    loadOrderCourseAction,
    updateOrderCourseAction,
    deleteCoursesAction,
    loadAllCategoriesAction,
    selectCourseIdAction,
    loadSaveFilterAction,
    setInfoCourseAction,
    saveInfoCourseToAssignAction,
    disableIssueCourseAction,
    resetStateAction
  }
}

export const useSortCourses = () => {
  const { isLoading, error, isSubmitting } = useSelector(makeSelectRegistrationCourses())
  const order = useSelector(makeSelectOrderCourse())

  const dispatch = useDispatch()
  const updateOrderCourseAction = (payload) => dispatch(updateOrderCourse(payload))

  return {
    order,
    isLoading,
    isSubmitting,
    error,
    updateOrderCourseAction
  }
}

export const useCreateCourse = () => {
  useInjectSaga({ key: 'registrationCourses', saga })
  useInjectReducer({ key: 'registrationCourses', reducer })

  useInjectSaga({ key: 'registrationCourseCategories', saga: categoriesSaga })
  useInjectReducer({ key: 'registrationCourseCategories', reducer: categoriesReducer })

  const { isSubmitting, error } = useSelector(makeSelectRegistrationCourses())
  const { isLoading: isLoadingCategories, error: categoriesError } = useSelector(makeSelectRegistrationCourseCategories())
  const categoriesRedux = useSelector(makeSelectAllCourseCategories())
  const { data: categoriesOption, isLoading: isLoadingCategoriesOption } = categoriesRedux

  const dispatch = useDispatch()
  const loadAllCategoriesAction = (payload) => dispatch(loadAllCategories(payload))
  const createCourseAction = (payload) => dispatch(createCourse(payload))

  return {
    isSubmitting,
    error,
    isLoadingCategories,
    isLoadingCategoriesOption,
    categoriesError,
    categoriesOption,
    loadAllCategoriesAction,
    createCourseAction
  }
}

export const useUpdateCourse = () => {
  useInjectSaga({ key: 'registrationCourses', saga })
  useInjectReducer({ key: 'registrationCourses', reducer })

  useInjectSaga({ key: 'registrationCourseCategories', saga: categoriesSaga })
  useInjectReducer({ key: 'registrationCourseCategories', reducer: categoriesReducer })

  const { course, isSubmitting, error } = useSelector(makeSelectRegistrationCourses())
  const { isLoading: isLoadingCategories, error: categoriesError } = useSelector(makeSelectRegistrationCourseCategories())
  const categoriesRedux = useSelector(makeSelectAllCourseCategories())
  const { data: categoriesOption, isLoading: isLoadingCategoriesOption } = categoriesRedux

  const dispatch = useDispatch()
  const loadAllCategoriesAction = (payload) => dispatch(loadAllCategories(payload))
  const loadCourseAction = (payload) => dispatch(loadCourse(payload))
  const editCourseAction = (payload) => dispatch(editCourse(payload))

  return {
    course,
    isSubmitting,
    error,
    isLoadingCategories,
    isLoadingCategoriesOption,
    categoriesError,
    categoriesOption,
    loadAllCategoriesAction,
    loadCourseAction,
    editCourseAction
  }
}

export const useLoadCourse = () => {
  useInjectSaga({ key: 'registrationCourses', saga })
  useInjectReducer({ key: 'registrationCourses', reducer })

  const { course } = useSelector(makeSelectRegistrationCourses())

  const dispatch = useDispatch()
  const loadCourseAction = (payload) => dispatch(loadCourse(payload))

  return {
    course,
    loadCourseAction
  }
}
