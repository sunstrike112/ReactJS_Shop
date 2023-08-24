/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Select, { components } from 'react-select'
import { Image, TextPrimary } from '..'
import { SELECT_CARET_DOWN, UNCHECKED, CHECKED } from '../../assets'
import { OptionWrapper, IndicatorWrapper } from './styled'

const CustomDropdownIndicator = (props) => {
  const drop = props.selectProps.isDropdown
  return (
    <components.DropdownIndicator {...props}>
      <IndicatorWrapper isDropdown={drop}>
        <Image src={SELECT_CARET_DOWN} />
      </IndicatorWrapper>
    </components.DropdownIndicator>
  )
}
const CustomOption = (props) => {
  const { children, data } = props
  const selectedValue = props.getValue()
  const check = selectedValue.some((option) => option.value === props.value)
  return (
    <components.Option {...props}>
      <OptionWrapper>
        <Image style={{ marginRight: 10 }} src={!check ? UNCHECKED : CHECKED} />
        {children}
        {
          data.quantity && (
            <div className="quantity-box">
              <TextPrimary fontSize="size_12">{data.quantity}</TextPrimary>
            </div>
          )
        }
      </OptionWrapper>
    </components.Option>
  )
}

const customStyles = {
  control: () => ({
    minHeight: 51,
    minWidth: 300,
    marginRight: 20,
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #F1F1F1',
    borderRadius: '4px'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  indicatorsContainer: () => ({
    cursor: 'pointer',
    display: 'flex'
  }),
  option: () => ({
    // flexDirection: 'column'
  })
}
const Dropdown = ({ placeholder, options }) => {
  const [, setState] = useState([{}])
  const [isDropdown, setIsDropdown] = useState(false)
  const handelChange = (e) => {
    setState(e)
  }
  return (
    <Select
      onMenuOpen={() => setIsDropdown(true)}
      onMenuClose={() => setIsDropdown(false)}
      isMulti
      closeMenuOnSelect={false}
      isDropdown={isDropdown}
      setIsDropdown={setIsDropdown}
      onChange={handelChange}
      styles={customStyles}
      isClearable
      components={{ DropdownIndicator: CustomDropdownIndicator, Option: CustomOption }}
      placeholder={placeholder}
      options={options}
    />
  )
}
export default Dropdown
