/* eslint-disable no-restricted-globals */
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import saga from 'Modules/course/test_question_management/store/saga'
import reducer from 'Modules/course/test_question_management/store/reducer'
import { useInjectSaga, useInjectReducer } from 'Stores'
import {
  deleteTestQuestions,
  loadTestQuestionDetail,
  loadTestQuestions,
  loadTestUnits,
  resetQuestions
} from 'Modules/course/test_question_management/store/actions'
import {
  makeSelectTestQuestionManagement
} from 'Modules/course/test_question_management/store/selectors'

export const useLoadTestUnits = () => {
  useInjectSaga({ key: 'testQuestionManagement', saga })
  useInjectReducer({ key: 'testQuestionManagement', reducer })

  const dispatch = useDispatch()

  const { testUnits: testUnitsState } = useSelector(makeSelectTestQuestionManagement())

  const testUnits = useMemo(() => (
    testUnitsState.map((item) => ({
      value: item.unitId,
      label: item.unitName
    }))
  ), [testUnitsState])

  const loadTestUnitsAction = (payload) => dispatch(loadTestUnits(payload))

  return {
    loadTestUnitsAction,
    testUnits
  }
}

export const useLoadTestQuestions = () => {
  useInjectSaga({ key: 'testQuestionManagement', saga })
  useInjectReducer({ key: 'testQuestionManagement', reducer })

  const dispatch = useDispatch()

  const { testQuestions, pagination, filter, isLoading } = useSelector(makeSelectTestQuestionManagement())

  const loadTestQuestionsAction = (payload) => dispatch(loadTestQuestions(payload))
  const resetQuestionsAction = () => dispatch(resetQuestions())

  return {
    loadTestQuestionsAction,
    resetQuestionsAction,
    testQuestions,
    pagination,
    filter,
    isLoading
  }
}

export const useDeleteTestQuestions = () => {
  useInjectSaga({ key: 'testQuestionManagement', saga })
  useInjectReducer({ key: 'testQuestionManagement', reducer })

  const dispatch = useDispatch()

  const { isSubmitting } = useSelector(makeSelectTestQuestionManagement())

  const deleteTestQuestionsAction = (payload) => dispatch(deleteTestQuestions(payload))

  return {
    deleteTestQuestionsAction,
    isSubmitting
  }
}

export const useLoadTestQuestionDetail = () => {
  useInjectSaga({ key: 'testQuestionManagement', saga })
  useInjectReducer({ key: 'testQuestionManagement', reducer })

  const dispatch = useDispatch()

  const { testQuestionDetail } = useSelector(makeSelectTestQuestionManagement())

  const loadTestQuestionDetailAction = (payload) => dispatch(loadTestQuestionDetail(payload))

  return {
    loadTestQuestionDetailAction,
    testQuestionDetail
  }
}
