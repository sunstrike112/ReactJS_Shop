import styled from 'styled-components'
import { InternalLink } from '../link'
import { MEDIA_WIDTHS } from '../../themes'

export const Wrapper = styled.div`
  height: 64px;
  width: 100%;
  background: no-repeat center ${({ theme }) => theme.bg_header};
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.grey_blur};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  z-index: 1;

  @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    width: max-content;
  }
  .talk-board-unread {
    position: relative;
    .unread-count {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      background-color: #f33a27;
      width: 23px;
      height: 23px;
      color: white;
      border-radius: 50%;
      bottom: 13px;
      left: 10px;
      font-size: 12px;
      z-index: 123;
    }
  }
  .line {
    width: 1px;
    background: ${({ theme }) => theme.grey_blur};
    height: 32px;
    margin: 0 20px;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
      display: none;
    }
  }
  .d-flex {
    display: flex;
  }
  .notice-number {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    left: 10px;
    align-items: center;
    top: 2px;
    justify-content: center;
    background: ${({ theme }) => theme.error};
  }
  .language-box {
    position: absolute;
    top: 45px;
    right: 10px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.grey_blur};
    width: 140px;
    background: ${({ theme }) => theme.white};
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);
    div {
      height: 40px;
      align-items: center;
      display: flex;
      padding-left: 20px;
      img {
        margin-right: 12px;
      }
      &:hover {
        background: ${({ theme }) => theme.green_light};
      }
    }
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .justify-content-end {
    justify-content: flex-end;
  }
`
export const Left = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    width: max-content;
  }
  @media screen and (max-width: 1024px) {
    margin-left: 10px;
  }
  .sidebar__icon {
    display: none;
  }
  .logo__company {
    img {
      width: 120px;
      height: 60px;
      object-fit: contain;
    }
    @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
      padding: 10px;
    }
  }
  .ant-cascader-picker-arrow {
    display: none;
  }
  .ant-cascader-menus {
    display: none;
  }
  .ant-cascader-picker-label {
    display: none;
  }
  .search__desktop {
    margin-left: 45px;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
      margin-left: 10px;
    }
    @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
      display: none;
    }
    input {
      border: 1px solid ${({ theme }) => theme.grey_blur};
    }
  }
  .search__tablet {
    position: absolute;
    display: flex;
    width: calc(100vw - 40px);
    padding: 15px 0;
    z-index: 100;
    background: ${({ theme }) => theme.white};
    input {
      width: calc(100vw - 80px);
      border: 1px solid ${({ theme }) => theme.grey_blur};
    }
  }
  .category-modal {
    @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
      display: none;
    }
    .category-text {
      font-weight: ${({ theme }) => theme.fw_600};
      font-size: ${({ theme }) => theme.size_16};
      color: ${({ theme }) => theme.black};
      cursor: pointer;
    }
    input {
      display: none;
    }
  }
`
export const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  > div {
    margin-left: 16px;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
      margin-left: 10px;
    }
  }
  .link__page {
    &.talk__board {
      margin-right: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
      padding: 0 10px;
    }
  }

  .link__page.talk__board {
    @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
      padding: 0 0;
    }
  }
  .search__icon {
    margin-right: 10px;
    @media screen and (min-width: ${MEDIA_WIDTHS.upToMedium}px) {
      display: none;
    }
  }
`
export const Link = styled(InternalLink)`
  color: ${({ theme, location }) => (location === '/' ? theme.green : theme.grey)};
  font-size: 16px;
  font-weight: 600;
  padding: 0;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    font-size: 14px;
  }
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    font-size: 10px;
  }
  &.sign__up {
    width: 140px;
    padding: 10px 0;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.grey_blur};
    @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
      width: 100px;
    }
    @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
      width: 60px;
      padding: 10px 0;
    }
    &:hover {
      border-color: ${({ theme }) => theme.green};
      transition: 0.3s;
    }
  }
  &:hover {
    text-decoration: none;
    color: ${({ theme }) => theme.green};
  }
  &:active {
    text-decoration: none;
    color: ${({ theme }) => theme.green};
  }
  &:focus {
    outline: none;
    text-decoration: none;
    color: ${({ theme }) => theme.green};
  }
`

export const StyledDailyReportWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .totalUnread {
    padding: 2px 5px;
    background: ${({ theme }) => theme.grey_blur};
    color: ${({ theme }) => theme.green};
    border-radius: 4px;
    font-weight: 600;
  }
`
