import { LOCATION_CHANGE } from 'connected-react-router'
import { createReducer, updateObject } from 'Stores'
import { DEFAULT_PAG } from 'Utils'
import {
  LOAD_COURSE_CATEGORIES,
  LOAD_COURSE_CATEGORIES_SUCCESS,
  LOAD_COURSE_CATEGORIES_ERROR,
  LOAD_ALL_COURSE_CATEGORIES,
  LOAD_ALL_COURSE_CATEGORIES_SUCCESS,
  LOAD_ALL_COURSE_CATEGORIES_ERROR,
  CREATE_COURSE_CATEGORIES,
  CREATE_COURSE_CATEGORIES_SUCCESS,
  CREATE_COURSE_CATEGORIES_ERROR,
  LOAD_COURSE_CATEGORY_DETAIL,
  LOAD_COURSE_CATEGORY_DETAIL_SUCCESS,
  LOAD_COURSE_CATEGORY_DETAIL_ERROR,
  EDIT_COURSE_CATEGORY_DETAIL,
  EDIT_COURSE_CATEGORY_DETAIL_SUCCESS,
  EDIT_COURSE_CATEGORY_DETAIL_ERROR,
  GET_COURSE_CATEGORIES_REORDER,
  GET_COURSE_CATEGORIES_REORDER_SUCCESS,
  GET_COURSE_CATEGORIES_REORDER_ERROR,
  REORDER_COURSE_CATEGORIES,
  REORDER_COURSE_CATEGORIES_SUCCESS,
  REORDER_COURSE_CATEGORIES_ERROR,
  DELETE_COURSE_CATEGORIES,
  DELETE_COURSE_CATEGORIES_SUCCESS,
  DELETE_COURSE_CATEGORIES_ERROR,
  SAVE_CATEGORY_PREVIEW,
  RESET_COURSE_CATEGORIES
} from './constants'

const listAllCategories = {
  isLoading: false,
  data: [],
  error: null
}

export const initialState = {
  isLoading: false,
  error: null,
  categories: [],
  pagination: {
    ...DEFAULT_PAG,
    total: 0
  },
  filter: {},
  listAllCategories: { ...listAllCategories },
  isCreateOrEditSuccess: false,
  courseCategoryDetail: null,
  listCategoriesOrder: [],
  isDeleteSuccess: false,
  dataDelete: [],
  categoryPreview: {}
}

function loadCategories(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function categoriesLoaded(state, { categories, pagination, filter }) {
  return updateObject(state, {
    isLoading: false,
    categories,
    pagination,
    filter
  })
}

function categoriesLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function loadAllCategories(state) {
  return updateObject(state, {
    listAllCategories: {
      ...state.listAllCategories,
      isLoading: true
    }
  })
}

function allCategoriesLoaded(state, { data }) {
  return updateObject(state, {
    listAllCategories: {
      ...state.listAllCategories,
      isLoading: false,
      data
    }
  })
}

function allCategoriesLoadingError(state, { error }) {
  return updateObject(state, {
    listAllCategories: {
      ...state.listAllCategories,
      isLoading: false,
      error
    }
  })
}

function createCourseCategory(state) {
  return updateObject(state, {
    error: null,
    isLoading: true,
    isCreateOrEditSuccess: false
  })
}

function createCourseCategorySuccess(state, {
  isCreateOrEditSuccess
}) {
  return updateObject(state, {
    isLoading: false,
    isCreateOrEditSuccess
  })
}

function createCourseCategoryError(state, { error }) {
  return updateObject(state, { isLoading: false, error })
}

function editCourseCategory(state) {
  return updateObject(state, {
    error: null,
    isLoading: true,
    isCreateOrEditSuccess: false
  })
}

function editCourseCategorySuccess(state, {
  isCreateOrEditSuccess
}) {
  return updateObject(state, {
    isLoading: false,
    isCreateOrEditSuccess
  })
}

function editCourseCategoryError(state, { error }) {
  return updateObject(state, { isLoading: false, error })
}

function deleteCourseCategory(state) {
  return updateObject(state, {
    error: null,
    isLoading: true,
    isDeleteSuccess: false
  })
}

function deleteCourseCategorySuccess(state, {
  isDeleteSuccess,
  dataDelete
}) {
  return updateObject(state, {
    isLoading: false,
    isDeleteSuccess,
    dataDelete
  })
}

function deleteCourseCategoryError(state, { error }) {
  return updateObject(state, { error, isDeleteSuccess: false })
}

function loadCourseCategoryDetail(state) {
  return updateObject(state, {})
}

function courseCategoryDetailLoaded(state, {
  courseCategoryDetail
}) {
  return updateObject(state, {
    courseCategoryDetail
  })
}

function courseCategoryDetailLoadingError(state, { error }) {
  return updateObject(state, { error })
}

function getCourseCategoriesReOrder(state) {
  return updateObject(state, {})
}

function getCourseCategoriesReOrderSuccess(state, {
  listCategoriesOrder
}) {
  return updateObject(state, {
    listCategoriesOrder
  })
}

function getCourseCategoriesReOrderError(state, { error }) {
  return updateObject(state, { error })
}

function reOrderCourseCategories(state) {
  return updateObject(state, {})
}

function reOrderCourseCategoriesSuccess(state, {
  listCategoriesOrder
}) {
  return updateObject(state, {
    listCategoriesOrder
  })
}

function reOrderCourseCategoriesError(state, { error }) {
  return updateObject(state, { error })
}

function saveCategoryPreview(state, { payload }) {
  return updateObject(state, {
    categoryPreview: payload
  })
}

function resetState(state) {
  return updateObject(state, {
    ...initialState,
    categoryPreview: state.categoryPreview
  })
}

// Slice reducer
export default createReducer(initialState, {
  [LOAD_COURSE_CATEGORIES]: loadCategories,
  [LOAD_COURSE_CATEGORIES_SUCCESS]: categoriesLoaded,
  [LOAD_COURSE_CATEGORIES_ERROR]: categoriesLoadingError,

  [LOAD_ALL_COURSE_CATEGORIES]: loadAllCategories,
  [LOAD_ALL_COURSE_CATEGORIES_SUCCESS]: allCategoriesLoaded,
  [LOAD_ALL_COURSE_CATEGORIES_ERROR]: allCategoriesLoadingError,

  [CREATE_COURSE_CATEGORIES]: createCourseCategory,
  [CREATE_COURSE_CATEGORIES_SUCCESS]: createCourseCategorySuccess,
  [CREATE_COURSE_CATEGORIES_ERROR]: createCourseCategoryError,

  [EDIT_COURSE_CATEGORY_DETAIL]: editCourseCategory,
  [EDIT_COURSE_CATEGORY_DETAIL_SUCCESS]: editCourseCategorySuccess,
  [EDIT_COURSE_CATEGORY_DETAIL_ERROR]: editCourseCategoryError,

  [DELETE_COURSE_CATEGORIES]: deleteCourseCategory,
  [DELETE_COURSE_CATEGORIES_SUCCESS]: deleteCourseCategorySuccess,
  [DELETE_COURSE_CATEGORIES_ERROR]: deleteCourseCategoryError,

  [LOAD_COURSE_CATEGORY_DETAIL]: loadCourseCategoryDetail,
  [LOAD_COURSE_CATEGORY_DETAIL_SUCCESS]: courseCategoryDetailLoaded,
  [LOAD_COURSE_CATEGORY_DETAIL_ERROR]: courseCategoryDetailLoadingError,

  [GET_COURSE_CATEGORIES_REORDER]: getCourseCategoriesReOrder,
  [GET_COURSE_CATEGORIES_REORDER_SUCCESS]: getCourseCategoriesReOrderSuccess,
  [GET_COURSE_CATEGORIES_REORDER_ERROR]: getCourseCategoriesReOrderError,

  [REORDER_COURSE_CATEGORIES]: reOrderCourseCategories,
  [REORDER_COURSE_CATEGORIES_SUCCESS]: reOrderCourseCategoriesSuccess,
  [REORDER_COURSE_CATEGORIES_ERROR]: reOrderCourseCategoriesError,

  [SAVE_CATEGORY_PREVIEW]: saveCategoryPreview,

  [LOCATION_CHANGE]: resetState,
  [RESET_COURSE_CATEGORIES]: resetState
})
