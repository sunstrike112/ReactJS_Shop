import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../../themes'

export const Wrapper = styled.div`
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      > * {
        display: inherit;
        align-items: center;
      }
      .user {
        gap: 8px;
      }
      .date {
        gap: 8px;
        &__icon {
          cursor: pointer;
          &:hover {
            path {
              stroke: ${({ theme }) => theme.talk_primary};
            }
          }
        }
      }
    }
    .topic__header {
      position: relative;
      display: flex;
      gap: 20px;

      &__left {
        flex: 1;
        &--title {
          position: relative;
          padding-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:after {
            content: '';
            position: absolute;
            width: 104px;
            height: 1px;
            bottom: 0;
            left: 0;
            background: ${({ theme }) => theme.black};
          }
          p {
            &:first-child {
              flex: 1;
            }
          }
        }
      }

      &__right {
        width: 50%;
        &--content {
          display: flex;
          justify-content: flex-end;
          gap: 20px;
          .item {
            width: 50%;
            .ant-tree-node-content-wrapper {
              white-space: nowrap;
              width: 200px;
              overflow: hidden;
              text-overflow: ellipsis;
              @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
                width: 150px;
              }
              @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
                width: 100px;
              }
            }
          }
        }
      }
      p {
        overflow-wrap: break-word;
        white-space: pre-line;
        word-wrap: break-word;
        word-break: break-word;
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
    
    .action-group {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 10px;
      .total-comment {
        display: inherit;
        align-self: inherit;
        gap: 4px;
        img {
          width: 20px;
          height: 20px;
        }
      }
      .complete-action {
        width: 42px;
        &.active {
          padding: 0 5px;
        }
      }
    }

    .list-tag {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      width: 100%;  
      gap: 8px;
      float: left;
      border-radius: 4px;
      p {
        padding: 3px 12px 5px 12px;
        color: ${({ theme }) => theme.text_primary} !important;
        background-color: ${({ theme }) => theme.grey_blur};
      }
    }

    .show-more {
      display: flex;
      align-items: center;
      margin-left: auto;
      border: none;
      background: none;
      box-shadow: none;
      p {
        color: ${({ theme }) => theme.talk_primary};
      }
      gap: 8px;
      .ant-image {
        margin-bottom: 0 !important;
      }
    }

    .file-download {
      display: flex;
      align-items: center;
      justify-content: flex-start;
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
`

export const WrapperContent = styled.div`
  margin-top: 12px;
  margin-bottom: 24px;
  p {
    line-height: ${({ lineHeight }) => `${lineHeight}`};
    margin-bottom: 30px;
    overflow-wrap: break-word;
    white-space: pre-line;
    word-wrap: break-word;
    text-align: justify;
    display: -webkit-box;
    -webkit-line-clamp: ${({ isShowMore }) => (isShowMore ? 15 : 'unset')};
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }
`
