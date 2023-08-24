import { REQUEST } from 'Stores'
import
{
  GET_EMAIL_SERVER, UPDATE_EMAIL_SERVER
} from './constants'

export function getEmailServer(payload) {
  return {
    type: REQUEST(GET_EMAIL_SERVER),
    payload
  }
}

export function updateEmailServer(payload) {
  return {
    type: REQUEST(UPDATE_EMAIL_SERVER),
    payload
  }
}
