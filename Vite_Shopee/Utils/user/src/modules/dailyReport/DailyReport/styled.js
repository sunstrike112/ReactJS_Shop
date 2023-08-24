import styled from 'styled-components'

export const StyledContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  gap: 20px;

  .back-btn {
    width: fit-content;
    border: 1px solid ${({ theme }) => theme.grey_blur};
    border-radius: 8px;
    padding: 12px;
    min-height: 48px;
    &:hover {
      background: ${({ theme }) => theme.talk_primary};
    }
  }
`

export const StyledContent = styled.div`
  flex: 1;
  padding: 16px;
  color: ${({ theme }) => theme.talk_primary};
  padding-top: 40px;
  padding-bottom: 40px;
  border: 1px solid ${({ theme }) => theme.bg_border};
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
    .ant-select-selector:hover,
    .ant-select-selector:focus,
    .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
      border: 1px solid ${({ theme }) => theme.talk_primary};
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
      &:hover,
      &:focus,
      &:active {
        border-color: ${({ theme }) => theme.talk_primary};
      }
    }
  }
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-color: ${({ theme }) => theme.talk_primary};
    box-shadow: none;
  }

  .comment__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .ant-select {
      &:hover {
        .ant-select-selector {
          border-color: ${({ theme }) => theme.green};
        }
      }
    }
  }

  .comments {
    .ant-pagination {
      li {
        margin-bottom: 10px;
      }
      .ant-pagination-jump-next,
      .ant-pagination-jump-prev {
        :hover {
          .anticon {
            color: ${({ theme }) => theme.talk_primary};
          }
        }
      }
    }
  }
`

export const StyledSearchWrapper = styled.div`
  .ant-btn {
    &:active,
    &:hover {
      color: ${({ theme }) => theme.talk_primary};
      border-color: ${({ theme }) => theme.talk_primary};
    }
  }
  width: 100%;
  .ant-form-item-control-input {
    box-shadow: none;
    border-color: ${({ theme }) => theme.talk_primary};
    &:active,
    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.talk_primary};
      box-shadow: none;
    }
  }
  .ant-input-affix-wrapper.ant-input-affix-wrapper-focused {
    border-color: ${({ theme }) => theme.talk_primary};
    box-shadow: none;
    &:active,
    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.talk_primary};
      box-shadow: none;
    }
  }
  .ant-form-item-control-input-content {
    &:active,
    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.talk_primary};
      box-shadow: none;
    }
  }
  .ant-input-affix-wrapper {
    background: #faf9f7;
    padding: 0;
    padding-left: 14px;
    &:active,
    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.talk_primary};
      box-shadow: none;
    }
  }
  .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
    border-color: ${({ theme }) => theme.talk_primary};
  }

  input {
    padding: 16px 14px 16px 14px;
    font-size: 14px;
    line-height: 16px;
    background: #faf9f7;
    color: #838383;
  }
`

export const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
`

export const StyledRedirectPageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  .ant-btn {
    &:hover,
    :focus {
      color: ${({ theme }) => theme.green};
      border-color: ${({ theme }) => theme.green};
    }
  }
`
