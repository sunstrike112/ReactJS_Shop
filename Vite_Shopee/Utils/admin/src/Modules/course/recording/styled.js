import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: calc(100vh - 39px);
  padding: 0 24px;
  background: ${({ theme }) => theme.white};
`
