import styled from 'styled-components'
import { MEDIA_WIDTHS } from 'Themes'

export const TitleWrapper = styled.div`
  margin-top: .7rem;
  width: 100%;
  height: 40px;
  display: flex;
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
  border-radius: .75rem;
  min-height: 3rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    height: auto;
  }
  .icon {
    stroke: ${({ theme }) => theme.text_primary};
    margin-right: .5rem;
    font-size: 1.2rem;
  }
  .title {
    font-size: 1.2rem;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
      font-size: 1rem;
    }
  }
  .left {
    display: flex;
    align-items: center;
    .action {
      margin-right: 1rem;
    }
    .separator {
      height: 2rem;
      border-left: 1px solid #adb5bd;
      margin-right: .75rem;
    }

    .title-wrap {
      display: flex;
      align-items: center;
    }
  }

  .right {
    display: flex;
    align-items: center;
    flex: 1;
    flex-wrap: wrap;
    justify-content: flex-end;
    .filter-tag {
      margin-right: .75rem;
      color: #4d67f6;
      background-color: #eceffd;
      border-color: #f0effb;
      text-align: center;
      vertical-align: middle;
      border: 1px solid transparent;
      padding: 0.25rem .75rem;
      border-radius: 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 480px;
      white-space: nowrap; 
    }
    .separator {
      height: 2rem;
      border-left: 1px solid #adb5bd;
      margin-right: .75rem;
    }
    .filter {
      color: #6c5dd3;
      background-color: #f0effb;
      border-color: #f0effb;
      display: inline-block;
      font-weight: 600;
      line-height: 1;
      text-align: center;
      text-decoration: none;
      vertical-align: middle;
      border: 1px solid transparent;
      padding: 0.5rem .75rem;
      font-size: .8rem;
      border-radius: .75rem;
      transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
      &:hover {
        color: #fff;
        background-color: #6c5dd3;
        border-color: #6c5dd3;
      }
    }
  }
`

export const BackWrapper = styled.div`
  color: #4d69fa;
  background-color: #edf0ff;
  padding: .4rem .85rem;
  border-radius: .75rem;
  cursor: pointer;
  & svg {
    margin-right: .5rem;
  }
`
