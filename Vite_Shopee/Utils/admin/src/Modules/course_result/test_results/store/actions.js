import { REQUEST } from 'Stores'
import {
  LOAD_TEST_RESULT,
  LOAD_COURSE_LIST,
  LOAD_GROUP_LIST,
  LOAD_ATTRIBUTE_LIST,
  LOAD_UNIT_LIST_LESSON,
  LOAD_UNIT_LIST_REPORT,
  LOAD_UNIT_LIST_SURVEY,
  LOAD_UNIT_LIST_TEST,
  LOAD_UNIT_LIST_ALL,
  SAVE_FILTER,
  RESET_TEST_RESULT
} from './constants'

export function loadTestResult(payload) {
  return {
    type: REQUEST(LOAD_TEST_RESULT),
    payload
  }
}

export function loadCourseList(payload) {
  return {
    type: REQUEST(LOAD_COURSE_LIST),
    payload
  }
}

export function loadGroupList() {
  return {
    type: REQUEST(LOAD_GROUP_LIST)
  }
}

export function loadAttributeList() {
  return {
    type: REQUEST(LOAD_ATTRIBUTE_LIST)
  }
}

export function loadUnitListLesson() {
  return {
    type: REQUEST(LOAD_UNIT_LIST_LESSON)
  }
}

export function loadUnitListReport() {
  return {
    type: REQUEST(LOAD_UNIT_LIST_REPORT)
  }
}

export function loadUnitListSurvey() {
  return {
    type: REQUEST(LOAD_UNIT_LIST_SURVEY)
  }
}

export function loadUnitListTest() {
  return {
    type: REQUEST(LOAD_UNIT_LIST_TEST)
  }
}

export function loadUnitListAll(payload) {
  return {
    type: REQUEST(LOAD_UNIT_LIST_ALL),
    payload
  }
}

export function saveFilter(payload) {
  return {
    type: REQUEST(SAVE_FILTER),
    payload
  }
}

export function resetTestResult() {
  return {
    type: REQUEST(RESET_TEST_RESULT)
  }
}
