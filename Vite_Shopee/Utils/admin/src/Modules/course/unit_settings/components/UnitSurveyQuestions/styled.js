import styled from 'styled-components'

export const Wrapper = styled.div`
`

export const Action = styled.div`
  display: flex;
  align-items: center;
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


 .order {
	display: flex;
	flex-direction: column;
 }
`

export const RecordCounting = styled.section`
  display: flex;
  justify-content: space-between
`

export const TotalRecord = styled.div`
  align-self: flex-end;
  font-weight: 600;
  padding: 10px;
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
