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
`

export const Body = styled.div`
  width: 620px;
  padding: 52px;
  background: ${({ theme }) => theme.white};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.grey_blur};
  @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 90vw;
  }
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    .spin-button-submit {
      width: 100% !important;
      margin-bottom: 10px;
    }
  }
  .spin-button-submit {
    width: 50%;

    .ant-spin-container {
      height: 100%;
    }

    button {
      width: 100% !important;
      height: 100% !important;

      &:disabled {
        background: #cccccc;
      }
    }
  }
  form {
    .box__error {
      margin: 0 16px !important; 
    }
  }
`

export const GuideBox = styled.div`
  padding: 20px;
  margin-bottom: 50px;
  background: ${({ theme }) => theme.grey_mid};
  border-radius: 8px;
  .notice__title {
    margin-bottom: 15px;
    padding: 5px 0;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      background: ${({ theme }) => theme.black};
      height: 1px;
      width: 20%;
    }
  }
  .notice__note {
    margin-top: 15px;
  }
`

export const ListButton = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    flex-direction: column-reverse;
  }
  button {
    border-radius: 6px;
    width: 50%;
    padding: 15px 10px;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
      width: 100%;
    }
    p {
      text-align: center;
      width: 100%;
    }
    &.back__button {
      border: 1px solid ${({ theme }) => theme.green};
      margin-right: 10px;
      p {
        font-weight: 700;
        color: ${({ theme }) => theme.green};
      }
    }
  }
  .ant-form-item {
    width: 50%;
    margin-left: 10px;
    margin-bottom: 0;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
      width: 100%;
      margin-left: 0;
      margin-bottom: 10px;
    }
    button {
      width: 100%;
    }
    .ant-btn[disabled] {
      background: ${({ theme }) => theme.grey_disable} !important;
    }
  }
`
