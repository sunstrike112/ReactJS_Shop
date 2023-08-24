/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { Button, Popconfirm, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { DeleteOutlined } from '@ant-design/icons'
import Text from '../text'

const Wrapper = styled(Button)`
	background-color: ${({ backgroundcolor, theme, disabled }) => (disabled ? theme.grey : theme[backgroundcolor])} !important;
	padding: 8px;
	width: ${({ width }) => `${width}px` || 'max-content'};
	border-radius: 4px;
	border: ${({ theme, border }) => (border ? `1px solid ${theme[border]}` : 'none')};
	cursor: pointer;
	transition: opacity 0.2s;
	margin: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	outline: none;

	&:active {
		opacity: 0.7;
		border: ${({ border }) => (border ? `1px solid ${border}` : 'none')};
	}

	&:focus {
		opacity: 0.7;
		border: ${({ theme, border }) => (border ? `1px solid ${border}` : [theme.white])};
	}

	&.disabled {
		cursor: auto;
		opacity: 0.5;
	}
`
const SocialWrapper = styled(Wrapper)`
	width: 165px;
`
const NormalWrapper = styled(Wrapper)`
	height: 45px;
	padding: 0 15px;
	background-color: ${({ theme, backround }) => theme[backround]};
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: ${({ margin }) => margin || 0};
	outline: none;

	span {
		color: ${({ theme, color }) => theme[color]};
	}

	.icon {
		stroke: ${({ theme, stroke }) => theme[stroke] || 'none'};
		fill: ${({ theme, fill }) => theme[fill] || 'none'};
		margin-right: 6px;
	}

	&:focus {
		opacity: 0.7;
		background-color: ${({ theme, backround }) => theme[backround]};
	}

	&:hover {
		opacity: 0.8;
		background-color: ${({ theme, backround }) => theme[backround]};
	}
`
const IconWrapper = styled.div`
	background-color: ${({ theme, background }) => theme[background] || theme.transparent};
	cursor: pointer;
	display: flex;
	transition: opacity 0.2s;
	margin: ${({ margin }) => margin || '0px'};
	padding: ${({ padding }) => padding || '0px'};
	flex-direction: ${({ direction }) => direction || 'row'};
	align-items: center;
	justify-content: center;
	border-radius: ${({ borderRadius }) => borderRadius || '0'};
	&:active {
		opacity: 0.7;
	}

	&.disabled {
		cursor: auto;
		opacity: 0.5;
	}
`

const LinkWrapper = styled(Wrapper)`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.white};
  border: ${({ theme, border }) => (border ? `1px solid ${theme[border]}` : 'none')};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: ${({ margin }) => margin || 0};
  outline: none;
  border: 1px solid;

  &:focus {
    opacity: 0.7;
    background-color: ${({ theme, backround }) => theme[backround]};
  }

  &:hover {
    color: ${({ theme }) => theme.blue};
    transition: color 0.3s;
  }

  p {
    &:hover {
      color: ${({ theme }) => theme.blue};
      transition: color 0.3s;
    }
  }
  .anticon {
    margin-right: 10px;
  }
`

const LinkButton = ({
  title,
  border = 'grey',
  fontSize = 'size_14',
  fontWeight = 'fw_400',
  color = 'text_primary',
  renderIcon = () => null,
  ...rest
}) => (
  <LinkWrapper border={border} {...rest}>
    {renderIcon()}
    <Text.button fontSize={fontSize} fontWeight={fontWeight} color={color}>
      {title}
    </Text.button>
  </LinkWrapper>
)

const SubmitButton = ({
  title,
  disabled = false,
  backgroundcolor = 'blueHight',
  border,
  fontSize,
  fontWeight,
  color,
  renderIcon = () => null,
  ...rest
}) => (
  <Wrapper
    border={border}
    backgroundcolor={backgroundcolor}
    disabled={disabled}
    htmlType="submit"
    {...rest}
  >
    {renderIcon()}
    <Text.button fontSize={fontSize} fontWeight={fontWeight} color={color}>
      {title}
    </Text.button>
  </Wrapper>
)

const PrimaryButton = ({
  title,
  onClick,
  disabled = false,
  backgroundcolor = 'primary',
  border,
  fontSize,
  fontWeight,
  color,
  ...rest
}) => (
  <Wrapper
    width={380}
    border={border}
    backgroundcolor={backgroundcolor}
    disabled={disabled}
    onClick={onClick}
    {...rest}
  >
    <Text.button fontSize={fontSize} fontWeight={fontWeight} color={color}>
      {title}
    </Text.button>
  </Wrapper>
)

const SocialButton = ({
  title,
  onClick,
  disabled = false,
  backgroundcolor = 'fb_color',
  color,
  ...rest
}) => (
  <SocialWrapper
    backgroundcolor={backgroundcolor}
    disabled={disabled}
    onClick={onClick}
    {...rest}
  >
    <Text.socialTitle color={color}>{title}</Text.socialTitle>
  </SocialWrapper>
)

const NormalButton = ({
  title = '',
  onClick,
  disabled = false,
  backround = 'fb_color',
  color,
  fontSize,
  children,
  ...rest
}) => (
  <NormalWrapper
    backround={backround}
    disabled={disabled}
    onClick={onClick}
    {...rest}
  >
    {title && (
      <Text.primary color={color} fontSize={fontSize}>
        {title}
      </Text.primary>
    )}
    {!title && children}
  </NormalWrapper>
)

const IconButton = ({
  fontSize = 'size_12',
  color,
  title = '',
  onClick,
  margin,
  padding,
  direction,
  background,
  borderRadius,
  renderIcon = () => null,
  ...rest
}) => (
  <IconWrapper
    direction={direction}
    onClick={onClick}
    padding={padding}
    margin={margin}
    background={background}
    borderRadius={borderRadius}
    {...rest}
  >
    {renderIcon()}
    {title && (
      <Text.textIcon color={color} fontSize={fontSize}>
        {title}
      </Text.textIcon>
    )}
  </IconWrapper>
)

const PopupButton = React.forwardRef(({
  icon,
  titlePopup,
  textButton,
  disabled,
  typeButton = 'primary',
  size = 'large',
  isLoading,
  okText = 'common:change',
  refElement,
  cancelText = 'common:cancel',
  ...rest
}) => {
  const { t } = useTranslation()
  const ComponentIcon = icon
  return (
    <Popconfirm
      title={titlePopup}
      disabled={disabled}
      getPopupContainer={(trigger) => trigger?.parentElement}
      okText={t(okText)}
      cancelText={t(cancelText)}
      {...rest}
    >
      <Button type={typeButton} size={size} disabled={disabled} loading={isLoading} ref={refElement} htmlType="submit">
        {icon && <ComponentIcon />}
        {textButton}
      </Button>
    </Popconfirm>
  )
})

const TooltipButton = ({ icon, onClick, disabled, ...rest }) => {
  const ComponentIcon = icon
  return (
    <Tooltip {...rest}>
      <Button
        type="text"
        icon={<ComponentIcon />}
        onClick={onClick}
        disabled={disabled}
      />
    </Tooltip>
  )
}

const DeleteButton = ({ popconfirmProps, buttonProps }) => (
  <Popconfirm
    overlayClassName="tooltip-actions-left"
    placement="topLeft"
    align="center"
    disabled={false}
    {...popconfirmProps}
  >
    <Button type="text" danger icon={<DeleteOutlined />} {...buttonProps} />
  </Popconfirm>
)

export {
  PrimaryButton,
  SocialButton,
  IconButton,
  NormalButton,
  SubmitButton,
  LinkButton,
  PopupButton,
  TooltipButton,
  DeleteButton
}
