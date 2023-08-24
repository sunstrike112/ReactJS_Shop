import { REQUEST } from 'Stores'
import {
  LOAD_PROFILE
} from './constants'

export function loadProfile(payload) {
  return {
    type: REQUEST(LOAD_PROFILE),
    payload
  }
}
