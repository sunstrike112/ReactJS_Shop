import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../themes'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
  padding: 0 250px;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    padding: 0 150px;
  }
  @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 0 100px;
  }
`

export const PolicyContent = styled.div`
  p {
    font-size: 16px;
    margin-bottom: 0;
    font-weight: 400;
  }
`
