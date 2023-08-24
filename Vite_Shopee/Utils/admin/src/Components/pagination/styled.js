import styled from 'styled-components'

export const PaginationStyle = styled.div`
  .ant-pagination {
    .ant-pagination-disabled {
      button {
        &:hover {
          background: ${({ theme }) => theme.greyLow} !important;
        }
      }
    }
    .ant-pagination-prev {
      min-width: 41px;
      height: 41px;
      line-height: 41px;
      margin: 0;
      button {
        color: white;
        border-radius: 0;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border: none;
        background: ${({ theme }) => theme.greyLow};
        &:hover {
          background: ${({ theme }) => theme.blueHight};
        }
      }
    }
    .ant-pagination-next {
      min-width: 41px;
      height: 41px;
      line-height: 41px;
      button {
        color: white;
        border-radius: 0;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        background: ${({ theme }) => theme.greyLow};
        border: none;
        border-left: 2px solid ${({ theme }) => theme.grey_light};
        &:hover {
          background: ${({ theme }) => theme.blueHight};
        }
      }
    }
    .ant-pagination-item {
      margin: 0;
      min-width: 41px;
      height: 41px;
      line-height: 41px;
      border-radius: 0;
      background: ${({ theme }) => theme.greyLow};
      border: none;
      border-left: 2px solid ${({ theme }) => theme.grey_light};
      &:hover {
        background: ${({ theme }) => theme.blueHight};
      }
      a {
        color: white;
        font-weight: 600;
      }
    }
    .ant-pagination-item-active {
      background: ${({ theme }) => theme.blueHight};
    }
  }
`
