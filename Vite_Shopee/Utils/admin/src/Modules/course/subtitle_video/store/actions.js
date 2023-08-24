import { REQUEST } from 'Stores'
import {
  UPLOAD_SUBTITLE,
  GET_VIDEO_DETAIL
} from './constants'

export function uploadSubTitle(payload) {
  return {
    type: REQUEST(UPLOAD_SUBTITLE),
    payload
  }
}

export function getVideoDetail(payload) {
  return {
    type: REQUEST(GET_VIDEO_DETAIL),
    payload
  }
}
