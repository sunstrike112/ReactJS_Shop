import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.div`
  width: 100%;
  padding: 0 24px;
  overflow: auto;
  color: ${({ theme }) => theme.text_primary};

  .anticon-search {
    margin-right: 0;
  }
`

export const Block = styled.div`
  width: 80%;
  margin: 1rem auto;
`

export const Table = styled.table`
  width: 100%;
`

export const TBody = styled.tbody`
`

export const Tr = styled.tr`
`

export const Th = styled.td`
  background-color: #E5E3E3;
  border: 1px solid #ccc;
  width: 250px;
  padding: .5rem .025rem;
  font-weight: 600;
  display: flex;
`

export const Td = styled.td`
  border: 1px solid #ccc;
  padding: .5rem .025rem;
  word-break: break-all;
`

export const WrapperButton = styled.div`
  text-align: center;
  margin-top: .5rem;

  .ant-space {
    flex-wrap: wrap;
    justify-content: center;
  }
`

export const RouterLink = styled(Link)`
  display: inline-block;
  margin-top: .75rem;
  padding: .5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fcfbfb;
  color: #000;
`
export const Loading = styled.div`
  display: flex;
  height: 452px;
  width: 100%;
  justify-content: center;
  align-items: center;
`
