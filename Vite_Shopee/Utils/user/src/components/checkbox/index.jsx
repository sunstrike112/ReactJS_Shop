/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-top: 4px;
  /* Hide the browser's default checkbox */
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  /* Create a custom checkbox */
  .checkmark {
    height: 16px;
    width: 16px;
    border: 1px solid #838383;
    border-radius: 3px;
    transition: background-color 0.2s;
    margin-right: 12px;
  }
  
  /* On mouse-over, add a grey background color */
  &:hover input ~ .checkmark {
  }
  
  /* When the checkbox is checked, add a blue background */
  input:checked ~ .checkmark {
  }
  
  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  /* Show the checkmark when checked */
  input:checked ~ .checkmark:after {
    display: block;
  }
  
  /* Style the checkmark/indicator */
  .checkmark:after {
    left: 5px;
    top: 2px;
    width: 6px;
    height: 10px;
    border: solid #07CF84;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  
  &.small {
    .checkmark {
      height: 16px;
      width: 16px;
      margin-right: 7px;
    }
    
    .checkmark:after {
      left: 6px;
      top: 6px;
      width: 4px;
      height: 9px;
      border-width: 0 2px 2px 0;
    }
  }
`

const Checkbox = ({
  size,
  ...rest
}) => (
  <Wrapper className={classnames(size, 'check-box')}>
    <input
      {...rest}
      type="checkbox"
      defaultChecked={false}
    />
    <span className="checkmark" />
  </Wrapper>
)

export default Checkbox
