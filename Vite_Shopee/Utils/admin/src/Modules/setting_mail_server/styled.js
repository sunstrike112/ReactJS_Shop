import styled from 'styled-components'
import { Divider as DividerAntd } from 'antd'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1rem;
  min-height: calc(100vh - 39px);
  flex-direction: column;
  overflow: auto;
  color: ${({ theme }) => theme.text_primary};

  .form-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    background-color: ${({ theme }) => theme.white};
    border-radius: 0.75rem;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 5%);
    
    form {
      width: 70%;
    }

    .form-action-group {
      margin-top: 1rem;
      margin-bottom: 1rem;
      text-align: center;
    }
  }
`

export const Divider = styled(DividerAntd)`
  height: 2px;
  padding: 0;
  margin : 0;
`
export const Row = styled.div`
  display: flex;
  flex-direction: row;
`
export const Left = styled.div`
  display: flex;
  width: 30%;
  padding: 16px;
`

export const Right = styled.div`
  display: flex;
  width: 70%;
  padding: 16px;
  flex-direction: column;
`
