import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../../themes'

export const MenuWrapper = styled.div`
  width: 350px;
  height: max-content;
  padding: 24px 30px;
  margin-right: 30px;
  border: 1px solid ${({ theme }) => theme.grey_blur};
  border-radius: 8px;

  @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    padding: 16px;
    margin-right: 16px;
    width: 240px;
  }

  @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    padding: 16px;
    margin-right: 16px;
    width: 140;
  }

  @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: auto;
    margin-right: 0;
    margin-bottom: 20px;
  }
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    padding: 15px;
  }
    .menu__title {
      position: relative;
      padding: 8px 0;
      margin-bottom: 20px;
        &:after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100px;
          height: 2px;
          background-color: ${({ theme }) => theme.black};
        }
    }
    .menu__tab {
      margin-left: 12px;
    }
`
export const MenuTab = styled.div`
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &.active {
    background-color: ${({ theme }) => theme.green_light};
  }

  @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    padding: 12px;
  }
`
