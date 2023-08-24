/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { notification } from 'antd'

const Toast = ({
  title = '',
  content = '',
  type = 'success',
  duration = 2,
  isShow = false
}) => {
  const openNotificationWithIcon = () => {
    notification[type]({
      message: title,
      description: content,
      duration
    })
  }
  useEffect(() => {
    if (isShow) {
      openNotificationWithIcon()
    }
  }, [isShow, type])

  return null
}

export default Toast
