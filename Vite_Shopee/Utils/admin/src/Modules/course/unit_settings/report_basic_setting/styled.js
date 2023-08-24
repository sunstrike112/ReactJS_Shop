import styled from 'styled-components'
import { Divider as DividerAntd, Radio as RadioAntd } from 'antd'

import { FormDatePicker as DatePicker, FormTimePicker as TimePicker } from 'Components'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 24px;
  flex-direction: column;
  color: ${({ theme }) => theme.text_primary};

  .ant-form-item {
    margin-bottom: 0;
  }

  .anticon-search {
    margin-right: 0;
  }
  
  form {
    margin-top: 24px;
  }
`
export const Header = styled.div`
  width: 100%;
  display: flex;
  height: 120px;
  background-color: ${({ theme }) => theme.bg_block};
  border: 1px solid ${({ theme }) => theme.text_secondary};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.125);
  margin: 24px 0;
  padding: 16px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  span {
    margin-right: 10px;
  }
`

export const Title = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  padding: 20px;
  align-items: center;
  font-size: 24px;
  background-color: ${({ theme }) => theme.bg_block_header};
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  .icon {
    stroke: ${({ theme }) => theme.primary};
    margin-right: 16px;
  }
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

export const RadioGroup = styled(RadioAntd.Group)`
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
