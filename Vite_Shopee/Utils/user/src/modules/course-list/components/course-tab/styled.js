import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../../themes'

const Wrapper = styled.div`
  .course-tab-content {
    margin-bottom: 5px;
    display: flex;
    flex-wrap: wrap;
    border-radius: 8px;
    width: 100%;
    min-height: calc(100vh - 390px);
  }

  .course-empty {
    min-height: calc(100vh - 254px);
  }

  .justifyCenter {
    justify-content: center;
  }

  .course-tab {
    background: ${({ theme }) => theme.bg_cyan_white};
    @media screen and (min-width: 768px) {
      width: 700px;
    }
    @media screen and (min-width: 834px) {
      width: 805px;
    }
    @media screen and (min-width: 1440px) {
      width: 1072px;
    }
    .visible-class {
      visibility: hidden;
    }
    .header {
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: ${({ theme }) => theme.bg_cyan_white};

      @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
      .filter {
        color: ${({ theme }) => theme.text_primary};
        font-size: 14px;
        font-weight: 400;
        padding-bottom: 12px;

        display: flex;
        gap: 20px;

        @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
          margin-left: 10px;
        }
        .ant-checkbox-inner {
          width: 16px;
          height: 16px;
        }
      }
    }
    .tab-item {
      border: none;

      p {
        color: ${({ theme }) => theme.text_secondary};
        font-size: 20px;
        font-weight: 600;
      }

      &.active {
        background-color: transparent;
        p {
          color: ${({ theme }) => theme.text_active_green};
          font-weight: 600;
        }
      }
    }
  }

  .action-bottom {
    padding: 10px 0;
    display: flex;
    justify-content: flex-end;

    p {
      cursor: pointer;
      text-align: right;
      text-decoration-line: underline;
      color: ${({ theme }) => theme.secondary};
    }
  }

  .ant-checkbox-inner {
    border: 1px solid #838383;
    border-radius: 5px;
  }

  .ant-checkbox-inner::after {
    background: #00c271;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background: #00c271;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner {
    border-color: #00c271;
  }
`
export default Wrapper
