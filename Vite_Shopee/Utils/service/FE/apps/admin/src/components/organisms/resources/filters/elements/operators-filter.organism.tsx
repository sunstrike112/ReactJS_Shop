import { Select } from 'antd';
import {
  LABEL_FILTER_EQUALS,
  LABEL_FILTER_LESS,
  LABEL_FILTER_LESS_EQUALS,
  LABEL_FILTER_GREATER,
  LABEL_FILTER_GREATER_EQUALS,
  LABEL_FILTER_CONTAINS,
  LABEL_FILTER_STARTS_WITH,
  LABEL_FILTER_END_WITH,
} from '@ss-fe-fw/constants'

const { Option } = Select;

const arrayNumberOptions = [
  { value: 'equals', label: LABEL_FILTER_EQUALS },
  { value: 'lt', label: LABEL_FILTER_LESS },
  { value: 'lte', label: LABEL_FILTER_LESS_EQUALS },
  { value: 'gt', label: LABEL_FILTER_GREATER },
  { value: 'gte', label: LABEL_FILTER_GREATER_EQUALS },
]

const arrayStringOptions = [
  { value: 'equals', label: LABEL_FILTER_EQUALS },
  { value: 'contains', label: LABEL_FILTER_CONTAINS },
  { value: 'startsWith', label: LABEL_FILTER_STARTS_WITH },
  { value: 'endsWith', label: LABEL_FILTER_END_WITH },
]

export const numberOperatorFilter = (props: any) => (
  <Select defaultValue={props?.operator ?? 'equals'} className="select-before" style={{ width: 102, textAlign: 'left' }} onChange={props.onChange} >
    {arrayNumberOptions.map((item, index) => {
      return <Option key={index} value={item.value}>{item.label}</Option>
    })}
  </Select>
)

export const stringOperatorFilter = (props: any) => (
  <Select defaultValue={props?.operator ?? 'equals'} className="select-before" style={{ width: 102, textAlign: 'left' }} onChange={props.onChange} >
    {arrayStringOptions.map((item, index) => {
      return <Option key={index} value={item.value}>{item.label}</Option>
    })}
  </Select>
)
