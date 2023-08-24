import styled from 'styled-components'
import { Divider as DividerAntd, Radio as RadioAntd, Select } from 'antd'

import { FormDatePicker as DatePicker, FormTimePicker as TimePicker, FormRadio } from 'Components'

export const Title = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  padding: 20px;
  align-items: center;
  font-size: 24px;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  border-radius: 4px;
  .icon {
    stroke: ${({ theme }) => theme.primary};
    margin-right: 16px;
  }
  margin-top: 30px;
`
export const Action = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  width: 100%;
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

export const ListButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  .button__submit {
    margin-left: 5px;
    padding: 20px;
  }
  .icon {
    fill: ${({ theme }) => theme.white};
  }
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

export const Divider = styled(DividerAntd)`
  background-color: ${({ theme, color }) => theme[color] || theme.bg_primary};
  height: 2px;
  padding: 0;
  margin: 0;
`
export const Row = styled.div`
  display: flex;
  flex-direction: row;
`
export const Left = styled.div`
  display: flex;
  width: 30%;
  background-color: ${({ theme }) => theme.bg_primary};
  padding: 16px;
  span {
    font-weight: 600;
  }
`

export const Right = styled.div`
  display: flex;
  width: 70%;
  padding: 16px;
  flex-direction: column;
  .react-select-container {
    width: 100%;
  }
  .upload-button {
    display: flex;
    align-items: center;
    border-radius: 4px;
    margin-bottom: 4px;
    span {
      margin-left: 8px;
    }
  }
  .evaluate_status {
    display: flex;
    div {
      padding: 10px;
    }
  }
  .ant-form-item {
    width: auto;
    margin-bottom: 0;
  }
  .point {
    width: 120px;
    margin-right: 10px;
  }
  .addRow {
    font-size: 24px;
    text-align: left;
    cursor: pointer;
    color: ${({ theme }) => theme.primary};
  }
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

export const RecordCounting = styled.section`
  display: flex;
  justify-content: space-between;
`

export const UploadButton = styled.section`
  display: flex;

  .remove-upload-button {
    margin-right: 8px;
  }
`

export const RadioGroup = styled(FormRadio)`
  display: flex;
`

export const Radio = styled(RadioAntd)`
  background-color: #e8e8e8;
  padding: 0.4rem;
  margin-bottom: 0.25rem;
  span {
    display: flex;
    &:not(.ant-form-item-children-icon) {
      flex-direction: ${({ language }) => (language === 'jp' ? 'row' : 'row-reverse')};
    }
    align-items: center;
    word-break: keep-all;
  }
  .public {
    margin-right: ${({ language }) => (language === 'jp' ? '' : '10px')};
  }
`

export const FormDatePicker = styled(DatePicker)`
  margin-right: 0.5rem;
`

export const FormTimePicker = styled(TimePicker)``

export const DatePickerGroup = styled.div`
  display: flex;
  align-items: center;
`
export const SelectInput = styled(Select)`
  flex: 1;
  width: 80px;
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
