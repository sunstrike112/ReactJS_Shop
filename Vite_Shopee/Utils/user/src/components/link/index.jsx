/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { TextSocial, TextNormal } from '../text'
import { getFontSize } from '../../utils'
import { MEDIA_WIDTHS } from '../../themes'

export const InternalLink = styled(Link)`
  text-decoration: none;
  border-radius: 50px;
  height: 40px;
  cursor: pointer;
  color: ${({ color, theme }) => theme[color] || theme.white};
  font-size: ${({ fontSize }) => getFontSize(fontSize) || '14px'};
  font-weight: ${({ fontWeight, theme }) => theme[fontWeight] || '400'};
  padding: 10px 20px;
  text-align: center;
  outline: 0;
  height: auto;
  border: none;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    font-size: ${({ fontSize }) => getFontSize(fontSize, MEDIA_WIDTHS.upToLarge) || '14px'};
  }
  @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    font-size: ${({ fontSize }) => getFontSize(fontSize, MEDIA_WIDTHS.upToMedium) || '14px'};
  }
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    font-size: ${({ fontSize }) => getFontSize(fontSize, MEDIA_WIDTHS.upToExtraSmall) || '14px'};
  }
  &:hover {
    opacity: 0.8;
    border: none;
  }

  &:active {
    opacity: 0.7;
    border: none;
  }

  &:focus {
    opacity: 1;
    border: none;
  }
`

export const LinkUnder = styled(InternalLink)`
  p {
    transition: 0.2;
    text-decoration: underline;
    &:hover {
      color: ${({ theme }) => theme.green};
    }
  }
`

export const PrimaryButtonLink = styled(InternalLink)`
  background: ${({ theme }) => theme.primary_btn};
  color: ${({ theme }) => theme.white};

  &:hover {
    background: ${({ theme }) => theme.primary_btn};
    color: ${({ theme }) => theme.white};
  }

  &:active {
    background: ${({ theme }) => theme.primary_btn};
  }

  &:focus {
    background: ${({ theme }) => theme.primary_btn};
    color: ${({ theme }) => theme.white};
  }
`
export const SecondaryButtonLink = styled(InternalLink)`
  background-color: ${({ theme }) => theme.secondary_btn};
  color: ${({ theme }) => theme.white};

  &:hover {
    background-color: ${({ theme }) => theme.secondary_btn};
    color: ${({ theme }) => theme.white};
  }

  &:active {
    background-color: ${({ theme }) => theme.secondary_btn};
    color: ${({ theme }) => theme.white};
  }

  &:focus {
    background-color: ${({ theme }) => theme.secondary_btn};
    color: ${({ theme }) => theme.white};
  }
`

export const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

export const LinkIcon = ({
  Icon,
  margin,
  direction,
  color,
  title = '',
  fontSize = 'size_12',
  src = '',
  to,
  ...rest
}) => (
  <InternalLink to={to} {...rest}>
    <img src={src} alt="" />
    {title && (
      <TextSocial color={color} fontSize={fontSize}>
        {title}
      </TextSocial>
    )}
  </InternalLink>
)

export const UnderlineLink = ({
  color,
  title = '',
  fontSize = 'size_14',
  fontWeight = 'fw500',
  to,
  ...rest
}) => (
  <LinkUnder to={to} {...rest}>
    <TextNormal color={color} fontSize={fontSize} fontWeight={fontWeight}>
      {title}
    </TextNormal>
  </LinkUnder>
)

export const LinkNormal = ({ title, to, fontSize, fontWeight, color, ...rest }) => (
  <InternalLink fontSize={fontSize} fontWeight={fontWeight} to={to} color={color} {...rest}>
    {title}
  </InternalLink>
)
