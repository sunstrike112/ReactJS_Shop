/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, Tooltip } from 'antd'
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons'
import { Wrapper } from './styled'

const LikeComment = ({
  content,
  countNumber,
  voteNumber,
  isLike,
  title,
  likeTopic
}) => {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [action, setAction] = useState(null)

  const like = () => {
    setLikes(1)
    setDislikes(0)
    setAction('liked')
  }

  const dislike = () => {
    setLikes(0)
    setDislikes(1)
    setAction('disliked')
  }

  return (
    <Wrapper>
      <Tooltip key="comment-basic-like" title="Like">
        <Button onClick={like}>
          {action === 'liked' ? <LikeFilled /> : <LikeOutlined />}
          <span className="comment-action">{likes}</span>
        </Button>
      </Tooltip>
      <Tooltip key="comment-basic-dislike" title="Dislike">
        <Button onClick={dislike}>
          {action === 'disliked' ? <DislikeFilled /> : <DislikeOutlined />}
          <span className="comment-action">{dislikes}</span>
        </Button>
      </Tooltip>
      {likeTopic && <p>{likeTopic} likes</p>}
    </Wrapper>
  )
}

export default LikeComment
