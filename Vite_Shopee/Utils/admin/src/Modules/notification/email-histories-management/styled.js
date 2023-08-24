import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 0 24px;
  color: ${({ theme }) => theme.text_primary};
`
export const ActionGroup = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  width: 80%;
  justify-content: space-between;
  .icon {
    cursor: pointer;
    transition: opacity 0.2s;
    fill: ${({ theme }) => theme.white};
    background: ${({ theme }) => theme.primary};
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
