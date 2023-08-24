/* eslint-disable react/prop-types */
import { Button, Tooltip } from 'antd'
import React, { memo } from 'react'
import styled from 'styled-components'
import { LIKE_ACTIVE_ICON, LIKE_ICON } from '../../assets'
import { TAB_KEYS } from '../../constants'
import { styledTooltipUsersInteractive } from '../dislike'
import { TextNormal } from '../text'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .button__like {
    display: flex;
    align-items: center;
    margin-right: 4px;
    padding: 0;
    border: unset;
    background: transparent;
  }

  .total {
    cursor: ${({ isOpenUserActive }) => (isOpenUserActive ? 'pointer' : 'default')};
    &:hover {
      text-decoration: ${({ isOpenUserActive }) => (isOpenUserActive ? 'underline' : 'normal')};
    }
  }
`

const Like = ({
  totalLike,
  onClick,
  onHover,
  isLike,
  isLiking,
  renderUsersLike,
  onOpenUsersActive
}) => {
  const handleSubmit = () => {
    if (isLiking) return // Prevent user continue click like when calling API
    onClick()
  }

  const handleClickLike = () => {
    if (!onOpenUsersActive) return
    onOpenUsersActive({ tabActive: TAB_KEYS.LIKE })
  }

  return (
    <Wrapper isOpenUserActive={Boolean(onOpenUsersActive)}>
      <Button className="button__like" onClick={handleSubmit}>
        {isLike
          ? <LIKE_ACTIVE_ICON />
          : <LIKE_ICON />}
      </Button>
      {totalLike
        ? (
          <Tooltip
            overlayInnerStyle={styledTooltipUsersInteractive}
            destroyTooltipOnHide
            placement="topLeft"
            title={renderUsersLike}
          >
            <TextNormal
              className="total"
              color="text_secondary"
              onMouseEnter={onHover ? () => onHover() : null}
              onClick={handleClickLike}
            >
              {totalLike}
            </TextNormal>
          </Tooltip>
        )
        : (
          <TextNormal
            className="total"
            color="text_secondary"
            onClick={handleClickLike}
          >
            0
          </TextNormal>
        )}

    </Wrapper>
  )
}

export default memo(Like)
