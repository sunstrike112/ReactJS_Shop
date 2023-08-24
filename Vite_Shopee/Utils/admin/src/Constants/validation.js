/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
export const REGEX = {
  FURIGANA_LETTERS: /^(([ァ-ヶ]|ー)+((　)([ァ-ヶ]|ー)+))$/,
  USER_NAME: /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/,
  ONLY_LETTERS: new RegExp(/[^a-zA-z]/),
  ONLY_NUMBER: new RegExp(/[^\d]/),
  AVOID_CHARACTER: new RegExp(/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~@.-]*$/),
  FULL_NAME_KATAKANA: /^(([ァ-ヶ]|ー)+((　)([ァ-ヶ]|ー)+))$/,
  ONLY_SPACE_NAME: /^\S+(　)\S+$/,
  EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  LOGIN_ID: /^[a-zA-Z0-9./<>?~;:,"'`!@#$%^&*()\[\]{}_+=|\\-]*$/, // Rules of regex loginId: includes alphabet, numbers or symbols (not space and character 2 bytes)
  EMPLOYEE_NUMBER: /^[^\W_]+$/,
  URL: /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
  IPS_SPREAD_BY_COMMA_OR_ASTERISK: /^(?:(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))|\*)(?:,(?:(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))|\*))*$/gm,
  SERAKU_CODE: /[a-zA-Z\s./<>?~;:,"'`!@#$%^&*()\[\]{}_+=|\\-]+/g
}
