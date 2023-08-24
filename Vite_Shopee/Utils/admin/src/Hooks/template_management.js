/* eslint-disable no-restricted-globals */
import { getListTemplate, getTemplateDetail, resetState } from 'Modules/template_management/store/actions'
import reducer from 'Modules/template_management/store/reducer'
import saga from 'Modules/template_management/store/saga'
import { makeGetListTemplate, makeGetTemplateDetail } from 'Modules/template_management/store/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useInjectReducer, useInjectSaga } from 'Stores'

export function useTemplateManagement() {
  useInjectSaga({ key: 'templateManagement', saga })
  useInjectReducer({ key: 'templateManagement', reducer })

  const {
    listTemplate,
    pagination,
    filter,
    isLoading,
    isSubmitting,
    error
  } = useSelector(makeGetListTemplate())

  const {
    templateDetail
  } = useSelector(makeGetTemplateDetail())

  const dispatch = useDispatch()
  const getListTemplateAction = (payload) => dispatch(getListTemplate(payload))
  const getTemplateDetailAction = (payload) => dispatch(getTemplateDetail(payload))
  const resetStateAction = () => dispatch(resetState())
  return {
    getListTemplateAction,
    getTemplateDetailAction,
    templateDetail,
    listTemplate,
    pagination,
    filter,
    isLoading,
    isSubmitting,
    error,
    resetStateAction
  }
}
