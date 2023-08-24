import React from 'react'
import styled from 'styled-components'

export const SectionWrapper = styled.div`
  margin-top: .7rem;
  width: 100%;
  display: flex;
  padding: 16px 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.text_primary};
  border-radius: .75rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
`

const Section = (props) => (
  <SectionWrapper {...props} />
)

export default Section
