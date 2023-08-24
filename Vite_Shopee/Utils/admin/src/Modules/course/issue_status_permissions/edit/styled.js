import styled from 'styled-components'
import { Divider as DividerAntd } from 'antd'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 24px;
  flex-direction: column;
  overflow: auto;
  color: ${({ theme }) => theme.text_primary};

  .form-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;

    form, > div {
      width: 100%;
    }

    .form-action-group {
      margin-top: 1rem;
      text-align: center;
    }
  }
`

export const Divider = styled(DividerAntd)`
  background-color: ${({ theme, color }) => theme[color] || theme.bg_primary};
  height: 2px;
  padding: 0;
  margin : 0;
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
  flex-direction: column;
`

export const SelectBadge = styled.div`
  background-color: transparent;
  color: #34495e;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid #666;
  border-radius: 3px;
  float: right;

  min-width: 10px;
  padding: 3px 7px;

  align-self: end;
`

export const ButtonStopPropag = styled.button`
  background: transparent;
  border: none;
`
