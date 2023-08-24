import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../themes'

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.white};

  .text-white.ant-progress .ant-progress-text {
    color: ${({ theme }) => theme.white};
  }

  .time-progress {
    display: flex;
    justify-content: center;
    margin-bottom: 61px;
  }
  .container {
    height: calc(100% - 380px);
    .question-numbers {
      display: flex;
      flex-wrap: wrap;
      margin: 0px 40px;
      .question-number-box {
        cursor: pointer;
        width: 25%;
        .number {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin-bottom: 20px;
        }
      }
    }
  }

  .open-icon {
    cursor: pointer;
    margin-bottom: 20px;
  }
`
const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 100vh;
  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: flex-end;
    margin: 80px 0px 112px 0px;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      margin-top: 120px;
    }
  }
  .content-child {
    float: right;
    padding: 16px 40px 0px 40px;
  }
`

const Network = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.error};
  padding: 4px;
`

export { Body, Wrapper, Network }
