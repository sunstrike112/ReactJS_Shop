import styled from 'styled-components'
import { Divider as DividerAntd } from 'antd'

export const Right = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ noInput }) => (noInput ? '16px 16px 16px 27px' : '16px')};
  height: 100%;
  word-break: break-all;
  .select-container {
    width: 80px;
  }
  .ant-form-item {
    width: max-content;
    margin-bottom: 0;
  }
  .pass_score {
    margin: 0 10px;
  }
`

export const Divider = styled(DividerAntd)`
  background-color: ${({ theme, color }) => theme[color] || theme.bg_primary};
  height: 2px;
  padding: 0;
  margin: 0;
  width: 100%;
`
