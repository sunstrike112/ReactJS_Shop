/* eslint-disable eol-last */
import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../../themes'

export const PassWrapper = styled.div`
  padding: 32px;
  flex: 1;
  border: 1px solid ${({ theme }) => theme.grey_blur};
  border-radius: 8px;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    padding: 15px;
  }
  .pass__header {
    margin-bottom: 24px;
  }
  button {
    border-radius: 6px;
    margin-left: 205px;
    margin-top: 10px;
    padding: 12px 28px;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
      margin-left: 0;
      width: 100%;
    }
  }
`
