import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../themes'

export const NotificationWrapper = styled.div`
  padding: 40px 130px;
  @media (max-width: 1024px) {
    padding: 40px 20px;
  }
  @media (max-width: 768px) {
    padding: 40px 20px;
  }

  .list-container {
    display: flex;
    flex-direction: column;
    > * {
      &:first-child {
        margin-bottom: 20px;
      }
    }
  }

  .content {
    min-height: calc(100vh - 64px - 322px);
    padding: 32px;
    height: 100%;
    border: 1px solid ${({ theme }) => theme.grey_blur};
    border-radius: 8px;
    background: ${({ theme }) => theme.white};
    margin-bottom: 16px;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
      padding: 16px;
    }
  }

  .list-empty {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
    flex-direction: column;
    min-height: calc(100vh - 64px - 382px);
    p {
      text-align: center;
    }
  }
  .filter {
    align-items: center;
    display: flex;
    margin-bottom: 24px;
    justify-content: space-between;
    input {
      border: 1px solid ${({ theme }) => theme.grey_blur};
      &:focus {
        border: 1px solid ${({ theme }) => theme.grey};
      }
      &:hover {
        border: 1px solid ${({ theme }) => theme.grey};
      }
    }
  }
  .header {
    margin-bottom: 26px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
      flex-direction: column;
    }
    &__left {
      display: flex;
      align-items: center;
      @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
        margin-bottom: 10px;
      }
      .total-notify {
        padding: 8px;
        margin-left: 16px;
        border-radius: 4px;
        background: ${({ theme }) => theme.grey_blur};
      }
    }
    .group-action {
      display: flex;
      align-items: center;
      button {
        margin-right: 20px;
      }
    }
    input {
      @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
        width: 300px;
      }
      @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
        width: 100%;
      }
    }
  }
`
export const NotifyBox = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px 16px;
    background: ${({ theme, status }) => (status ? theme.white : theme.bg_notification)};
    border-top: 1px solid ${({ theme }) => theme.grey_blur};
    .checkbox {
      margin-right: 12px;
      width: 16px;
      height: 16px;
    }
    .notifybox {
      flex: 1;
      cursor: pointer;
    }
    .notifybox-container {
      display: flex;
      width: 100%;
    }
    .notifybox-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &:hover {
      background: ${({ theme }) => theme.green_light};
    }
    .description {
      margin-bottom: 8px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .notifybox-header {
      display: flex;
      margin-bottom: 8px;
      align-items: center;
      justify-content: space-between;
    }
    .unread-circle {
      width: 8px;
      height: 8px;
      background: ${({ theme }) => theme.green};
      border-radius: 50%;
    }
    .date {
      display: flex;
      align-items: center;
      img {
        margin-right: 10px;
      }
    }
  }
  a:last-child {
    .notify-box {
      border-bottom: 1px solid ${({ theme }) => theme.grey_blur};
    }
`
export const AllDisplayed = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  background: ${({ theme }) => theme.bg_course_status};
  color: ${({ theme }) => theme.grey};
`
