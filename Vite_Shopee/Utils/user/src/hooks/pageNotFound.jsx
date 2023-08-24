import { useEffect } from 'react'
import { PAGE_404, ERROR_API } from '../constants'
import { useHistories } from './useHistories'

export const usePageNotFound = ({ error }) => {
  const history = useHistories()

  useEffect(() => {
    if (error?.status === 400 || error?.status === 404) {
      if (error?.type === ERROR_API.ERROR_CAN_NOT_ACCESS_COURSE) {
        return
      }
      history.push(PAGE_404)
    }
  }, [error])
}
