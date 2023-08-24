import { NormalButton } from 'Components'
import styled from 'styled-components'

export const ModalWrapper = styled.div`
  .modal-header {
    display: flex;
    width: 100%;
    justify-content: start;
    margin: 0 auto!important;
    padding: 0 15px;
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

  .confirm_contract {
    text-align: center;
    text-decoration: underline;
  }
`

export const PlanBox = styled.div`
  width: 50%;
  display: flex;
  padding: 10px;
  .planBox {
    padding: 10px 20px;
    width: 100%;
    border: 1px solid #eeeeee;
    ul {
      padding-left: 15px;
    }
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

export const PlanZZWrapper = styled.div`
  width: 30%;
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

export const FeeWrapper = styled.div`
  margin-bottom: 10px;
`

export const TableWrapper = styled.div`
  padding: 0 20px;
  border: 1px solid #eeeeee;
  margin: 10px 0;
  &.policy {
    max-height: 200px;
    overflow-y: scroll;
  }
`

export const TablePolicy = styled.table`
  width: 100%;
 tr {
   td {
    padding: 1rem 0.5rem;
    font-size: 12px;
     &:first-child {
       display: flex;
       align-items: start;
       height: 100%;
     }
     .title {
      white-space: pre-line;
     }
   }
 }
`

export const TableContract = styled.table`
 width: 100%;
 tr {
   td {
    padding: 0.5rem;
    font-size: 16px;
    font-weight: 600;
     &:first-child {
       display: flex;
       align-items: start;
       height: 100%;
     }
     .title {
      white-space: pre-line;
     }
   }
 }
`
