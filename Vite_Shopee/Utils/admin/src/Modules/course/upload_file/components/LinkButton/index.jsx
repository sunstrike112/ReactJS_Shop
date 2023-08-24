/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button } from 'antd'
import { checkLinkProject } from 'APIs'
import { useHistories } from 'Hooks'

const LinkButton = ({ id, onClick, ...props }) => {
  const histories = useHistories()
  const [loading, setLoading] = useState(false)
  const handleCheckLink = () => {
    if (id && !loading) {
      setLoading(true)
      checkLinkProject(id).then((res) => {
        if (res?.data) {
          histories.push(`/project-list/editor/${res?.data?.id}`)
        } else {
          onClick()
        }
      }).finally(() => {
        setLoading(false)
      })
    }
  }

  return (
    <Button
      {...props}
      loading={loading}
      onClick={handleCheckLink}
    />
  )
}

export default LinkButton
