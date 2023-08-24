import styled from 'styled-components'
import { CompactPicker } from 'react-color'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 0;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 16px;
  justify-content: center;
`

const ColorPicker = styled(CompactPicker)`
  .flexbox-fix {
    display: none !important;
  }
`

export {
  Container,
  Row,
  ColorPicker
}
