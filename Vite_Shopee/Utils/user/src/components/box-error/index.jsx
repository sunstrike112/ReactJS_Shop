/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { TextNormal } from '..'

const ErrorWrapper = styled.div`
  margin: 0 auto;
  padding: ${({ padding }) => padding || '10px'};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme, error }) => (error ? theme.text_danger : theme.success)};
  background: ${({ theme, error }) => (error ? theme.error_light : theme.green_light)};
  border-radius: 4px;
  margin-bottom: 20px;
  width: 100%;
`

const BoxError = ({ title, padding, error = true }) => (
  <ErrorWrapper padding={padding} error={error}>
    <TextNormal fontWeight="fw_400" color={error ? 'error' : 'success'}>
      {title}
    </TextNormal>
  </ErrorWrapper>
)

export default BoxError
