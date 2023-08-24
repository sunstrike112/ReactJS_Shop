import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.talk_background};
`
export const Wrapper = styled.div`
padding: 16px;
  margin: 0 auto;
  width: 100%;
  max-width: 1096px;
  color: ${({ theme }) => theme.talk_primary};
  padding-top: 40px;
  padding-bottom: 40px;
  border: 1px solid ${({ theme }) => theme.bg_border};;
  padding: 16px;
  margin-top: 40px;
  margin-bottom: 40px;
  border-radius: 8px;
  position: relative;
  background-color: white;
  #comment-wrapper {
    .ant-dropdown-menu-item:hover {
      background-color: ${({ theme }) => theme.talk_hover};
    }
  }
  #header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    margin-bottom: 10px;
    & > div:first-child {
      height: 35px;
    }
    .ant-select-selector:hover, .ant-select-selector:focus,
    .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
      border: 1px solid ${({ theme }) => theme.talk_primary};;
    }
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
  }
  .ant-list-header {
    padding: 0;
    border-bottom: unset;
  }
  .pagination-container {
    text-align: end;
    .ant-select-selector {
      &:hover, &:focus, &:active {
        border-color: ${({ theme }) => theme.talk_primary};;
      }
    }
  }
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-color: ${({ theme }) => theme.talk_primary};;
    box-shadow: none;
  }
  .back-btn {
    width: fit-content;
    position: absolute;
    content: '';
    left: calc(-48px - 31px);
    top: 0;
    border: 1px solid ${({ theme }) => theme.grey_blur};;
    border-radius: 8px;
    padding: 12px;
    min-height: 48px;
    &:hover {
      background: ${({ theme }) => theme.talk_primary};
    }
  }
`

export const WrapperComment = styled.div`
  background: ${({ theme }) => theme.bg_border};
`
