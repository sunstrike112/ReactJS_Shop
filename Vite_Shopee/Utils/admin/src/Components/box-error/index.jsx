/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { Text } from 'Components'

const ErrorWrapper = styled.div`
  margin: 0 auto;
  padding: ${({ padding }) => padding || '10px'};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => [theme.bd_error_light]};
  background: ${({ theme }) => [theme.bg_error_light]};
  border-radius: 4px;
  margin-bottom: 20px;
  width: 100%;
`

const BoxError = ({ title, padding }) => (
  <ErrorWrapper>
    <Text.primary fontWeight="fw_400" padding={padding} color="text_error">
      {title}
    </Text.primary>
  </ErrorWrapper>
)

export default BoxError
