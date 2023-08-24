import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../themes'

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: no-repeat center ${({ theme }) => theme.white};
  background-size: cover;

  .text-white.ant-progress .ant-progress-text {
    color: ${({ theme }) => theme.white};
  }

  .time-progress {
    display: flex;
    justify-content: center;
    margin-bottom: 61px;
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
    @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
      margin-top: 100px;
    }
    @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
      margin-top: 120px;
    }
  }
  .content-child {
    float: right;
    padding: 40px 40px 0px 40px;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
      padding: 20px 20px 0px 20px;
    }
  }
`
const ContentChild = styled.div`
  padding: 40px 40px 0px 40px;
  width: ${({ isOpen }) => `calc(100% - ${isOpen ? '268px' : '64px'})`};
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    padding: 20px 20px 0px 20px;
    width: ${({ isOpen }) => `calc(100% - ${isOpen ? '150px' : '64px'})`};
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

export { Body, Wrapper, Network, ContentChild }
