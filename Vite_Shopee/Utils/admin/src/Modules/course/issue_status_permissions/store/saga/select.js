import { getListAttribute, getListCategory, getListCourse, getListGroup, getListUser, getListUserSelectedAPI } from 'APIs'
import {
  put
} from 'redux-saga/effects'
import { FAILURE, SUCCESS } from 'Stores'
import { LOAD_LIST_ATTRIBUTE, LOAD_LIST_CATEGORY, LOAD_LIST_COURSE, LOAD_LIST_GROUP, LOAD_LIST_USER, LOAD_LIST_USER_SELECTED } from '../constants'

function* loadListCategorySaga({ payload }) {
  try {
    const { data } = yield getListCategory(payload)
    yield put({
      type: SUCCESS(LOAD_LIST_CATEGORY),
      payload: {
        data
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_LIST_CATEGORY),
      error
    })
  }
}

function* loadListUserSaga({ payload }) {
  try {
    const { data } = yield getListUser(payload.params)
    const { result: listUser, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_LIST_USER),
      payload: {
        data: listUser,
        pagination,
        filter: payload.params
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_LIST_USER),
      error
    })
  }
}

function* loadListUserSelectedSaga({ payload }) {
  try {
    const { data } = yield getListUserSelectedAPI(payload)
    const { result: listUserSelected, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_LIST_USER_SELECTED),
      payload: {
        data: listUserSelected,
        pagination,
        filter: payload?.params
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_LIST_USER_SELECTED),
      error
    })
  }
}

function* loadListGroupSaga({ payload }) {
  try {
    const { data } = yield getListGroup(payload)
    yield put({
      type: SUCCESS(LOAD_LIST_GROUP),
      payload: {
        data
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_LIST_GROUP),
      error
    })
  }
}

function* loadListAttributeSaga({ payload }) {
  try {
    const { data } = yield getListAttribute(payload)
    const { result: listAttribute } = data
    yield put({
      type: SUCCESS(LOAD_LIST_ATTRIBUTE),
      payload: {
        data: listAttribute
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_LIST_ATTRIBUTE),
      error
    })
  }
}

function* loadListCourseSaga({ payload }) {
  try {
    const { data } = yield getListCourse(payload)
    const { result: listCourse } = data
    yield put({
      type: SUCCESS(LOAD_LIST_COURSE),
      payload: {
        data: listCourse
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_LIST_COURSE),
      error
    })
  }
}

export {
  loadListCourseSaga,
  loadListAttributeSaga,
  loadListGroupSaga,
  loadListUserSelectedSaga,
  loadListUserSaga,
  loadListCategorySaga
}
