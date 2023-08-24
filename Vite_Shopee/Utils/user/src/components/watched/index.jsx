import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { ICON_WATCH } from '../../assets'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const VoteNumber = styled.span`
  color: ${({ theme }) => theme.black};
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  margin-left: 5px;
`

const Watched = ({ voteNumber }) => (
  <Wrapper>
    <ICON_WATCH />
    <VoteNumber>{voteNumber || 0}</VoteNumber>
  </Wrapper>
)

Watched.propTypes = {
  voteNumber: PropTypes.number
}

export default Watched
