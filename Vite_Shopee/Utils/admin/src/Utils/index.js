export {
  checkCookie,
  getCookie,
  setCookie
} from './cookies'

export * from './utils'

export {
  STORAGE,
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage
} from './storage'

export {
  parseFilter,
  parseFilterArrayToString,
  parseFilterArrayToStringV2,
  parseParamsToQueryStringV3,
  parseParamsToQueryString,
  parseParamsToQueryStringV2,
  parseSort,
  copyObjectUsingJSON,
  isNotEmptyObject
} from './object'

export {
  formatNumber,
  getNumberOrder
} from './number'

export {
  camel2Text,
  formatMoney,
  formatOption,
  getText,
  stripHTML,
  replaceToPassword,
  translateFolderName
} from './string'

export {
  findDeepFolderTree,
  mapDeepGroupKey,
  mapDeepGroupTree,
  normailizeFolderTree,
  normailizeGroupTree,
  normailizeAttributeTree,
  normailizeListCategoryTree,
  swap,
  removeFromArray
} from './array'

export * from './time'

export {
  downloadOctetFile,
  downloadS3File,
  handleUploadFileByChunk
} from './s3'

export * from './company'
export * from './error_message'
export * from './user'
export * from './getRandomId'
export * from './getRotationAngle'
export * from './schema'
export * from './global'
export * from './window'
export * from './webview'
export * from './services'
