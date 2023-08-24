/* eslint-disable max-len */
export const UPLOAD_FILE_TYPE = {
  FOLDER: 'folder',
  FILE: 'file'
}

const PDF_TYPE = ['application/pdf', 'pdf']
export const VIDEO_TYPE = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/avi',
  'video/x-ms-wmv',
  'video',
  'video/x-matroska',
  'mp4',
  'webm',
  'oga',
  'ogv']
// const IMAGE_TYPE = ['pdf', 'bmp', 'gif', 'jpg', 'jpeg', 'png', 'image/bmp', 'image/gif', 'image/jpeg', 'image/png']
const PPT_TYPE = ['presentation', 'ms-powerpoint', 'pptx', 'ppt']

const checkTypeExists = (TYPES, extension) => {
  let flag = 0
  TYPES.forEach((v) => {
    if (extension.includes(v)) flag = 1
  })
  return flag
}

export const getFileType = (extension = '') => {
  if (checkTypeExists(PDF_TYPE, extension)) return 'PDF'
  if (checkTypeExists(VIDEO_TYPE, extension)) return 'VIDEO'
  if (checkTypeExists(PPT_TYPE, extension)) return 'PPT'
  return 'VIDEO'
}

export const mapMimeToExt = {
  'audio/aac': 'aac',
  'application/x-abiword': 'abw',
  'application/x-freearc': 'arc',
  'video/x-msvideo': 'avi',
  'video/avi': 'avi',
  'application/vnd.amazon.ebook': 'azw',
  'application/octet-stream': 'bin',
  'image/bmp': 'bmp',
  'application/x-bzip': 'bz',
  'application/x-bzip2': 'bz2',
  'application/x-cdf': 'cda',
  'application/x-csh': 'csh',
  'text/css': 'css',
  'text/csv': 'csv',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.ms-fontobject': 'eot',
  'application/epub+zip': 'epub',
  'application/gzip': 'gz',
  'image/gif': 'gif',
  'text/html': 'html',
  'image/vnd.microsoft.icon': 'ico',
  'text/calendar': 'ics',
  'application/java-archive': 'jar',
  'image/jpeg': 'jpg',
  'text/javascript': 'js',
  'application/json': 'json',
  'application/ld+json': 'jsonld',
  'audio/midi audio/x-midi': 'midi',
  'audio/mpeg': 'mp3',
  'video/mp4': 'mp4',
  'video/mpeg': 'mpeg',
  'application/vnd.apple.installer+xml': 'mpkg',
  'application/vnd.oasis.opendocument.presentation': 'odp',
  'application/vnd.oasis.opendocument.spreadsheet': 'ods',
  'application/vnd.oasis.opendocument.text': 'odt',
  'audio/ogg': 'oga',
  'video/ogg': 'ogv',
  'application/ogg': 'ogx',
  'audio/opus': 'opus',
  'font/otf': 'otf',
  'image/png': 'png',
  'application/pdf': 'pdf',
  'application/x-httpd-php': 'php',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  'application/vnd.rar': 'rar',
  'application/rtf': 'rtf',
  'application/x-sh': 'sh',
  'image/svg+xml': 'svg',
  'application/x-shockwave-flash': 'swf',
  'application/x-tar': 'tar',
  'image/tiff': 'tiff',
  'video/mp2t': 'ts',
  'font/ttf': 'ttf',
  'text/plain': 'txt',
  'application/vnd.visio': 'vsd',
  'audio/wav': 'wav',
  'audio/webm': 'weba',
  'video/webm': 'webm',
  'image/webp': 'webp',
  'font/woff': 'woff',
  'font/woff2': 'woff2',
  'application/xhtml+xml': 'xhtml',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/xml': 'xml',
  'application/vnd.mozilla.xul+xml': 'xul',
  'application/zip': 'zip',
  'video/3gpp': '3gp',
  'video/3gpp2': '3g2',
  'application/x-7z-compressed': '7z',
  'video/quicktime': 'MOV',
  'video/x-flv': 'flv',
  'video/x-ms-wmv': 'wmv'
}

export const ACCEPT_TYPE_FILE_TB = [
  'text/plain',
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'image/png',
  'image/jpeg',
  'image/bmp',
  'image/gif'
]

export const ACCEPT_FILE_EXTENSION_TB = [
  'ppt', 'pptx', 'xls', 'xlsx', 'pdf', 'png', 'jpg', 'jpeg', 'bmp', 'gif', 'txt', 'doc', 'docx'
]

export const TYPE_IMG = [
  'image/png',
  'image/jpeg',
  'image/bmp',
  'image/gif'
]

export const MAX_FILES_TB = 5

export const TYPE_FILE = {
  IMAGE: 'IMAGE',
  AUDIO: 'AUDIO',
  DEFAULT: 'DEFAULT'
}

export const emptyThumb = 'data:image/png;base64,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'
