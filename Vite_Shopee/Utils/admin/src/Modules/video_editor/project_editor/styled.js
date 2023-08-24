import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0 20px;
  min-height: calc(100vh - 39px);
  flex-direction: column;
  color: ${({ theme }) => theme.text_primary};

  .shape-frame {
    width: 200px;
    background: rgba(255, 169, 40, 0.2);
    color: #FFA928;
    border: 1px solid #FFA928;
    border-radius: 8px;
    padding: 8px;
    position: relative;
    left: 220px;
    top: -100px;
  }
  .track-line {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 16px solid #1480FF;
    position: absolute;
    left: 200px;
    top: 8px;
    :after {
      content: '';
      position: absolute;
      height: 182px;
      border-right: 1px #1480FF dashed;
    }
  }
`

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  height: calc(100vh - 136px);
  flex-direction: column;
  justify-content: space-between;
  background: #FFFFFF;
  margin-top: 15px;
  padding: 16px;
  border-radius: 0.75rem;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 4%);
`

export const DivEditVideo = styled.div`
	justify-content: center;
  display: flex;
	width: 400px;
	align-items: center;
	border-radius: 5px;
	padding-top: 30px;
`

export const VideoEditor = styled.div`
  width: 100%;
  margin: 0 auto;
  /* .video-control {
    height: 162px;
    width: 100px;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    background: #FFFFFF;
    border-radius: 0px 0px 0px 16px;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 4%);
  } */
`
