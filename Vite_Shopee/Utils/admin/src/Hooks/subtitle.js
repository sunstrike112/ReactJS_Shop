/* eslint-disable no-restricted-globals */
import { useDispatch, useSelector } from 'react-redux'

import saga from 'Modules/course/subtitle_video/store/saga'
import reducer from 'Modules/course/subtitle_video/store/reducer'
import {
  makeSelectUploadSubtitle
} from 'Modules/course/subtitle_video/store/selectors'
import {
  uploadSubTitle, getVideoDetail
} from 'Modules/course/subtitle_video/store/actions'
import { useInjectSaga, useInjectReducer } from 'Stores'

export const useSubTitle = () => {
  useInjectSaga({ key: 'uploadSubTitle', saga })
  useInjectReducer({ key: 'uploadSubTitle', reducer })

  const { videoDetail, isLoading, error, isSubmited } = useSelector(makeSelectUploadSubtitle())

  const dispatch = useDispatch()
  const uploadSubTitleAction = (payload) => dispatch(uploadSubTitle(payload))
  const loadVideoDetailAction = (id) => dispatch(getVideoDetail(id))
  return {
    videoDetail,
    isLoading,
    error,
    isSubmited,
    uploadSubTitleAction,
    loadVideoDetailAction
  }
}
