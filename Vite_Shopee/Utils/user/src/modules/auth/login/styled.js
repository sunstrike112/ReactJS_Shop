import { NavLink as LinkPage } from 'react-router-dom'
import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../themes'

export const Wrapper = styled.div`
  .login__title {
    text-align: center;
    margin-bottom: 12px;
  }

  .register-label {
    margin-bottom: 5px;
  }

  .maintain__warning {
    margin-top: 50px;
  }
`

export const NavLink = styled(LinkPage)`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
  font-weight: 500;
  text-decoration: underline;
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.green};
  }
`

export const Body = styled.div`
  width: 620px;
  padding: 52px;
  background: ${({ theme }) => theme.white};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.grey_blur};
  margin-bottom: 50px;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 90vw;
    // box-shadow: ${({ theme }) => theme.bg_shadow};
  }
  .forgot__pass {

    a {
      display: block;
      width: max-content;
      margin: auto;
      padding: 0;

      p {
        padding-top: 10px;
      }
    }
  }
  .submit-button {
    border-radius: 6px;
    padding: 15px 60px;
    margin: 0 auto;
    &:disabled {
      background: #cccccc;
    }
  }
`

export const FooterLogin = styled.div`
  display: flex;
  background: ${({ theme }) => theme.white};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid ${({ theme }) => theme.grey_blur};
`

export const SocialItem = styled.div`
  flex: 1;
  padding: 18px 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    flex-direction: column;
    padding: 18px 0;
  }
  &:hover {
    background: ${({ theme }) => theme.white_blue};
  }
  &:first-child {
    border-right: 1px solid ${({ theme }) => theme.grey_blur};
  }
  .icon__social {
    margin-right: 8px;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
      margin-bottom: 8px;
    }
  }
`

export const NoticeMaintain = styled.div`
  margin: 0 auto;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.bd_yellow};
  background: ${({ theme }) => theme.bg_yellow_white_low};
  border-radius: 4px;
  margin-bottom: 20px;
  max-width: 620px;
`

export const StyledLoginIdWrapper = styled.div`
  display: flex;
  gap: .3rem;

  .horizontalLine {
    margin-top: .7rem;
  }

  .companyCode {
    width: 25%;
  }

  .account {
    flex: 1;
  }
`
