import PropTypes from 'prop-types'
import React, { memo } from 'react'
import styled from 'styled-components'
import { ICON_TALK_BOARD_CMT, ICON_TALK_BOARD_CMT_UNREAD } from '../../assets'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CountComment = styled.span`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
  margin-left: 6px;
`

const Comment = ({ countComment, hasCommentUnread, ...rest }) => (
  <Wrapper {...rest}>
    {hasCommentUnread ? <ICON_TALK_BOARD_CMT_UNREAD /> : <ICON_TALK_BOARD_CMT />}
    <CountComment>{countComment || 0}</CountComment>
  </Wrapper>
)

Comment.propTypes = {
  countComment: PropTypes.number,
  hasCommentUnread: PropTypes.bool
}

export default memo(Comment)
