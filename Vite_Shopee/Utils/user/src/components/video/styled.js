import { Row } from 'antd'
import styled from 'styled-components'

export const Wrapper = styled.div`
  .lesson-video {
    display: flex;
    /* width: 40%; */
    position: relative;
    justify-content: center;
  }
  
  .control_modal {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    background: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .control_modal_action {
    .slider {
      padding: 0;
      margin: 0 6px;
      margin-top: 24px;
    }
    .control_modal_bottom_action {
      display: flex;
      height: 32px;
      align-items: center;
      justify-content: space-between;
      margin-left: 10px;
      margin-right: 16px;
      
      .control_modal_bottom {
        height: 100%;
        display: flex;
        align-items: center;

        

        img {
          margin: 0;
          padding: 0;
          width: 18px;
        }

        .button-action {
          color: #fff;
          width: 24px;
          cursor: pointer;
          margin: 0;
          width: 18px;
        }

        .sound_button {
          width: 18px;
          margin: 0;
          margin-left: 8px;
        }

        .sound_slider {
          width: 100px; 
          margin: 0;
          margin-left: 15px;
          margin-top: 5px;
          padding: 0;
        }
      }
    }
  }
  .time {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 11;

    .video-time {
      color: #fff;
      margin-bottom: 5px;
      margin-left: 16px;
    }
  }
`

export const BtnControlWrapper = styled.div`
  &.wrapper-btn {
    visibility: hidden;
    opacity: 0;
  }

  .clickAble {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background: rgba(0, 0, 0, 0.3);
  padding: 8px;
  border-radius: 50%;
  z-index: 2;
  transition: opacity 0.25s ease 0s;

  svg {
    fill: white;
  }

  &.replay-btn {
    opacity: 0.5;
  }

  &:hover {
    opacity: 1 !important;
  }
`

export const VideoWrapper = styled.div`
  position: relative;

  video {
    opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  }

  video::-webkit-media-controls-play-button {
    visibility: ${({ isEnded }) => (isEnded ? 'hidden' : 'show')};
  }
  .replay-icon {
    visibility: ${({ isEnded }) => (isEnded ? 'show' : 'hidden')};
    position: absolute;
    bottom: 36px;
    left: 6px;
    fill: white;
    cursor: pointer;
    border-radius: 50%;
    z-index: 1;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    transition: background-color 0.25s ease 0s;
  }
  .replay-icon:hover {
    background-color: rgba(32, 33, 36, 0.71);
  }

  &:hover ${BtnControlWrapper} {
    opacity: 0.5;

    &.continue-btn {
      visibility: ${({ isPause, isHover }) => (isPause && isHover ? 'visible' : 'hidden')};
    }

    &.pause-btn {
      visibility: ${({ isPause, isHover }) => (isPause ? 'hidden' : isHover ? 'visible' : 'hidden')};
    }
  }

  .video-box {
    position: relative;
  }
`

export const VideoLoader = styled(Row)`
  position: absolute;
  height: 100%;
  width: 100%;
`

export const FormRequestPassword = styled.div`
  margin-top: 10px;

  .ant-form-item {
    &:first-child {
      .ant-input {
        border: none;
      }
    }
  }
`
