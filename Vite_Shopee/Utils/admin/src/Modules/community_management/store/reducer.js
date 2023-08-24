/* eslint-disable no-unused-vars */
import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import { LOCATION_CHANGE } from 'connected-react-router'
import {
  GET_LIST_TALKBOARD,
  GET_TALKBOARD_DETAIL,
  CREATE_TALKBOARD,
  UPDATE_TALKBOARD,
  DELETE_TALKBOARD,
  GET_TAG,
  GET_GROUP,
  GET_ATTRIBUTE,
  GET_LIST_COMMENT,
  HIDE_COMMENT,
  RESET_COMMENT,
  RESET_TALKBOARD
} from './constants'

const listTalkBoard = {
  isLoading: false,
  result: [],
  pagination: {},
  filter: {},
  error: null
}

const listGroup = {
  data: []
}
const listTag = {
  data: []
}
const listAttribute = {
  data: []
}
const talkBoardDetail = {
  dataTalkboard: {
    title: '',
    description: '',
    lstAttributeId: [],
    lstDepartmentId: [],
    lstTag: [],
    lstFile: []
  }
}

const listComment = {
  data: {},
  error: null,
  isLoadingComment: false,
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    limit: 100
  },
  filter: {}
}

export const initialState = {
  isLoading: false,
  isSubmitting: false,
  listTalkBoard: { ...listTalkBoard },
  listGroup: { ...listGroup },
  listTag: { ...listTag },
  listAttribute: { ...listAttribute },
  talkBoardDetail: { ...talkBoardDetail },
  listComment: { ...listComment },
  filter: {
    name: '',
    comnpanyId: ''
  },
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    limit: 100
  },
  error: null
}

function getGroupRequest(state) {
  return updateObject(state, {
    listGroup: {
      ...state.listGroup
    }
  })
}

function getGroupSuccess(state, { payload }) {
  const { data } = payload
  return updateObject(state, {
    listGroup: {
      ...state.data,
      data
    }
  })
}

function getGroupFailure(state, { error }) {
  return updateObject(state, {
    listGroup: {
      ...state.listGroup
    }
  })
}

function getTagRequest(state) {
  return updateObject(state, {
    listTag: {
      ...state.listTag
    }
  })
}

function getTagSuccess(state, { payload }) {
  const { data } = payload
  return updateObject(state, {
    listTag: {
      ...state.data,
      data
    }
  })
}

function getTagFailure(state, { error }) {
  return updateObject(state, {
    listTag: {
      ...state.listTag,
      error
    }
  })
}

function getAttributeRequest(state) {
  return updateObject(state, {
    listAttribute: {
      ...state.listAttribute
    }
  })
}

function getAttributeSuccess(state, { payload }) {
  const { data } = payload
  return updateObject(state, {
    listAttribute: {
      ...state.data,
      data
    }
  })
}

function getAttributeFailure(state, { error }) {
  return updateObject(state, {
    listAttribute: {
      ...state.listAttribute,
      error
    }
  })
}

function getTalkBoardRequest(state) {
  return updateObject(state, {
    listTalkBoard: {
      ...state.listTalkBoard,
      isLoading: true
    }
  })
}

function getTalkBoardSuccess(state, { payload }) {
  const { result, pagination, filter } = payload
  return updateObject(state, {
    listTalkBoard: {
      ...state.result,
      isLoading: false,
      result,
      pagination
    },
    filter
  })
}

function getTalkBoardFailure(state, { error }) {
  return updateObject(state, {
    listTalkBoard: {
      ...state.listTalkBoard,
      isLoading: false,
      error
    }
  })
}

function getTalkBoardDetailRequest(state) {
  return updateObject(state, {
    talkBoardDetail: {
      ...state.talkBoardDetail,
      isLoading: true
    }
  })
}

function getTalkBoardDetailSuccess(state, { payload }) {
  return updateObject(state, {
    talkBoardDetail: {
      ...state.talkBoardDetail,
      isLoading: false,
      dataTalkboard: payload
    }
  })
}

function getTalkBoardDetailFailure(state, { error }) {
  return updateObject(state, {
    talkBoardDetail: {
      ...state.talkBoardDetail,
      isLoading: false,
      error
    }
  })
}

function deleteTalkBoardRequest(state) {
  return updateObject(state, {
    error: null,
    isLoading: true
  })
}

function deleteTalkBoardSuccess(state) {
  return updateObject(state, {
    isLoading: false
  })
}

function deleteTalkBoardFailure(state, { error }) {
  return updateObject(state, { error, isLoading: false })
}

function createTalkBoardRequest(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: true
  })
}

function createTalkBoardSuccess(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: false
  })
}

function createTalkBoardFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isSubmitting: false,
    error
  })
}

function updateTalkBoardRequest(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: true
  })
}

function updateTalkBoardSuccess(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: false
  })
}

function updateTalkBoardFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isSubmitting: false,
    error
  })
}

function getListCommentRequest(state) {
  return updateObject(state, {
    listComment: {
      ...state.listComment,
      isLoadingComment: true
    }
  })
}

function getListCommentSuccess(state, { payload }) {
  const { data, pagination, filter } = payload
  return updateObject(state, {
    listComment: {
      ...state.listComment,
      isLoadingComment: false,
      data,
      pagination,
      filter
    }
  })
}

function getListCommentFailure(state, { error }) {
  return updateObject(state, {
    listComment: {
      ...state.listComment,
      error,
      isLoadingComment: false
    }
  })
}

function hideCommentRequest(state) {
  return updateObject(state, {
    error: null,
    isLoadingComment: true
  })
}

function hideCommentSuccess(state) {
  return updateObject(state, {
    isLoadingComment: false
  })
}

function hideCommentFailure(state, { error }) {
  return updateObject(state, {
    error,
    isLoadingComment: false
  })
}

function resetCommentState(state) {
  return updateObject(state, {
    listComment: { ...initialState.listComment },
    pagination: { ...initialState.pagination }
  })
}

function resetState(state) {
  return updateObject(state, {
    ...initialState
  })
}

function resetTalkboardState(state) {
  return updateObject(state, {
    listTalkBoard: { ...initialState.listTalkBoard },
    pagination: { ...initialState.pagination }
  })
}

export default createReducer(initialState, {
  [REQUEST(GET_GROUP)]: getGroupRequest,
  [SUCCESS(GET_GROUP)]: getGroupSuccess,
  [FAILURE(GET_GROUP)]: getGroupFailure,

  [REQUEST(GET_TAG)]: getTagRequest,
  [SUCCESS(GET_TAG)]: getTagSuccess,
  [FAILURE(GET_TAG)]: getTagFailure,

  [REQUEST(GET_ATTRIBUTE)]: getAttributeRequest,
  [SUCCESS(GET_ATTRIBUTE)]: getAttributeSuccess,
  [FAILURE(GET_ATTRIBUTE)]: getAttributeFailure,

  [REQUEST(GET_LIST_TALKBOARD)]: getTalkBoardRequest,
  [SUCCESS(GET_LIST_TALKBOARD)]: getTalkBoardSuccess,
  [FAILURE(GET_LIST_TALKBOARD)]: getTalkBoardFailure,

  [REQUEST(GET_TALKBOARD_DETAIL)]: getTalkBoardDetailRequest,
  [SUCCESS(GET_TALKBOARD_DETAIL)]: getTalkBoardDetailSuccess,
  [FAILURE(GET_TALKBOARD_DETAIL)]: getTalkBoardDetailFailure,

  [REQUEST(DELETE_TALKBOARD)]: deleteTalkBoardRequest,
  [SUCCESS(DELETE_TALKBOARD)]: deleteTalkBoardSuccess,
  [FAILURE(DELETE_TALKBOARD)]: deleteTalkBoardFailure,

  [REQUEST(CREATE_TALKBOARD)]: createTalkBoardRequest,
  [SUCCESS(CREATE_TALKBOARD)]: createTalkBoardSuccess,
  [FAILURE(CREATE_TALKBOARD)]: createTalkBoardFailure,

  [REQUEST(UPDATE_TALKBOARD)]: updateTalkBoardRequest,
  [SUCCESS(UPDATE_TALKBOARD)]: updateTalkBoardSuccess,
  [FAILURE(UPDATE_TALKBOARD)]: updateTalkBoardFailure,

  [REQUEST(GET_LIST_COMMENT)]: getListCommentRequest,
  [SUCCESS(GET_LIST_COMMENT)]: getListCommentSuccess,
  [FAILURE(GET_LIST_COMMENT)]: getListCommentFailure,

  [REQUEST(HIDE_COMMENT)]: hideCommentRequest,
  [SUCCESS(HIDE_COMMENT)]: hideCommentSuccess,
  [FAILURE(HIDE_COMMENT)]: hideCommentFailure,

  [REQUEST(RESET_COMMENT)]: resetCommentState,
  [REQUEST(RESET_TALKBOARD)]: resetTalkboardState,

  [LOCATION_CHANGE]: resetState
})
