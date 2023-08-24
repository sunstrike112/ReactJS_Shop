/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components'

const VideoSplitFrameWrapper = styled.div`
  margin: 0;
  width: calc(100% - 110px);
  background-color: #FAFAFA;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-self: flex-end;
`

const DivideMark = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: row;
`
const DivideLine = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`
const Line = styled.div`
  display: flex;
  width: 1px;
  height: ${({ index }) => (index === 0 ? '10px' : '6px')};
  background: #838383;
`

const Space = styled.div`
  display: flex;
  width: calc(1% + 4px);
`
const divideMark = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const divideLine = [0, 1, 2, 3, 4, 5]

const VideoSplitFrame1 = () => (
  <VideoSplitFrameWrapper>
    {divideMark.map((_, index) => (
      <DivideMark index={index} key={index}>
        {divideLine.map((_item, i) => (
          <DivideLine key={`${index}_${i}`} index={i}>
            <Line index={i} />
            {index === 8 && i === 5 && (<Line index={i} />)}
          </DivideLine>
        ))}
      </DivideMark>
    ))}
    <Space />
  </VideoSplitFrameWrapper>
)
export default VideoSplitFrame1
