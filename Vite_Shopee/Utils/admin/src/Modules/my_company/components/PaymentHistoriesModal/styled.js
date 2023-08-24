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
      width: 100%;
      font-weight: 600;
    }
    .value {
      width: 80%;
    }
  }
  .ant-modal-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .highlight {
    color: #ff4d4f;
  }
`

export const PlanBox = styled.div`
  width: 50%;
  display: flex;
  padding: 10px;
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
