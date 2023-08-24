import styled from 'styled-components'

export const ModalWrapper = styled.div`
  .modal-header {
    display: flex;
    width: 70%;
    justify-content: start;
    margin: 15px auto!important;
    flex-direction: column;
    color: black;
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
      width: 20%;
      font-weight: 600;
    }
    .value {
      width: 80%;
    }
  }
  .ant-table-cell.ant-table-cell-ellipsis {
    white-space: normal;
  }
`
export const TextWrapper = styled.div`
  color: silver;
  font-size: 14px;
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 5px;
  }
  
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: silver; 
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: grey; 
  }
`

export const TextQuestion = styled.div`
  color: black;
  font-size: 14px;
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  overflow: auto;
  margin-bottom: 20px;
  ::-webkit-scrollbar {
    width: 5px;
  }
  
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: silver;
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: grey; 
  }
`

export const InputWrapper = styled.div`
  pointer-events: none;

  .ant-checkbox-checked .ant-checkbox-inner:after {
    border-color: black;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: white;
    border-color: black;
  }

  .ant-radio-inner:after {
    background: black;
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: black;
    background-color: white;
  }
`
