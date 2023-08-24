import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../../../themes'

export const Wrapper = styled.div`  
  /* background: ${({ theme }) => theme.bg_disable_lesson}; */
  .unit__container {
    position: relative;
    margin-right: 20px;
    p {
      word-break: break-word;
      white-space: pre-line;
    }
    .unit__new {
      position: absolute;
      top: 5px;
      right: -5px;
      z-index: 3;
      height: 32px;
      width: 54px;
      padding: 6px 10px 6px 12px;
      color: ${({ theme }) => theme.bg_primary};
      background: ${({ theme }) => theme.bg_mark_new};
      border-radius: 4px 4px 0px 4px;
      flex-direction: column;
      justify-content: center;
      font-weight: 400;
      font-size: 14px;
    }
    .unit__draw{
      position: absolute;
      top: 26px;
      right: -5px;
      width: 4px;
      height: 10px;
      z-index: 2;
      background: ${({ theme }) => theme.bg_mark_new_footer};;
      transform: matrix(1, -1, 0, 2, 0, 0);
    }
  }

  .lesson-header {
    margin-bottom: 24px;
    margin-top: 52px;
    display: flex;
    justify-content: space-between;

  /* .disableItem {
    background: ${({ theme }) => theme.bg_disable_lesson};
  } */

  input {
    max-width: 334px;
    border: 1px solid ${({ theme }) => theme.grey_blur};
    &:focus {
      border: 1px solid ${({ theme }) => theme.grey};
    }
  }
  .lesson-title {
    display: flex;
    align-items: center;
    img {
      margin-left: 9px;
    }
  }
}
`
export const LessonWrapper = styled.div`
    border: ${({ theme, currentLesson }) => (currentLesson ? `2px solid ${theme.green}` : `1px solid ${theme.grey_blur}`)};
    border-radius: 4px;
    padding: 0 20px;
    margin-bottom: 24px !important;
    background: ${({ theme, isactive }) => (isactive ? theme.white : theme.bg_disable_lesson)};
    &:last-child {
      margin-bottom: 0px;
    }
    @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
      padding: 10px 20px;
    }
    p {
      color:  ${({ theme, isactive }) => (isactive ? '' : theme.grey)};
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  .estimatedtime-box {
    padding: 4px 8px;
    background: ${({ theme }) => theme.white_blue};
    border-radius: 8px;
    margin-left: 8px;
    display: flex;
  }
  .notify-box {
    padding: 12px;
    margin-top: 20px;
    border-radius: 4px;
    display: flex;
    align-items: start;
    background: ${({ theme }) => theme.bg_notify_box};
    img {
      margin-right: 6px;
    }
  }
`
export const BoxStatusWrapper = styled.div`
  padding: 4px 8px;
  background: ${({ background, theme, isactive }) => (isactive ? theme[background] : theme.bg_disable_lesson)};
  border-radius: 8px;
`
