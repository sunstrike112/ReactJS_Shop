import {
  RESEND_EMAIL,
  RESEND_EMAIL_ERROR,
  RESEND_EMAIL_SUCCESS
} from './constants'

export function resendEmail(payload) {
  return {
    type: RESEND_EMAIL,
    payload
  }
}

export function resendEmailSuccess(isSuccess) {
  return {
    type: RESEND_EMAIL_SUCCESS,
    isSuccess
  }
}

export function resendEmailError(error) {
  return {
    type: RESEND_EMAIL_ERROR,
    error
  }
}
