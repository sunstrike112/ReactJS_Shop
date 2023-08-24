import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../themes'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 64px;
  justify-content: space-between;
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 40px;
    width: 100%;
  }
  .examination-header {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 28px;
    width: 100%;
    .header-text {
      width: 50%;
      margin-top: 24px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
    }
  }
  .examination-content {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    .text-content {
      text-align: justify;
      -moz-text-align-last: center;
      text-align-last: center;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
    }
  }
  .examination-info {
    width: 55%;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.thirsdary};
    box-shadow: 0px 4px 4px ${({ theme }) => theme.bg_shadow_survey};
    padding: 24px 90px;
    margin: 0 auto;
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
      padding: 24px 40px;
    }
    @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
      flex-direction: column;
      padding: 10px;
    }
  }
  .examination-action {
    margin: 20px 0;
    justify-content: center;
    display: flex;
    div {
      width: 16px;
    }
  }

  .info {
    height: 73px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0.5px solid #bebebe;
    padding-left: 64px;
    padding-right: 64px;
  }

  @media screen and (max-width: 1024px) {
    .examination-content {
      width: 100%;
      padding: 0 16px;
    }
  }

  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    padding: 0 16px;
    .examination-header {
      margin-top: 16px;
      .header-text {
        margin-top: 8px;
        text-align: center;
      }
      p {
        font-size: 16px;
      }
    }
    .examination-content {
      width: 100%;
      padding: 0;
      .text-content {
        font-size: 14px;
      }
      // .examination-content-info {
      //   border-radius: 4px;
      //   border: 1px solid ${({ theme }) => theme.thirsdary};
      // }
    }

    // .info {
    //   display: flex;
    //   align-items: center;
    //   justify-content: space-between;
    //   border-bottom: 0.5px solid #bebebe;
    //   padding-left: 8px;
    //   padding-right: 8px;

    //   p {
    //     font-size: 12px;
    //   }
    // }
    .examination-action {
      margin-top: 24px;
      justify-content: center;
      display: flex;
      div {
        width: 16px;
      }
    }
  }

  .footer {
    height: 68px;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    border-top: 1px solid #f1f1f1;
    align-items: center;

    .clickAble {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    img {
      width: 32px;
    }
  }
`

export default Wrapper
