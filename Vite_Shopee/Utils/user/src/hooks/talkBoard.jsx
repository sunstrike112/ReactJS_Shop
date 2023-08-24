/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux'

import { useInjectSaga, useInjectReducer } from '../store'
import saga from '../modules/talk-board/store/saga'
import reducer from '../modules/talk-board/store/reducer'

import {
  createCommentRequest,
  createTalkBoard,
  deleteTalkBoard,
  deleteTalkBoardComment,
  getCommentsList,
  uploadFilesCommentRequest,
  loadAttribute,
  loadGroup,
  loadTag,
  loadTalkBoard,
  likeCommentRequest,
  disLikeCommentRequest,
  loadUserLikeCommentRequest,
  loadUserDisLikeCommentRequest,
  readCommentRequest,
  loadTalkBoardUpdate,
  updateTalkBoard,
  uploadFilesRequest,
  loadUnreadTalkBoard,
  loadTalkBoardDetail,
  likeTalkBoardRequest,
  updateCommentRequest,
  disLikeTalkBoardRequest,
  checkCompleteTalkBoardRequest,
  loadUserLikeTalkBoardRequest,
  loadUserDisLikeTalkBoardRequest,
  loadUserCheckCompleteTalkBoardRequest,
  readTalkBoardRequest,
  loadUsersActiveTalkBoard,
  loadUsersActiveComment
} from '../modules/talk-board/store/actions'

import {
  makeSelectAttribute,
  makeSelectComments,
  makeSelectGroup,
  makeSelectTag,
  makeSelectListTalkBoard,
  makeSelectListTalkBoardUpdate,
  makeSelectUnreadTalkBoard,
  makeSelectTalkBoardDetail
} from '../modules/talk-board/store/selectors'

export const useTalkBoard = () => {
  useInjectSaga({ key: 'talkBoard', saga })
  useInjectReducer({ key: 'talkBoard', reducer })

  const dispatch = useDispatch()

  const { data: listTag } = useSelector(makeSelectTag())
  const { data: listGroup } = useSelector(makeSelectGroup())
  const { data: listAttribute } = useSelector(makeSelectAttribute())
  const {
    data: listTalkBoard,
    isLoading,
    isLiking: isLikingTalkBoard,
    usersLike,
    usersDislike,
    usersCheckComplete,
    isLoadingUsersActive,
    usersActive,
    filter
  } = useSelector(makeSelectListTalkBoard())
  const { data: dataTalkBoardUpdate, isLoadingTalkBoard } = useSelector(makeSelectListTalkBoardUpdate())
  const { unreadTalkBoard } = useSelector(makeSelectUnreadTalkBoard())
  const { data: dataTalkBoardDetail, isLoadingTalkBoardDetail, isLiking } = useSelector(makeSelectTalkBoardDetail())

  const loadTagAction = (payload) => { dispatch(loadTag(payload)) }
  const loadGroupAction = () => { dispatch(loadGroup()) }
  const loadAttributeAction = () => { dispatch(loadAttribute()) }
  const loadUnreadTalkBoardAction = () => { dispatch(loadUnreadTalkBoard()) }
  const loadTalkBoardAction = (payload) => { dispatch(loadTalkBoard(payload)) }
  const createTalkBoardAction = (payload) => { dispatch(createTalkBoard(payload)) }
  const deleteTalkBoarddAction = (payload) => { dispatch(deleteTalkBoard(payload)) }
  const loadTalkBoardUpdateAction = (payload) => { dispatch(loadTalkBoardUpdate(payload)) }
  const updateTalkBoardAction = (payload) => { dispatch(updateTalkBoard(payload)) }
  const loadTalkBoardDetailAction = (payload) => { dispatch(loadTalkBoardDetail(payload)) }
  const likeTalkBoardAction = (payload) => dispatch(likeTalkBoardRequest(payload))
  const disLikeTalkBoardAction = (payload) => dispatch(disLikeTalkBoardRequest(payload))
  const checkCompleteTalkBoardAction = (payload) => dispatch(checkCompleteTalkBoardRequest(payload))
  const loadUserLikeTalkBoardAction = (payload) => dispatch(loadUserLikeTalkBoardRequest(payload))
  const loadUserDisLikeTalkBoardAction = (payload) => dispatch(loadUserDisLikeTalkBoardRequest(payload))
  const loadUserCheckCompleteTalkBoardAction = (payload) => dispatch(loadUserCheckCompleteTalkBoardRequest(payload))
  const readTalkBoardAction = (payload) => dispatch(readTalkBoardRequest(payload))
  const loadUsersActiveTalkBoardAction = (payload) => dispatch(loadUsersActiveTalkBoard(payload))

  return {
    isLoading,
    listTag,
    listGroup,
    listAttribute,
    listTalkBoard,
    loadTagAction,
    loadGroupAction,
    loadAttributeAction,
    loadTalkBoardAction,
    createTalkBoardAction,
    deleteTalkBoarddAction,
    loadTalkBoardUpdateAction,
    dataTalkBoardUpdate,
    updateTalkBoardAction,
    isLoadingTalkBoard,
    loadUnreadTalkBoardAction,
    unreadTalkBoard,
    loadTalkBoardDetailAction,
    dataTalkBoardDetail,
    isLoadingTalkBoardDetail,
    likeTalkBoardAction,
    isLiking,
    isLikingTalkBoard,
    disLikeTalkBoardAction,
    checkCompleteTalkBoardAction,
    loadUserLikeTalkBoardAction,
    loadUserDisLikeTalkBoardAction,
    loadUserCheckCompleteTalkBoardAction,
    usersLike,
    usersDislike,
    usersCheckComplete,
    readTalkBoardAction,
    loadUsersActiveTalkBoardAction,
    isLoadingUsersActive,
    usersActive,
    filter
  }
}

export const useCommentsList = () => {
  useInjectReducer({ key: 'talkBoard', reducer })
  useInjectSaga({ key: 'talkBoard', saga })

  const dispatch = useDispatch()

  const {
    data,
    isLoading,
    error,
    pagination,
    isLiking,
    isLoadUsersReact,
    usersLike,
    usersDislike,
    usersActive,
    isLoadingUsersActive,
    filter
  } = useSelector(makeSelectComments())

  const getCommentsListAction = (payload) => dispatch(getCommentsList(payload))
  const createCommentAction = (payload) => dispatch(createCommentRequest(payload))
  const updateCommentAction = (payload) => dispatch(updateCommentRequest(payload))
  const uploadFilesCommentAction = (payload) => dispatch(uploadFilesCommentRequest(payload))
  const likeCommentAction = (payload) => dispatch(likeCommentRequest(payload))
  const disLikeCommentAction = (payload) => dispatch(disLikeCommentRequest(payload))
  const loadUserLikeCommentAction = (payload) => dispatch(loadUserLikeCommentRequest(payload))
  const loadUserDisLikeCommentAction = (payload) => dispatch(loadUserDisLikeCommentRequest(payload))
  const readCommentAction = (payload) => dispatch(readCommentRequest(payload))
  const deleteTalkBoardCommentAction = (payload) => { dispatch(deleteTalkBoardComment(payload)) }
  const loadUsersActiveCommentAction = (payload) => dispatch(loadUsersActiveComment(payload))

  return {
    data,
    isLoading,
    error,
    pagination,
    isLiking,
    isLoadUsersReact,
    usersLike,
    usersDislike,
    usersActive,
    isLoadingUsersActive,
    filter,
    getCommentsListAction,
    createCommentAction,
    updateCommentAction,
    uploadFilesCommentAction,
    likeCommentAction,
    disLikeCommentAction,
    loadUserLikeCommentAction,
    loadUserDisLikeCommentAction,
    readCommentAction,
    deleteTalkBoardCommentAction,
    loadUsersActiveCommentAction
  }
}
