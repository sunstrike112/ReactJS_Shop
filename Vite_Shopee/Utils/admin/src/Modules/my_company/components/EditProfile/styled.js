import { NormalButton } from 'Components'
import styled from 'styled-components'

export const EditWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow: auto;
  color: ${({ theme }) => theme.text_primary};
  .displayFlex {
    display: flex;
    .firstname {
      width: 50%;
      margin-right: 5px;
    }
    .lastname {
      width: 50%;
      margin-left: 5px;
    }
  }

  .no_padding {
    padding: 0;
  }
`
export const InfoWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 24px;
  overflow: auto;
  color: ${({ theme }) => theme.text_primary};
  margin-top: 30px;
  .avatar {
    width: 15%;
    position: relative;
    height: fit-content;
    padding: 15px;
    img {
      width: 100%;
    }
    .uploadAvatar {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      padding: 15px;
      justify-content: center;
      align-items: center;
      border: none;
      opacity: 0;
      display: flex;
      cursor: pointer;
      &.showLoading {
        opacity: 0.5;
      }
      &:hover {
        opacity: 0.5;
      }
      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
  .info {
    width: 85%;
    table {
      width: 100%;
      margin: 7.5px auto;
    }
  }

`
export const CompanyInfoHeader = styled.table`
  width: 100%;
  margin-bottom : 10px;
`

export const TBody = styled.tbody`
`

export const Tr = styled.tr`
`

export const Th = styled.td`
  background-color: #E5E3E3;
  border: 1px solid #ccc;
  width: 200px;
  padding: .5rem;
  font-weight: 600;
`

export const Td = styled.td`
  padding: .5rem;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
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
  gap: 16px;
  margin-top: 16px;
`

export const CustomizeContainer = styled.div`
  display: flex;
  gap: 1rem;
`
