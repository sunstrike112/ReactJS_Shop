import styled from 'styled-components'

export const Block = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 24px 0;
  padding: 15px 10px;
  background-color: ${({ theme }) => theme.bg_block};
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 4px;
`
export const ListButton = styled.div`
  display: flex;
  justify-content: center;
`

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`
export const RecordCounting = styled.section`
  display: flex;
  justify-content: space-between
`
export const NumberSelectedRecord = styled.div`
  height: 60px;
  width: 220px;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.text_primary};
  border-radius: 4px;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 16px;
`
export const TotalRecord = styled.div`
  align-self: flex-end;
  height: 60px;
  width: 220px;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.text_primary};
  border-radius: 4px;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 16px;
`
export const ActionGroup = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  width: 80%;
  justify-content: space-between;
  .icon {
    cursor: pointer;
    transition: opacity 0.2s;
    fill: ${({ theme }) => theme.white};
    background: ${({ theme }) => theme.primary};
    width: 32px;
    height: 32px;
    padding: 8px;
    border-radius: 4px;
     &:hover {
      opacity: 0.8;
    }
  
    &:active {
      opacity: 0.7;
    }
  
    &.disabled {
      cursor: auto;
      opacity: 0.5;
    }
  }
`
export const ListButtonSearch = styled.div`
  width: 100%;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    &:first-child {
      margin-right: 10px;
      border: 1px solid ${({ theme }) => theme.blueHight};
      &:hover {
        border: 1px solid ${({ theme }) => theme.blueHight};
      }
    }
    &:last-child {
      width: max-content;
      color: ${({ theme }) => theme.white};
    }
  }
`
