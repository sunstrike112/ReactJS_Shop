import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Space } from 'antd'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 24px;
  flex-direction: column;
  min-height: calc(100vh - 39px);
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

export const ListButton = styled(Space)`
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0;
  align-items: center;
`

export const Action = styled.div`
  display: flex;
  justify-content: center;

  .anticon {
    cursor: pointer;
    transition: opacity 0.2s;
    width: 32px;
    height: 32px;
    padding: 8px;
    border-radius: 4px;
     &:hover {
      opacity: 0.8;
    }
  
    &:active {
      opacity: 0.7;
    }
  
    &.disabled {
      cursor: auto;
      opacity: 0.5;
    }
  }
`
