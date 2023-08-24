import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Clickabke from '../clickable'
import { TextNormal } from '../text'
import { Divider, NumberCourse, StyledWrapper } from './styled'

const TabBar = ({ tabs, balance, currentTab, onChange }) => (
  <StyledWrapper className={classnames({ balance })}>
    {tabs.map((tab) => (
      <Clickabke
        key={tab.key}
        className={classnames('tab-item', { active: currentTab === tab.key })}
        onClick={() => onChange(tab)}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TextNormal style={{ fontSize: 20 }}>{tab.name}</TextNormal>
          <NumberCourse>
            <TextNormal style={{ fontSize: 12 }}>{tab.numberCourse}</TextNormal>
          </NumberCourse>
        </div>
        {currentTab === tab.key && <Divider />}
      </Clickabke>
    ))}
  </StyledWrapper>
)
TabBar.propTypes = {
  tabs: PropTypes.array,
  currentTab: PropTypes.any,
  onChange: PropTypes.func,
  balance: PropTypes.bool
}

export default TabBar
