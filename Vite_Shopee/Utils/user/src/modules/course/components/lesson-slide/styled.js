import styled from 'styled-components'

export const Wrapper = styled.div`
  .iframe-wrapper {
    iframe {
      width: 100%;
      height: 600px;
    }
  }

  .previous {
    transform: rotate(180deg);
    user-select: none;
    img {
      margin-right: -10px;
    }
  }
  .next {
    user-select: none;
    img {
      margin-right: -10px;
    }
  }
 
  .slider-image {
    width: 100%;
    height: calc(50px + 3vw);
    object-fit: cover;
    border-radius: 4px;
  }
  .expect-4-3 {
    position: relative;
    width: 100%;
    padding-top: 75%;
    .current-image {
      position: absolute;
      border-radius: 4px;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);
    }
  }
  .expect-16-9 {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .current-image {
      width: 80%;
      height: 100%;
    }
  }
  .slide-padding {
    padding: 0 16px;
  }
  .slick-list .slick-track .slick-slide {
    padding: 0 7px;
  }
  .slick-list {
    z-index: 1000;
    margin-top: 20px;
  }

  .inactive {
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .current-slide {
    position: relative;
    max-height: ${({ isFullScreen }) => (isFullScreen ? '100vh' : '65vh')};
    height: 100%;

    .react-transform-wrapper {
      margin-bottom: 20px;
      width: 100%;
      border-radius: 8px;
      .react-transform-component {
        top: 0;
        max-height: ${({ isFullScreen }) => (isFullScreen ? '100vh' : '65vh')};
        height: 100%;
        min-height: 258px;
        overflow: scroll;
        width: 100%;
        ::-webkit-scrollbar {
          display: none;
        }
        div {
          width: 100%;
          height: 100%;
        }
        .image-box {
          width: 100%;
          position: relative;
        }
      }
    }

    .slide-info {
      position: absolute;
      z-index: 1;
      background: #000000;
      width: auto;
      height: auto;
      padding: 5px 12px;
      right: 10px;
      top: 10px;
      color: #ffffff;
      opacity: 0.8;
      border-radius: 20px;
    }
    .action {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 1024;
      margin-right: 8px;
      margin-bottom: 8px;
      background: ${({ theme }) => theme.white};
      height: 102px;
      width: 34px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      flex-direction: column;
      .box {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        &:nth-child(2) {
          border-top: 2px solid ${({ theme }) => theme.grey_blur};
          border-bottom: 2px solid ${({ theme }) => theme.grey_blur};
        }
        img {
          width: 18px;
          height: 34px;
        }
      }
    }
  }
  .arrows-slick {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0px;
    z-index: 1001;
    top: 50%;
    width: 100%;
    position: absolute;
    img {
      cursor: pointer;
    }
  }
`
export const SlideItem = styled.div`
  cursor: pointer;
  border: solid 3px ${({ theme, isActive }) => (isActive ? theme.green : theme.transparent)};
  border-radius: 6px;
`
