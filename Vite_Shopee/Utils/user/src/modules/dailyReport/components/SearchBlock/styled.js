import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  padding: 0 10px;
`

export const Box = styled.div`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.grey_blur};
  margin-top: 8px;
  margin-bottom: 24px;

  /* &.scroll {
    max-height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      width: 3px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.grey};
    }

  } */
  .show__more {
    display: flex;
    align-items: center;
    img {
      margin-left: 6px;
    }
  }

  .ant-form-item {
    margin-bottom: 0;
    .ant-form-item-control {
      input {
        padding: 8px 16px;
      }
      .ant-form-item-explain {
        display: none;
      }
    }
  }
`

export const HeaderSearch = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.talk_primary};
  .search-ico {
    padding: 16px;
    font-size: 20px;
  }
`

export const Content = styled.div`
  padding: 32px 16px;
`

export const SearchWrapper = styled.div`
  .no-data {
    text-align: center;
  }

  .ant-tag-checkable {
    border: 1px solid ${({ theme }) => theme.grey_blur};
    padding: 10px 16px;
    font-weight: 400;
    font-size: 14px;
    border-radius: 4px;
    color: ${({ theme }) => theme.text_primary};
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &.ant-tag-checkable-checked {
      color: ${({ theme }) => theme.success};
      background: ${({ theme }) => theme.white};
      border-color: ${({ theme }) => theme.success};
    }
    &:hover {
        color: ${({ theme }) => theme.success};
        border-color: ${({ theme }) => theme.success};
    }
    &:active {
      background: ${({ theme }) => theme.white};
    }
    p {
      margin-bottom: 0px;
    }
  }
  // Custom CSS tree ant-design for match sidebar
.ant-tree {
  border: 1px solid ${({ theme }) => theme.grey_blur};
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  position: relative;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #838383;
  }

  &:hover {
    ::-webkit-scrollbar {
      width: 4px;
    }
  }

  .ant-tree-treenode {
    padding: 0 10px;
    width: 100%;
    border-radius: 8px;

    .ant-tree-node-content-wrapper {
      width: 100%;
    }

    &:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.grey_blur};
    }

    &:before {
      bottom: 0; // disable bottom of antd (have bug)
    }

    &.ant-tree-treenode-selected {
      background: #f5f5f5;
      span {
        color: ${({ theme }) => theme.black};
      }
      &:before {
        background: transparent;
      }
      .ant-tree-node-content-wrapper {
        color: ${({ theme }) => theme.black};
      }
    }

    .ant-tree-switcher {
      position: absolute;
      left: 0;
      height: 40px;
      line-height: 40px;
    }

    .ant-tree-iconEle {
      display: none;
    }

    .ant-tree-node-content-wrapper {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 40px;
      line-height: 40px;
    }
  }

  .ant-tree-checkbox {
    margin: 0 8px 0 15px;
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    &.ant-tree-checkbox-checked {
      &::after {
        border: 1px solid transparent;
      }
      .ant-tree-checkbox-inner {
        background: #00C271;
      }
    }

    .ant-tree-checkbox-inner {
      border: 1px solid #838383;
      border-radius: 5px;
    }
  
    .ant-tree-checkbox-inner::after {
      background: #00C271;
    }
  }
}
`

export const Title = styled.div`
  font-weight: 700;
  padding: 4px 8px;
  margin-bottom: 8px;
  border: 1px solid ${({ theme }) => theme.talk_primary};
  width: fit-content;
  border-radius: 4px;
`

export const WrapperButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  button {
    width: 100%;
    border-radius: 50px;
    max-width: 120px;
    padding: 10px 0;
    border: 1px solid ${({ theme }) => theme.success};
  }
  .btn__search {
    background-color: ${({ theme }) => theme.green};
    p {
      color: white;
    }
    &:hover, &:active, &:focus {
      opacity: 0.8;
      border: 1px solid ${({ theme }) => theme.success};
    }
  }
  .btn__reset {
    background-color: white;
    p {
      color: ${({ theme }) => theme.green};
      }
    &:hover {
      opacity: 0.8;
      border: 1px solid ${({ theme }) => theme.success};
      background-color: ${({ theme }) => theme.green};
      p {
        color: white;
      }
    }
    &:active, &:focus {
      border: 1px solid ${({ theme }) => theme.success};
    }
  }
`
