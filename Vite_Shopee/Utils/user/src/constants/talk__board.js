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
  'image/gif',
  'image/jpg'
]

export const MAX_FILES_TB = 5

export const STATUS = [
  { value: false, label: 'talk_board.everyone' },
  { value: true, label: 'talk_board.condition_specification' }
]

export const LINE_HEIGHT_TOPIC_TALKBOARD = 1.4
export const FONT_SIZE_COMMENT_TALKBOARD = 20
export const FONT_SIZE_CONTENT_TALKBOARD = 20

export const TAB_KEYS = {
  LIKE: '1',
  DIS_LIKE: '2',
  CHECK_COMPLETE: '3'
}

export const tabKeysMapping = {
  1: TAB_KEYS.LIKE,
  2: TAB_KEYS.DIS_LIKE,
  3: TAB_KEYS.CHECK_COMPLETE
}

export const tabKeysTextMapping = {
  [TAB_KEYS.LIKE]: 'talk_board.list_like',
  [TAB_KEYS.DIS_LIKE]: 'talk_board.list_dislike',
  [TAB_KEYS.CHECK_COMPLETE]: 'talk_board.list_check_complete'
}
