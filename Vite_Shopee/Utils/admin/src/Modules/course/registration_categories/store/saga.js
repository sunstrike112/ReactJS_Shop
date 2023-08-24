import {
  put, takeLatest
} from 'redux-saga/effects'
import {
  isArray
} from 'lodash'
import { notification } from 'antd'
import i18next from 'I18n'

import {
  getCourseCategories,
  getAllCourseCategories,
  createCourseCategories,
  getDetailCourseCategory,
  editCourseCategories,
  deleteCourseCategories,
  getCourseCategoriesReorder,
  reOderCourseCategories
} from 'APIs'

import {
  categoriesLoaded, categoriesLoadingError,
  allCategoriesLoadingError, allCategoriesLoaded,
  createCourseCategorySuccess, createCourseCategoryError,
  loadCategories, loadAllCategories,
  courseCategoryDetailLoaded, courseCategoryDetailLoadingError,
  editCourseCategorySuccess, editCourseCategoryError,
  deleteCourseCategoriesSuccess, deleteCourseCategoriesError,
  getCourseCategoriesReOrderSuccess, getCourseCategoriesReOrderError,
  reOrderCourseCategoriesSuccess, reOrderCourseCategoriesError
} from './actions'

import {
  LOAD_COURSE_CATEGORIES,
  LOAD_ALL_COURSE_CATEGORIES,
  CREATE_COURSE_CATEGORIES,
  LOAD_COURSE_CATEGORY_DETAIL,
  EDIT_COURSE_CATEGORY_DETAIL,
  DELETE_COURSE_CATEGORIES,
  REORDER_COURSE_CATEGORIES,
  GET_COURSE_CATEGORIES_REORDER
} from './constants'

export function* loadCategoriesSaga({ payload }) {
  try {
    const { data } = yield getCourseCategories(payload)
    const { result, ...pagination } = data.data
    const categoriesWithParentName = isArray(result) ? result.map((category) => ({
      ...category,
      courseCategoryNameWithParent: (isArray(category.listParent) ? `${category.listParent[0].courseCategoryName} > ` : '') + category.courseCategoryName
    })) : result
    yield put(categoriesLoaded({
      categories: categoriesWithParentName,
      pagination,
      filter: payload?.params?.filter
    }))
  } catch (err) {
    yield put(categoriesLoadingError(err))
  }
}

export function* loadAllCategoriesSaga({ payload }) {
  try {
    const { data } = yield getAllCourseCategories(payload)
    const dataMapping = data.map((item) => ({
      ...item,
      label: item.courseCategoryName,
      value: item.courseCategoryName
    }))
    yield put(allCategoriesLoaded({ data: dataMapping }))
  } catch (err) {
    yield put(allCategoriesLoadingError(err))
  }
}

export function* createCourseCategorySaga({ payload }) {
  try {
    const { data, callBack, params } = payload
    const { data: dataResponse } = yield createCourseCategories(data)
    if (dataResponse.code === 200) {
      yield put(createCourseCategorySuccess(true))
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
      yield put(loadCategories({ params }))
      yield put(loadAllCategories({ params: { companyId: params?.filter?.companyId } }))
      callBack.done()
    }
  } catch (error) {
    yield put(createCourseCategoryError(error))
  }
}

export function* editCourseCategorySaga({ payload }) {
  try {
    const { data, params, id } = payload
    const { data: dataResponse } = yield editCourseCategories(data, id)
    if (dataResponse.code === 200) {
      yield put(editCourseCategorySuccess(true))
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield put(loadCategories({ params }))
      yield put(loadAllCategories({ params: { companyId: params?.filter?.companyId } }))
    }
  } catch (error) {
    yield put(editCourseCategoryError(error))
  }
}

export function* loadCourseCategoryDetailSaga({ id }) {
  try {
    const { data } = yield getDetailCourseCategory(id)
    yield put(courseCategoryDetailLoaded({
      ...data,
      label: data.courseCategoryName,
      value: data.courseCategoryName
    }))
  } catch (error) {
    yield put(courseCategoryDetailLoadingError(error))
  }
}

export function* deleteCourseCategoriesSaga({ ids, params }) {
  try {
    const { data } = yield deleteCourseCategories(ids)
    if (data.code === 200) {
      yield put(loadCategories({ params }))
      yield put(loadAllCategories({ params: { companyId: params?.filter?.companyId } }))
      yield put(deleteCourseCategoriesSuccess({ isDeleteSuccess: true, dataDelete: data.data.ids }))
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put(deleteCourseCategoriesError(error))
  }
}

export function* getCourseCategoriesReOderSaga() {
  try {
    const { data } = yield getCourseCategoriesReorder()
    yield put(getCourseCategoriesReOrderSuccess(data))
  } catch (error) {
    yield put(getCourseCategoriesReOrderError(error))
  }
}

export function* reOderCourseCategoriesSaga({ ids, query }) {
  try {
    const { data } = yield reOderCourseCategories(ids)
    if (data.code === 200) {
      yield put(loadCategories(query))
      yield put(loadAllCategories())
      yield put(reOrderCourseCategoriesSuccess(true))
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.sort_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put(reOrderCourseCategoriesError(error))
  }
}

export default function* registrationCategoriesSaga() {
  yield takeLatest(LOAD_COURSE_CATEGORIES, loadCategoriesSaga)
  yield takeLatest(LOAD_ALL_COURSE_CATEGORIES, loadAllCategoriesSaga)
  yield takeLatest(CREATE_COURSE_CATEGORIES, createCourseCategorySaga)
  yield takeLatest(LOAD_COURSE_CATEGORY_DETAIL, loadCourseCategoryDetailSaga)
  yield takeLatest(EDIT_COURSE_CATEGORY_DETAIL, editCourseCategorySaga)
  yield takeLatest(DELETE_COURSE_CATEGORIES, deleteCourseCategoriesSaga)
  yield takeLatest(GET_COURSE_CATEGORIES_REORDER, getCourseCategoriesReOderSaga)
  yield takeLatest(REORDER_COURSE_CATEGORIES, reOderCourseCategoriesSaga)
}
