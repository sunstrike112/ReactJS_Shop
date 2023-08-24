import { useDispatch, useSelector } from 'react-redux'

import saga from 'Modules/video_editor/project_list/store/saga'
import reducer from 'Modules/video_editor/project_list/store/reducers'
import { useInjectSaga, useInjectReducer } from 'Stores'
import { makeSelectProjects } from 'Modules/video_editor/project_list/store/selectors'
import {
  loadListProject,
  deleteProject,
  createProject,
  linkFileToProject,
  publishProject,
  resetState
} from 'Modules/video_editor/project_list/store/actions'

export const useLoadProjectList = () => {
  useInjectSaga({ key: 'projectManager', saga })
  useInjectReducer({ key: 'projectManager', reducer })

  const {
    listProject,
    isLoading,
    pagination,
    filter,
    isUploaded,
    publishState,
    error
  } = useSelector(makeSelectProjects())
  const dispatch = useDispatch()
  const loadListProjectsAction = (payload) => dispatch(loadListProject(payload))
  const deleteProjectAction = (payload) => dispatch(deleteProject(payload))
  const createProjectAction = (payload) => dispatch(createProject(payload))
  const linkFileToProjectAction = (payload) => dispatch(linkFileToProject(payload))
  const publishProjectAction = (payload) => dispatch(publishProject(payload))
  const resetStateAction = () => dispatch(resetState())
  return {
    isLoading,
    pagination,
    filter,
    listProject,
    isUploaded,
    publishState,
    error,
    deleteProjectAction,
    loadListProjectsAction,
    createProjectAction,
    linkFileToProjectAction,
    publishProjectAction,
    resetStateAction
  }
}
