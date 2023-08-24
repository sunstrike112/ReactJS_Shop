import { NormalButton } from 'Components'
import styled from 'styled-components'

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #323232;
  margin-top: 15px;
  padding: 24px;
  background: #FFFFFF;
  border-radius: 0.75rem;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 5%);
`

export const ContentItem = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 10px 0;

  > * {
    margin: 5px 0;
  }

  button.ant-switch {
    width: 50px;
  }

  button {
    width: max-content;
  }
`

export const UpdateButton = styled(NormalButton)`
  background: ${({ theme }) => theme.bg_primary};
  border: 1px solid ${({ theme }) => theme.bg_primary};
  color: ${({ theme }) => theme.white};
  font-weight: 600;
  font-size: .75rem;
  padding: .4rem 1.75rem;
  height: auto;
  border-radius: .75rem;
  &:hover,
  &:focus {
    background-color: #5d4eb3;
    border-color: #5d4eb3;
    color: ${({ theme }) => theme.white};
  }
`
