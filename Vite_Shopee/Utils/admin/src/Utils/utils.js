/* eslint-disable */
import { reduce, isArray, isFunction } from 'lodash';
import { getLocalStorage, removeLocalStorage, STORAGE } from './storage';
import { USER_URL, SIGNAL_TYPE, DOWNLOAD_CSV, S3_DOMAIN, S3_PDF_DOMAIN, PDF_DEV, PDF_STG, PDF_PROD } from 'Constants';
import { logOut } from 'APIs';

export const decodePath = (path) => {
  const arr = path.split('/');
  arr.shift();
  return arr;
};

export const json2Form = (jsonObj) => reduce(
  jsonObj,
  (result, item, key) => {
    result.append(key, item);
    return result;
  }, new FormData(),
);

export const isFunc = isFunction;
export { isArray };
export const isArrayHasItem = (items) => isArray(items) && items.length;
export const isSafari =
  /constructor/i.test(window.HTMLElement) ||
  (function (p) {
    return p.toString() === '[object SafariRemoteNotification]';
  })(
    !window.safari ||
    (typeof window.safari !== 'undefined' && window.safari.pushNotification),
  );

export const convertBodyToFormData = (body) => {
  const formData = new FormData()
  Object.keys(body).forEach((prop) => body[prop] && formData.append(prop, body[prop]))
  return formData
}

export const convertNumberToTime = (time) => {
  if (!time) return '00:00:00'
  let duration = time
  const h = Math.floor(duration / 3600)
  duration = duration - h * 3600
  const m = Math.floor(duration / 60)
  const s = Math.round(duration % 60)
  const hours = h >= 10 ? h : `0${h}`
  const seconds = s >= 10 ? s : `0${s}`
  const minutes = m >= 10 ? m : `0${m}`

  return `${hours}:${minutes}:${seconds}`
}

export const convertTimeToNumber = (time = '00:00:00') => {
  const arrTime = time?.split(':').map((item) => parseInt(item))
  const [hour, minutes, seconds] = arrTime
  return (hour * 3600) + (minutes * 60) + seconds
}

export const handleSearchSelectTree = (inputSearch, treeNode) => {
  if (inputSearch.trim() === '') return true
  return treeNode.title.toLowerCase().indexOf(inputSearch.trim().toLowerCase()) >= 0
}

export const scrollTopDropdown = (isOpen, setCourseOptions, listCourse) => {
  setCourseOptions([])
  setTimeout(() => {
    if (isOpen) {
      setCourseOptions(listCourse)
    } else {
      setCourseOptions([])
    }
  }, 0)
}
// https://nsk-dev-upload.s3-ap-northeast-1.amazonaws.com/video-editor/1640665194996.mp4
export const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  return `${Math.round(bytes / 1024 ** i, 2)} ${sizes[i]}`
}

export const sortFullParams = (field, order, params, fullParams) => {
  switch (field) {
    // Course Status screen sort
    case 'courseProgress':
      return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'COURSE_PROGRESS' : '',
          sortType: order ? (order === 'ascend' ? 'ASCENDING' : 'DESCENDING') : ''
        }
      }
    case 'actualStartTime':
      return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'ACTUAL_START_TIME' : '',
          sortType: order ? (order === 'ascend' ? 'ASCENDING' : 'DESCENDING') : ''
        }
      }
    case 'actualCompleteTime':
      return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'ACTUAL_COMPLETE_TIME' : '',
          sortType: order ? (order === 'ascend' ? 'ASCENDING' : 'DESCENDING') : ''
        }
      }
    case 'startTime':
      return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'COURSE_START_TIME' : '',
          sortType: order ? (order === 'ascend' ? 'ASCENDING' : 'DESCENDING') : ''
        }
      }
    case 'endTime':
      return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'COURSE_COMPLETE_TIME' : '',
          sortType: order ? (order === 'ascend' ? 'ASCENDING' : 'DESCENDING') : ''
        }
      }
      console.log(err)

    // Test Result screen sort
    case 'courseName':
      return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'COURSE_NAME' : '',
          sortType: order ? (order === 'ascend' ? 'ASCENDING' : 'DESCENDING') : '',
          isAscending: order ? (order === 'ascend' ? true : false) : ''
        }
      }
    case 'userName':
      return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'USER_NAME' : '',
          sortType: order ? (order === 'ascend' ? 'ASCENDING' : 'DESCENDING') : '',
          isAscending: order ? (order === 'ascend' ? true : false) : '',
        }
      }
    case 'unitTestName':
      return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'UNIT_NAME' : '',
          sortType: order ? (order === 'ascend' ? 'ASCENDING' : 'DESCENDING') : '',
          isAscending: order ? (order === 'ascend' ? true : false) : '',
        }
      }
    case 'email':
      return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'USER_LOGIN_ID' : '',
          sortType: order ? (order === 'ascend' ? 'ASCENDING' : 'DESCENDING') : '',
          isAscending: order ? (order === 'ascend' ? true : false) : '',
        }
      }
    case 'unitTestResult':
      return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'RESULT_STATUS' : '',
          sortType: order ? (order === 'ascend' ? 'ASCENDING' : 'DESCENDING') : '',
          isAscending: order ? (order === 'ascend' ? true : false) : '',
        }
      }
    case 'highestScore':
      return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'MAX_POINT' : '',
          sortType: order ? (order === 'ascend' ? 'ASCENDING' : 'DESCENDING') : '',
          isAscending: order ? (order === 'ascend' ? true : false) : '',
        }
      }

    // Unit Status screen sort
    case 'courseName':
      return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'COURSE_NAME' : '',
          sortType: order ? (order === 'ascend' ? 'ASCENDING' : 'DESCENDING') : '',
          isAscending: order ? (order === 'ascend' ? true : false) : '',
        }
      }
    case 'unitName':
      return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'UNIT_NAME' : '',
          sortType: order ? (order === 'ascend' ? 'ASCENDING' : 'DESCENDING') : '',
          isAscending: order ? (order === 'ascend' ? true : false) : '',
        }
      }
    case 'complete':
      return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'COMPLETE_STATUS' : '',
          sortType: order ? (order === 'ascend' ? 'ASCENDING' : 'DESCENDING') : '',
          isAscending: order ? (order === 'ascend' ? true : false) : '',
        }
      }
		case 'signinId': {
			return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'LOGIN_ID' : '',
          sortType: order ? (order === 'ascend' ? 'ASCENDING' : 'DESCENDING') : '',
          isAscending: order ? (order === 'ascend' ? true : false) : '',
        }
      }
		}


    // Survey Answer screen sort
    case 'emailSurvey':
      return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'USER_LOGIN_ID' : '',
          isAscending: order ? (order === 'ascend' ? true : false) : '',
        }
      }
    case 'unitSurveyStatus':
      return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'SURVEY_RESULT_STATUS' : '',
          isAscending: order ? (order === 'ascend' ? true : false) : '',
        }
      }
    case 'submissionTime':
      return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'SUBMISSION_TIME' : '',
          isAscending: order ? (order === 'ascend' ? true : false) : '',
        }
      }
    case 'evaluationTime':
      return fullParams = {
        ...fullParams,
        params: {
          ...params,
          sortBy: order ? 'EVALUATION_TIME' : '',
          isAscending: order ? (order === 'ascend' ? true : false) : '',
        }
      }
    default:
      return fullParams = {
        ...fullParams,
        params: { ...params }
      }
  }
}

export const signOut = async (isMaintainNoticeAdmin = false, userId) => {
	const metaData = JSON.parse(getLocalStorage(STORAGE.META_DATA))
  if(userId){
  	await logOut(userId || metaData.userId)
  }
    const language = getLocalStorage(STORAGE.LANGUAGE)
    removeLocalStorage(STORAGE.USER_TOKEN)
    removeLocalStorage(STORAGE.META_DATA)
    removeLocalStorage(STORAGE.WORKSPACE_ID)
    removeLocalStorage(STORAGE.THEME)
    const userURL = isMaintainNoticeAdmin
      ? `${USER_URL}?signal=${SIGNAL_TYPE.LOGOUT}&lang=${language || 'jp'}&isMaintainNoticeAdmin=${isMaintainNoticeAdmin}`
      : `${USER_URL}?signal=${SIGNAL_TYPE.LOGOUT}&lang=${language || 'jp'}`
    window.location.replace(userURL)
}

export const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = (error) => reject(error)
})

export const openDownloadLink = ({ url, data, filename }) => {
  const downloadUrl = url || data
  const a = document.createElement('a')

  if (typeof a.download === 'undefined') {
    window.location = downloadUrl
  } else {
    a.href = downloadUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()
  }

  document.body.removeChild(a)
}

export const DEFAULT_PAG = { page: 1, limit: 100 }

export const editorconvertNumberToTime = (time, fps = 24) => {
  const h = (`0${Math.floor(time / 3600)}`).slice(-2)
  const m = (`0${Math.floor(time % 3600 / 60)}`).slice(-2)
  const s = (`0${Math.floor(time % 60)}`).slice(-2)
  const f = (`0${Math.floor((time % 1) * fps)}`).slice(-2)
  return `${h}:${m}:${s}:${f}`;
}

export const editorconvertNumberToTimeV2 = (time, fps = 24) => {
  const h = (`0${Math.floor(time / 3600)}`).slice(-2)
  const m = (`0${Math.floor(time % 3600 / 60)}`).slice(-2)
  const s = (`0${Math.floor(time % 60)}`).slice(-2)
  const f = (`0${Math.floor((time % 10) * fps)}`).slice(-1)
  return `${h}:${m}:${s}.${f}`;
}

export const checkTypeOf = (value) => Object.prototype.toString.call(value).slice(8, -1)

export const validateLinkSystem = (value) => {
	const pattern = /nsk-(dev|stg|prod)(-upload.s3-ap-northeast-1.amazonaws.com\/).*/
  const patternPdf = /elearning-pdf-to-image-(dev|stg|prod).(s3-ap-northeast-1.amazonaws.com\/).*/
  return pattern.test(value) || patternPdf.test(value)
}

export const linkSystem = (value) => {
	const pattern = /lms-(dev|stg|prod)(-admin||)(.growthcollege.jp\/).*/
  return pattern.test(value)
}

export const validateIsYoutubeLink = (value) => {
  const pattern = /(?:http:|https:)*?\/\/(?:www\.|)(?:youtube\.com|m\.youtube\.com|youtu\.|youtube-nocookie\.com).*(?:v=|v%3D|v\/|(?:a|p)\/(?:a|u)\/\d.*\/|watch\?|vi(?:=|\/)|\/embed\/|oembed\?|be\/|e\/)([^&?%#\/\n]*)/
  return pattern.test(value)
}

export const validateIsNotYoutubeLink = (value) => {
  const pattern = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/
  return !pattern.test(value)
}

export const isExternal = (url) => {
	var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
	if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) {
		return true && !validateLinkSystem(url) && !validateIsYoutubeLink(url) && !linkSystem(url);
	}
	if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"), "") !== location.host) {
		return true && !validateLinkSystem(url) && !validateIsYoutubeLink(url) && !linkSystem(url);
	}
	return false && !validateLinkSystem(url) && !validateIsYoutubeLink(url) && !linkSystem(url);
}

export const validateIsUploadFile = (value) => {
  const pattern = /(s3-|s3\.)?(.*)\.amazonaws\.com/
  return !pattern.test(value)
}

export const pad = (num) => (`0${num}`).slice(-2)
export const convertSecondToMinus = (secs) => {
  let minutes = Math.floor(secs / 60)
  secs %= 60
  let hours = Math.floor(minutes / 60)
  minutes %= 60
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`
}



export const getFileFromS3 = (path) => {
  switch (true) {
    case !path:
      return null
    case (path.includes(S3_PDF_DOMAIN) || path.includes(PDF_DEV) || path.includes(PDF_STG) || path.includes(PDF_PROD) || path.includes(S3_DOMAIN)):
      return path
    default:
      return `${S3_DOMAIN}${path}`
  }
}

export const mappingBooleanWithNumber = (value) => {
  const convertBooleanToNumber = {
    'true': 1,
    'false': 0
  }

	const convertNumberToBoolean = {
    1: true,
    0: false
  }

	switch (true) {
		case typeof value === 'boolean':
			return convertBooleanToNumber[`${value}`]
		case typeof value === 'number':
			return convertNumberToBoolean[value]
		default: return null
	}
}

export const mappingFileNameWithRole = (isWorkSpace, isWorkspaceVirtual, language) => {
  if (isWorkSpace)  return `user-workspace-${language}.csv`
  if (isWorkspaceVirtual) return `user-virtual-company-${language}.csv`
  return `user-company-${language}.csv`
}
