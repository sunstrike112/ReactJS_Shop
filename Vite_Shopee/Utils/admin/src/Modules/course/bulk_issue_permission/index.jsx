import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// import { useTranslation } from 'react-i18next'
import { useInjectReducer, useInjectSaga } from 'Stores'
import saga from '../store/saga'
import reducer from '../store/reducer'
import { loadRepos } from '../store/actions'

const BulkIssuePermissionScreen = () => {
  useInjectSaga({ key: 'testSaga', saga })
  useInjectReducer({ key: 'testSaga', reducer })
  const dispatch = useDispatch()
  // const { t } = useTranslation()
  useEffect(() => {
    dispatch(loadRepos())
  }, [])

  return (
    <>
      this is landing screen
    </>
  )
}

export default BulkIssuePermissionScreen
