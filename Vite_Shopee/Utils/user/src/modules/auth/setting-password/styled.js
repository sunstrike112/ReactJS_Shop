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
  .submit-button {
    border-radius: 6px;
    padding: 15px 60px;
    margin-bottom: 20px;
    &:disabled {
      background: #cccccc;
    }
  }
  button {
    border-radius: 6px;
    padding: 15px 60px;
    left: 50%;
    transform: translateX(-50%);
  }
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
