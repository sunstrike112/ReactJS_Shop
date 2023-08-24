import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../../themes'

export const WrapperPDF = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  .numberPdf {
    background: ${({ theme }) => theme.white_blue};
    width: 184px;
    position: fixed;
    height: 60px;
  }
  .text {
    margin-left: 32px;
    border: 1px solid ${({ theme }) => theme.grey_blur};
    border-radius: 6px;
    background: ${({ theme }) => theme.white};
    display: flex;
    justify-content: center;
    padding: 8px 24px;
    margin-top: 8px;
    width: 120px;
    margin-bottom: 8px;
  }
  .course-info {
    margin: 0 100px 0 280px;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
      width: calc(100% - 50px);
    }
  }
`
export const LeftPDF = styled.div`
  position: fixed;
  height: calc(100% - 130px);
  width: 184px;
  display: flex;
  bottom: 0;
  overflow: scroll;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.white_blue};
  img {
    width: 120px;
    height: auto;
    border-radius: 4px;
    cursor: pointer;
  }
  p {
    margin-bottom: 12px;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`
export const ContentPDF = styled.div`
  width: calc(100% - 184px);
  /* height: calc(100vh - 71px); */
  height: fit-content;
  display: flex;
  align-items: center;
  margin-left: 184px;
  .scroll-pdf {
    width: ${({ isFullScreen }) => (isFullScreen ? '100%' : 'calc(100% - 200px)')};
    border: 1px solid ${({ theme }) => theme.grey_blur};
    border-radius: 8px;
    overflow: scroll; 
    cursor: pointer;
    ::-webkit-scrollbar {
      display: none;
    }
    height: 100%;
  }
  .react-transform-wrapper {
    width: ${({ isFullScreen }) => (isFullScreen ? '100%' : 'calc(100% - 200px)')};
    border: 1px solid ${({ theme }) => theme.grey_blur};
    border-radius: 8px;
    overflow: scroll; 
    cursor: pointer;
    ::-webkit-scrollbar {
      display: none;
    }
    height: 100%;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
      width: ${({ isFullScreen }) => (isFullScreen ? '100%' : 'calc(100% - 50px)')};
    }
    @media screen and (max-width: ${MEDIA_WIDTHS.upTo}px) {
      width: ${({ isFullScreen }) => (isFullScreen ? '100%' : 'calc(100% - 10px)')};
    }
    .react-transform-component {
      @media screen and (min-width: ${MEDIA_WIDTHS.upToExtraLarge}px) {
        width: 99%;
      }
    }
  }
  
  .current-pdf {
    width: 100%;
    cursor: pointer;
  }
  .current-container {
    position: relative;
    display: flex;
    justify-content: center;
    background: ${({ theme }) => theme.white};
    /* height: ${({ isFullScreen }) => (isFullScreen ? '100vh' : 'calc(100vh - 170px)')}; */
    height: ${({ isFullScreen }) => (isFullScreen ? '100vh' : 'fit-content')};
  }
  .action {
    position: absolute;
    bottom: 0;
    right: 0;
    margin-right: ${({ isFullScreen }) => (isFullScreen ? '20px' : '120px')};
    margin-bottom: 14px;
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
      align-items:center;
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
    @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
      margin-right: 40px;
    }
  } 
`
export const ListPDF = styled.div`
  img {
    border: 2px solid ${({ currentpdf, theme }) => (currentpdf ? `${theme.green}` : `${theme.white_blue}`)}
  }
  width: 100%;
  display: flex !important;
  flex-direction: column; 
  align-items: center;
`
