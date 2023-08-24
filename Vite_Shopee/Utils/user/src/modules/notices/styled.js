import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../themes'

export const Wrapper = styled.div`
  position: absolute;
  z-index: 9999;
  right: 70px;
  top: 65px;
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.grey_blur};
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.125);
  border-radius: 4px;
  margin-left: 0px !important;
  width: 360px;
  margin-right: 30px;
  display: flex;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    right: 0;
    width: 300px;
  }
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    right: -5%;
  }
  .notice-ctn {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }

  background: ${({ theme }) => theme.white};
  .d-flex {
    display: flex;
  }
  .action-bottom {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 16px;
    button {
      padding: 0px;
      border-radius: 48px;
      &:hover {
        border: 1px solid ${({ theme }) => theme.text_hight_light};
        p {
          color: ${({ theme }) => theme.text_hight_light};
        }
      }
    }
  }
`

export const NotifyLink = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  background: ${({ theme, status }) => (status ? theme.white : theme.grey_blur)};
  border-bottom: 1px solid ${({ theme }) => theme.grey_blur};
  .notify__title {
    width: 95%;
  }
  &:hover {
    background: ${({ theme }) => theme.green_light};
  }
  &.unread {
    position: relative;
    &:after{
      content: '';
      position: absolute;
      top: 14px;
      right: 16px;
      width: 8px;
      height: 8px;
      background: ${({ theme }) => theme.green};
      border-radius: 50%;
    }
  }
  p {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .date {
    display: flex;
    padding-top: 8px;
    align-items: center;
    img {
      margin-right: 4px;
    }
  }
`
export const EmptyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`

export const LoadingBox = styled.div`
  width: 100%;
  height: 125px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const NotifyList = styled.div`
  max-height: 420px;
  overflow-y: auto;
  border-bottom: 1px solid ${({ theme }) => theme.grey_blur};
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.text_tab_color};
    border-radius: 2px;
  }
  a {
    padding: 8px 16px;
    border-bottom: 1px solid ${({ theme }) => theme.grey_blur};
    background: ${({ theme }) => theme.white};
    &:hover {
      background: ${({ theme }) => theme.green_light};
    }
    p {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .date {
      display: flex;
      padding-top: 8px;
      align-items: center;
      img {
        margin-right: 4px;
      }
    }
    .unread {
      width: 8px;
      height: 8px;
      background: ${({ theme }) => theme.green};
      border-radius: 50%;
    }
  }
`
