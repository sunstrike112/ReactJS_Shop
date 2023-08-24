/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import moment from 'moment'
import { FORMAT_TIME, FORMAT_TIME_JP } from 'Constants/formatTime'
import { getLocalStorage, STORAGE } from './storage'

const formatDate = (date, f = FORMAT_TIME.DATE_HOUR_MINUTES) => {
  // TODO: Format JP date time (need plan for this)
  // const language = getLocalStorage(STORAGE.LANGUAGE)
  // if (language === 'jp') {
  //   Object.keys(FORMAT_TIME).forEach((key) => {
  //     if (FORMAT_TIME[key] === f) {
  //       f = FORMAT_TIME_JP[key]
  //     }
  //   })
  // }
  return (moment(date).isValid() ? moment(date).format(f) : '')
}

const formatDateShort = (date, f = FORMAT_TIME.FULL_DATE) => {
  // TODO: Format JP date time (need plan for this)
  // const language = getLocalStorage(STORAGE.LANGUAGE)
  // if (language === 'jp') {
  //   Object.keys(FORMAT_TIME).forEach((key) => {
  //     if (FORMAT_TIME[key] === f) {
  //       f = FORMAT_TIME_JP[key]
  //     }
  //   })
  // }
  return moment(date).format(f)
}

const combineDateAndTime = (date, time) => {
  if (!date) return null
  if (time) return new Date(`${date}T${time}`)
  return new Date(date)
}

const combineDateAndTimeV2 = (date, time) => {
  if (!date) return null
  if (time) {
    return new Date(`${date.format(FORMAT_TIME.YEAR_MONTH_DATE)} ${time.format(FORMAT_TIME.HOUR_MINUTES)}`)
  }
  return moment(date).startOf('day')
}

const handleLastTime = (date) => {
  const dateTime = moment(new Date()).diff(moment(new Date(date))) / 1000
  if (+dateTime > 86400) {
    return { time: Math.floor(dateTime / 86400), value: true }
  } if (+dateTime < 86400) {
    return { time: Math.floor(dateTime / 3600), value: false }
  }
  return ''
}

function getLastWeeksDate(date = 0) {
  const now = new Date()

  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - date)
}
export {
  formatDate,
  combineDateAndTime,
  combineDateAndTimeV2,
  formatDateShort,
  handleLastTime,
  getLastWeeksDate
}
