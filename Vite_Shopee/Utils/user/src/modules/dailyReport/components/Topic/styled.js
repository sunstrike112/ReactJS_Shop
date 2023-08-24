import styled from 'styled-components'

export const StyledWrapper = styled.div`
  background-color: ${({ isRead, theme }) => (isRead ? theme.white : theme.grey_blur)};
  position: relative;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.grey_blur};
  border-radius: 8px;
  margin-bottom: 5px;
  cursor: pointer;

  .ant-row {
    .ant-col {
      &:first-child {
        border-right: 1px solid ${({ theme, isRead }) => (isRead ? theme.grey_blur : theme.white)};
        padding-right: 14px;
      }
      &:nth-child(2) {
        cursor: pointer;
        padding-left: 14px;
      }
    }
  }

  .heading {
    width: 100%;
    justify-content: space-between;

    .fullName,
    .title {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-break: break-word;
    }

    &__img {
      width: 54px;
      height: 54px;
      object-fit: cover;
      border-radius: 4px;
    }

    &__file {
      width: 30px;
      height: 30px;
    }
  }

  .content {
    width: 100%;
    height: 100%;
    &__text {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: pre-line;
      word-break: break-word;
    }
  }

  .title-wrapper {
    cursor: default;
    .date__group {
      justify-content: flex-end;
      .ant-space-item:nth-child(3) {
        cursor: pointer;
        padding-top: 5px;
      }
    }
  }

  .ant-dropdown {
    min-width: 180px;
    padding: 5px 0;
  }
  .ant-dropdown-menu-item {
    padding: 4px 12px;
    div {
      padding: 6px 14px;
    }
    &:hover {
      background-color: ${({ theme }) => theme.talk_hover};
    }
  }

  .icon-unread {
    position: absolute;
    right: 5px;
    top: 10px;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.talk_primary};
  }

  .date__group {
    display: flex;
    justify-content: flex-end;
    .ant-space-item {
      display: flex;
      align-items: center;
    }
    .anticon {
      color: ${({ theme }) => theme.text_primary};
    }
    .detail {
      cursor: pointer;
    }
  }

  .social {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;

    margin-right: 8px;
    p {
      padding-right: 10px;
    }
  }

  .topic__media {
    width: 100%;
    overflow-y: hidden;
    .ant-image {
      margin-bottom: 16px;
      max-width: 458px;
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
    }
    &.show-more-media {
      max-height: max-content;
      overflow-y: unset;
      display: flex;
      flex-direction: column;
    }
  }
`

export const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  padding: 11px 14px;
  .text {
    margin-left: 14px;
  }
`
