import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../themes'

export const Wrapper = styled.div`
  &.report {
    .input-question {
      font-size: 20px;
    }
  }
  .input-question {
    width: 100%;
    border: 1px solid ${({ theme, border }) => theme[border]};
    background: ${({ theme, background }) => theme[background]};

    &:focus {
      opacity: 1;
      border: 1px solid ${({ theme, readOnly, border }) => (!readOnly ? theme.primary : theme[border])};
      outline: none;
    }

    &:hover {
      opacity: 1;
      border: 1px solid ${({ theme, readOnly, border }) => (!readOnly ? theme.primary : theme[border])};
      outline: none;
    }

    height: 240px;
    border-radius: 8px;
    padding: 16px;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
      height: 160px;
    }
  }
`

export const QuestionWrapper = styled.button`
    cursor: ${({ readOnly = false }) => (!readOnly ? 'pointer' : 'auto')};
    border: 1px solid ${({ theme, border }) => theme[border]};
    background: ${({ background, theme }) => theme[background]};
    margin-top: 10px;
    outline: 0;
    display: flex;
    flex-direction: column;
    padding: 21px 25px;
    width: 100%;
    border-radius: 4px;
    justify-content: flex-start;
    align-items: flex-start;

    &:hover {
      border: 1px solid ${({ theme, readOnly, border }) => (!readOnly ? theme.primary : theme[border])};
    }
    
    .question {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      text-align: left;

      &__title {
        white-space: pre-wrap;
      }
    }
    
    .ant-radio-wrapper {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      text-align: left;
      font-size: 14px;
    }

    img {
      width: 40%;
      margin-top: 8px;
    }
`
