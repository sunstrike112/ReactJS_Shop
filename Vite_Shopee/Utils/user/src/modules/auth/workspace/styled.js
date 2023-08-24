import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../themes'

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.white};
  height: 100vh;
`

export const Title = styled.h2`
  font-weight: 600;
  text-align: center;
  margin: 10px 0;
`

export const WrapperWorkspace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.white};
  padding-bottom: 40px;
`

export const WorkspaceContent = styled.div`
  background: ${({ theme }) => theme.white};
  border-radius: 10px;
  width: 60%;
  padding: 30px 40px;
  margin: 0 40px;
  overflow-y: auto;
  position: relative;

  @media screen and (max-width: ${MEDIA_WIDTHS.upToVeryLager}px) {
    width: 90%;
  }
  @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    margin: 0 20px;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: #838383;
  }


  box-shadow: ${({ theme }) => theme.bg_shadow};
  border: 1px solid ${({ theme }) => theme.grey_blur};

  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .loading {
    position: absolute;
    top: 50%;
    height: 50%;
    transform: translate(-50%, -50%) !important;
  }
}
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  background: ${({ theme }) => theme.grey_blur};
  h2 {
    margin-bottom: 0;
  }
`
