/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'
import styled from 'styled-components'

const Content = styled.div`
	white-space: break-spaces;

	p {
		margin-bottom: 0;

		&.oneline {
			overflow: hidden;
			word-wrap: break-word;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}
		&.ellipsis {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
`

const TooltipCustom = ({
  text,
  placement = 'bottom',
  overlayInnerStyle,
  isOneLine = false,
  isEllipsis = false,
  ...rest
}) => (
  <Tooltip
    overlayStyle={{ maxWidth: '300px' }}
    trigger="hover|click"
    placement={placement}
    arrowPointAtCenter
    title={() => <p>{text}</p>}
    overlayInnerStyle={{
      overflow: 'auto',
      maxHeight: '50vh',
      whiteSpace: 'break-spaces',
      ...overlayInnerStyle
    }}
    {...rest}
  >
    <Content>
      <p className={`${isOneLine ? 'oneline' : ''} ${isEllipsis ? 'ellipsis' : ''}`}>
        {text}
      </p>
    </Content>
  </Tooltip>
)
TooltipCustom.propTypes = {
  text: PropTypes.any // string or number
}

export default TooltipCustom
