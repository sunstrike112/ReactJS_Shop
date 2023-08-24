import { Table } from 'antd'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  margin: 1rem 0;
  height: ${({ height }) => height};

  background-color: ${({ theme }) => theme.white};
  border-radius: 1.75rem;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 5%);
  .ant-table-cell {
    white-space: pre-wrap;
  }
  .table-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    .table-head-left {
      .content {
        display: flex;
        align-items: center;
        width: max-content;
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
      display:flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 8px;

      .ant-btn {
        font-weight: 500;
        font-size: 1rem;
      }

      .create {
        color: #46bcaa;
        background-color: #edf8f7;
        border: 1px solid #edf8f7;
        border-radius: .75rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        &:hover {
          color: #fff;
          background-color: #46bcaa;
          border-color: #46bcaa;
        }
      }
      .copy {
        color: #1677ff;
        background-color: #e7eef8;
        border: 1px solid #e7eef8;
        border-radius: .75rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        &:hover {
          color: #fff;
          background-color: #1677ff;
          border-color: #1677ff;
        }
      }
      .order {
        color: #4d69fa;
        background-color: #edf0ff;
        border: 1px solid #edf0ff;
        border-radius: .75rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        &:hover {
          color: #fff;
          background-color: #4d69fa;
          border-color: #4d69fa;
        }
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

  .table-foot {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
    .table-foot-left {
      padding-top: 0.5rem; ;
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

export const TableStyle = styled(Table)`
  overflow: auto;
  height: 100%;
  z-index: 1; // Table override container parent in safari
  .ant-pagination {
    display: flex;
    justify-content: center;
  }

  .ant-table {
    border-radius: .75rem;
    z-index: 0; // Table override container parent in safari
    .ant-table-content {
      transform: rotateX(180deg);
      border-radius: .75rem;
      table {
        transform: rotateX(180deg);
        position: relative;
      }
    }
    /* FOR header position sticky */
    .ant-table-container {
      width: ${({ sticky }) => (sticky ? 'fit-content' : 'auto')};
      .ant-table-sticky-scroll {
        display: none;
      }
    }
    /* END FOR header position sticky */


  }
  .ant-spin{
    --positionScroll: ${(props) => (props.positionScroll > 150 ? props.positionScroll - 200 : props.positionScroll)}px;
    margin: var(--positionScroll) auto !important;
    scroll-behavior: smooth;
    transition: margin .1s ease;
  }
  
`
