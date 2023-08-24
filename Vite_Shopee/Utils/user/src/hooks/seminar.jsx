import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { useInjectSaga, useInjectReducer } from '../store'
import seminarSaga from '../modules/seminar/store/saga'
import seminarReducer from '../modules/seminar/store/reducer'

import {
  loadSeminarDetail,
  loadSeminars,
  removeSeminarDetail,
  setIsHaveData
} from '../modules/seminar/store/actions'
import { makeSelectSeminar, makeSelectSeminarDetail, makeSelectIshaveData } from '../modules/seminar/store/selectors'

export const useSeminar = () => {
  useInjectSaga({ key: 'seminarStore', saga: seminarSaga })
  useInjectReducer({ key: 'seminarStore', reducer: seminarReducer })

  const dispatch = useDispatch()
  const { data: seminars } = useSelector(makeSelectSeminar())
  const { data: seminar } = useSelector(makeSelectSeminarDetail())
  const isHaveData = useSelector(makeSelectIshaveData())

  const getSeminars = () => {
    dispatch(loadSeminars())
  }

  const getSeminarDetail = (seminarId) => {
    dispatch(loadSeminarDetail(seminarId))
  }

  const removeSeminar = () => {
    dispatch(removeSeminarDetail())
  }

  useEffect(() => {
    let isHave = false
    seminars.forEach((seminarList) => {
      seminarList.result.sort((a, b) => a.startTime - b.startTime).forEach((result) => {
        if (result.endTime >= moment().valueOf()) {
          isHave = true
        }
      })
    })
    dispatch(setIsHaveData(isHave))
  }, [seminars])

  return {
    seminars,
    seminar,
    isHaveData,
    getSeminars,
    getSeminarDetail,
    removeSeminar
  }
}
