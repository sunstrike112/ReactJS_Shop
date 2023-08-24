import { useState, useLayoutEffect } from 'react'

const useErrorName = (fullName, isErrored) => {
  const [isShowErrorName, setIsShowErrorName] = useState(false)

  const onValidateName = () => {
    if (!isErrored && fullName && fullName.length >= 60) {
      setIsShowErrorName(true)
    } else if (isErrored || isShowErrorName || !fullName) {
      setIsShowErrorName(false)
    }
  }

  useLayoutEffect(() => {
    onValidateName()
  }, [fullName])

  return { isShowErrorName }
}

export { useErrorName }
