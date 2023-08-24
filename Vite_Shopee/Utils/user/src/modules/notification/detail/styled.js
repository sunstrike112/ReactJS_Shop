import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../themes'

export const DetailWrapper = styled.div`
  width: 100%;
  padding: 64px 280px 0px 280px;
  @media (max-width: 1430px) {
    padding: 64px 180px 0px 180px;
  }
  @media (max-width: 1024px) {
    padding: 64px 20px 0px 20px;
  }
  @media (max-width: 768px) {
    padding: 64px 20px 0px 20px;
  }
  .detail-box {
    border: 1px solid ${({ theme }) => theme.grey_blur};
    padding: 24px 32px;
    border-radius: 8px;
    width: 100%;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      padding: 16px;
    }
    .header {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: flex-start;
      .title {
        flex: 1;
      }
      .date-publish {
        width: 50%;
        padding-top: 8px;
        display: flex;
        justify-content: flex-end;
        img {
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }
      }
    }
    .avatar {
      margin: 8px 0px 16px 0px;
      display: flex;
      align-items: center;
      img {
        width: 32px;
        height: 32px;
        margin-right: 8px;
        border-radius: 50%;
      }
    }
    .content {
      padding: 12px;
      background: ${({ theme }) => theme.white_blue};
      border-radius: 6px;
      margin-bottom: 20px;
      color: ${({ theme }) => theme.grey};
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 28px;
      border-radius: 6px;
      background: ${({ theme }) => theme.green};
      color: ${({ theme }) => theme.white};
      border: 1px solid ${({ theme }) => theme.green};

      &:hover {
        background: ${({ theme }) => theme.green};
      }

      &:active {
        background: ${({ theme }) => theme.green};
      }

      &:focus {
        background: ${({ theme }) => theme.green};
      }
    }
      .view_details {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
`
