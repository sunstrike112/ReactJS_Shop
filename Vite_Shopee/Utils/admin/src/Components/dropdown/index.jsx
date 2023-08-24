/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable react/prop-types */
import React from 'react'
// import styled from 'styled-components'
import Select from 'react-select'
// import { useTranslation } from 'react-i18next'

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]

const customStyles = {
  option: (provided) => ({
    ...provided
  }),
  container: (provided) => ({
    ...provided,
    width: '100%'
  })
}

const DropdownComponent = ({ onChange, options, isMulti, ...rest }) => (
  <Select
    styles={customStyles}
    options={options}
    menuPosition="absolute"
    onChange={onChange}
    isMulti={isMulti}
    {...rest}
  />
)

export default DropdownComponent
