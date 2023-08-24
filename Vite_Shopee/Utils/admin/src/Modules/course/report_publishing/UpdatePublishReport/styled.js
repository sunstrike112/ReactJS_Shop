import styled from 'styled-components'
import { Divider as DividerAntd } from 'antd'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 24px;
  flex-direction: column;
  color: ${({ theme }) => theme.text_primary};
`
export const Divider = styled(DividerAntd)`
  background-color: ${({ theme, color }) => theme[color] || theme.bg_primary};
  height: 2px;
  padding: 0;
  margin: 0;
  &.top {
    margin-top: 24px;
  }
`

export const ListButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  .button__submit {
    margin-left: 5px;
    padding: 20px;
  }
  .icon {
    fill: ${({ theme }) => theme.white};
    margin-right: 5px;
  }
`

export const Right = styled.div`
  display: flex;
  width: 70%;
  padding: 16px;
  .ant-row {
    margin-bottom: 0;
  }
`
