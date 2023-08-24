import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../themes'

export const Wrapper = styled.div`
  .login__title {
    text-align: center;
    margin-bottom: 8px;
  }
`

export const Body = styled.div`
  width: 620px;
  padding: 48px 52px;
  background: ${({ theme }) => theme.white};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.grey_blur};
  @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 90vw;
  }
  .ant-form-item-label {
    padding: 0;
    label {
      color: ${({ theme }) => theme.black};
      font-size: ${({ theme }) => theme.size_14};
      margin-bottom: 12px;
      font-weight: ${({ theme }) => theme.fw_600};
    }
  }
  .register-label {
    align-self: top;
    padding: 0;
    color: ${({ theme }) => theme.black};
    font-size: ${({ theme }) => theme.size_14};
    margin-top: 8px;
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
    // border-color: #d3d3d3;

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
    margin-top: 24px;
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
