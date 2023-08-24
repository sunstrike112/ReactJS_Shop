import styled from 'styled-components'

const DateRangerWrapper = styled.div`
  .start-date.ant-picker {
    border-radius: 1rem 0 0 1rem;
    border: 1px solid #f8f9fa;
    transition: border-color .15s ease-in-out,
    box-shadow .15s ease-in-out;
    background-color: rgb(248, 249, 250);
    box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%);
      &:hover, &:focus {
      border: rgb(182 174 233) solid 1px;
      color: #323232;
      background-color: #f8f9fa;
      border-color: #b6aee9;
      outline: 0;
      box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%),0 0 0 0.25rem rgb(108 93 211 / 25%);
    }
  }

  .end-date.ant-picker {
    border-radius: 0 1rem 1rem 0;
    border: 1px solid #f8f9fa;
    transition: border-color .15s ease-in-out,
    box-shadow .15s ease-in-out;
    background-color: rgb(248, 249, 250);
    box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%);
      &:hover, &:focus {
      border: rgb(182 174 233) solid 1px;
      color: #323232;
      background-color: #f8f9fa;
      border-color: #b6aee9;
      outline: 0;
      box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%),0 0 0 0.25rem rgb(108 93 211 / 25%);
    }
  }
`

const DateGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Space = styled.div`
  display: flex;
  height: 32px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  background: #777777;
  opacity: 0.5;
  padding: 4px;
  color: #ffffff;
  border: 1px solid #f8f9fa;
`
const DateLabel = styled.div`
  text-align: right;
  margin-right: 5px;
  margin-top: 5px;
`

export {
  DateRangerWrapper,
  Space,
  DateGroup,
  DateLabel
}
