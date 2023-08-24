import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const WrapperTable = styled.div`
  .highlight-row {
    background: #ffb4b4;
    .ant-table-cell-row-hover {
      background: #ffb4b4 !important;
    }
  }
`

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 24px;
  flex-direction: column;
  overflow: auto;
  color: ${({ theme }) => theme.text_primary};
`

export const RouterLink = styled(Link)`
  display: inline-block;
  margin: 24px 0;
  padding: .5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fcfbfb;
  color: #000;
  width: max-content;
  span {
    margin-left: 10px;
  }
`
export const Box = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  width: 80%;
`

export const ButtonDetail = styled.div`
  color: ${({ theme }) => theme.text_blue};
  cursor: pointer;
`
