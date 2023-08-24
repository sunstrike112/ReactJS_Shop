/* eslint-disable react-hooks/rules-of-hooks */
import { transOutHook } from 'dhm/contexts/TranslateContext';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const trans = (value) => transOutHook(value, 'table');

const Select = styled.select`
  width: 100%;
  height: 100%;
  &:focus {
    outline: none;
  }
`;
const editColumnText = {
  cell: ({ getValue, row, column: { id }, table }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
      table.options.meta?.updateData(row.index, id, value);
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return <input value={value || ''} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} />;
  },
};
const editTableDropdownRole = {
  cell: ({ getValue, row, column: { id }, table }) => {
    const initialValue = getValue();
    const { dropdownRole } = useSelector((state) => state.common);
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
      table.options.meta?.updateData(row.index, id, value);
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <Select value={value || ''} onChange={(e) => setValue(e.target.value)} onBlur={onBlur}>
        {dropdownRole.map((item, index) => (
          <option key={index} value={item?.roleId}>
            {item?.roleId}
          </option>
        ))}
      </Select>
    );
  },
};
const editTableDropdownStatus = {
  cell: ({ getValue, row, column: { id }, table }) => {
    const initialValue = getValue();
    const dropdown = [
      { value: 0, label: trans('active') },
      { value: 1, label: trans('in_active') },
    ];

    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
      table.options.meta?.updateData(row.index, id, value);
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <Select value={value || ''} onChange={(e) => setValue(e.target.value)} onBlur={onBlur}>
        {dropdown.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
    );
  },
};
const editTableDate = {
  cell: ({ getValue, row, column: { id }, table }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
      table.options.meta?.updateData(row.index, id, value);
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return <input type='date' value={value || ''} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} />;
  },
};
export { editColumnText, editTableDropdownRole, editTableDate, editTableDropdownStatus };
