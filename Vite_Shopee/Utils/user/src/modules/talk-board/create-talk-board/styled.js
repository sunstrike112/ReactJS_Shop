import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.talk_background};
`

export const WrapperParentGroup = styled.div`
  display: flex;
  margin-left: 24px;
  margin-bottom: 5px;
  button {
    position: absolute;
    left: -5px;
    border: none;
    background-color: ${({ theme }) => theme.white};
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
    border: 1px solid ${({ theme }) => theme.grey};
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner {
    border: 1px solid ${({ theme }) => theme.talk_primary};
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
    border: 1px solid ${({ theme }) => theme.talk_primary};
  }
`

export const Wrapper = styled.div`
  margin: 50px auto;
  border-radius: 6px;
  width: 100%;
  max-width: 798px;
  color: ${({ theme }) => theme.talk_primary};
  background-color: white;
  hr {
    width: 100%;
    margin-bottom: 30px;
    border: 1px solid ${({ theme }) => theme.grey_blur};
  }
  .btn-back {
    background-color: white;
    color: black;
    border: 1px solid ${({ theme }) => theme.grey_blur};
    font-size: 25px;
    border-radius: 6px;
    padding: 2px 10px;
    position: absolute;
    margin-left: -80px;
    top: 115px;
    &:hover {
      background-color: ${({ theme }) => theme.talk_primary};
      cursor: pointer;
    }
  }
  .title {
    margin-top: 10px;
    padding-left: 30px;
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    color: black;
    align-self: start;
  }
  .talk-board-form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 6px;
    margin-top: 40px;
    .ant-input {
      border-color: ${({ theme }) => theme.bg_border};
    }
  }
  .ant-form-item-no-colon {
    font-weight: 600;
    font-size: 26px;
    line-height: 20px;
    color: black;
  }
  .ant-form-item-label > label {
    align-items: start;
  }
  .form-action-group {
    margin: 20px 0;
    .btn-post{
      background: ${({ theme }) => theme.talk_primary};
      border-radius: 6px;
      color: white;
      width: 130px;
      height: 40px;
      border: 1px solid ${({ theme }) => theme.talk_primary};
      :hover {
        border: 1px solid ${({ theme }) => theme.talk_primary};
      }
    }
    .btn-cancel {
      border-radius: 6px;
      color: black;
      width: 130px;
      height: 40px;
      :hover {
        border: 1px solid ${({ theme }) => theme.talk_primary};
      }
    }
  }
  .ant-input:focus, .ant-input:hover {
    border-color: ${({ theme }) => theme.talk_primary};
    outline: 0;
    -webkit-box-shadow: 0 0 0 1px ${({ theme }) => theme.talk_primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.talk_primary};
  }
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-color: ${({ theme }) => theme.talk_primary};
    outline: 0;
    -webkit-box-shadow: 0 0 0 1px ${({ theme }) => theme.talk_primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.talk_primary};
  }

  div.ant-col-8 {
    padding-top: 20px;
    padding-left: 30px;
  }

  div.ant-col-16 {
    padding-top: 10px;
    padding-right: 30px;
  }

  .attribute-tree, .group-tree, .uploadfile-tree  {
    width: 100%;
    color: black;
    font-weight: 600;
    margin: 10px 0px;
    div.ant-col-8 {
      padding-top: 15px;
    }
    .ant-form-item-explain-error {
      font-weight: normal;
    }
  }
  .attribute-tree {
    margin: 0px;
  }
  .group-tree {
    margin-bottom: 0px;
  }
  .uploadfile-tree  {
    .ant-col.ant-col-8 {
      padding-top: 10px;
      margin-top: 15px;
    }
  }
  .ant-tree-checkbox {
    &.ant-tree-checkbox-checked {
      &::after {
        border: 1px solid transparent;
      }
      .ant-tree-checkbox-inner {
        background: ${({ theme }) => theme.talk_primary};
      }
    }

    .ant-tree-checkbox-inner {
      border: 1px solid ${({ theme }) => theme.grey};;
    }

    .ant-checkbox-wrapper:hover .ant-checkbox-inner {
      border: 1px solid ${({ theme }) => theme.talk_primary};
    }
  
    .ant-tree-checkbox-inner::after {
      background: ${({ theme }) => theme.talk_primary};
    }
  }
  .group-tag {
    width: 100%;
    color: black;
    font-weight: 600;
    margin: 20px 0px 10px 0px;
    .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
      border: 1px solid ${({ theme }) => theme.talk_primary};
      border-radius: 6px;
      outline: 0;
      -webkit-box-shadow: 0 0 0 1px ${({ theme }) => theme.talk_primary};
      box-shadow: 0 0 0 1px ${({ theme }) => theme.talk_primary};
    }
    .ant-select:not(.ant-select-customize-input) .ant-select-selector {
      border-radius: 4px;
    }
  }
  .checkall-group, .checkall-attribute {
    margin-left: 24px;
    margin-bottom: 5px;
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: ${({ theme }) => theme.talk_primary};
    }
    .ant-checkbox-checked::after {
      border: 1px solid ${({ theme }) => theme.grey};
    }
    .ant-checkbox-inner {
      border: 1px solid ${({ theme }) => theme.grey};
    }
    &:hover {
      .ant-checkbox-inner {
      border: 1px solid ${({ theme }) => theme.talk_primary};;
      }
    }
  }
  .ant-radio:hover .ant-radio-inner, .ant-checkbox:hover .ant-checkbox-inner {
    border: 1px solid ${({ theme }) => theme.talk_primary};
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${({ theme }) => theme.talk_primary};
  }
  .ant-checkbox-checked::after {
    border: 1px solid ${({ theme }) => theme.grey};;
  }
  .ant-checkbox-inner {
    border: 1px solid ${({ theme }) => theme.grey};;
  }
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border: 1px solid ${({ theme }) => theme.grey};
  }
  .ant-tree-treenode.ant-tree-treenode-switcher-close:hover .ant-tree-checkbox-inner {
    border: 1px solid ${({ theme }) => theme.talk_primary};
  }
`
