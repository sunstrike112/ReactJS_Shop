import { useState, useLayoutEffect } from 'react'

const useValidateRangeDate = (startDate, endDate, isErrored) => {
  const [isShowError, setIsShowError] = useState(false)

  const onValidate = () => {
    if (!isErrored && startDate && endDate && startDate >= endDate) {
      setIsShowError(true)
    } else if (isErrored || isShowError || !startDate || !endDate) {
      setIsShowError(false)
    }
  }

  useLayoutEffect(() => {
    onValidate()
  }, [startDate, endDate])

  return { isShowError, setIsShowError }
}

export { useValidateRangeDate }
