/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useInjectSaga, useInjectReducer } from 'Stores'
import saga from 'Modules/user/user_management/batch_register_user/store/saga'
import reducer from 'Modules/user/user_management/batch_register_user/store/reducer'
import {
  registerByCsv,
  resetCsv
} from 'Modules/user/user_management/batch_register_user/store/actions'
import {
  makeSelectuserRegisterByCsv
} from 'Modules/user/user_management/batch_register_user/store/selectors'

export const useRegisterByCsv = () => {
  useInjectSaga({ key: 'userRegisterByCsv', saga })
  useInjectReducer({ key: 'userRegisterByCsv', reducer })
  const dispatch = useDispatch()
  const registerByCsvAction = (payload) => dispatch(registerByCsv(payload))
  const resetDataCsv = () => dispatch(resetCsv())

  const registeredUsers = useSelector(makeSelectuserRegisterByCsv())

  return {
    registeredUsers,
    registerByCsvAction,
    resetDataCsv
  }
}
