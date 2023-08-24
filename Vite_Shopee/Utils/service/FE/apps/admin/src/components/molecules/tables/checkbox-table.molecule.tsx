import { Checkbox, Form, Table } from 'antd';
import 'antd/dist/antd.css';
import React, { useContext, useEffect, useState } from 'react';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, saveChanges, record, isToggleSave, isTogggleReset, changedCheckbox, globalChanges, ...props }) => {
  const [form] = Form.useForm();
  const initialValues = props.children.reduce((result, child) => {
    result = { ...result, [child.key]: child.props.record[child.key] };
    return result;
  }, {});

  /**
   * PubSub can be the easy way here to check if 'Save' and 'Reset' button clicked,
   * but there're exceed subscriptions for only one click 
   */
  useEffect(() => {
    if (isToggleSave != null) {
      const newValues = form.getFieldsValue()
      saveChanges(record, newValues)
    }
  }, [isToggleSave])

  useEffect(() => {
    if (isTogggleReset != null) {
      form.resetFields()
    }
  }, [isTogggleReset])

  useEffect(() => {
    const { groupName, name, dataIndex } = changedCheckbox

    // if changedCheckbox is a child checkbox, then check its siblings OTHER than it, and change parent value accordingly
    if (groupName == record.name) {
      const siblings = globalChanges.filter(c => c.groupName == record.name && c.name != name)
      form.setFieldsValue({ [dataIndex]: siblings.every(c => c[dataIndex] == true) && changedCheckbox[dataIndex] == true })
    }
    // if changedCheckbox is a parent checkbox, bind its children checkboxes
    else if (name == record.groupName) {
      form.setFieldsValue({ [dataIndex]: changedCheckbox[dataIndex] })
    }
  }, [changedCheckbox])

 

  return (
    record.hide
      ? <></>
      : <Form form={form} component={false} initialValues={initialValues}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  onChangeCheckbox,
  ...restProps
}) => {
  let childNode = children;
  const form = useContext(EditableContext);


  const onChange = async () => {
    const values = await form.validateFields();
    const { id, key, name, groupName } = record
    onChangeCheckbox({ id: id, key: key, name: name, groupName: groupName, ...values, dataIndex: dataIndex })
  }


  if (editable) {
    childNode = (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        valuePropName="checked"
      >
        <Checkbox disabled={record[dataIndex] == null} onChange={onChange} />
      </Form.Item>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

interface MCCheckboxTableProps {
  isToggleSave: Boolean,
  isTogggleReset: Boolean,
  onSaveChanges: Function,
  columns: any[],
  dataSource: any[],
  loading: boolean,
}

interface CheckboxTableRowProps extends React.HTMLAttributes<HTMLElement>{
  record: any,
  isToggleSave: boolean,
  isTogggleReset: boolean,
  saveChanges: (record: any, newValue: any) => void,
  changedCheckbox: any,
  globalChanges: any,
}

export function MCCheckboxTable({ isToggleSave, isTogggleReset, onSaveChanges, columns, dataSource, loading, ...props }: MCCheckboxTableProps) {

  const [changedCheckbox, setChangedCheckbox] = useState(false)
  const [changedValues, setChangedValues] = useState([])

  useEffect(() => {
    setChangedValues(dataSource)
  }, [dataSource])


  const onChangeCheckbox = (value) => {
    let checkboxes = [...changedValues]
    const affectedCheckbox = checkboxes.find(checkbox => checkbox.key == value.key)

    const { dataIndex, id, name } = value

    // update the checkbox matrix with only 1 checkbox change first
    const index = checkboxes.findIndex(checkbox => checkbox.key == value.key)
    checkboxes.splice(index, 1, { ...affectedCheckbox, ...value })

    // if the checkbox change is parent, update its children altogether
    if (id < 0) {
      const newCheckboxs = checkboxes.map(row => {
        let result = row

        // if children
        if (result.groupName == name) {
          result = { ...result, [dataIndex]: value[dataIndex] }
        }

        return result
      })

      checkboxes = [...newCheckboxs]
    }
    setChangedCheckbox({ ...value, parentColumnChange: dataIndex })
    setChangedValues([...checkboxes])
  }

  const saveChanges = (record, newValue) => {
    if (Number(record.key) < 0)
      return

    const index = changedValues.findIndex(p => p.id == record.id)
    changedValues.splice(index, 1, { ...record, ...newValue })

    const lastRow = dataSource.slice(-1)[0]
    if (record.id == lastRow.id)
      onSaveChanges(changedValues.filter(row => row.id >= 0))
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const standardiseColumns = (columns) => columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        onChangeCheckbox: onChangeCheckbox,

      }),
    };
  });

  return (
    <Table
      components={components}
      rowClassName={() => 'editable-row'}
      size="small"
      pagination={false}
      dataSource={dataSource}
      columns={standardiseColumns(columns)}
      loading={loading}
      onRow={(record) => 
        (
          {
            record,
            isToggleSave: isToggleSave,
            isTogggleReset: isTogggleReset,
            saveChanges: saveChanges,
            changedCheckbox: changedCheckbox,
            globalChanges: changedValues,
          } as CheckboxTableRowProps
        )
      }
    />
  );
}
