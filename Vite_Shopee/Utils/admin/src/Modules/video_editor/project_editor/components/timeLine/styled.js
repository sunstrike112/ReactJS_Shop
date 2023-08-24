import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.07);
	border-radius: 8px;
`

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	box-sizing: content-box;
	height: 140px;
	border-radius: 8px;
	justify-content: space-between;
`

const PlayButton = styled.div`
	display: flex;
	width: 100%;
	height: 45%;
	justify-content: center;
	align-items: center;
	border: none;
	cursor: pointer;
	outline: none;
	border-bottom-left-radius: 8px;
`

const Play = styled.div`
	display: flex;
	flex-direction: column;
	width: 95px;
	height: 100%;
	justify-content: space-evenly;
	align-items: center;
	border: none;
	border-bottom-left-radius: 8px;
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);
`

const TimeLineContainer = styled.div`
	width: calc(100% - 100px);
	position: relative;
	height: 100%;
	display: flex;
	justify-content: flex-end;
`

const TimeList = styled.div`
	width: calc(100% - 10px);
	height: 100%;
	position: relative;
	overflow-y: scroll;
	box-sizing: content-box;

	::-webkit-scrollbar {
		width: 4px;
		border-radius: 0.5px;
	}
	::-webkit-scrollbar-thumb {
		background: transparent;
	}

	&:hover {
		::-webkit-scrollbar {
			width: 4px;
		}
		::-webkit-scrollbar-thumb {
			background: #d3d3d3;
			opacity: 0.6;
		}
	}
`

const TimeSpace = styled.div`
	width: calc(100% - 10px);
	height: 2px;
	position: absolute;
	top: 0;
	left: 0;
	user-select: none;
`

const Timer = styled.div`
	width: 0;
	height: 0;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	border-top: 16px solid #1480ff;
	user-select: none;
	:after {
		content: '';
		position: absolute;
		height: 140px;
		left: 9px;
		box-sizing: content-box;
		border: 1px #1480ff dashed;
		user-select: none;
	}
`

export {
  Timer,
  TimeList,
  TimeLineContainer,
  Container,
  PlayButton,
  Play,
  Wrapper,
  TimeSpace
}
