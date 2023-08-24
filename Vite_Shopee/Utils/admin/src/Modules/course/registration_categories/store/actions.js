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
  DELETE_COURSE_CATEGORIES,
  DELETE_COURSE_CATEGORIES_SUCCESS,
  DELETE_COURSE_CATEGORIES_ERROR,
  GET_COURSE_CATEGORIES_REORDER,
  GET_COURSE_CATEGORIES_REORDER_SUCCESS,
  GET_COURSE_CATEGORIES_REORDER_ERROR,
  REORDER_COURSE_CATEGORIES,
  REORDER_COURSE_CATEGORIES_SUCCESS,
  REORDER_COURSE_CATEGORIES_ERROR,
  SAVE_CATEGORY_PREVIEW,
  RESET_COURSE_CATEGORIES
} from './constants'

export function loadCategories(payload) {
  return {
    type: LOAD_COURSE_CATEGORIES,
    payload
  }
}

export function categoriesLoaded({
  categories,
  pagination,
  filter
}) {
  return {
    type: LOAD_COURSE_CATEGORIES_SUCCESS,
    categories: categories || [],
    pagination,
    filter
  }
}

export function categoriesLoadingError(error) {
  return {
    type: LOAD_COURSE_CATEGORIES_ERROR,
    error
  }
}

export function loadAllCategories(payload) {
  return {
    type: LOAD_ALL_COURSE_CATEGORIES,
    payload
  }
}

export function allCategoriesLoaded({ data }) {
  return {
    type: LOAD_ALL_COURSE_CATEGORIES_SUCCESS,
    data
  }
}

export function allCategoriesLoadingError(error) {
  return {
    type: LOAD_ALL_COURSE_CATEGORIES_ERROR,
    error
  }
}

export function createCourseCategory(payload) {
  return {
    type: CREATE_COURSE_CATEGORIES,
    payload
  }
}

export function createCourseCategorySuccess(isCreateOrEditSuccess) {
  return {
    type: CREATE_COURSE_CATEGORIES_SUCCESS,
    isCreateOrEditSuccess
  }
}

export function createCourseCategoryError(error) {
  return {
    type: CREATE_COURSE_CATEGORIES_ERROR,
    error
  }
}

export function editCourseCategory(payload) {
  return {
    type: EDIT_COURSE_CATEGORY_DETAIL,
    payload
  }
}

export function editCourseCategorySuccess(isCreateOrEditSuccess) {
  return {
    type: EDIT_COURSE_CATEGORY_DETAIL_SUCCESS,
    isCreateOrEditSuccess
  }
}

export function editCourseCategoryError(error) {
  return {
    type: EDIT_COURSE_CATEGORY_DETAIL_ERROR,
    error
  }
}

export function loadCourseCategoryDetail(id) {
  return {
    type: LOAD_COURSE_CATEGORY_DETAIL,
    id
  }
}

export function courseCategoryDetailLoaded(courseCategoryDetail) {
  return {
    type: LOAD_COURSE_CATEGORY_DETAIL_SUCCESS,
    courseCategoryDetail
  }
}

export function courseCategoryDetailLoadingError(error) {
  return {
    type: LOAD_COURSE_CATEGORY_DETAIL_ERROR,
    error
  }
}

export function deleteCourseCategories({ ids, params }) {
  return {
    type: DELETE_COURSE_CATEGORIES,
    ids,
    params
  }
}

export function deleteCourseCategoriesSuccess({ isDeleteSuccess, dataDelete }) {
  return {
    type: DELETE_COURSE_CATEGORIES_SUCCESS,
    isDeleteSuccess,
    dataDelete
  }
}

export function deleteCourseCategoriesError(error) {
  return {
    type: DELETE_COURSE_CATEGORIES_ERROR,
    error
  }
}

export function getCourseCategoriesReOrder() {
  return {
    type: GET_COURSE_CATEGORIES_REORDER
  }
}

export function getCourseCategoriesReOrderSuccess(listCategoriesOrder) {
  return {
    type: GET_COURSE_CATEGORIES_REORDER_SUCCESS,
    listCategoriesOrder
  }
}

export function getCourseCategoriesReOrderError(error) {
  return {
    type: GET_COURSE_CATEGORIES_REORDER_ERROR,
    error
  }
}

export function reOrderCourseCategories({ listCategoriesOrder, query }) {
  return {
    type: REORDER_COURSE_CATEGORIES,
    listCategoriesOrder,
    query
  }
}

export function reOrderCourseCategoriesSuccess(listCategoriesOrder) {
  return {
    type: REORDER_COURSE_CATEGORIES_SUCCESS,
    listCategoriesOrder
  }
}

export function reOrderCourseCategoriesError(error) {
  return {
    type: REORDER_COURSE_CATEGORIES_ERROR,
    error
  }
}

export function saveCategoryPreviewAction(payload) {
  return {
    type: SAVE_CATEGORY_PREVIEW,
    payload
  }
}

export function resetState() {
  return {
    type: RESET_COURSE_CATEGORIES
  }
}
