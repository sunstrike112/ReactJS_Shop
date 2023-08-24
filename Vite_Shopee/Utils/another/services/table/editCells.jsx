/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from 'react';

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
const editTableDropdown = {
  cell: ({ getValue, row, column: { id }, table }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
      table.options.meta?.updateData(row.index, id, value);
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <select value={value || ''} onChange={(e) => setValue(e.target.value)} onBlur={onBlur}>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
      </select>
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

export const editCells = {
  editColumnText,
  editTableDropdown,
  editTableDate,
};
