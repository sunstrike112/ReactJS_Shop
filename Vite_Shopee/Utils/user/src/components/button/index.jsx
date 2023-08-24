/* eslint-disable react/prop-types */
import React from 'react'
import { TextNormal, TextSocial, TextPrimary } from '../text'

import {
  OutlineWrapper,
  SecondaryWrapper,
  SocialWrapper,
  IconWrapper,
  IconWrapperBorder,
  PrimaryWrapper,
  WarningWrapper,
  OutlineLightWrapper,
  NotifyWrapper,
  CardWrapper,
  NormalWrapper,
  OutlineDeleteWrapper
} from './styled'

const SubmitButton = ({
  children,
  title,
  onClick,
  disabled = false,
  htmlType = 'submit',
  fontSize = 'size_15',
  fontWeight = 'fw_700',
  color = 'white',
  borderRadius,
  ...rest }) => (
    <PrimaryWrapper disabled={disabled} onClick={onClick} htmlType={htmlType} borderradius={borderRadius} {...rest}>
      {
      children || (
      <TextPrimary
        color={color}
        fontSize={fontSize}
        fontWeight={fontWeight}
      >
        {title}
      </TextPrimary>
      )
    }
    </PrimaryWrapper>
)

const PrimaryButton = ({ title, onClick, disabled = false, fontSize, background, color = 'white', fontWeight, borderRadius, ...rest }) => (
  <PrimaryWrapper disabled={disabled} onClick={onClick} background={background} borderradius={borderRadius} {...rest}>
    <TextPrimary color={color} fontSize={fontSize} fontWeight={fontWeight}>{title}</TextPrimary>
  </PrimaryWrapper>
)

const OutlineButton = ({ title, onClick, disabled = false, borderRadius, ...rest }) => (
  <OutlineWrapper disabled={disabled} backgroundcolor="primary_btn" onClick={onClick} borderradius={borderRadius} {...rest}>
    <TextPrimary color="primary_btn">{title}</TextPrimary>
  </OutlineWrapper>
)

const OutlineDeleteButton = ({ title, onClick, disabled = false, borderRadius, color, ...rest }) => (
  <OutlineDeleteWrapper disabled={disabled} backgroundcolor="error" onClick={onClick} borderradius={borderRadius} {...rest}>
    <TextPrimary color={color}>{title}</TextPrimary>
  </OutlineDeleteWrapper>
)

const OutlineLightButton = ({
  title,
  onClick,
  fontSize = 'size_14',
  fontWeight = 'fw_400',
  disabled = false,
  ...rest }) => (
    <OutlineLightWrapper
      disabled={disabled}
      backgroundcolor="white"
      onClick={onClick}
      {...rest}
    >
      <TextPrimary fontSize={fontSize} fontWeight={fontWeight}>
        {title}
      </TextPrimary>
    </OutlineLightWrapper>
)

const SecondaryButton = ({ title, onClick, disabled = false, ...rest }) => (
  <SecondaryWrapper disabled={disabled} onClick={onClick} {...rest}>
    <TextNormal color="white">{title}</TextNormal>
  </SecondaryWrapper>
)

const WarningButton = ({ title, onClick, disabled = false, ...rest }) => (
  <WarningWrapper disabled={disabled} backgroundcolor="yellow" onClick={onClick} {...rest}>
    <TextPrimary color="white">{title}</TextPrimary>
  </WarningWrapper>
)

const OutlineSecondaryButton = ({ title, onClick, disabled = false, ...rest }) => (
  <OutlineWrapper disabled={disabled} backgroundcolor="secondary_btn" onClick={onClick} {...rest}>
    <TextPrimary>{title}</TextPrimary>
  </OutlineWrapper>
)

const SocialButton = ({ title, onClick, disabled = false, backgroundcolor = 'fb_color', ...rest }) => (
  <SocialWrapper backgroundcolor={backgroundcolor} disabled={disabled} onClick={onClick} {...rest}>
    <TextSocial>{title}</TextSocial>
  </SocialWrapper>
)

const NotifyButton = ({ color, title, onClick, disabled = false, backgroundcolor = 'fb_color', ...rest }) => (
  <NotifyWrapper backgroundcolor={backgroundcolor} disabled={disabled} onClick={onClick} {...rest}>
    <TextSocial color={color}>{title}</TextSocial>
  </NotifyWrapper>
)

const CardButton = ({ backgroundcolor, fontWeight, fontSize, color, title, onClick, disabled = false, ...rest }) => (
  <CardWrapper backgroundcolor={backgroundcolor} disabled={disabled} onClick={onClick} {...rest}>
    <TextSocial fontSize={fontSize} fontWeight={fontWeight} color={color}>{title}</TextSocial>
  </CardWrapper>
)

const IconButton = ({
  fontSize = 'size_12',
  color, title = '',
  src = '',
  onClick,
  margin,
  direction,
  ...rest
}) => (
  <IconWrapper direction={direction} onClick={onClick} margin={margin} {...rest}>
    <img src={src} alt="" />
    {title && <TextPrimary color={color} fontSize={fontSize}>{title}</TextPrimary>}
  </IconWrapper>
)

const IconButtonBorder = ({
  fontSize = 'size_12',
  color, title = '',
  src = '',
  onClick,
  margin,
  direction,
  ...rest
}) => (
  <IconWrapperBorder direction={direction} onClick={onClick} margin={margin} {...rest}>
    <img src={src} alt="" />
    {title && <TextPrimary color={color} fontSize={fontSize}>{title}</TextPrimary>}
  </IconWrapperBorder>
)

const NormalButton = ({ title, onClick, disabled = false, ...rest }) => (
  <NormalWrapper disabled={disabled} onClick={onClick} {...rest}>
    {title}
  </NormalWrapper>
)

export {
  SubmitButton,
  PrimaryButton,
  SocialButton,
  IconButton,
  IconButtonBorder,
  OutlineButton,
  SecondaryButton,
  OutlineSecondaryButton,
  WarningButton,
  OutlineLightButton,
  NotifyButton,
  CardButton,
  NormalButton,
  OutlineDeleteButton
}
