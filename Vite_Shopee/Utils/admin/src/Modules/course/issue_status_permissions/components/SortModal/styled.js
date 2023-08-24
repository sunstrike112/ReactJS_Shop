import styled from 'styled-components'

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

export const RecordCounting = styled.section`
  display: flex;
  justify-content: space-between
`
