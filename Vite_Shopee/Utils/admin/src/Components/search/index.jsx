/* eslint-disable react/prop-types */
import React from 'react'
import { Input } from 'antd'

const Search = ({ ...rest }) => (
  <Input.Search
    allowClear
    enterButton
    style={{ width: '50%' }}
    size="large"
    {...rest}
  />
)

export default Search
