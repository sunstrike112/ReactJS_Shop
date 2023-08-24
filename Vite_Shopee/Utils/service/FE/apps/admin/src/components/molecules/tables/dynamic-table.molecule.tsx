import { CheckOutlined, CloseOutlined, DeleteFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons';
import { brandingColors, KEYCODE } from '@ss-fe-fw/constants';
import { Button, Form, Input, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DiscardChangeModal } from '../../atoms/modals/discard-change-modal';



const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    const initialValues = props.children.reduce((result, child) => {
        result = { ...result, [child.key]: child.props.record[child.key] }
        return result
    }, {})

    return (
        <Form form={form} component={false} initialValues={initialValues}>
            <EditableContext.Provider value={form} >
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
    handleSave,
    handleDelete,
    roles,
    ...restProps
}) => {
    const [editing, setEditing] = useState(record?.newRow ?? false);
    const inputRef = useRef(null);

    const [value, setValue] = useState("")

    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = (readonly: Boolean = false): void => {
        if (readonly)
            return;

        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex]
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            handleSave({ ...record, newRow: false, ...values });
            toggleEdit();
        } catch (errInfo) {
            console.log("Save failed:", errInfo);

        }
    };

    const onBlur = () => {
        // If event was a save/cancel button click, then quit onBlur process
        // @ts-expect-error
        if (event.relatedTarget?.offsetParent?.className?.includes('addon'))
            return;

        const { value }: any = event.target
        if (value) {
            DiscardChangeModal(reset, inputRef.current.focus)

        } else {
            reset()

        }
    }

    const reset = () => {
        form.resetFields();
        setEditing(!editing);

        if (record.newRow) {
            handleDelete(record.id)
        }
    }

    const remove = () => {
        handleDelete(record.id)
    }

    let childNode = children;

    const validateFormItem = [
      {
          required: true,
          message: `${title} name is required.`
      },
      {
          max: 50,
          message: `${title} maxmimum length 50 characters.`
      },
      {
        validator: (_, value) => {
            const trimValue = value.trim();
            const checkValidRole = value === '' || roles.findIndex((role) => trimValue.toLowerCase() === role.name?.toLowerCase()) < 0;
            return checkValidRole ? Promise.resolve() : Promise.reject(new Error(`${title} name is exists.`))
          }
      }
    ]

    const suffixActionButtons = (<>
        <Button onClick={reset} icon={<CloseOutlined />} type="text" danger />
        <Button onClick={save} icon={<CheckOutlined />} type="text" style={{ color: brandingColors['success-color'] }} />
    </>)

    if (editable) {
        const readonly = !!record.readonly // Filter falsy value; ex: !!undefined = false, !!true = true
        childNode = !readonly && (editing || record.newRow) ? (
            <Form.Item
                style={{
                    margin: 0
                }}
                name={dataIndex}
                rules={validateFormItem}
            >
                <Input maxLength={50} ref={inputRef} onBlur={onBlur} onPressEnter={save} value={children} onChange={(e) => setValue(e.target.value)}
                    onKeyUp={(event) => {
                        if (event.keyCode == KEYCODE.ESCAPE) {
                            reset();
                        }
                    }}
                    addonAfter={suffixActionButtons}
                    className="editable-cell"
                />


            </Form.Item>
        ) : (
            <div className={"editable-cell-value-wrap" + (readonly ? ' secondary-title' : '')}>
                {readonly
                    ? children
                    : <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{children}</span>
                        {
                            !record.hideIcons
                                ? <div className="action-button-group" style={{ display: 'flex', gap: '10px' }}>
                                    <EditFilled onClick={() => toggleEdit(readonly)} />
                                    <DeleteFilled onClick={(e) => remove()} />
                                </div>
                                : <></>

                        }
                    </div>}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

interface MCDynamicTableProps {
    data: any[],
    columns: any[],
    onSelectRow: Function,
    selectedRowKeys: string,
    onAddRow: Function,
    onSaveRow: Function,
    onDeleteRow: Function
}

export function MCDynamicTable({ selectedRowKeys, onSelectRow, data, columns, onSaveRow, onAddRow, onDeleteRow, ...props }: MCDynamicTableProps) {

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell
        }
    };

    const handleDelete = (key) => {
        onDeleteRow(key)
    };
    const handleAdd = () => {
        onAddRow()
    };
    const handleSave = (row) => {
        onSaveRow(row)
    };

    const standardiseColumns = (columns): ColumnsType<any> | any => {
        return columns.map((col, index) => {
            let result = { ...col }
            const { title } = result

            if (col.editable) {
                result = {
                    ...result,
                    onCell: (record) => ({
                        record,
                        editable: col.editable,
                        dataIndex: col.dataIndex,
                        title: col.title,
                        handleSave: handleSave,
                        handleDelete: handleDelete,
                        roles: data
                    })
                }
            }

            // Add <PlusCircleOutlined/> for the last column
            if (index == columns.length - 1) {
                result = {
                    ...result,
                    title: () => (<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span>{title}</span> <PlusCircleOutlined onClick={handleAdd} style={{ color: brandingColors['primary-color'] }} /></div>)

                }
            }
            return result
        });
    };

    const standardDataSource = (dataSource) => dataSource.map(row => ({ ...row, key: row.id?.toString() }))
    const onClickRow = (record) => {
        // check if click at remove icon (means remove row), then return
        // @ts-expect-error
        if (['svg', 'path'].includes(event.target?.nodeName) || !!record.disableSelect) {
            return;
        }
        onSelectRow(record);
    }

    return (<>
        <Table
            columns={standardiseColumns(columns)}
            dataSource={standardDataSource(data)}
            components={components}
            pagination={false}
            rowSelection={{
                selectedRowKeys: [...[selectedRowKeys.toString()]],
                type: "radio",
            }}
            onRow={(record) => {
                return {
                    onClick: () => onClickRow(record)
                };
            }}
            rowClassName="border-0"
            className="single-row-selection-table"
            size="small" />


        <style jsx global>{`
                .ant-table .border-0 > td {
                    border: none !important;
                    max-width: 300px;
                }
                .single-row-selection-table .ant-table .ant-table-selection-column,
                .single-row-selection-table .ant-table .ant-table-selection-col {
                    display: none;
                }
                .ant-table-row-selected .editable-cell-value-wrap
                .ant-table-row-selected .editable-cell-value-wrap,
                .ant-table-row-selected .ant-table-cell {
                    font-weight: 700
                }
                .action-button-group {
                    color: transparent
                }
                .editable-cell-value-wrap > div > span {
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                .editable-cell-value-wrap:hover .action-button-group {
                    color: #272F3E !important
                }
                .editable-cell .ant-input,
                .editable-cell .ant-input:hover,
                .editable-cell .ant-input:focus,
                .editable-cell .ant-input-group-addon {
                    border: none !important;
                    background-color: white !important;
                    box-shadow: none !important;
                }

                .editable-cell .ant-input-group {
                    background-color: white !important;
                }

                .editable-cell .ant-input-group-addon {
                    padding: 0 !important;
                }

                .editable-cell .ant-input-group:focus-within {
                    border: 1px solid ${brandingColors['primary-color']};
                }

                `}</style>
    </>
    );
}


