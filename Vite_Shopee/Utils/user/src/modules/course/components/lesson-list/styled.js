import styled from 'styled-components'

export const Wrapper = styled.div`
.lesson-header {
  margin-bottom: 24px;
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
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
    border: 1px solid ${({ theme }) => theme.grey_blur};
    margin-bottom: 20px !important;
    border-radius: 4px;
    .vote-container {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .unit__container {
      border-radius: 4px;
      padding: 16px 20px;
      background: ${({ theme, isactive }) => (isactive ? theme.bg_yellow_white : theme.bg_disable_lesson)};
      display: flex;
      align-items: center;
      position: relative;
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
      p {
        color:  ${({ theme, isactive }) => (isactive ? '' : theme.grey)};
      }
      &__content {
        flex: 1;
        &__header {
          display: flex;
          align-items: flex-start;
          &--right {
            display: flex;
            flex-wrap: wrap;
            .period_time {
              margin-left: 8px;
              padding: 4px 8px;
            }
          }
        }
      }

    }
    .evaluate {
      padding: 12px 19px;
      background: ${({ theme }) => theme.bg_status_resubmitted};
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
export const ToolTipLessonIconWrapper = styled.div`
  min-width: 200px;

  .lesson-tooltip-icon {
    margin-left: -8px;
    margin-right: -8px;
  }
  
  .ant-card-head {
    padding-left: 16px;

    .ant-card-head-title {
      padding: 10px 0px 12px;
      font-weight: 600;
    }
  }

  .ant-card-body {
    padding: 8px;
  }

  .ant-list-item {
    display: flex;
    align-items: center;
    justify-content: unset;
    padding: 8px;
  }
`

export const SearchEmpty = styled.div`
  margin-top: 100px;
  margin-bottom: 50px;
  text-align: center;
  p {
    margin-top: 39px;
  }
`
