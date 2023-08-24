import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../../themes'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 64px);
  justify-content: space-between;

  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 40px 68px 40px;
    width: 100%;
    background: ${({ theme }) => theme.white};
  }
  .examination-header {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-top: 28px;
    .header-text {
      margin-top: 24px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
    }
  }

  .examination-content {
    margin-top: 8px;
    width: 875px;
    .text-content {
      text-align: center;
      margin-bottom: 24px;
    }
    .examination-content-info {
      border-radius: 4px;
      border: 1px solid ${({ theme }) => theme.thirsdary};
    }
  }

  .examination-action {
    margin: 20px 0;
    justify-content: center;
    display: flex;
    div {
      width: 16px;
    }
    &__button {
      margin-right: 20px;
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
      .examination-content-info {
        border-radius: 4px;
        border: 1px solid ${({ theme }) => theme.thirsdary};
      }
    }

    .info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 0.5px solid #bebebe;
      padding-left: 8px;
      padding-right: 8px;

      p {
        font-size: 12px;
      }
    }
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
    position: fixed;
    background: ${({ theme }) => theme.white};
    bottom: 0;
    height: 68px;
    padding: 0 40px;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
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
