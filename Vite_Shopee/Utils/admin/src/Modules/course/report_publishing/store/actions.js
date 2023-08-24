import { REQUEST } from 'Stores'
import {
  LOAD_DETAIL_PUBLISH_REPORT,
  LOAD_REPORTS,
  UPDATE_DETAIL_PUBLISH_REPORT
} from './constants'

export function loadReports(payload) {
  return {
    type: REQUEST(LOAD_REPORTS),
    payload
  }
}

export function loadDetailPubLishReports(payload) {
  return {
    type: REQUEST(LOAD_DETAIL_PUBLISH_REPORT),
    payload
  }
}

export function updateDetailPubLishReports(payload) {
  return {
    type: REQUEST(UPDATE_DETAIL_PUBLISH_REPORT),
    payload
  }
}
