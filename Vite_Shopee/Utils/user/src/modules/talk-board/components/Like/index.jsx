import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { ICON_TALK_BOARD_LIKE, ICON_TALK_BOARD_UNLIKE } from '../../../../assets'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor:pointer;
  margin-right: 14px;
`

const VoteNumber = styled.span`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
  margin-left: 6px;
`

const Like = ({
  voteNumber,
  voteAction,
  isLike,
  courseId,
  courseUnitId,
  typeUnit,
  item,
  isLiking,
  ...rest
}) => {
  const handleVote = () => {
    if (isLiking) return // Prevent user continue click like when calling API
    if (courseId && courseUnitId && typeUnit) voteAction({ courseId, courseUnitId, typeUnit, item })
    else voteAction()
  }

  return (
    <Wrapper {...rest}>
      {isLike
        ? <ICON_TALK_BOARD_LIKE onClick={handleVote} />
        : <ICON_TALK_BOARD_UNLIKE onClick={handleVote} />}
      <VoteNumber>{voteNumber || 0}</VoteNumber>
    </Wrapper>
  )
}

Like.propTypes = {
  voteNumber: PropTypes.number,
  voteAction: PropTypes.func,
  isLike: PropTypes.number,
  courseId: PropTypes.string,
  courseUnitId: PropTypes.number,
  typeUnit: PropTypes.string,
  item: PropTypes.object,
  isLiking: PropTypes.bool
}

export default Like
