/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import styled from 'styled-components'
import { ICON_STAR, ICON_STAR_ACTIVE } from '../../assets'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

const BookMark = ({ active, isLoading, action }) => {
  const handleVote = () => {
    if (isLoading) return // Prevent click if calling API
    action()
  }

  return (
    <Wrapper>
      {active ? <ICON_STAR_ACTIVE onClick={handleVote} /> : <ICON_STAR onClick={handleVote} />}
    </Wrapper>
  )
}
BookMark.propTypes = {
  active: PropTypes.bool,
  isLoading: PropTypes.bool,
  action: PropTypes.func
}

export default memo(BookMark)
