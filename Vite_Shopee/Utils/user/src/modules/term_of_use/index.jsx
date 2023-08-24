/* eslint-disable react/no-danger */
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { content } from './content'
import { Wrapper, TermContent } from './styled'

const TermOfUseScreen = () => (
  <Wrapper>
    <TermContent>
      {ReactHtmlParser(content, {
        decodeEntities: true
      })}
    </TermContent>
  </Wrapper>
)
export default TermOfUseScreen
