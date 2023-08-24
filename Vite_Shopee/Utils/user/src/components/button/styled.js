import styled from 'styled-components'
import { Button } from 'antd'
import { MEDIA_WIDTHS } from '../../themes'

export const Wrapper = styled(Button)`
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  display: flex;
  height: 40px;
  cursor: pointer;
  color: ${({ theme }) => theme.white};
  font-size: 14px;
  padding: 10px 40px;
  font-weight: 400;
  text-align: center;
  outline: 0;
  height: auto;
  border: none;
  letter-spacing: 0;

  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    padding: 10px 20px;
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

  &.disabled {
    cursor: auto;
    opacity: 0.5;
  }
`
export const PrimaryWrapper = styled(Wrapper)`
  display: flex;
  background: ${({ theme, background }) => theme[background] || theme.primary_btn};
  color: ${({ theme }) => theme.white};
  border-radius: ${({ borderradius }) => borderradius && `${borderradius}px`};

  &:hover {
    background: ${({ theme, background }) => theme[background] || theme.primary_btn};
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

export const WarningWrapper = styled(Wrapper)`
  background: ${({ theme }) => theme.yellow};
  border: none;
  color: ${({ theme }) => theme.white};

  &:hover {
    background: ${({ theme }) => theme.yellow};
    border: none;
  }

  &:active {
    background: ${({ theme }) => theme.yellow};
    border: none;
  }

  &:focus {
    background: ${({ theme }) => theme.yellow};
    border: none;
  }
`

export const SecondaryWrapper = styled(Wrapper)`
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

export const OutlineWrapper = styled(Wrapper)`
  display: flex;
  border: 1px solid ${({ theme }) => theme.primary_btn};
  border-radius: ${({ borderradius }) => borderradius && `${borderradius}px`};

  &:hover {
    background: ${({ theme }) => theme.transparent};
    border: 1px solid ${({ theme }) => theme.primary_btn};
  }

  &:active {
    background: ${({ theme }) => theme.transparent};
    border: 1px solid ${({ theme }) => theme.primary_btn};
  }

  &:focus {
    background: ${({ theme }) => theme.transparent};
    border: 1px solid ${({ theme }) => theme.primary_btn};
  }
`

export const OutlineDeleteWrapper = styled(Wrapper)`
  display: flex;
  border: 1px solid ${({ theme }) => theme.error};
  border-radius: ${({ borderradius }) => borderradius && `${borderradius}px`};
  padding: 5px 20px;

  &:hover {
    background: ${({ theme }) => theme.transparent};
    border: 1px solid ${({ theme }) => theme.error};
  }

  &:active {
    background: ${({ theme }) => theme.transparent};
    border: 1px solid ${({ theme }) => theme.error};
  }

  &:focus {
    background: ${({ theme }) => theme.transparent};
    border: 1px solid ${({ theme }) => theme.error};
  }
`

export const OutlineLightWrapper = styled(Wrapper)`
  border: 1px solid ${({ theme }) => theme.grey_blur};

  &:hover {
    background: ${({ theme }) => theme.transparent};
    border: 1px solid ${({ theme }) => theme.grey_blur};
  }

  &:active {
    background: ${({ theme }) => theme.transparent};
    border: 1px solid ${({ theme }) => theme.grey_blur};
  }

  &:focus {
    background: ${({ theme }) => theme.transparent};
    border: 1px solid ${({ theme }) => theme.grey_blur};
  }
`

export const SocialWrapper = styled(Wrapper)`
  width: 165px;
  background: ${({ theme }) => theme.text_hight_light};
`
export const NotifyWrapper = styled(Wrapper)`
  width: 152px;
  justify-content: center;
  align-items: center;
  height: 36px;
  border-radius: 6px !important;
  border: 1px solid ${({ theme }) => theme.green};
  background: ${({ theme }) => theme.green_light};
  &:hover {
    background: ${({ theme }) => theme.green_light};
  }

  &:active {
    background: ${({ theme }) => theme.green_light};
  }

  &:focus {
    background: ${({ theme }) => theme.green_light};
  }
`
export const CardWrapper = styled(Wrapper)`
  border-radius: 6px !important;
  padding: 8px 28px;
  background: ${({ backgroundcolor, theme }) => theme[backgroundcolor] || theme.green_light};
  &:hover {
    background: ${({ backgroundcolor, theme }) => theme[backgroundcolor] || theme.green_light};
  }

  &:active {
    background: ${({ backgroundcolor, theme }) => theme[backgroundcolor] || theme.green_light};
  }

  &:focus {
    background: ${({ backgroundColor, theme }) => theme[backgroundColor] || theme.green_light};
  }
`

export const NormalWrapper = styled(Wrapper)`
  border-radius: 6px;
  height: 45px;
  padding: 0 15px;
  border: 1px solid ${({ theme }) => theme.primary_btn};
  background: ${({ theme }) => theme.primary_btn};
  color: ${({ theme }) => theme.white};

  &:focus {
    border: 1px solid ${({ theme }) => theme.primary_btn};
    background: ${({ theme }) => theme.primary_btn};
    color: ${({ theme }) => theme.white};
    outline: none;
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.primary_btn};
    background: ${({ theme }) => theme.primary_btn};
    color: ${({ theme }) => theme.white};
  }
`
export const IconWrapper = styled.div`
  background-color: ${({ theme }) => theme.transparent};

  cursor: pointer;
  display: flex;
  user-select: none;
  transition: opacity 0.2s;
  padding: 0;
  margin: ${({ margin }) => margin || '0px'};
  flex-direction: ${({ direction }) => direction || 'row'};
  align-items: center;
  justify-content: center;
  height: 48px;
  &:active {
    opacity: 0.7;
  }

  &.disabled {
    cursor: auto;
    opacity: 0.5;
  }
`

export const IconWrapperBorder = styled.div`
  display: flex;
  align-items: center;
  padding: 0 25px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border: 1px solid ${({ theme }) => theme.text_primary};
  margin-left: 4px;
  line-height: 48px;
  border-radius: 48px;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }

  &.disabled {
    cursor: auto;
    opacity: 0.5;
  }
`
