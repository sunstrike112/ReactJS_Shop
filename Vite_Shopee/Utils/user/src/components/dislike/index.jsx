/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Tooltip } from 'antd'
import React, { memo } from 'react'
import styled from 'styled-components'
import { ICON_TALK_BOARD_ACTIVE_UNLIKE, ICON_TALK_BOARD_UNLIKE } from '../../assets'
import { TextNormal } from '../text'
import { TAB_KEYS } from '../../constants'

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

export const styledTooltipUsersInteractive = {
  maxHeight: 200,
  overflowY: 'auto'
}

const DisLike = ({
  totalDislike,
  onClick,
  onHover,
  isDislike,
  isDisliking,
  renderUsersDislike,
  onOpenUsersActive
}) => {
  const handleSubmit = () => {
    if (isDisliking) return // Prevent user continue click like when calling API
    onClick()
  }

  const handleClickDisLike = () => {
    if (!onOpenUsersActive) return
    onOpenUsersActive({ tabActive: TAB_KEYS.DIS_LIKE })
  }

  return (
    <Wrapper isOpenUserActive={Boolean(onOpenUsersActive)}>
      <Button className="button__like" onClick={handleSubmit}>
        {isDislike
          ? <ICON_TALK_BOARD_ACTIVE_UNLIKE />
          : <ICON_TALK_BOARD_UNLIKE />}
      </Button>
      {totalDislike
        ? (
          <Tooltip
            overlayInnerStyle={styledTooltipUsersInteractive}
            destroyTooltipOnHide
            placement="topLeft"
            title={renderUsersDislike}
          >
            <TextNormal
              className="total"
              color="text_secondary"
              onMouseEnter={onHover ? () => onHover() : null}
              onClick={handleClickDisLike}
            >
              {totalDislike}
            </TextNormal>
          </Tooltip>
        )
        : (
          <TextNormal
            className="total"
            color="text_secondary"
            onClick={handleClickDisLike}
          >
            0
          </TextNormal>
        )}
    </Wrapper>
  )
}

export default memo(DisLike)
