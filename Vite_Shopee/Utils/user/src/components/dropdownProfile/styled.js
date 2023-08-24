/* eslint-disable eol-last */
import styled from 'styled-components'

export const SelectWrapper = styled.div`
  .ant-select {
    &:hover {
      .ant-select-selector {
        border-color: ${({ theme }) => theme.green};
      }
    }
    &.ant-select-focused {
      .ant-select-selector {
        box-shadow: none !important;
        border-color: ${({ theme }) => theme.green} !important;
      }
    }
    &.error {
      .ant-select-selector {
        border-color: red !important;
      }
    }
    .ant-select-selector {
      height: auto;
      padding: 8px 16px;
      margin: 0;
      border-color: ${({ theme }) => theme.grey_blur};
      border-radius: 4px;
      &:hover {
        option {
          color: blue;
        }
      }
    }
  }
`
