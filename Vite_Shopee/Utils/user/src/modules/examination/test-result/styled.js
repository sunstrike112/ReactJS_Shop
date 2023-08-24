/* eslint-disable react/prop-types */
import styled from 'styled-components'

export const Wrapper = styled.div`
  .answer {
    margin-top: 32px;
  }
  .examination-confirm-container {
    margin-bottom: 60px;
  }
  .examination-confirm-container:last-child {
    margin-bottom: 0px;
  }
  .confirm-box {
    background: ${({ theme }) => theme.white_blue};
    border: 1px solid ${({ theme }) => theme.grey_blur};
    padding: 16px 32px;
    margin-bottom: 40px;
  }
  .examination-result {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .d-flex {
    display: flex;
  }
  .m-4 {
    margin: 0px 4px;
  }
  .complete-box {
    margin-top: 16px;
    background: ${({ theme }) => theme.green_light};
    border-radius: 4px;
    padding: 12px 44px;
  }
  .result-box {
    width: 100%;
    margin-bottom: 16px;
    margin-top: 36px;
    border-top: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    justify-content: center;
    .result-box-content {
      padding: 8px 0px;
      display: flex;
      width: 60%;
      justify-content: space-around;
      .content-box {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
  .text-underline {
    text-decoration: underline;
  }
  .mb-12 {
    margin-bottom: 60px;
  }
`
