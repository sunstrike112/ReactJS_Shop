import { REQUEST } from 'Stores'
import {
  GET_LIST_TEMPLATE, GET_TEMPLATE_DETAIL, RESET_LIST_TEMPLATE
} from './constants'

function getListTemplate(payload) {
  return {
    type: REQUEST(GET_LIST_TEMPLATE),
    payload
  }
}

function getTemplateDetail(payload) {
  return {
    type: REQUEST(GET_TEMPLATE_DETAIL),
    payload
  }
}

function resetState() {
  return {
    type: REQUEST(RESET_LIST_TEMPLATE)
  }
}

export {
  getListTemplate,
  getTemplateDetail,
  resetState
}
