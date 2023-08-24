/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Select } from 'antd'
import { useTranslation } from 'react-i18next'

import { SELECT_CARET_DOWN, SELECT_CARET_UP } from '../../assets'
import { SelectWrapper } from './styled'
import { Image } from '..'

const { Option } = Select

const customStyle = {
  width: '100%',
  margin: 0
}

const DropDownProfile = ({ options, onChange, value, error, ...rest }) => {
  const [iconSelect, setIconSelect] = useState('down')
  const { t } = useTranslation()

  return (
    <SelectWrapper>
      <Select
        className={error && 'error'}
        style={customStyle}
        onChange={onChange}
        value={value}
        suffixIcon={<Image src={iconSelect === 'up' ? SELECT_CARET_UP : SELECT_CARET_DOWN} />}
        onClick={() => setIconSelect(iconSelect === 'up' ? 'down' : 'up')}
        onBlur={() => setIconSelect('down')}
        dropdownClassName="select__dropdown"
        {...rest}
      >
        {options.map((item, index) => (
          <Option key={index} value={item.value}>
            {t(item.name)}
          </Option>
        ))}
      </Select>
    </SelectWrapper>
  )
}

export default DropDownProfile
