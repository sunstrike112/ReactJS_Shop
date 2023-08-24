import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../themes'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  .container {
    background: ${({ theme }) => theme.white};
    padding: 40px 12px 5px 12px;
  }
  
  .top {
    position: relative;
    .seminar-content {
      padding: 0 80px;
      @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
        padding: 5px 32px;
      }
      @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
        padding: 5px 0px;
      }
      @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
        padding: 5px;
      }
      .seminar-block {
        background: #FAF9F7;
        border-radius: 8px;
        padding: 30px 24px;
      }
      .is-empty {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 300px); 
      }
    }
    .course-header {
      width: 300px;
      height: 0; 
      left: -20px;
      top: -58px;
      border-right: 120px solid transparent;
      border-bottom: 60px solid ${({ theme }) => theme.white};
      border-left: 0px solid transparent;
      box-sizing: content-box;
      p {
        font-weight: bold;
        padding-left: 32px;
        line-height: 58px;
      }
    }
    .course-content {
      padding: 5px 130px;
      @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
        padding: 5px 32px;
      }
      @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
        padding: 5px 0px;
      }
      .course-type-title {
        margin-bottom: 10px;
        > div {
          border-top-right-radius: 3px;
          border-top-left-radius: 3px;
        }
        p {
          font-weight: 600;
        }
      }
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const SeminarListWrapper = styled.div`
  width: 100%;
  .time {
    display: flex;
    align-items: center;
      p {
      color: ${({ theme }) => theme.progress_success};
      margin-left: 10px;
      position: relative;
      width: 100%;
      .calendar {
        position: relative;
        background: #FAF9F7;
        z-index: 1
      }
      &::after {
        content: "";
        display: block;
        width: 100%;
        background-color: ${({ theme }) => theme.progress_success};
        height: 2px;
        position: absolute;
        right: 0;
        top: 10px;
      }
    }
  }
  .seminar-list {
    display: flex;
    align-items: flex-start;
    margin: 24px 0px;
    flex-wrap: wrap;
  }
`

export const SeminarBox = styled.div`
  width: 20%;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    width: 50%;
  }
  @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    width: 25%;
  }
  align-items: center;
  padding: 8px;
  cursor: pointer;
  .seminar-box {
    border: 1px solid #F1F1F1;
    box-sizing: border-box;
    border-radius: 8px;
    background: #FFFFFF;
    padding: 16px;
    &-time {
      display: flex;
      justify-content: center;
      @media screen and (max-width: ${MEDIA_WIDTHS.upToBigLager}px) {
        flex-direction: column;
      }
      p {
        color: ${({ theme }) => theme.yellow};
      }
    }
    .seminar_cover {
      width:100%;
      object-fit: cover;
      height: 130px;
      @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
        height: 100px;
      }
    }
    .seminar_title {
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 1em;
      height: 2em;
      margin-top: 10px;
    }
  }
`
export default Wrapper
