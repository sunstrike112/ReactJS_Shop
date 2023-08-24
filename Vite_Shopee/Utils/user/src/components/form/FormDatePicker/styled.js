import { Form } from 'antd'
import styled from 'styled-components'

export const WrapperFormItem = styled(Form.Item)`
  height: max-content;
  width: 100%;
  margin-bottom: 10px;

  .ant-form-item-control-input {
    width: ${({ widthdatepicker }) => (`${widthdatepicker}px` || '100%')};
  }
  
  .ant-picker {
    min-height: 38px;
    border-radius: 4px;
    &.ant-picker-focused, &:hover {
      border-color: ${({ theme }) => theme.talk_primary};
      box-shadow: 0 0 0 1px ${({ theme }) => theme.talk_primary};
    }
  }
  
  .facit-control.ant-picker {
    border-radius: 1rem ;
    border: 1px solid #f8f9fa;
    transition: border-color .15s ease-in-out,
    box-shadow .15s ease-in-out;
    background-color: rgb(248, 249, 250);
      &:hover, &:focus {
      border: rgb(182 174 233) solid 1px;
      color: #323232;
      background-color: #f8f9fa;
      border-color: #b6aee9;
      outline: 0;
      box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%),0 0 0 0.25rem rgb(108 93 211 / 25%);
    }
  }

  .ant-form-item-label {
    font-size: 14px;
    overflow: unset;
    white-space: unset;
    .ant-form-item-no-colon {
      height: 100%;
    }
  }

  // wrap button outside to fix auto close calendar when click outside input
  button#popup-container {
	  border: none;
	  padding: 0;
	  background-color: transparent;
    width: ${({ inputwidth }) => `${inputwidth}%`};
    .ant-picker {
      width: 100%;
    }
  }
`

export const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`
