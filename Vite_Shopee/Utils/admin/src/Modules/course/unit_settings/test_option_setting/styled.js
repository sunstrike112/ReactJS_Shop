import styled from 'styled-components'

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
  align-items: center;
  width: 70%;
  padding: ${({ noInput }) => (noInput ? '16px 16px 16px 27px' : '16px')};
  
  &.unit__field {
    word-break: break-all;
  }
  .ant-form-item {
    width: max-content;
    margin-bottom: 0;
    margin-right: 5px;
  }
  .ant-form-item-control-input {
    width: max-content;
    &::before {
      content: '${({ label }) => label}';
      position: absolute;
      left: 110%;
    }
  }
  .ant-input-number {
    border-radius: 1rem;
  }
  span {
    white-space: pre-wrap;
    word-break: break-all;
    word-wrap: break-word; 
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

export const CheckBox = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 16px 16px 27px;
  width: 70%;
`
