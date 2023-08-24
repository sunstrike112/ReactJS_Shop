import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../../../themes'

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 400;
  .side-open {
    width: 268px;
    background: ${({ theme }) => theme.bg_examination};
    z-index: 300;
    height: 100%;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
      width: 150px;
    }
    .content {
      position: relative;
      margin-top: 50px;
      height: calc(100% - 52px);
      .header {
        text-align: center;
        div {
          background: #ffffff;
          height: 1px;
          opacity: 0.3;
          margin: 8px 31px 32px 31px;
        }
      }
      img {
        position: absolute;
        bottom: 0px;
        left: 20px;
        cursor: pointer;
      }
    }

    .container {
      max-height: calc(100% - 380px);
      display: flex;
      flex-wrap: wrap;
      margin: 0px 40px;
      overflow-y: auto;
      overflow-x: hidden;
      @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
        margin: 0px 20px;
      }
      ::-webkit-scrollbar {
        width: 4px;
      }
      ::-webkit-scrollbar-thumb {
        background: transparent;
      }

      &:hover {
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: #838383;
        }
      }
    }
  }

  .close-sidebar {
    width: 64px;
    background: ${({ theme }) => theme.bg_examination};
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: space-between;
    .header {
      margin-top: 13px;
    }
    .header {
      .header-icon {
        display: flex;
        justify-content: center;
        margin-bottom: 13px;
      }
    }
  }
`
export const Step = styled.div`
  margin: 4px;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme, isValid }) => (isValid ? theme.primary_btn : theme.white)};
  border-radius: 50%;
  border: 2px solid ${({ theme, isPassStep }) => (isPassStep ? theme.primary_btn : 'none')};
  cursor: pointer;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    width: 20px;
    height: 20px;
  }
`
