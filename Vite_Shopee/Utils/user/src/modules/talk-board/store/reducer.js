/* eslint-disable no-unused-vars */
import { LOCATION_CHANGE } from 'connected-react-router'
import { SORT_TYPE } from '../../../constants'
import { createReducer, FAILURE, REQUEST, SUCCESS, updateObject } from '../../../store'
import { updateObjectInArray } from '../../../utils'
import {
  LOAD_TAG,
  LOAD_TAG_SUCCESS,
  LOAD_GROUP,
  LOAD_GROUP_SUCCESS,
  LOAD_ATTRIBUTE,
  LOAD_ATTRIBUTE_SUCCESS,
  LOAD_TALK_BOARD,
  LOAD_TALK_BOARD_SUCCESS,
  LOAD_UNREAD_TALK_BOARD,
  LOAD_UNREAD_TALK_BOARD_SUCCESS,
  LOAD_TALK_BOARD_UPDATE,
  LOAD_TALK_BOARD_UPDATE_SUCCESS,
  LOAD_REPOS_ERROR,
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  LOAD_COMMENT_LIST,
  LOAD_COMMENT_LIST_FAILURE,
  LOAD_COMMENT_LIST_SUCCESS,
  UPLOAD_FILES_COMMENT_FAILURE,
  UPLOAD_FILES_COMMENT_REQUEST,
  UPLOAD_FILES_COMMENT_SUCCESS,
  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAILURE,
  DISLIKE_COMMENT_REQUEST,
  DISLIKE_COMMENT_SUCCESS,
  DISLIKE_COMMENT_FAILURE,
  LOAD_USER_LIKE_COMMENT_REQUEST,
  LOAD_USER_LIKE_COMMENT_SUCCESS,
  LOAD_USER_LIKE_COMMENT_FAILURE,
  LOAD_USER_DISLIKE_COMMENT_REQUEST,
  LOAD_USER_DISLIKE_COMMENT_SUCCESS,
  LOAD_USER_DISLIKE_COMMENT_FAILURE,
  READ_COMMENT_REQUEST,
  READ_COMMENT_SUCCESS,
  READ_COMMENT_FAILURE,
  LOAD_TALK_BOARD_DETAIL,
  LOAD_TALK_BOARD_DETAIL_SUCCESS,
  LOAD_TALK_BOARD_DETAIL_FAILURE,
  LIKE_TALK_BOARD,
  DISLIKE_TALK_BOARD,
  CHECK_COMPLETE_TALK_BOARD,
  LOAD_USER_LIKE_TALK_BOARD,
  LOAD_USER_DISLIKE_TALK_BOARD,
  LOAD_USER_CHECK_COMPLETE_TALK_BOARD,
  READ_TALK_BOARD,
  LOAD_USERS_ACTIVE_TALK_BOARD,
  LOAD_USERS_ACTIVE_COMMENT,
  CHANGE_FILTER_TALKBOARD
} from './constants'

const listGroupInitial = {
  id: null,
  name: null,
  parent: null,
  joninedata: null,
  chidldGroup: [],
  data: []
}

const listAttributeInitial = {
  data: []
}

const listTagInitial = {
  id: null,
  name: null,
  companyId: null,
  companyName: null,
  data: []
}

const listTalkBoardInitial = {
  isLoading: false,
  isLiking: false,
  isLoadUserReact: false,
  isReading: false,
  usersLike: [],
  usersDislike: [],
  usersCheckComplete: [],
  isLoadingUsersActive: false,
  usersActive: {
    usersLike: [],
    userDisLike: [],
    usersCheckComplete: []
  },
  data: {
    result: [],
    pages: 1,
    page: 1,
    limit: 20,
    sortType: SORT_TYPE.DESC,
    title: '',
    lstTagId: [],
    total: 0
  },
  filter: {
    sortType: SORT_TYPE.DESC,
    title: '',
    lstTagId: [],
    content: ''
  }
}

const listTalkBoardUpdateInitial = {
  data: {
    lstTag: [],
    listAttributes: [],
    lstDepartments: [],
    title: '',
    description: ''
  },
  isLoadingTalkBoard: false
}

const talkBoardDetail = {
  data: {},
  isLoadingTalkBoardDetail: false,
  error: null,
  isLiking: false,
  isLoadUserReact: false
}

const comments = {
  isLoading: false,
  isLiking: false,
  isLoadUsersReact: false,
  isReading: false,
  usersLike: [],
  usersDislike: [],
  isLoadingUsersActive: false,
  usersActive: {
    usersLike: [],
    userDisLike: []
  },
  data: [],
  filter: {},
  isCreating: false,
  fileUploading: false,
  error: null
}

export const initialState = {
  isLoading: false,
  unreadTalkBoard: 0,
  listTag: {
    ...listTagInitial
  },
  listGroup: {
    ...listGroupInitial
  },
  listAttribute: {
    ...listAttributeInitial
  },
  listTalkBoard: {
    ...listTalkBoardInitial
  },
  listTalkBoardUpdate: {
    ...listTalkBoardUpdateInitial
  },
  talkBoardDetail: {
    ...talkBoardDetail
  },
  comments: { ...comments },
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    limit: 100
  },
  error: null
}

function loadTag(state) {
  return updateObject(state, {
    listTag: {
      ...state.listTag,
      isLoading: true
    }
  })
}

function loadTagSuccess(state, { data }) {
  return updateObject(state, {
    listTag: {
      ...state.listTag,
      data,
      isLoading: false
    }
  })
}

function loadGroup(state) {
  return updateObject(state, {
    listGroup: {
      ...state.listGroup,
      isLoading: true
    }
  })
}

function loadGroupSuccess(state, { data }) {
  return updateObject(state, {
    listGroup: {
      ...state.listGroup,
      data,
      isLoading: false
    }
  })
}

function loadAttribute(state) {
  return updateObject(state, {
    listAttribute: {
      ...state.listAttribute,
      isLoading: true
    }
  })
}

function loadAttributeSuccess(state, { data }) {
  return updateObject(state, {
    listAttribute: {
      ...state.listAttribute,
      data,
      isLoading: false
    }
  })
}

function loadTalkBoard(state) {
  return updateObject(state, {
    listTalkBoard: {
      ...state.listTalkBoard,
      isLoading: true
    }
  })
}

function loadTalkBoardSuccess(state, { payload }) {
  const { data, filter } = payload
  return updateObject(state, {
    listTalkBoard: {
      ...state.listTalkBoard,
      isLoading: false,
      data: {
        ...data,
        sortType: filter.sortType,
        title: filter.title,
        lstTagId: filter.lstTagId,
        content: filter.content
      },
      filter
    }
  })
}

function loadTalkBoardUpdate(state) {
  return updateObject(state, {
    listTalkBoardUpdate: {
      ...state.listTalkBoardUpdate,
      isLoadingTalkBoard: true
    }
  })
}

function loadTalkBoardUpdateSuccess(state, { data }) {
  return updateObject(state, {
    listTalkBoardUpdate: {
      ...state.listTalkBoardUpdate,
      data,
      isLoadingTalkBoard: false
    }
  })
}

function loadUnreadTalkBoard(state) {
  return updateObject(state, {
    unreadTalkBoard: {
      ...state.unreadTalkBoard
    }
  })
}

function loadUnreadTalkBoardSuccess(state, { data }) {
  return updateObject(state, {
    unreadTalkBoard: {
      ...state.unreadTalkBoard,
      unreadTalkBoard: data
    }
  })
}

function repoLoadingError(state, { error }) {
  return updateObject(state, {
    error
  })
}

function loadComments(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLoading: true
    }
  })
}

function loadCommentsSuccess(state, { payload }) {
  const { data, pagination, filter } = payload
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLoading: false,
      data,
      pagination,
      filter
    }
  })
}

function loadCommentsFailed(state, { error }) {
  return updateObject(state, {
    comments: {
      isLoading: false,
      error
    }
  })
}

function createCommentRequest(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isCreating: true
    }
  })
}

function createCommentSuccess(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isCreating: false
    }
  })
}

function createCommentFailed(state, { error }) {
  return updateObject(state, {
    comments: {
      isCreating: false,
      error
    }
  })
}

function uploadFilesCommentRequest(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      fileUploading: true
    }
  })
}

function uploadFilesCommentSuccess(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      fileUploading: false
    }
  })
}

function uploadFilesCommentFailed(state, { error }) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      fileUploading: false,
      error
    }
  })
}

function likeCommentRequest(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLiking: true
    }
  })
}

function likeCommentSuccess(state, { data }) {
  const newComments = updateObjectInArray(state.comments.data, data, (el) => el.id === data.id)
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLiking: false,
      data: newComments
    }
  })
}

function likeCommentFailure(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLiking: false
    }
  })
}

function disLikeCommentRequest(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLiking: true
    }
  })
}

function disLikeCommentSuccess(state, { data }) {
  const newComments = updateObjectInArray(state.comments.data, data, (el) => el.id === data.id)
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLiking: false,
      data: newComments
    }
  })
}

function disLikeCommentFailure(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLiking: false
    }
  })
}

function loadUserLikeCommentRequest(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLoadUsersReact: true
    }
  })
}

function loadUserLikeCommentSuccess(state, { data }) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLoadUsersReact: false,
      usersLike: data
    }
  })
}

function loadUserLikeCommentFailure(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLoadUsersReact: false
    }
  })
}

function loadUserDisLikeCommentRequest(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLoadUsersReact: true
    }
  })
}

function loadUserDisLikeCommentSuccess(state, { data }) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLoadUsersReact: false,
      usersDislike: data
    }
  })
}

function loadUserDisLikeCommentFailure(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLoadUsersReact: false
    }
  })
}

function readCommentRequest(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isReading: true
    }
  })
}

function readCommentSuccess(state, { data }) {
  const newComments = updateObjectInArray(state.comments.data, data, (el) => el.id === data.id)
  return updateObject(state, {
    comments: {
      ...state.comments,
      isReading: false,
      data: newComments
    }
  })
}

function readCommentFailure(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isReading: false
    }
  })
}

function loadTalkBoardDetail(state) {
  return updateObject(state, {
    talkBoardDetail: {
      ...state.talkBoardDetail,
      isLoadingTalkBoardDetail: true
    }
  })
}

function loadTalkBoardDetailSuccess(state, { data }) {
  return updateObject(state, {
    talkBoardDetail: {
      ...state.talkBoardDetail,
      data,
      isLoadingTalkBoardDetail: false
    }
  })
}

function loadTalkBoardDetailFailure(state, { error }) {
  return updateObject(state, {
    error,
    isLoadingTalkBoardDetail: false
  })
}

function likeTalkBoardRequest(state) {
  return updateObject(state, {
    talkBoardDetail: {
      ...state.talkBoardDetail,
      isLiking: true
    },
    listTalkBoard: {
      ...state.listTalkBoard,
      isLiking: true
    }
  })
}

function likeTalkBoardSuccess(state, { data }) {
  const newTalkBoard = { ...state.talkBoardDetail.data, ...data }
  const newData = updateObjectInArray(state.listTalkBoard.data.result, data, (el) => el.id === data.id)

  const newListTalkBoard = { ...state.listTalkBoard }
  newListTalkBoard.data.result = newData

  return updateObject(state, {
    talkBoardDetail: {
      ...state.talkBoardDetail,
      data: newTalkBoard,
      isLiking: false
    },
    listTalkBoard: { ...newListTalkBoard, isLiking: false }
  })
}

function likeTalkBoardFailure(state) {
  return updateObject(state, {
    talkBoardDetail: {
      ...state.talkBoardDetail,
      isLiking: false
    }
  })
}

function loadUserLikeTalkBoardRequest(state) {
  return updateObject(state, {
    talkBoardDetail: {
      ...state.talkBoardDetail,
      isLoadUserReact: true
    },
    listTalkBoard: {
      ...state.listTalkBoard,
      isLoadUserReact: true
    }
  })
}

function loadUserLikeTalkBoardSuccess(state, { data }) {
  return updateObject(state, {
    talkBoardDetail: {
      ...state.talkBoardDetail,
      isLoadUserReact: false
    },
    listTalkBoard: {
      ...state.listTalkBoard,
      usersLike: data,
      isLoadUserReact: false
    }
  })
}

function loadUserLikeTalkBoardFailure(state) {
  return updateObject(state, {
    talkBoardDetail: {
      ...state.talkBoardDetail,
      isLiking: false
    }
  })
}

function loadUserDisLikeTalkBoardRequest(state) {
  return updateObject(state, {
    talkBoardDetail: {
      ...state.talkBoardDetail,
      isLoadUserReact: true
    },
    listTalkBoard: {
      ...state.listTalkBoard,
      isLoadUserReact: true
    }
  })
}

function loadUserDisLikeTalkBoardSuccess(state, { data }) {
  return updateObject(state, {
    talkBoardDetail: {
      ...state.talkBoardDetail,
      isLoadUserReact: false
    },
    listTalkBoard: {
      ...state.listTalkBoard,
      usersDislike: data,
      isLoadUserReact: false
    }
  })
}

function loadUserDisLikeTalkBoardFailure(state) {
  return updateObject(state, {
    talkBoardDetail: {
      ...state.talkBoardDetail,
      isLiking: false
    },
    listTalkBoard: {
      ...state.listTalkBoard,
      isLoadUserReact: false
    }
  })
}

function loadUserCheckCompleteTalkBoardRequest(state) {
  return updateObject(state, {
    talkBoardDetail: {
      ...state.talkBoardDetail,
      isLoadUserReact: true
    },
    listTalkBoard: {
      ...state.listTalkBoard,
      isLoadUserReact: true
    }
  })
}

function loadUserCheckCompleteTalkBoardSuccess(state, { data }) {
  return updateObject(state, {
    talkBoardDetail: {
      ...state.talkBoardDetail,
      isLoadUserReact: false
    },
    listTalkBoard: {
      ...state.listTalkBoard,
      usersCheckComplete: data,
      isLoadUserReact: false
    }
  })
}

function loadUserCheckCompleteTalkBoardFailure(state) {
  return updateObject(state, {
    talkBoardDetail: {
      ...state.talkBoardDetail,
      isLiking: false
    },
    listTalkBoard: {
      ...state.listTalkBoard,
      isLoadUserReact: false
    }
  })
}

function readTalkBoardRequest(state) {
  return updateObject(state, {
    listTalkBoard: {
      ...state.listTalkBoard,
      isReading: true
    }
  })
}

function readTalkBoardSuccess(state, { data }) {
  const newData = updateObjectInArray(state.listTalkBoard.data.result, data, (el) => el.id === data.id)

  const newListTalkBoard = { ...state.listTalkBoard }
  newListTalkBoard.data.result = newData

  return updateObject(state, {
    listTalkBoard: {
      ...newListTalkBoard,
      isReading: false
    }
  })
}

function readTalkBoardFailure(state) {
  return updateObject(state, {
    listTalkBoard: {
      ...state.listTalkBoard,
      isReading: false
    }
  })
}

function loadUsersActiveTalkBoardRequest(state) {
  return updateObject(state, {
    listTalkBoard: {
      ...state.listTalkBoard,
      isLoadingUsersActive: true
    }
  })
}

function loadUsersActiveTalkBoardSuccess(state, { data }) {
  const { usersLike, userDisLike, usersCheckComplete } = data
  return updateObject(state, {
    listTalkBoard: {
      ...state.listTalkBoard,
      usersActive: {
        usersLike,
        userDisLike,
        usersCheckComplete
      },
      isLoadingUsersActive: false
    }
  })
}

function loadUsersActiveTalkBoardFailure(state) {
  return updateObject(state, {
    listTalkBoard: {
      ...state.listTalkBoard,
      isLoadingUsersActive: false
    }
  })
}

function loadUsersActiveCommentRequest(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLoadingUsersActive: true
    }
  })
}

function loadUsersActiveCommentSuccess(state, { data }) {
  const { usersLike, userDisLike } = data
  return updateObject(state, {
    comments: {
      ...state.comments,
      usersActive: {
        usersLike,
        userDisLike
      },
      isLoadingUsersActive: false
    }
  })
}

function loadUsersActiveCommentFailure(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLoadingUsersActive: false
    }
  })
}

function resetState(state) {
  return updateObject(state, {
    ...state,
    talkBoardDetail: {
      ...talkBoardDetail
    },
    comments: {
      ...comments
    }
  })
}

function changeFilterTalkboard(state) {
  return updateObject(state, {
    ...state,
    listTalkBoard: listTalkBoardInitial
  })
}

export default createReducer(initialState, {
  [LOAD_TAG]: loadTag,
  [LOAD_TAG_SUCCESS]: loadTagSuccess,

  [LOAD_GROUP]: loadGroup,
  [LOAD_GROUP_SUCCESS]: loadGroupSuccess,

  [LOAD_ATTRIBUTE]: loadAttribute,
  [LOAD_ATTRIBUTE_SUCCESS]: loadAttributeSuccess,

  [LOAD_TALK_BOARD]: loadTalkBoard,
  [LOAD_TALK_BOARD_SUCCESS]: loadTalkBoardSuccess,

  [LOAD_TALK_BOARD_UPDATE]: loadTalkBoardUpdate,
  [LOAD_TALK_BOARD_UPDATE_SUCCESS]: loadTalkBoardUpdateSuccess,

  [LOAD_UNREAD_TALK_BOARD]: loadUnreadTalkBoard,
  [LOAD_UNREAD_TALK_BOARD_SUCCESS]: loadUnreadTalkBoardSuccess,

  [LOAD_COMMENT_LIST]: loadComments,
  [LOAD_COMMENT_LIST_SUCCESS]: loadCommentsSuccess,
  [LOAD_COMMENT_LIST_FAILURE]: loadCommentsFailed,

  [CREATE_COMMENT_REQUEST]: createCommentRequest,
  [CREATE_COMMENT_SUCCESS]: createCommentSuccess,
  [CREATE_COMMENT_FAILURE]: createCommentFailed,

  [UPLOAD_FILES_COMMENT_REQUEST]: uploadFilesCommentRequest,
  [UPLOAD_FILES_COMMENT_SUCCESS]: uploadFilesCommentSuccess,
  [UPLOAD_FILES_COMMENT_FAILURE]: uploadFilesCommentFailed,

  [LIKE_COMMENT_REQUEST]: likeCommentRequest,
  [LIKE_COMMENT_SUCCESS]: likeCommentSuccess,
  [LIKE_COMMENT_FAILURE]: likeCommentFailure,

  [DISLIKE_COMMENT_REQUEST]: disLikeCommentRequest,
  [DISLIKE_COMMENT_SUCCESS]: disLikeCommentSuccess,
  [DISLIKE_COMMENT_FAILURE]: disLikeCommentFailure,

  [LOAD_USER_LIKE_COMMENT_REQUEST]: loadUserLikeCommentRequest,
  [LOAD_USER_LIKE_COMMENT_SUCCESS]: loadUserLikeCommentSuccess,
  [LOAD_USER_LIKE_COMMENT_FAILURE]: loadUserLikeCommentFailure,

  [LOAD_USER_DISLIKE_COMMENT_REQUEST]: loadUserDisLikeCommentRequest,
  [LOAD_USER_DISLIKE_COMMENT_SUCCESS]: loadUserDisLikeCommentSuccess,
  [LOAD_USER_DISLIKE_COMMENT_FAILURE]: loadUserDisLikeCommentFailure,

  [READ_COMMENT_REQUEST]: readCommentRequest,
  [READ_COMMENT_SUCCESS]: readCommentSuccess,
  [READ_COMMENT_FAILURE]: readCommentFailure,

  [LOAD_TALK_BOARD_DETAIL]: loadTalkBoardDetail,
  [LOAD_TALK_BOARD_DETAIL_SUCCESS]: loadTalkBoardDetailSuccess,
  [LOAD_TALK_BOARD_DETAIL_FAILURE]: loadTalkBoardDetailFailure,

  [REQUEST(LIKE_TALK_BOARD)]: likeTalkBoardRequest,
  [SUCCESS(LIKE_TALK_BOARD)]: likeTalkBoardSuccess,
  [FAILURE(LIKE_TALK_BOARD)]: likeTalkBoardFailure,

  [REQUEST(DISLIKE_TALK_BOARD)]: likeTalkBoardRequest,
  [SUCCESS(DISLIKE_TALK_BOARD)]: likeTalkBoardSuccess,
  [FAILURE(DISLIKE_TALK_BOARD)]: likeTalkBoardFailure,

  [REQUEST(CHECK_COMPLETE_TALK_BOARD)]: likeTalkBoardRequest,
  [SUCCESS(CHECK_COMPLETE_TALK_BOARD)]: likeTalkBoardSuccess,
  [FAILURE(CHECK_COMPLETE_TALK_BOARD)]: likeTalkBoardFailure,

  [REQUEST(LOAD_USER_LIKE_TALK_BOARD)]: loadUserLikeTalkBoardRequest,
  [SUCCESS(LOAD_USER_LIKE_TALK_BOARD)]: loadUserLikeTalkBoardSuccess,
  [FAILURE(LOAD_USER_LIKE_TALK_BOARD)]: loadUserLikeTalkBoardFailure,

  [REQUEST(LOAD_USER_DISLIKE_TALK_BOARD)]: loadUserDisLikeTalkBoardRequest,
  [SUCCESS(LOAD_USER_DISLIKE_TALK_BOARD)]: loadUserDisLikeTalkBoardSuccess,
  [FAILURE(LOAD_USER_DISLIKE_TALK_BOARD)]: loadUserDisLikeTalkBoardFailure,

  [REQUEST(LOAD_USER_CHECK_COMPLETE_TALK_BOARD)]: loadUserCheckCompleteTalkBoardRequest,
  [SUCCESS(LOAD_USER_CHECK_COMPLETE_TALK_BOARD)]: loadUserCheckCompleteTalkBoardSuccess,
  [FAILURE(LOAD_USER_CHECK_COMPLETE_TALK_BOARD)]: loadUserCheckCompleteTalkBoardFailure,

  [REQUEST(READ_TALK_BOARD)]: readTalkBoardRequest,
  [SUCCESS(READ_TALK_BOARD)]: readTalkBoardSuccess,
  [FAILURE(READ_TALK_BOARD)]: readTalkBoardFailure,

  [REQUEST(LOAD_USERS_ACTIVE_TALK_BOARD)]: loadUsersActiveTalkBoardRequest,
  [SUCCESS(LOAD_USERS_ACTIVE_TALK_BOARD)]: loadUsersActiveTalkBoardSuccess,
  [FAILURE(LOAD_USERS_ACTIVE_TALK_BOARD)]: loadUsersActiveTalkBoardFailure,

  [REQUEST(LOAD_USERS_ACTIVE_COMMENT)]: loadUsersActiveCommentRequest,
  [SUCCESS(LOAD_USERS_ACTIVE_COMMENT)]: loadUsersActiveCommentSuccess,
  [FAILURE(LOAD_USERS_ACTIVE_COMMENT)]: loadUsersActiveCommentFailure,

  [CHANGE_FILTER_TALKBOARD]: changeFilterTalkboard,

  [LOCATION_CHANGE]: resetState,

  [LOAD_REPOS_ERROR]: repoLoadingError
})
