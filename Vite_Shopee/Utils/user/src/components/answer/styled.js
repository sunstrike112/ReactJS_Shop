import styled from 'styled-components'

export const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;

  p {
    white-space: pre-wrap;
  }
`

export const AnswersDescription = styled.div`
  padding: 16px;
  border: 1px solid #F1F1F1;
  border-radius: 8px;
  margin-top: 16px;
  
  img {
    width: 120px;
  }
`

export const AnswersChecked = styled.div`
  padding: 16px;
  border: 1px solid #F1F1F1;
  border-radius: 8px;
  margin-top: 16px;
`

export const AnswersCheckedItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const Circle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: #1f1f1f;
  margin-right: 6px;
  margin-top: 9px;
`
export const Description = styled.div`
  padding: 16px;
  border: 1px solid #F1F1F1;
  border-radius: 8px;
  margin-top: 16px;
`
