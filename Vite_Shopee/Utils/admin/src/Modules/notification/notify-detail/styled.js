import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 0 24px;
  color: ${({ theme }) => theme.text_primary};
`

export const Footer = styled.div`
margin-top: 24px;
  display: flex;
  justify-content: center;
`
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
