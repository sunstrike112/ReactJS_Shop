import React, { useState } from 'react'
import {
  Input,
  InputNumber,
  Select,
} from 'antd'
import { AtomNumericInput } from '@ss-fe-fw/shared/ui'
import { numberOperatorFilter } from './operators-filter.organism'
import * as _ from 'lodash'

/* eslint-disable-next-line */
export interface OGNumberFilterProps {
  value: {
    input?: number,
    operator?: any
  };
  onChange?: any;
}

export function OGNumberFilter(props: OGNumberFilterProps) {
  const [input, setInput] = useState(props.value.input)

  const onChange = (val) => {
    setInput(val)
    props.value.input = _.toNumber(val)
  }

  const onOperatorChange = (operator) => {
    props.value.operator = operator
  }

  return (
    <AtomNumericInput
      addonBefore={numberOperatorFilter({ operator: props.value.operator, onChange: onOperatorChange })}
      value={input}
      onChange={onChange}
    />
  )
}

export default OGNumberFilter
