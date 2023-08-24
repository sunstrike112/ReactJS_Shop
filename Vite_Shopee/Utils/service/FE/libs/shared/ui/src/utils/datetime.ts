import moment from 'moment-timezone'
import { STANDARD_FORMAT_DATETIME_MOMENT } from '@ss-fe-fw/constants'

export const displayDateTime = (date: string, timezone: any = null, format: string = STANDARD_FORMAT_DATETIME_MOMENT) => {
  return timezone ?
    moment.tz(date, timezone).format(format) :
    moment(date).format(format)
}

export const convertDateTimeToUtc = (date: moment.Moment, type: null | 'start' | 'end' = null) => {
  let transformDate = date
  if (type === 'start') transformDate.startOf('day')
  if (type === 'end') transformDate.endOf('day')
  return moment.utc(transformDate)
}

export const setDefaultTimezone = (timezone: string) => {
  timezone && moment.tz.setDefault(timezone)
}

export const getCurrentTime = (timezone?: string) => {
  return timezone ?
    moment().tz(timezone) :
    moment();
}

export const getMomentDate = (date: string) => {
  return moment(date);
}

export const convertUTCToLocalTimezone = (date: moment.Moment, timezone: any = null) => {
  return timezone ?
    moment.tz(date, timezone) :
    moment(date).local()
}

export const getDatesInMonth = (date: Date) => {
  const month = date.getMonth();
  const dateOfMonth = new Date(date.getFullYear(), month, 1);

  const dates = [];
  while (dateOfMonth.getMonth() === month) {
    dates.push(new Date(dateOfMonth));
    dateOfMonth.setDate(dateOfMonth.getDate() + 1);
  }

  return dates;
}

export const getRemainDatesInMonth = (date: Date) => {
  const month = date.getMonth();
  const dateOfMonth = new Date(date.getFullYear(), month, date.getDate());

  const dates = [];
  while (dateOfMonth.getMonth() === month) {
    dates.push(new Date(dateOfMonth));
    dateOfMonth.setDate(dateOfMonth.getDate() + 1);
  }

  return dates;
}

export const formatMonth = (month: string) => {
  return moment(`${month}-01`).format('MMM YYYY');
}

export const formatDate = (date: Date, format: string) => {
  return moment(date).format(format);
}

export const formatWeekday = (date: Date) => {
  return {
    day: new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date),
    weekday: new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date)
  }
}
