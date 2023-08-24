/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'

const TooltipCustom = ({ text, placement = 'bottom', overlayInnerStyle, ...rest }) => (
  <Tooltip
    overlayStyle={{ maxWidth: '300px' }}
    trigger="hover|click"
    placement={placement}
    arrowPointAtCenter
    title={() => <p>{text}</p>}
    overlayInnerStyle={{ overflow: 'auto', maxHeight: '50vh', whiteSpace: 'break-spaces', ...overlayInnerStyle }}
    {...rest}
  >
    <div style={{ whiteSpace: 'break-spaces' }}>
      <p>{text}</p>
    </div>
  </Tooltip>
)
TooltipCustom.propTypes = {
  text: PropTypes.any // string or number
}

export default TooltipCustom
