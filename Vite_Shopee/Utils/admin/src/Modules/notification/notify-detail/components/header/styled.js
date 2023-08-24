import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Table = styled.table`
  width: 100%;
  margin-bottom : 10px;
`

export const TBody = styled.tbody`
`

export const Tr = styled.tr`
`

export const Th = styled.td`
  background-color: #E5E3E3;
  border: 1px solid #ccc;
  width: 200px;
  padding: .5rem;
  font-weight: 600;
`

export const Td = styled.td`
  border: 1px solid #ccc;
  padding: .5rem;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;    
`

export const WrapperButton = styled.div`
  text-align: center;
  margin-top: .5rem;
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
