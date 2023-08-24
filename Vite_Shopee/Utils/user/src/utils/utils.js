import { isArray, isFunction, isObject, reduce } from 'lodash'
import moment from 'moment-timezone'
import { LESSON_TYPE } from '../constants'

export const decodePath = (path) => {
  const arr = path.split('/')
  arr.shift()
  return arr
}

export const json2Form = (jsonObj) => reduce(
  jsonObj,
  (result, item, key) => {
    result.append(key, item)
    return result
  }, new FormData()
)

export const isFunc = isFunction
export { isArray }
export const isArrayHasItem = (items) => isArray(items) && items.length
export const isSafari = /constructor/i.test(window.HTMLElement)
  || (function (p) {
    return p.toString() === '[object SafariRemoteNotification]'
  }(
    !window.safari
    || (typeof window.safari !== 'undefined' && window.safari.pushNotification)
  ))

export function isMappable(array) {
  if (Array.isArray(array)) return array.length > 0
  return false
}

export const getUnitPath = ({ type, unitId, courseId }) => {
  if (type === LESSON_TYPE.TEST) {
    return `/examination/${courseId}/${unitId}`
  }
  if (type === LESSON_TYPE.SURVEY) {
    return `/survey/${courseId}/${unitId}`
  }
  if (type === LESSON_TYPE.REPORT) {
    return `/report/${courseId}/${unitId}`
  }
  return `/course/${courseId}/lesson/${unitId}`
}

export const parsePhone = (value = '') => {
  const phoneNumber = value.replace(/[^\d]/g, '')
  const phoneNumberLength = phoneNumber.length
  if (phoneNumberLength < 4) {
    return phoneNumber
  }
  if (phoneNumberLength >= 4 && phoneNumberLength < 7) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`
  }
  if (phoneNumberLength >= 7 && phoneNumberLength <= 10) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`
}

export const decodeNumber = (phone = '') => phone.replace(/[^\d]/g, '')
export const MAX_IMAGE_UPLOAD_SIZE = 10485760

export const checkUploadSize = (file) => {
  if (!isObject(file)) return true
  return file.size <= MAX_IMAGE_UPLOAD_SIZE
}

export const handleDayOfWeek = (day) => {
  switch (+day) {
    case 1:
      return 'seminar.mon'
    case 2:
      return 'seminar.tue'
    case 3:
      return 'seminar.wed'
    case 4:
      return 'seminar.thu'
    case 5:
      return 'seminar.fri'
    case 6:
      return 'seminar.sat'
    case 7:
      return 'seminar.sun'
    default:
      return 'seminar.not_found'
  }
}

export const formatTime = (time, format) => moment.unix(time / 1000).format(format)

export const formatTimeZone = (time, format) => moment.unix(time / 1000).tz('Asia/Tokyo').format(format)

export const YouTubeGetID = (url) => {
  let ID = ''
  ID = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
  if (ID !== null) return ID[1]
  return ''
}

export const editArray = (array, newItem, condition) => {
  const result = [...array]
  const index = result.findIndex(condition)
  if (index !== -1) {
    result[index] = newItem
  }
  return result
}

export const updateObjectInArray = (array, newItem, condition) => {
  const result = [...array]
  const index = result.findIndex(condition)
  if (index !== -1) {
    result[index] = { ...result[index], ...newItem }
  }

  return result
}

export const getAllKeys = (tree) => {
  let result = []
  tree.forEach((x) => {
    let childKeys = []
    if (x.children) {
      childKeys = getAllKeys(x.children)
    }

    result.push(...[x.key, ...childKeys])
  })

  return result
}

export const removeFromArray = (arr, arrRemove) => arr.filter((element) => !arrRemove.includes(element))
