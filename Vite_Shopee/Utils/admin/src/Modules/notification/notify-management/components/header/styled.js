import styled from 'styled-components'
import { DatePicker, Select } from 'antd'

export const Header = styled.div`
  margin: 24px 0;
  padding: 16px 0px;
  background-color: ${({ theme }) => theme.bg_block};
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
export const FilterContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

export const HeaderContent = styled.div`
  width: 40%;
  min-width: 350px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1024px){
    min-width: 330px;
  }

  div.attribute-user + div {
    flex-grow: 1;
    align-items: flex-end;
    padding-bottom: 1px;
  }
`

export const ListButton = styled.div`
  width: 100%;
  margin-top: 10px;
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

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  p {
    width: 30%;
    text-align: right;
    margin-right: 15px;
  }
`
export const InputBox = styled.div`
  flex: 1;
  display: flex;
`

export const Input = styled.input`
  flex: 1;
  width: 100%;
  padding: 8px;
  font-size: 16px;
  height: ${({ height }) => height || '38px'};
  background-color: ${({ theme, background }) => theme[background]};
  border: 0.5px solid ${({ theme }) => theme.grey};
  border-radius: 4px;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
    border: 0.5px solid ${({ theme }) => theme.secondary};
  }

  &:active {
    opacity: 0.7;
    border: 0.5px solid ${({ theme }) => theme.secondary};
  }

  &:focus {
    opacity: 1;
    border: 0.5px solid ${({ theme }) => theme.secondary};
    outline: none;
  }
`

export const Tilde = styled.div`
  display: flex;
  align-items: center;
  padding: 0 7px;
  background: ${({ theme }) => theme.grey};
`
export const DatePickerStyle = styled(DatePicker)`
  height: 38px;
  width: 50%;
  border-radius: 4px;
  background-color: ${({ theme, background }) => theme[background]};
  border: 0.5px solid ${({ theme }) => theme.grey};
  &:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`

export const SelectInput = styled(Select)`
  flex: 1;
  width: 100%;
  font-size: 16px;
  background-color: ${({ theme, background }) => theme[background]};
  border: 0.5px solid ${({ theme }) => theme.grey};
  border-radius: 4px;
  transition: 0.2s;
  .ant-select-selection-item-content {
    width: 100%;
    max-width: 150px;
  }
  

  &:hover {
    opacity: 0.8;
    border: 0.5px solid ${({ theme }) => theme.secondary};
  }

  &:active {
    opacity: 0.7;
    border: 0.5px solid ${({ theme }) => theme.secondary};
  }

  &:focus {
    opacity: 1;
    border: 0.5px solid ${({ theme }) => theme.secondary};
    outline: none;
  }
`
