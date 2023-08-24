import styled from 'styled-components'

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1096px;
  color: ${({ theme }) => theme.talk_primary};
  padding-top: 10px;

  .header-block {
    padding: 0 !important;
  }

  .reports-wrapper {
    display: flex;
    flex-direction: column;
    border: 1px solid ${({ theme }) => theme.grey_blur};;
    border-radius: 8px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    .ant-pagination {
      align-self: center
    }
  }
  .list-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    justify-content: center;
    flex-direction: column;
    min-height: calc(100vh - 64px - 382px);
  p {
    text-align: center;
  }

  .ant-pagination {
    .anticon {
      color: ${({ theme }) => theme.talk_primary};
    }
    .ant-select-selector, .ant-pagination-jump-next {
      &:hover, &:focus, &:active {
        border-color: ${({ theme }) => theme.talk_primary};
      }
    }
    .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
      border-color: ${({ theme }) => theme.talk_primary};
      box-shadow: none;
    }
    .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
      border-color: ${({ theme }) => theme.talk_primary};
      box-shadow: none;
    }
  }
}
`
