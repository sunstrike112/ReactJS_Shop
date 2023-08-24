import {
  createSeminar,
  deleteSeminar,
  editSeminar,
  loadDetailSeminar,
  loadListSeminar,
  loadCompanies
} from 'Modules/company/seminar/store/actions'
import reducer from 'Modules/company/seminar/store/reducer'
import saga from 'Modules/company/seminar/store/saga'
import { makeSelectCompanySeminar } from 'Modules/company/seminar/store/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useInjectReducer, useInjectSaga } from 'Stores'

export const useCompanySeminar = () => {
  useInjectReducer({ key: 'companySeminar', reducer })
  useInjectSaga({ key: 'companySeminar', saga })

  const dispatch = useDispatch()

  const {
    list: { data: list, pagination, filter, isLoading },
    companies
  } = useSelector(makeSelectCompanySeminar())

  const loadListSeminarAction = (payload) => dispatch(loadListSeminar(payload))
  const loadCompaniesAction = (payload) => dispatch(loadCompanies(payload))

  return {
    loadListSeminarAction,
    list,
    pagination,
    filter,
    isLoading,
    companies,
    loadCompaniesAction
  }
}

export const useCreateCompanySeminar = () => {
  useInjectReducer({ key: 'companySeminar', reducer })
  useInjectSaga({ key: 'companySeminar', saga })

  const dispatch = useDispatch()

  const {
    create: { isLoading }
  } = useSelector(makeSelectCompanySeminar())

  const createSeminarAction = (payload) => dispatch(createSeminar(payload))

  return {
    createSeminarAction,
    isLoading
  }
}

export const useDeleteCompanySeminar = () => {
  useInjectReducer({ key: 'companySeminar', reducer })
  useInjectSaga({ key: 'companySeminar', saga })

  const dispatch = useDispatch()

  const deleteSeminarAction = (payload) => dispatch(deleteSeminar(payload))

  return {
    deleteSeminarAction
  }
}

export const useEditCompanySeminar = () => {
  useInjectReducer({ key: 'companySeminar', reducer })
  useInjectSaga({ key: 'companySeminar', saga })

  const dispatch = useDispatch()

  const {
    edit: { isLoading: isUpdating },
    detail: { data: seminar }
  } = useSelector(makeSelectCompanySeminar())

  const loadDetailSeminarAction = (payload) => dispatch(loadDetailSeminar(payload))
  const editSeminarAction = (payload) => dispatch(editSeminar(payload))

  return {
    isUpdating,
    editSeminarAction,
    loadDetailSeminarAction,
    seminar
  }
}
