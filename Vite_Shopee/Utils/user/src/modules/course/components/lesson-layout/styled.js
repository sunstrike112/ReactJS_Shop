import styled from 'styled-components'

export const LessonVideoWrapper = styled.div`
  background: ${({ theme }) => theme.white};
  height: 100vh;

  .ant-progress-bg {
    height: 2px !important;
  }

  .course_required_container{
    display: flex;
    background: ${({ theme }) => theme.white};
  }

  .course {
    height: 100%;
    width: calc(100vw - ${({ isToggle }) => (!isToggle ? '72' : '461')}px);

    .video-header {
      display: flex;
      justify-content: space-between;
      z-index: 100; 
      position: fixed;
      background: white;
      width: calc(100vw - ${({ isToggle }) => (!isToggle ? '72' : '461')}px);
      @media screen and (max-width: 1024px) {
        width: 100vw;
      }
      top: 0;
      padding: 14px 32px;
      border-bottom: 1px solid ${({ theme }) => theme.grey_blur};
      button {
        border-radius: 6px;
        border: 1px solid #F1F1F1;
        span {
          color: ${({ theme }) => theme.white};
          font-weight: ${({ theme }) => theme.fw_600};
        }
      }
    }
    .video-content {
      margin: ${({ description }) => (description ? '94px 50px 0px 50px' : '70px 0px 0px 0px')};
  
      .list_program {
        display: flex;
        margin: 20px 0;
        width: 100%;
        justify-content: space-between;
  
        .program_item {
          gap: 16px;
  
          .lesson_tab {
            cursor: pointer;
  
            &.active {
              border-bottom: 2px solid #00C271;
              color: #00C271;
            }
          }
        }
      }
    }
    .video-container {
      video {
        width: 100%;
        height: ${({ videojs }) => (videojs ? '100%' : 'auto !important')};
        border-radius: 8px;
      }   
    }
  }

  .course-info {
    padding-bottom: 20px;
    padding-top: 8px;
    .process {
      display: flex;
      padding: 4px 8px;
      border-radius: 4px;
      width: 89px;
      background: ${({ theme }) => theme.yellow_blur};
    }
    .lesson-name {
      margin-bottom: 26px;
    }

    .course_item{
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  .btn_prev_video {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sidebar {
    z-index: 101;
    position: fixed;
    right: 0;
    width:  ${({ isToggle }) => (!isToggle ? '72px' : 'calc(470px)')};
    background: ${({ theme }) => theme.white};
    box-shadow: -4px 0px 12px rgba(0, 0, 0, 0.03);
    height: 100%;
    display: ${({ isToggle }) => (!isToggle ? 'flex' : null)};
    justify-content: ${({ isToggle }) => (!isToggle ? 'center' : null)};
    align-items: ${({ isToggle }) => (!isToggle ? 'flex-end' : null)};
    .header {
      padding: 13px 16px;
    }
    .bottom {
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      img {
        cursor: pointer;
      }
      margin-right: ${({ isToggle }) => (!isToggle ? '' : '20px')};
      button {
        font-weight: 600;
        height: auto;
        white-space: normal;
        padding: .25rem;
        margin: 0 .25rem;
      }
    }
    .title {
      margin-bottom: 12px;
    }
    input { 
      &:focus {
        border: 1px solid ${({ theme }) => theme.grey};
      }
      border: 1px solid ${({ theme }) => theme.grey_blur};
    }
  }
  .lesson-list {
    padding-left: 16px;
    margin-right: 16px;
    overflow-y: auto;
    height: calc(100vh - 141px);
    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-thumb {
      background: #838383;
    }
    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.bg_scroll_bar};
    }
  }
  video {
    max-height: ${({ videojs }) => (videojs ? '100%' : 'calc(100vh - 100px)')};
  }

`
