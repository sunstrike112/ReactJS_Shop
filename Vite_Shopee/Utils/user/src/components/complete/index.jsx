/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Tooltip } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { COMPLETE_ICON } from '../../assets'
import { TAB_KEYS } from '../../constants'
import { styledTooltipUsersInteractive } from '../dislike'
import { TextNormal } from '../text'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding-left: 2px;
  &.active {
    background-color: ${({ theme }) => theme.check_complete_bg};
    border: 1px solid ${({ theme }) => theme.check_complete_border};
    border-radius: 50px;
  }

  .button__like {
    display: flex;
    align-items: center;
    margin-right: 4px;
    padding: 0;
    border: unset;
    background: transparent;
  }

  .total {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`

const Complete = ({
  totalComplete,
  onClick,
  onHover,
  isComplete,
  isLiking,
  renderUsersCheckComplete,
  onOpenUsersActive
}) => {
  const handleSubmit = () => {
    if (isLiking) return // Prevent user continue click like when calling API
    onClick()
  }

  const handleClickLike = () => {
    onOpenUsersActive({ tabActive: TAB_KEYS.CHECK_COMPLETE })
  }

  return (
    <Wrapper className={`complete-action ${isComplete ? 'active' : ''}`}>
      <Button className="button__like" onClick={handleSubmit}>
        <COMPLETE_ICON />
      </Button>
      {totalComplete
        ? (
          <Tooltip
            overlayInnerStyle={styledTooltipUsersInteractive}
            destroyTooltipOnHide
            placement="topLeft"
            title={renderUsersCheckComplete}
          >
            <TextNormal
              className="total"
              color="text_secondary"
              onMouseEnter={onHover}
              onClick={handleClickLike}
            >
              {totalComplete}
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

export default Complete
