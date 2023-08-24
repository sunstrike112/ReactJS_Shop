/* eslint-disable react/prop-types */
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { content } from './content'
import { Wrapper, PolicyContent } from './styled'

const PolicyScreen = () => (
  <Wrapper>
    <PolicyContent>
      {ReactHtmlParser(content, {
        decodeEntities: true
      })}
    </PolicyContent>
  </Wrapper>
)
export default PolicyScreen
