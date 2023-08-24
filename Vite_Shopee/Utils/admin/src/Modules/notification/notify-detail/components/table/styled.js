import styled from 'styled-components'

export const ListButton = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  button {
    margin: 10px 0px;
    border: 1px solid #2B55EF;
    color: #2B55EF;
	}
`

export const TableHeader = styled.table`
  width: 100%;
  margin-bottom : 10px;
  margin-top: 10px;
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
export const ActionGroup = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  width: 80%;
  justify-content: space-between;
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
export const RecordCounting = styled.section`
  display: flex;
  justify-content: space-between
`
export const NumberSelectedRecord = styled.div`
  visibility: hidden;
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
