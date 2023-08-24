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

export const TermContent = styled.div`
  
  p {
    font-size: 14.5px;
    margin-bottom: 0;
    &.title {
      font-size: 16px;
    }
  }
  table {
    border: 1px solid black;
    text-align: left;

    tbody {
      tr {
        th {
          font-size: 14.5px;
          font-weight: 400;
          padding: 0 .5rem;
          border: 1px solid black;
          &:nth-child(1) {
            width: 30%
          }
          &:nth-child(2) {
            width: 70%
          }
        }
      }
    }
  }
`
