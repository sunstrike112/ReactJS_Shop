import styled from 'styled-components'
import { Link } from 'react-router-dom'
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
    justify-content: center;
    margin-top: 1rem;

    form {
      width: 90%;
      border-right: 1px solid ${({ theme, color }) => theme[color] || theme.bg_primary};
    }

    .form-action-group {
      margin-top: 1rem;
      text-align: center;
    }
  }
`

export const RouterLink = styled(Link)`
  display: inline-block;
  margin: 24px 0;
  padding: .5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fcfbfb;
  color: #000;
  width: max-content;
  span {
    margin-left: 10px;
  }
`

export const Right = styled.div`
  display: flex;
  width: 70%;
  padding: 16px;
  flex-direction: column;

  &.form-editor-content-question {
    .ant-row {
      margin-bottom: 0 !important;
    }
    p {
      margin-bottom: 0;
    }
  }
`

export const Divider = styled(DividerAntd)`
  background-color: ${({ theme, color }) => theme[color] || theme.bg_primary};
  height: 1px;
  padding: 0;
  margin : 0;
`
