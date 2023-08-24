import styled from 'styled-components'

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  gap: 1rem;
  .ant-select-dropdown {
    padding: 0px;
  }
  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background-color: ${({ theme }) => theme.talk_hover};
    &:hover {
      background-color: ${({ theme }) => theme.talk_hover};
    }
  }
  .ant-select-item-option-active:not(.ant-select-item-option-disabled):hover {
    background-color: ${({ theme }) => theme.talk_hover};
  }
  .anticon-desktop {
    font-size: 32px;
    margin-right: 8px;
    margin-left: 8px;
  }
  .title {
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 8px;
    padding-bottom: 8px;
    gap: .5rem;
    .total {
      width: 38px;
      height: 28px;
      background: ${({ theme }) => theme.grey_blur};
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }
  }

  .filters {
    display: flex;
    align-items: center;
    gap: 10px;

    /* For input search */
    .ant-form-item {
      margin-bottom: 0;
      .ant-input {
        min-height: 44px;
        min-width: 280px;
      }
    }

    button {
      padding-top: 10px;
      padding-bottom: 10px;
      border: 1px solid ${({ theme }) => theme.success};
    }

    .btn__rounded {
      width: 100%;
      border-radius: 50px;
      max-width: 118px;

      &.btn__search {
        background-color: ${({ theme }) => theme.green};
        p {
          color: white;
        }
        &:hover,
        &:active,
        &:focus {
          opacity: 0.8;
          border: 1px solid ${({ theme }) => theme.success};
        }
      }
      &.btn__reset {
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
        &:active,
        &:focus {
          border: 1px solid ${({ theme }) => theme.success};
        }
      }
    }

    .divider {
      height: 36px;
      margin: 0 10px;
      border-color: ${({ theme }) => theme.grey_blur};
    }

    .ant-select.ant-select-single.ant-select-show-arrow {
      padding: 0px;
    }
    .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
      border-color: #00c271;
    }
    .ant-select:hover {
      border-radius: 4px;
    }
    .btn__create {
      border-radius: 6px;
      padding-left: 16px;
      padding-right: 16px;
    }
  }
  .ant-select {
    width: 150px;
    .ant-select-selector {
      height: 42px;
      padding: 4px 10px;
    }
  }
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-color: #00c271;
    outline: 0;
    -webkit-box-shadow: 0 0 0 1px #00c271;
    box-shadow: 0 0 0 1px #00c271;
  }
  .ant-select-selector:hover,
  .ant-select-selector:focus,
  .ant-select:focus,
  .ant-select:hover {
    border-color: #00c271;
    outline: 0;
    -webkit-box-shadow: 0 0 0 1px #00c271;
    box-shadow: 0 0 0 1px #00c271;
  }
`
