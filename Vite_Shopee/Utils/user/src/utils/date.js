/* eslint-disable no-plusplus */
import moment from 'moment'

export const SLASH_DATE_FORMAT = 'YYYY/MM/DD HH:mm'
export const FULL_DATE_TIME = 'MM/DD/YYYY HH:mm'
export const FULL_DATE = 'MM/DD/YYYY'

export const dateFormat = (date, format = 'YYYY/MM/DD H:mm') => (date ? moment(date).format(format) : '')

export const convertNumberToSeconds = (seconds = 0) => {
  if (Number.isNaN(seconds)) {
    return '00:00'
  }
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = date.getUTCSeconds().toString().padStart(2, '0')
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`
  }
  return `${mm}:${ss}`
}

export const getTimeRemaining = (time) => {
  const timeRemaining = time - moment().valueOf()
  if (timeRemaining > 31536000000) {
    return {
      key: 'notification.year_left',
      time: Math.floor(timeRemaining / 31536000000)
    }
  }
  if (timeRemaining < 31536000000 && timeRemaining > 2592000000) {
    return {
      key: 'notification.month_left',
      time: Math.floor(timeRemaining / 2592000000)
    }
  }

  if (timeRemaining < 2592000000 && timeRemaining > 86400000) {
    return {
      key: 'notification.day_left',
      time: Math.floor(timeRemaining / 86400000)
    }
  }

  if (timeRemaining < 86400000 && timeRemaining > 3600000) {
    return {
      key: 'notification.hour_left',
      time: Math.floor(timeRemaining / 3600000)
    }
  }
  if (timeRemaining < 3600000 && timeRemaining > 60000) {
    return {
      key: 'notification.minute_left',
      time: Math.floor(timeRemaining / 60000)
    }
  }
  return {
    key: 'notification.less_than_minute_left',
    time: null
  }
}

export const getListYear = () => {
  const date = new Date()
  const startYear = 1920
  const currentYear = date.getFullYear()
  const arrYear = []
  for (let i = startYear; i <= currentYear; i++) {
    arrYear.push({
      value: i < 10 ? `0${i}` : i,
      name: i < 10 ? `0${i}` : i
    })
  }
  return arrYear
}

export const getListMonth = () => {
  const arrMonth = []
  for (let i = 1; i <= 12; i++) {
    arrMonth.push({
      value: i < 10 ? `0${i}` : i,
      name: i < 10 ? `0${i}` : i
    })
  }
  return arrMonth
}

export const getDayByMonthAndYear = (year, month) => {
  const arrDay = []
  if (year && year) {
    const endDay = new Date(year, month, 0).getDate()
    for (let i = 1; i <= endDay; i++) {
      arrDay.push({
        value: i < 10 ? `0${i}` : i,
        name: i < 10 ? `0${i}` : i
      })
    }
  } else {
    for (let i = 1; i <= 31; i++) {
      arrDay.push({
        value: i < 10 ? `0${i}` : i,
        name: i < 10 ? `0${i}` : i
      })
    }
  }
  return arrDay
}
