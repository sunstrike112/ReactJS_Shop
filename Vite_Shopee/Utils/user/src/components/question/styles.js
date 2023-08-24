import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../themes'

export const Wrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  flex-direction: column;

  &.report {
    .question-title {
      font-size: 28px;
    }
  }

  .question-title {
    white-space: pre-wrap;
  }

  .question-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .question-number {
    height: 36px;
    width: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: ${({ theme, isInCorrectAnswer }) => isInCorrectAnswer === undefined && `1px solid ${theme.primary}`};
    border-radius: 18px;
    margin-right: 15px;
  }
  
  .question-block {
    height: 27px;
    padding: 0 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 169, 40, 0.1);
  }
  
  img {
    margin-top: 32px;
    width: 40%;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      width: 100%
    }
  }

  .audio {
    width: 40%;
    margin-top: 32px;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      width: 100%
    }
  }

  .video-box {
    margin-top: 32px;
    width: 40%;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      width: 100%
    }
  }

  video {
    width: 100%;
  }
`
