import { Button, Tabs } from 'antd'
import styled from 'styled-components'
import { CompactPicker } from 'react-color'
import { TRASH } from 'Assets'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(0,0,0,0.03);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.07);
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  max-height: 50vh;

  @media screen and (max-height: 900px){
    height: 480px;
  }

  @media screen and (max-width: 1440px) {
    height: 480px;
    width: 280px;
  }

  @media only screen and (max-width: 1440px),
  screen and (max-height: 800px){
    height: 320px;
    width: 270px;
  }

  @media screen and (max-width: 1280px) {
    height: 360px;
  }

  @media screen and (max-width: 1280px),
  screen and (max-height: 800px){
    height: 320px;
    width: 270px;
  }

  @media only screen and (max-height: 700px) {
    height: 280px;
    width: 270px;
  }

  .scene_actions {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 12px;
  }
`
const ElementWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 8px;
`

const TabsStyled = styled(Tabs)`
  overflow-y: auto;
  .ant-tabs {
    display: flex;
    overflow-y: auto;
  }

  .ant-tabs-tab {
    .ant-tabs-tab-btn {
      color: #5d4eb3;
      font-size: 14px;
    }
  }
  .ant-tabs-tab-active {
    background: white;
    .ant-tabs-tab-btn {
      color: #5d4eb3;
    }
  }
  .ant-tabs-content-holder {
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 4px;
      }
    ::-webkit-scrollbar-thumb {
      background: transparent;
    }

    &:hover {
      ::-webkit-scrollbar {
        width: 4px;
      }
      ::-webkit-scrollbar-thumb {
        background: #D3D3D3;
      }
    }

    .ant-tabs-ink-bar {
      background: #5d4eb3;
      width: 50% !important;
    }
  }
`

const Layer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px dashed #ccc;
  /* user-select: none; */
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
    fill: ${({ color }) => color || 'transparent'};
    stroke: ${({ color }) => color || 'transparent'};
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
`

const TrashIcon = styled(TRASH)`
  border: none;
  cursor: pointer;
  outline: none;
`

const PublishButton = styled(Button)`
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
  &:hover,
  &:focus {
    background-color: #5d4eb3;
    border-color: #5d4eb3;
    color: ${({ theme }) => theme.white};
  }
`

const IconButton = styled.div`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;

  @media only screen and (max-width: 1440px),
  screen and (max-height: 800px){
    img {
      width: 48px;
      height: 48px;
    }
  }

  @media screen and (max-width: 1280px) {
    img {
      width: 48px;
      height: 48px;
    }
  }

  @media only screen and (max-width: 1280px),
  screen and (max-height: 800px){
    img {
      width: 48px;
      height: 48px;
    }
  }
`
const EditItemWrapper = styled.div`
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

const FontStyle = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  justify-content: center;
  align-self: flex-end;
  border: 1px solid #D3D3D3;
  border-radius: 4px;
  padding: 6px 12px;
`
const ClickAble = styled.div`
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
`
const BoldItalic = styled(ClickAble)`
  width: 24px;
  height: 24px;
  background: ${({ theme, actived }) => (actived ? '#F1F1F1' : theme.white)};
`

const Divide = styled.div`
  width: 5px;
  height: 100%;
`

const ColorPicker = styled(CompactPicker)`
  .flexbox-fix {
    display: none !important;
  }
`

export {
  Container,
  IconButton,
  PublishButton,
  TrashIcon,
  ImageName,
  LayerLeft,
  Layer,
  ElementWrapper,
  TabsStyled,
  EditItemWrapper,
  Row,
  ColorPicker,
  FontStyle,
  ClickAble,
  Divide,
  BoldItalic
}
