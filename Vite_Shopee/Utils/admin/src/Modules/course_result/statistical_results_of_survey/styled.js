import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 24px;
  flex-direction: column;
  overflow: auto;
  color: ${({ theme }) => theme.text_primary};

  .anticon-search {
    margin-right: 0;
  }
`
export const Header = styled.div`
  width: 100%;
  display: flex;
  height: 120px;
  background-color: ${({ theme }) => theme.bg_block};
  border: 1px solid ${({ theme }) => theme.text_secondary};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.125);
  margin: 24px 0;
  padding: 16px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  span {
    margin-right: 10px;
  }
`

export const Title = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  padding: 20px;
  align-items: center;
  font-size: 24px;
  background-color: ${({ theme }) => theme.bg_block_header};
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  .icon {
    stroke: ${({ theme }) => theme.primary};
    margin-right: 16px;
  }
`

export const Filter = styled.div`
  width: 50%;
  display: flex;
  margin: 30px auto;
  flex-direction: column;
`
export const TotalRecord = styled.div`
  align-self: flex-end;
  height: 60px;
  width: 220px;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.text_primary};
  border-radius: 4px;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 16px;
`
export const Action = styled.div`
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
