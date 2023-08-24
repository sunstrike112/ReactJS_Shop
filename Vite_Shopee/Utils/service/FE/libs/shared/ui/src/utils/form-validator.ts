import * as yup from 'yup';
import {
  ERROR_MESSAGE_INVALID_CONFIRM_PASSWORD,
  ERROR_MESSAGE_INVALID_EMAIL,
  ERROR_MESSAGE_REQUIRED,
  ERROR_POSTCODE_MESSAGE,
} from '@ss-fe-fw/constants';
import {
  ERROR_MESSAGE_INVALID_PASSWORD,
  ERROR_MESSAGE_INVALID_PHONE_NUMBER,
} from '@ss-fe-fw/booking/constants';

export function emailValidator(value: any) {
  return new Promise(async (resolve, reject) => {
    if(!await yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).isValid(value))
      return reject(new Error(ERROR_MESSAGE_INVALID_EMAIL.replace(/\$\{name\}/i, 'email')));
    else return resolve(value);
  })
}

export function postcodeValidator(value: any) {
  return new Promise(async (resolve, reject) => {
    if (value && `${value}`.length != 4) {
      return reject(new Error(ERROR_POSTCODE_MESSAGE));
    } else return resolve(value);
  })
}

export function suburbValidator(value: any) {
  return new Promise(async (resolve, reject) => {
    if (!value || value === '') {
      return reject(new Error(ERROR_MESSAGE_REQUIRED.replace(/\$\{name\}/i, 'suburb')));
    } else return resolve(value);
  })
}

export function requiredValidator(value: any, fieldName: string) {
  return new Promise(async (resolve, reject) => {
    if (!value || value === '') {
      return reject(new Error(ERROR_MESSAGE_REQUIRED.replace(/\$\{name\}/i, fieldName)));
    } else return resolve(value);
  })
}

export function confirmPassworddValidator(password: any, confirmPassword: any) {
  return new Promise((resolve, reject) => {
    if (password !== confirmPassword) {
      return reject(new Error(ERROR_MESSAGE_INVALID_CONFIRM_PASSWORD));
    } else return resolve(confirmPassword);
  })
}

export function passwordValidator(password: any) {
  return new Promise((resolve, reject) => {
    if (password && password.length < 6) {
      return reject(new Error(ERROR_MESSAGE_INVALID_PASSWORD));
    } else return resolve(password);
  })
}

export function phoneNumberValidator(phoneNumber: any) {
  return new Promise(async (resolve, reject) => {
    if (phoneNumber && !await yup.string().matches(/^\d+$/).isValid(phoneNumber)) {
      return reject(new Error(ERROR_MESSAGE_INVALID_PHONE_NUMBER));
    } else return resolve(phoneNumber);
  })
}

export function formValidator(form: any) {
  return (form.getFieldsError().some((item: any) => item.errors.length > 0))
}