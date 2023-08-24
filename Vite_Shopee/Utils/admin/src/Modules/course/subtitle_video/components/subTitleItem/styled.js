import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  position:relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  position: relative;
  
  .mr-12 {
    margin-right: 12px;
  }

  .field-item {
    font-size: 16px;
    width: 96px !important;
    height: 32px;
    padding: 5px 8px;
    color: #333;
    border-radius: 7px;
    text-align: center;
    background-color: #f8f9fa;
  }

  .btn-add {
    position: absolute;
    left: 12px;
    top: -12px;
    align-self: flex-start;
  }
`
export const Timer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  input {
    border: 1px solid ${({ isError = false }) => (isError ? 'red' : '#d9d9d9')};
    &:focus {
      border: 1px solid red;
    }
  }
`
