import { NormalButton } from 'Components'
import styled from 'styled-components'

export const ModalWrapper = styled.div`
  .modal-header {
    display: flex;
    width: 70%;
    justify-content: start;
    margin: 15px auto!important;
    flex-direction: column;
    .courseBox {
      display:flex;
      width: 100%;
      p {
        padding: 10px 15px;
        border: 1px solid #eeeeee;
      }
    }
    .unitBox {
      display:flex;
      width: 100%;
      margin-top: -5px;
      p {
        padding: 10px 15px;
        border: 1px solid #eeeeee;
      }
    }
    .title {
      width: 20%;
      font-weight: 600;
    }
    .value {
      width: 80%;
    }
  }
  .ReactModal__Content {
    width: 70%!important;
    z-index: 99999;
  }
`

export const PlanBox = styled.div`
  width: 25%;
  display: flex;
  padding: 10px;
  .planBox {
    padding: 10px;
    width: 100%;
    border: 1px solid #eeeeee;
    span {
      font-weight: 600;
    }
    justify-content: space-between;
    display: flex;
    flex-direction: column;
  }
`

export const PlanWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`

export const SubmitButton = styled(NormalButton)`
  background: ${({ theme }) => theme.bg_primary};
  border: 1px solid ${({ theme }) => theme.bg_primary};
  color: ${({ theme }) => theme.white}!important;
  font-weight: 600;
  font-size: .75rem;
  padding: .4rem 1.75rem;
  height: auto;
  border-radius: .75rem;
  margin: 10px auto 0;
  &:hover,
  &:focus {
    background-color: #5d4eb3;
    border-color: #5d4eb3;
    color: ${({ theme }) => theme.white}!important;
  }
  p {
    color: ${({ theme }) => theme.white}!important
  }
`
