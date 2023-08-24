import styled from 'styled-components'
import { TRASH } from 'Assets'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  padding-top: 16px;
  border-bottom: 1px dashed #ccc;
  user-select: none;
  background-color : ${({ backgroundColor }) => (backgroundColor ? ('rgb(230 216 221 / 30%)') : '')};
  align-items: center;
`

const LayerLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  svg {
    width: 56px !important;
    height: auto;
    margin-right: 8px;
    user-select: none;
    fill: ${({ color }) => color};
    stroke: ${({ color }) => color};
  }
`

const ImageName = styled.p`
  padding: 0;
  margin: 0;
  color: ${({ color }) => color || '#838383'};
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-word;
  display: -webkit-box;
  user-select: none;
  font-weight: ${({ isBold }) => (isBold ? 'bold' : 'normal')};
  font-style: ${({ isItalic }) => (isItalic ? 'italic' : 'normal')};
  font-family: ${({ fontFamily }) => fontFamily};;
`

const TrashIcon = styled(TRASH)`
  border: none;
  cursor: pointer;
  outline: none;
`

const ClickAble = styled.div`
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ListElement = styled.ul`
  list-style: none;
  padding-left: 0;
`
export {
  TrashIcon,
  ImageName,
  LayerLeft,
  Container,
  ClickAble,
  ListElement
}
