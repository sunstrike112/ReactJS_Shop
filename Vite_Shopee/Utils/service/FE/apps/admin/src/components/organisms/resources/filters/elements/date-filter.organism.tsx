import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
// import { stringOperatorFilter } from './operators-filter.molecule'
import { STANDARD_FORMAT_DATE_MOMENT } from '@ss-fe-fw/constants';
import moment from 'moment-timezone';

/* eslint-disable-next-line */
export interface OGDateFilterProps {
  value: {
    input?: {
      from?: any;
      to?: any;
    };
    operator?: any;
  };
  onChange?: any;
}

const { RangePicker } = DatePicker;

export function OGDateFilter(props: OGDateFilterProps) {
  // const [input, setInput] = useState(props.value.input)

  const onChange = (dates, dateStrings) => {
    props.value.operator = 'between';
    if (dateStrings[0] === dateStrings[1]) {
      props.value.operator = 'equals';
    }
    props.value.input.from = dates && dates[0] ? dates[0] : null;
    props.value.input.to = dates && dates[1] ? dates[1] : null;
    // props.value.input.from = moment.utc(dates[0]).startOf('day').toISOString()
    // props.value.input.to = moment.utc(dates[1]).endOf('day').toISOString()
  };

  return (
    <>
      <RangePicker
        defaultValue={
          props?.value?.input?.from && props?.value?.input?.to
            ? [moment(props.value.input.from), moment(props.value.input.to)]
            : null
        }
        format={STANDARD_FORMAT_DATE_MOMENT}
        ranges={{
          Today: [moment(), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'This Week': [moment().startOf('week'), moment().endOf('week')],
          'Last Week': [
            moment().startOf('week').subtract(7, 'days'),
            moment().endOf('week').subtract(7, 'days'),
          ],
          'Last month': [
            moment().subtract(1, 'months').startOf('month'),
            moment().subtract(1, 'months').endOf('month'),
          ],
        }}
        onChange={onChange}
      />
      <style jsx global>
        {`
          .ant-picker-ranges .ant-picker-preset > .ant-tag-blue {
            background: #eaedf0;
            border: 1px solid #bec6d0;
            color: #5c6c7f;
            box-sizing: border-box;
            border-radius: 2px;
          }
        `}
      </style>
    </>
  );
}

export default OGDateFilter;
