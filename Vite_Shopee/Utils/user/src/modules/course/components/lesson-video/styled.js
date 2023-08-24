import styled from 'styled-components'

export const LessonVideoWrapper = styled.div`
  .video-header {
    padding: 14px 32px;
    border-bottom: 1px solid ${({ theme }) => theme.grey_blur};
    button {
      border-radius: 6px;
      background: ${({ theme }) => theme.grey_blur};
      span {
        color: ${({ theme }) => theme.black};
        font-weight: ${({ theme }) => theme.fw_600};
      }
    }
  }
  .video-container {
    margin: 24px 32px 0px 32px;
    // height: 100%;
    // width: 100%;
    video {
      width: 100%;
      height: auto !important;
      border-radius: 8px;
    }   
  }
  .course {
    width: calc(100% - ${({ isToggle }) => (!isToggle ? '72' : '461')}px);
  }
  .course-info {
    padding: 30px 32px 32px 30px;
    .process {
      display: flex;
      padding: 4px 8px;
      border-radius: 4px;
      width: 89px;
      background: ${({ theme }) => theme.yellow_blur};
    }
    .lesson-name {
      margin-top: 12px;
      margin-bottom: 26px;
    }
  }
  .sidebar {
    position: fixed;
    right: 0;
    width:  ${({ isToggle }) => (!isToggle ? '72' : '461')}px;
    background: ${({ theme }) => theme.white};
    box-shadow: -4px 0px 12px rgba(0, 0, 0, 0.03);
    height: 100%;
    display: ${({ isToggle }) => (!isToggle ? 'flex' : null)};
    justify-content: ${({ isToggle }) => (!isToggle ? 'center' : null)};
    align-items: ${({ isToggle }) => (!isToggle ? 'flex-end' : null)};
    .header {
      padding: 32px 16px;
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
    padding: 0px 16px;
    overflow: scroll;
    height: calc(100vh - 222px);
  }
`

export const Wrapper = styled.div`
  .video-js .vjs-load-progress {
    background: rgba(115, 133, 159, 1) !important;
  }
  #my-video {
    .ant-select-item.ant-select-item-option {
      padding: 5px 3px 5px 5px;
    }
    .ant-select.ant-select-single {
      display: ${({ isShowResolutionSelect }) => ((isShowResolutionSelect) ? 'inline-block' : 'none')};
    }
    .ant-select-dropdown {
      padding: 0;
      color: white;
    }
    .ant-select-item {
      background: #1E242C;
      color: white;
      border: 1px solid #1E242C;
    } 
    .ant-select-item:hover { 
        opacity: 0.6;
        color: black;
    }
    .ant-select-item.ant-select-item-option.ant-select-item-option-active,
    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
      background: #1E242C;
      color: white;
    }
    .ant-select-selection-placeholder {
      color: #fff;
    }
    .ant-select-focused .ant-select-selector,
    .ant-select-selector:focus,
    .ant-select-selector:active,
    .ant-select-open .ant-select-selector {
      border-color: #d9d9d9 !important;
      box-shadow: none !important;
    }
    .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
      background: #1E242C;
    }
    .ant-select-dropdown-hidden, 
    .ant-popover-hidden {
      /* display: block; */
    }
    .ant-select-selection-item {
      font-size: 14px;
      font-weight: 500;
    }
    .ant-select-selection-item > span:nth-child(1) {
      display: none;
    }
    .ant-popover-placement-top {
      padding-bottom: 0px;
    }
    .content:after {
      content: '';
      background-color: #1E242C;
      position: absolute;
      bottom: -5px;
      width: 65px;
      height: 10px;
    }
  }
  .video-js {
    height: calc(100vh - 170px);
    padding-top: 0;
    .resolution-div {
      width: ${({ languageStatus }) => ((languageStatus === 'jp' ? '80px' : (languageStatus) === 'en' ? '60px' : '70px'))};
      width: ${({ isDefaultResolution }) => ((!isDefaultResolution && '40px'))};
      display: ${({ isShowResolutionSelect }) => ((isShowResolutionSelect) ? 'inline-block' : 'none')};
    }
    .vjs-control-bar {
      background-color: #000;
    }
    .ant-select {
      position: absolute;
      z-index: 299;
      bottom: 0px;
      right: 75px;
      font-size: 12px;
      text-align: center;
      color: white;
      .ant-select-selector {
        background-color: #000;
        padding: 0;
        border: none;
        height: 30px;
        &:focus {
          border: none;
        }
      }
    }

    .vjs-playback-rate.vjs-menu-button.vjs-menu-button-popup.vjs-button {
      font-size: 10px;
    }

    button.vjs-playback-rate + .vjs-menu > .vjs-menu-content {
      bottom: 14px;
    }
    button.vjs-subs-caps-button + .vjs-menu > .vjs-menu-content {
      bottom: 15px;
    }

    .ant-btn {
      position: absolute;
      z-index: 299;
      bottom: 0px;
      right: 112px;
      font-size: 12px;
      text-align: center;
      color: white;
    }
    .ant-popover-content {
      @media screen and (max-width: 1280px) {
        display: block;
      }
    }
    .ant-popover-arrow {
      display: none;
    }
    .ant-popover-inner {
      background-color: #1E242C;
      border-radius: 0;
    }
    .ant-popover-inner-content{
      background-color: #1E242C;
      color: white;
      border-radius: 0;
      padding: 0px 0px;
    }

    .resolution-btn {
      display: ${({ isShowResolutionSelect }) => ((isShowResolutionSelect) ? 'inline-block' : 'none')};
      font-size: 14px;
      height: 30px;
    }
    
    .resolution-btn {
      padding-top: 2px;
    }

    .vjs-menu{
      padding-bottom: 20px;
    }

    .option-select {
      width: ${({ languageStatus }) => ((languageStatus === 'jp' ? '80px' : (languageStatus) === 'en' ? '60px' : '70px'))};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      line-height: 19px;
      background-color: #1E242C;
      opacity: 1;
  
      &.active{
        background-color: #fff;
        color: black;
      }
    }
    .option-select:hover {
      background-color: rgba(115, 133, 159, 1);
      &.active{
        background-color: #fff;
      }
    }
    * {
      animation-duration: 0s !important;
    }
    .popup-content {
      position: relative;
      bottom: -4px !important;
    }
  }

  @media screen and (min-width: 1550px) {
    ${({ sidebarToggle }) => !sidebarToggle && `
      height: calc(100vh - 170px);
      padding-top: 0;
    `}
  }

  /* iframe {
    width: 100%;
    height: calc(100vh - 170px);
  } */
`
