import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
`
export const Left = styled.div`
  display: flex;
  width: 30%;
  background-color: ${({ theme }) => theme.bg_primary};
  padding: 16px;
`

export const Right = styled.div`
  display: flex;
  width: 70%;
  padding: 16px;
  .ant-row {
    margin-bottom: 0;
  }
`
