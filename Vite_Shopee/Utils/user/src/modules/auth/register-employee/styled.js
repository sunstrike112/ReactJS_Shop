import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../themes'

export const Wrapper = styled.div`
  .login__title {
    text-align: center;
    margin-bottom: 8px;
  }
`

export const Body = styled.div`
  width: 700px;
  padding: 48px 52px;
  background: ${({ theme }) => theme.white};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.grey_blur};
  @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 90vw;
  }

  .register-label {
    align-self: top;
    padding: 0;
    color: ${({ theme }) => theme.black};
    font-size: ${({ theme }) => theme.size_14};
    margin-top: 12px;
    font-weight: ${({ theme }) => theme.fw_600};

    .register-label--required {
      color: ${({ theme }) => theme.text_danger};
    }
  }
  .input {
    min-height: 44px;
    border-radius: 4px;
    outline: none;
    box-shadow: none;

    &:focus {
      border-color: ${({ theme }) => theme.green};
    }
    &:hover {
      border-color: ${({ theme }) => theme.green};
    }
  }
  .ant-input-password {
    height: 44px;
    padding: 0 11px;
    border-radius: 4px;
    box-shadow: none;
    &:focus {
      border-color: ${({ theme }) => theme.green};
    }
    &:hover {
      border-color: ${({ theme }) => theme.green};
    }
  }
  .ant-input-affix-wrapper-focused {
    border-color: ${({ theme }) => theme.green};
  }

  .spin-button-submit {
    margin-top: 10px;
  }
  button {
    width: 244px;
    font-size: 15px;
    border-radius: 6px;
    padding: 14px 0;

    p {
      margin: auto !important;
    }

    &:disabled {
      background: #cccccc !important;
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
  padding: 18px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.white_blue};
  }
  &:first-child {
    border-right: 1px solid ${({ theme }) => theme.grey_blur};
  }
  .icon__social {
    margin-right: 8px;
  }
`

export const TermsLink = styled.a`
  color: ${({ theme }) => theme.primary_btn};
`

export const TermsCheckboxWrapper = styled.div`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${({ theme }) => theme.primary_btn};
    border-color: ${({ theme }) => theme.primary_btn};
  }
`

export const MessageBox = styled.div`
  background: #f5f5f8;
  border-radius: 8px;
  padding: 24px 20px;
  margin-bottom: 40px;
  p {
    text-align: left !important;
    margin-bottom: 0 !important;
  }
`

export const PlanPopup = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
`
