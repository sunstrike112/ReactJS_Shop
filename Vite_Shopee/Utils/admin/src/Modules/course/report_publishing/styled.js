import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 24px;
  flex-direction: column;
  color: ${({ theme }) => theme.text_primary};

  .anticon-search {
    margin-right: 0;
  }
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

export const TableItem = styled.div`
  cursor: pointer;
  max-width: max-content;
  overflow: hidden;
  text-overflow: ellipsis;
`
