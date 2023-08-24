import styled from 'styled-components'
import Moveable from 'react-moveable'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: transparent;
`
export const ImageWrapper = styled.div`
  width: 100px;
  height: auto;
  position: absolute;
  z-index: ${({ index }) => (index + 999)};;
  display: ${({ actived }) => (actived ? 'block' : 'none')};
  color: red;
  padding: 0;
  margin: 0;
  svg {
    width: 100%;
    height: 100%;
    display: ${({ actived }) => (actived ? 'block' : 'none')};
    fill: ${({ color }) => color || 'transparent'};
    stroke: ${({ color }) => color || 'transparent'};
  }
`

export const TextWrapper = styled.div`
  width: ${({ width }) => `${width}px`};
  height: auto;
  height: ${({ height }) => `${height}px`};

  position: absolute;
  z-index: ${({ index }) => (index + 999)};
  display: ${({ actived }) => (actived ? 'block' : 'none')};
  flex-direction: column;
  padding: 0;
  margin: 0;
  position: relative;

  canvas {
    visibility: hidden;
    position: absolute;
  }
  img {
    width: 100%;
    height: auto;
    position: absolute;
  }
`
export const StyledMoveable = styled(Moveable)`
  position: relative;
  display: ${({ actived }) => (actived ? 'block' : 'none')}!important;
  .moveable-line {
    background: ${({ isActiveItem }) => (!isActiveItem ? 'transparent' : '#4af')}!important;
  }
  .moveable-control{
    width: 10px !important;
    height: 10px !important;
    margin-top: -5px !important;
    margin-left: -5px !important;
  }
`
