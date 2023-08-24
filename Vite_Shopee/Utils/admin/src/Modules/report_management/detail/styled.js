import styled from 'styled-components'

export const WrapperParentGroup = styled.div`
  display: flex;
  margin-left: 24px;
  margin-bottom: 5px;
  position: relative;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 12px;
    height: 12px;
    position: absolute;
    left: -20px;
    border: none;
    background-color: ${({ theme }) => theme.white};
    padding: 0px;
    margin-top: 4px;
  }
  .checkbox-group-tree {
    display:flex;
    flex-direction:column;
    .ant-checkbox-wrapper {
      margin-left: 24px;
      margin-bottom: 5px;
    }
  }
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border: 1px solid ${({ theme }) => theme.blue};
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner {
    border: 1px solid ${({ theme }) => theme.blue};
  }
`
export const WrapperChildrenGroup = styled.div`
  display:flex;
  flex-direction:column;
  .checkbox-child-group {
    margin-left: 48px;
    margin-bottom: 5px;
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner {
    border: 1px solid ${({ theme }) => theme.blue};
  }
`
