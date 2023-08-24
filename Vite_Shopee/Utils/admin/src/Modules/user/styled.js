import styled from 'styled-components'
import { Divider as DividerAntd } from 'antd'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 24px;
  flex-direction: column;
  overflow: auto;
`
export const Header = styled.div`
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 24px;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  .icon {
    stroke: ${({ theme }) => theme.primary};
    margin-right: 16px;
  }
`

export const Divider = styled(DividerAntd)`
  background-color: ${({ theme }) => theme.text_hight_light};
  height: 2px;
  padding: 0;
  margin : 0;
  margin-top: 10px;
`
