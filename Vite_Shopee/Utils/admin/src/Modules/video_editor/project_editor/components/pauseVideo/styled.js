import { Button } from 'antd'
import { CompactPicker } from 'react-color'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 12px;
  justify-content: center;
  align-items: center;
  padding: 0 4px;
  .ant-select {
    border-radius: 4px !important;
    border: 1px solid #D3D3D3 !important;
  }
  .ant-input {
    border-radius: 4px !important;
    border: 1px solid #D3D3D3 !important;
    margin-top: 4px !important;
  }
`

const FontStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: flex-end;
  border: 1px solid #D3D3D3;
  border-radius: 4px;
  padding: 5px 12px;
  margin: 0;
`

const BoldItalic = styled.div`
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background: ${({ theme, actived }) => (actived ? '#F1F1F1' : theme.white)};
`

const Space = styled.div`
  width: 5px;
  height: 100%;
`

const ColorPicker = styled(CompactPicker)`
  .flexbox-fix {
    display: none !important;
  }
`

const AddButton = styled(Button)`
  background: ${({ theme }) => theme.bg_primary};
  border: 1px solid ${({ theme }) => theme.bg_primary};
  color: ${({ theme }) => theme.white};
  font-weight: 600;
  font-size: .75rem;
  padding: 8px 16px;
  height: auto;
  width: 120px;
  align-self: flex-end;
  border-radius: 16px;
  margin-top: 16px;

  &:hover,
  &:focus {
    background-color: #5d4eb3;
    border-color: #5d4eb3;
    color: ${({ theme }) => theme.white};
  }
`

export {
  Container,
  Row,
  FontStyle,
  BoldItalic,
  ColorPicker,
  Space,
  AddButton
}
