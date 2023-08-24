import styled from 'styled-components'

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
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
    &__number {
      width: 38px;
      height: 28px;
      background: ${({ theme }) => theme.grey_blur};
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 16px;
      font-weight: 600;
    }
  }
  .btn__group {
    display: flex;
    align-items: center;
    .ant-select.ant-select-single.ant-select-show-arrow {
      height: 40px;
      padding: 0px;
    }
    .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
      border-color: #00C271;
    }
    .ant-select:hover {
      border-radius: 4px;
    }
    .btn__create {
      border-radius: 6px;
      padding: 12px 28px;
      margin-left: 16px;
      height: 40px;
      &.btn__sort {
        padding: 12px 14px;
        background: transparent;
        border: 1px solid ${({ theme }) => theme.grey_blur};
      }
      .anticon  {
        margin-right: 10px;
      }
    }
  }
  .ant-select {
    width: 150px;
    .ant-select-selector {
      height: 40px;
      border-radius: 4px;
      padding-top: 4px;
      padding-left: 10px;
    }
  }
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-color: #00C271;
    outline: 0;
    -webkit-box-shadow: 0 0 0 1px #00C271;
    box-shadow: 0 0 0 1px #00C271;
  }
  .ant-select-selector:hover, .ant-select-selector:focus, .ant-select:focus, .ant-select:hover {
    border-color: #00C271;
    outline: 0;
    -webkit-box-shadow: 0 0 0 1px #00C271;
    box-shadow: 0 0 0 1px #00C271;
  }
`
