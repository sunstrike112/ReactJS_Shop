import styled from 'styled-components'

export const Wrapper = styled.div`
  font-size: 0;
  display: block;
  justify-content: center;
  height: 100%;
  overflow: overlay;
  background: #ffffff;
  overflow: hidden;
  padding: 0px 12px 10px 0px;

  .title {
    color: ${({ theme }) => theme.success};
    text-transform: uppercase;
  }
  .site-bar {
    border-radius: 8px;
    .ant-layout-sider-children {
      border-radius: 8px;
    }
  }
  ul {
    border: 1px solid #f1f1f1 !important;
    box-sizing: border-box;
    border-radius: 8px;
    li {
      border-bottom: 1px solid #f1f1f1;
      &:first-child {
        border-radius: 8px 8px 0 0;
      }
      &:last-child {
        border-bottom: 0px;
      }
    }
  }
  .ant-menu-sub li {
    padding-left: 48px !important;
    margin-bottom: 0px;
  }

  .search {
    width: 100%;
    display: flex;
    gap: 5px;
    padding: 10px 0px;
    input {
      border: 1px solid ${({ theme }) => theme.grey_blur};
      font-size: ${({ theme }) => theme.size_15};
      font-weight: ${({ theme }) => theme.bold};
    }
    button {
      padding: 10px 35px;
    }
  }
  .searchBtn {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }

  // Refactor CSS tree ant-design for match sidebar
  .ant-tree {
    border: 1px solid ${({ theme }) => theme.grey_blur};
    border-radius: 8px;
    max-height: 300px;
    overflow-y: auto;
    position: relative;

    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-thumb {
      // background: transparent;
      background: #838383;
    }

    &:hover {
      ::-webkit-scrollbar {
        width: 4px;
      }
      ::-webkit-scrollbar-thumb {
        // background: #838383;
      }
    }

    .ant-tree-treenode {
      padding: 0 10px;
      border-radius: 0px;
      width: 100%;

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
          background: #00c271;
        }
      }

      .ant-tree-checkbox-inner {
        border: 1px solid #838383;
        border-radius: 5px;
      }

      .ant-tree-checkbox-inner::after {
        background: #00c271;
      }
    }
  }
`
