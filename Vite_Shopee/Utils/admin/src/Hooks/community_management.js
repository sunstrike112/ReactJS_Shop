/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'
import saga from 'Modules/community_management/store/saga'
import reducer from 'Modules/community_management/store/reducer'
import { useInjectSaga, useInjectReducer } from 'Stores'
import {
  makeGetListTalkBoard, makeSelectComment
} from 'Modules/community_management/store/selectors'
import {
  getListTalkBoard,
  getTalkBoardDetail,
  createTalkBoard,
  updateTalkBoard,
  deleteTalkBoard,
  getGroup,
  getAttribute,
  getTag,
  getListComment,
  hideComment,
  resetTalkboard,
  resetComment
} from 'Modules/community_management/store/actions'

export function useCommunityManagement() {
  useInjectSaga({ key: 'communityManagement', saga })
  useInjectReducer({ key: 'communityManagement', reducer })

  const {
    listTalkBoard,
    talkBoardDetail,
    listTag,
    listGroup,
    listAttribute,
    pagination,
    filter,
    isLoading,
    isSubmitting,
    error
  } = useSelector(makeGetListTalkBoard())

  const dispatch = useDispatch()
  const getListTalkBoardAction = (payload) => dispatch(getListTalkBoard(payload))
  const getTalkBoardDetailAction = (payload) => dispatch(getTalkBoardDetail(payload))
  const createTalkBoardAction = (payload) => dispatch(createTalkBoard(payload))
  const updateTalkBoardAction = (payload) => dispatch(updateTalkBoard(payload))
  const deleteTalkBoardAction = (payload) => dispatch(deleteTalkBoard(payload))
  const getGroupAction = (payload) => dispatch(getGroup(payload))
  const getAttributeAction = (payload) => dispatch(getAttribute(payload))
  const getTagAction = (payload) => dispatch(getTag(payload))
  const resetTalkboardAction = () => dispatch(resetTalkboard())

  return {
    getListTalkBoardAction,
    getTalkBoardDetailAction,
    createTalkBoardAction,
    updateTalkBoardAction,
    deleteTalkBoardAction,
    getAttributeAction,
    getGroupAction,
    getTagAction,

    listTalkBoard,
    talkBoardDetail,
    listTag,
    listGroup,
    listAttribute,
    pagination,
    filter,
    isLoading,
    isSubmitting,
    error,
    resetTalkboardAction
  }
}

export function useCommentManagement() {
  useInjectSaga({ key: 'communityManagement', saga })
  useInjectReducer({ key: 'communityManagement', reducer })

  const {
    data,
    pagination,
    filter,
    isLoadingComment,
    isSubmitting,
    error
  } = useSelector(makeSelectComment())

  const dispatch = useDispatch()

  const getListCommentAction = (payload) => dispatch(getListComment(payload))
  const hideCommentAction = (payload) => {
    dispatch(hideComment(payload))
  }
  const resetCommentAction = () => dispatch(resetComment())
  return {
    getListCommentAction,
    hideCommentAction,
    data,
    pagination,
    filter,
    isLoadingComment,
    isSubmitting,
    error,
    resetCommentAction
  }
}
