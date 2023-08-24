import PropTypes from 'prop-types'
import React, { memo } from 'react'
import styled from 'styled-components'
import { ICON_LIKE, ICON_LIKE_DISABLE } from '../../assets'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor:pointer;
`

const VoteNumber = styled.span`
  color: ${({ theme }) => theme.black};
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  margin-left: 5px;
`

const VoteLike = ({
  voteNumber,
  voteAction,
  isLike,
  courseId,
  courseUnitId,
  typeUnit,
  item,
  isLiking
}) => {
  const handleVote = () => {
    if (isLiking) return // Prevent user continue click like when calling API
    if (courseId && courseUnitId && typeUnit) voteAction({ courseId, courseUnitId, typeUnit, item })
    else voteAction()
  }

  return (
    <Wrapper>
      {isLike
        ? (<ICON_LIKE onClick={handleVote} />)
        : (<ICON_LIKE_DISABLE onClick={handleVote} />)}
      <VoteNumber>{voteNumber || 0}</VoteNumber>
    </Wrapper>
  )
}

VoteLike.propTypes = {
  voteNumber: PropTypes.number,
  voteAction: PropTypes.func,
  isLike: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  courseId: PropTypes.string,
  courseUnitId: PropTypes.number,
  typeUnit: PropTypes.string,
  item: PropTypes.object,
  isLiking: PropTypes.bool
}

export default memo(VoteLike)
