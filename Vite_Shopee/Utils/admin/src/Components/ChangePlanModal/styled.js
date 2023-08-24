import { NormalButton } from 'Components'
import styled from 'styled-components'

export const ModalWrapper = styled.div`
  .modal-header {
    display: flex;
    width: 80%;
    justify-content: start;
    margin: 5px auto!important;
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
      width: 100%;
      font-weight: 600;
      white-space: pre-line;
    }
    .value {
      width: 80%;
    }
  }
`

export const PlanBox = styled.div`
  width: 80%;
  display: flex;
  margin: 0 auto;
  .planBox {
    padding: 20px;
    width: 100%;
    border: 1px solid #eeeeee;
    span {
      font-weight: 600;
    }
    .selectPlan {
      margin-bottom: 10px;
    }
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
  &:hover,
  &:focus {
    background-color: #5d4eb3;
    border-color: #5d4eb3;
    color: ${({ theme }) => theme.white}!important;
  }
  p {
    color: ${({ theme }) => theme.white}!important
  }
  &.button__change__credit {
    background: none;
    border: 0;
    color: blue!important;
    margin: 0;
    padding-left: 0;
    text-decoration: underline;
    display:inline-block;
    p {
      color: blue!important
    }
  }
`
export const CancelButton = styled(NormalButton)`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.bg_primary};
  color: ${({ theme }) => theme.bg_primary};
  font-weight: 600;
  font-size: .75rem;
  padding: .4rem 1.75rem;
  height: auto;
  border-radius: .75rem;
  margin-right: 10px;
  &:hover,
  &:focus {
    background-color: #f0f0fb;
    border: 1px solid ${({ theme }) => theme.bg_primary};
    color: ${({ theme }) => theme.bg_primary};
  }
`

export const ButtonWrapper = styled.div`
  width: 100%;
  display:flex;
  justify-content: center;
`
