import styled from 'styled-components'

export const CommentWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ isRead, theme, isUserComment }) => (isUserComment ? 'white' : (isRead ? theme.white : theme.grey_blur))};
  position: relative;
  overflow: hidden;

  .info-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-info {
      display: inherit;
      align-items: inherit;
      gap: 8px;
    }
  }

  .action-group {
    display: flex;
    align-items: center;
    gap: 12px;
    > * { 
      display: inherit;
      align-items: center;
      p {
        line-height: 20px;
      }
      .ant-image {
        width: 20px;
        height: 20px;
      }
    }
    .btn-dislike {
      transform: rotate(180deg);
      .ant-image {
        margin-bottom: 6px;
      }
    }
    
    .ant-btn {
      padding: 0;
      border: unset;
    }
  }

  .time-info {
    display: flex;
    .button-read {
      margin-left: 8px;
      cursor: pointer;
    }
  }

  .icon-unread {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.talk_primary};
  }
`

export const HeaderCommentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 330px;
  .dropdown-header {
    display: flex;
    align-items: center;
    gap: 3px;
    padding: 3px 12px;
    border-radius: 8px;
  }
  .ant-btn {
    &:active, &:hover {
      color: ${({ theme }) => theme.talk_primary};
      border-color: ${({ theme }) => theme.talk_primary};
    }
  }
  .form-search {
    width: 100%;
    max-width: 334px;
    border-radius: 4px;
    height: 51px;
    .ant-form-item-control-input {
      box-shadow: none;
      border-color: ${({ theme }) => theme.talk_primary};
      &:active, &:hover, &:focus {
        border-color: ${({ theme }) => theme.talk_primary};
        box-shadow: none;
      }
    }
    .ant-input-affix-wrapper.ant-input-affix-wrapper-focused {
      border-color: ${({ theme }) => theme.talk_primary};
      box-shadow: none;
      &:active, &:hover, &:focus {
        border-color: ${({ theme }) => theme.talk_primary};
        box-shadow: none;
      }
    }
    .ant-form-item-control-input-content {
        &:active, &:hover, &:focus {
        border-color: ${({ theme }) => theme.talk_primary};
        box-shadow: none;
      }
    }
    .ant-input-affix-wrapper {
      background: #FAF9F7;
      padding: 0;
      padding-left: 14px;
      &:active, &:hover, &:focus {
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
      background: #FAF9F7;
      color: #838383;
    }
  }
`

export const BoxRead = styled.div`
  display: flex;
  align-items: center;
  padding: 11px 14px;
  .text {
    margin-left: 14px;
  }
`

export const ContentGroup = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  .content-group-des {
    line-height: ${({ lineHeight }) => `${lineHeight}`};
    margin-bottom: 8px;
    overflow-wrap: break-word;
    margin-right: 18px;
    display: -webkit-box;
    -webkit-line-clamp: ${({ isShowMore }) => (isShowMore ? 3 : 'unset')};
    -webkit-box-orient: vertical;  
    overflow: hidden;
    word-break: break-word;
    white-space: pre-wrap;
  }
  .content-group-expand {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    .ant-image {
      display: flex;
      align-items: center;
    }
  }
  img {
    max-width: 400px;
  }
  .list-media {
    display: flex;
    flex-direction: column;
    width: fit-content;
    .ant-image + .ant-image {
      margin-top: 16px; 
    }
    .ant-image {
      width: max-content;
    }
    .file-download {
      width: fit-content;
      .ant-btn {
        border: none;
        background: none;
        padding: 0;
        box-shadow: none;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      p {
        color: #1480FF;
        margin-bottom: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 1000px;
      }
    }
  }
`
