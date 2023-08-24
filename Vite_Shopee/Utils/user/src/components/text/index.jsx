/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../themes'
import { convertUrlToHyperLink, getFontSize } from '../../utils'

const Wrapper = styled.p`
  color: ${({ color, theme }) => theme[color]};
  font-weight: ${({ fontWeight, theme }) => theme[fontWeight] || '400'};
  font-size: ${({ fontSize }) => getFontSize(fontSize) || '14px'};
  padding: 0;
  margin: 0;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    font-size: ${({ fontSize }) => getFontSize(fontSize, MEDIA_WIDTHS.upToLarge) || '14px'};
  }
  @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    font-size: ${({ fontSize }) => getFontSize(fontSize, MEDIA_WIDTHS.upToMedium) || '14px'};
  }
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    font-size: ${({ fontSize }) => getFontSize(fontSize, MEDIA_WIDTHS.upToExtraSmall) || '14px'};
  }
`
const CategoryWrapper = styled.span`
  color: ${({ color, theme }) => theme[color]};
  font-weight: ${({ fontWeight, theme }) => theme[fontWeight] || '400'};
  font-size: ${({ fontSize, theme }) => theme[fontSize] || '14px'};
  padding: 0;
  margin: 0;
`

export const TextPrimary = forwardRef(({ fontSize = 'size_14', fontWeight = 'fw400', size, ...rest }, ref) => (
  <Wrapper color="text_primary" fontSize={fontSize} size={size} fontWeight={fontWeight} {...rest} ref={ref} />
))

export const TextSecondary = forwardRef(({ fontSize = 'size_14', fontWeight = 'fw400', ...rest }, ref) => (
  <Wrapper ref={ref} color="text_secondary" fontSize={fontSize} fontWeight={fontWeight} {...rest} />
))

export const TextNormal = forwardRef(({
  fontSize = 'size_14',
  fontWeight = 'fw400',
  color = 'text_primary',
  ...rest
}, ref) => <Wrapper ref={ref} color={color} fontSize={fontSize} fontWeight={fontWeight} {...rest} />)

export const TextSocial = ({ fontSize = 'size_16', fontWeight = 'fw400', color = 'white', ...rest }) => (
  <Wrapper color={color} fontSize={fontSize} fontWeight={fontWeight} {...rest} />
)

export const TextCategory = ({ fontSize = 'size_16', fontWeight = 'fw400', color = 'white', ...rest }) => (
  <CategoryWrapper color={color} fontSize={fontSize} fontWeight={fontWeight} {...rest} />
)

export const TextError = ({ fontSize = 'size_14', fontWeight = 'fw400', ...rest }) => (
  <Wrapper color="error" fontSize={fontSize} fontWeight={fontWeight} {...rest} />
)

export const DisplayHyperLink = ({ html }) => <div dangerouslySetInnerHTML={{ __html: convertUrlToHyperLink(html) }} />
