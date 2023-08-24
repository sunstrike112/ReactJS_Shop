import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../themes'

const Style = styled.div`
  width: 100%;
  display: flex;
  background: ${({ theme }) => theme.white};
  justify-content: space-between;
  padding-top: 28px;
  .container {
    width: 100%;
    max-width: 2400px;
  }
  .padding22w {
    padding-right: 22.05vw!important;
  }
  .top {
    display: flex;
    align-items: start;
    position: relative;
    padding-left: 17.5vw;
    padding-right: ${({ isFree }) => (isFree ? '23.05vw' : '12.05vw')};

    .course-header {
      width: 300px;
      height: 0; 
      position: absolute;
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
        img {
          margin-right: 15px;
        }
      }
    }
    .course-content {
      width: 100%;
      .course-content-bottom {
        margin: 0 0 80px 0;
        .categories-box {
          width: 30%;
          margin-right: 5%;
        }
        .course-list {
          width: 100%;
          .course-title{
            margin-bottom: 4px;
          }
        }
      }
    }
    @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
      padding: 0px 10vw;
    }
    @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
      padding: 0px 10px;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
  .back-button {
    border: 1px solid ${({ theme }) => theme.grey_blur};
    @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
      display: none;
    }
    margin-right: 32px;
    border-radius: 6px;
    span {
      color: ${({ theme }) => theme.white};
      font-weight: ${({ theme }) => theme.fw_600};
    }
  }
  .back-button-mobile {
    border: 1px solid ${({ theme }) => theme.grey_blur};
    @media screen and (min-width: ${MEDIA_WIDTHS.upToMedium}px) {
      display: none;
    }
    border-radius: 6px;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .buy-course-box {
    width: 381px;
    margin-top: 25px;
    margin-left: 32px;
    border: 1px solid #F1F1F1;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 20px;
    background: ${({ theme }) => theme.white};
  }
  .add-to-card-btn {
    border-radius: 6px;
    margin: 12px 0px;
    width: 100%;
    flex: none;
    display: inline-block
  }

  .buy-now-btn {
    border-radius: 6px;
    margin: 12px 0px;
    width: 100%
  }
`
export default Style
