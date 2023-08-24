import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

import Clickabke from '../clickable'
import Text from '../text'

const StyledDiv = styled.div`
  height: 40px;
  background-color: white;
  border-radius: 5px 5px 0 0;
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.text_hight_light};
  
  &.balance {
    .tab-item {
      flex: 1;
      justify-content: center;
    }
  }
  
  .tab-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 7px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    border: 2px solid ${({ theme }) => theme.text_hight_light};
    border-bottom: 0;
    margin-left: 4px;
    
    &::after {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      opacity: 0;
      transition: opacity 0.2s;
    }
    
    &::before {
      position: absolute;
      content: '';
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      opacity: 0;
    }
    
    &.active {
      background-color: ${({ theme }) => theme.text_hight_light};
      p {
        color: ${({ theme }) => theme.white};
      }
    
      &::after, &::before {
        opacity: 1;
      }
    }
  }
`

const TabBar = ({ tabs, balance, currentTab, onChange }) => (
  <StyledDiv className={classnames({ balance })}>
    {tabs.map((tab) => (
      <Clickabke
        key={tab.key}
        className={classnames('tab-item', { active: currentTab === tab.key })}
        onClick={() => onChange(tab)}
      >
        <Text.label>{tab.name}</Text.label>
      </Clickabke>
    ))}
  </StyledDiv>
)
TabBar.propTypes = {
  tabs: PropTypes.array,
  currentTab: PropTypes.any,
  onChange: PropTypes.func,
  balance: PropTypes.bool
}

export default TabBar
