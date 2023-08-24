import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 39px);
  padding: 0 24px;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.white};
`

export const SubTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 16px 0;
`
export const Left = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  width: 40%;
  max-height: calc(100vh - 250px);
  overflow-y: auto;
  padding-right: 24px;
  padding-top: 8px;
`
export const Right = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  gap: 20px;

  video {
    max-width: 100%;
    min-width: 80%;
    border: 1px solid #ccc;
    ::cue {
      text-shadow: 2px 2px 2px black;
      color: #ffffff;
      opacity: 1;
      font-size: 100%;
    }
  }
`

export const Loading = styled.div`
  display: flex;
  height: 452px;
  width: 100%;
  justify-content: center;
  align-items: center;
`
