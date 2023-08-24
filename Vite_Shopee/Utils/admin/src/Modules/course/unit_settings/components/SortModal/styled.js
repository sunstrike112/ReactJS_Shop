import styled from 'styled-components'

export const WrapperRightAlign = styled.div`
  .ant-input-number-handler-wrap {
    left: 0 !important;
    right: auto !important;
    border-left: none !important;
    
    border-right: 1px solid #d9d9d9;
  }
  .ant-input-number-input-wrap {
    input {
      text-align: right;
    }
  }
`
