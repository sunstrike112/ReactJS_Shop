import styled from 'styled-components'
import { Divider as DividerAntd, Space, Button } from 'antd'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 24px;
  flex-direction: column;
  overflow: auto;
  color: ${({ theme }) => theme.text_primary};

  .anticon-search {
    margin-right: 0;
  }
`

export const TreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  background-color: ${({ theme }) => theme.white};
  height: ${({ height }) => height};
  border-radius: 1.75rem;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 5%);
  margin: 1rem 0;
  .table-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    .table-head-left {
      .content {
        display: flex;
        align-items: center;
        svg.svg-icon--material {
          stroke: #4e68f9;
        }
        .title {
          font-size: 1rem;
        }
        .record-counting {
          font-weight: 500;
          margin-left: .5rem;
          font-size: .6rem;
          opacity: .5;
        }
      }
    }
    .table-head-right {
      .create {
        color: #46bcaa;
        background-color: #edf8f7;
        border: 1px solid #edf8f7;
        font-weight: 500;
        font-size: 1rem;
        border-radius: .75rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        &:hover {
          color: #fff;
          background-color: #46bcaa;
          border-color: #46bcaa;
        }
      }
      .order {
        color: #4d69fa;
        background-color: #edf0ff;
        border: 1px solid #edf0ff;
        font-weight: 500;
        font-size: 1rem;
        border-radius: .75rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        &:hover {
          color: #fff;
          background-color: #4d69fa;
          border-color: #4d69fa;
        }
      }
      .disabled {
        color: silver;
        background-color: #f5f5f5;
        border: 1px solid #edf0ff;
        font-weight: 500;
        font-size: 1rem;
        border-radius: .75rem;
      }
      .more {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e7eef8;
        border-color: #e7eef8;
        border-radius: .75rem;
        &:hover {
          color: #1f2128;
          background-color: #ebf1f9;
          border-color: #e9f0f9;
        }
        svg {
          width: 15px;
          height: 15px;
        }
      }
    }
  }

  .tree-body {
    & .ant-tree-treenode {
      position: relative !important;
      width: 100%;
      margin: .1rem 0;
    }
    & .ant-tree-node-content-wrapper {
      width: 100%;
    }
  }

  .table-foot {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    .table-foot-left {
      .info {
        font-size: .75rem;
        font-weight: 300;
      }
    }
    .table-foot-right {
      .ant-pagination {
        .ant-pagination-item {
          margin-right: 0;
          background-color: #e9ecef;;
          border-color: #e9ecef;
          border-radius: 0;
          font-size: .75rem;
          &>a:hover {
            color: #564aa9;
            background-color: #e5e9ed;
          }
        }
        .ant-pagination-prev {
          margin-right: 0;
          background-color: #e9ecef;
          border-color: #e9ecef;
          border-top-left-radius: 1rem;
          border-top-right-radius: 0;
          border-bottom-left-radius: 1rem;
          border-bottom-right-radius: 0;
          &:hover {
            background-color: #e9ecef;
          }
          button {
            justify-content: center;
            align-items: center;
            background-color: transparent;
            border: none;
            border-radius: 0;
            & svg {
              width: 8px;
              height: 8px;
            }
            &:not(:disabled):hover {
              svg {
                fill: #564aa9;
              }
            }
          }
        }
        .ant-pagination-next {
          margin-right: 0;
          background-color: #e9ecef;
          border-color: #e9ecef;
          border-top-left-radius: 0;
          border-top-right-radius: 1rem;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 1rem;
          &:hover {
            background-color: #e9ecef;
          }
          button {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: transparent;
            border: none;
            border-radius: 0;
            & svg {
              width: 8px;
              height: 8px;
            }
            &:not(:disabled):hover {
              svg {
                fill: #564aa9;
              }
            }
          }
        }
        .ant-pagination-item-active {
          background-color: #6c5dd3;
          border-color: #6c5dd3;
          z-index: 3;
          &>a {
            color: #fff;
            &:hover {
              background-color: #6c5dd3;
              border-color: #6c5dd3;
              color: #fff;
            }
          }
        }
      }
    }
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
  width: 80%;
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

export const ListButton = styled(Space)`
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0;
  align-items: center;
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
  margin : 0;
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
  justify-content: space-between
`

export const UploadButton = styled.section`
  display: flex;

  .remove-upload-button {
    margin-right: 8px;
  }
`

export const Text = styled(Button)`
  border: none;
  background: transparent;
  box-shadow: none;
  width: 100%;
  text-align: left;
  &.ant-btn:hover, &.ant-btn:focus, &.ant-btn:active {
    background: transparent;
  }
`
