import { Col, Form, Row } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { isEqual, uniqWith } from 'lodash';
import React, { useState, useEffect } from 'react';

export interface MCCheckboxListProps {
  role: any;
  rolePermission: any;
  userPermission: any;
  onChangeCheckbox: any;
}

export function MCCheckboxList(props) {
  const [form] = Form.useForm();
  const [permissions, setPermissions] = useState([]);
  const [forbidden, setForbidden] = useState([]);

  useEffect(() => {
    const filteredPermissions = props?.userPermission?.permissions?.filter(
      (e) => {
        return e.resource === props.rolePermission.code;
      }
    );
    setPermissions(filteredPermissions);

    const filteredForbidden = props?.userPermission?.forbidden?.filter((e) => {
      return e.resource === props.rolePermission.code;
    });
    setForbidden(filteredForbidden ? filteredForbidden : []);
  }, [props.userPermission]);

  useEffect(() => {
    const canCreate = checkHavePermForb('create', permissions)
      ? true
      : (checkHavePermForb('create', forbidden) && props.rolePermission.canCreate)
      ? false
      : props.rolePermission.canCreate;
    const canRead = checkHavePermForb('read', permissions)
      ? true
      : checkHavePermForb('read', forbidden)
      ? false
      : props.rolePermission.canRead;
    const canUpdate = checkHavePermForb('update', permissions)
      ? true
      : checkHavePermForb('update', forbidden)
      ? false
      : props.rolePermission.canUpdate;
    const canDelete = checkHavePermForb('delete', permissions)
      ? true
      : checkHavePermForb('delete', forbidden)
      ? false
      : props.rolePermission.canDelete;

    const obj = {
      name: props.rolePermission.name,
      canCreate,
      canRead,
      canUpdate,
      canDelete,
    };

    Object.entries(obj).forEach(([key, value]) => {
      form.setFieldsValue({ [key]: value });
    });
  }, [permissions, forbidden]);

  const checkHavePermForb = (action, field) => {
    return field?.some((e) => e.action === action);
  };

  const disabledCheckbox = (disabledActions = [], action) => {
    if (disabledActions.includes(action)) {
      return true;
    }

    return false;
  };

  const onChange = async (event, action, defaultValue) => {
    const isChecked = event.target.checked;
    const fieldName = !defaultValue ? 'permissions' : 'forbidden';
    const field = !defaultValue ? permissions : forbidden;
    const obj = {
      action,
      resource: props.rolePermission.code,
    };

    if (isChecked !== defaultValue) {
      await setPermForb(field, obj, isChecked).then((value: any[]) => {
        setNewValue(fieldName, value, defaultValue, true, action, isChecked);
      });
    } else {
      await removePermForb(field, obj).then((value: any[]) => {
        setNewValue(fieldName, value, defaultValue, false, action, isChecked);
      });
    }
  };

  const setNewValue = (fieldName, value, defaultValue, isAdded, action, isChecked) => {
    if (!defaultValue) {
      setPermissions([...value]);
    } else {
      setForbidden([...value]);
    }

    onChangeCheckboxEmitValue(fieldName, value, props.rolePermission.isParent, isAdded, action, isChecked);
  }

  const setPermForb = (field, item, isChecked?) => {
    return new Promise((resolve, reject) => {
      let data = [...field, item];

      if (props.rolePermission.isParent) {
        const filterChildren = props.role.permissions.filter((e) => {
          return e.groupName === props.rolePermission.name;
        });
        
        filterChildren.forEach((e) => {
          const childrenDefaultValue = getDefaultValue(item.action, e);

          if (isChecked !== childrenDefaultValue) {
            const obj = {
              action: item.action,
              resource: e.code
            }

            data = [...data, obj];
          }
        });
      }

      resolve(uniqWith(data, isEqual));
    })
  };

  const removePermForb = (field, item) => {
    return new Promise((resolve, reject) => {
      let data = [...field];
      
      const idx = field?.findIndex((e) => {
        return item.action === e.action
      })
      if (idx && idx > 0) data.splice(idx, 1); 
      if (idx === 0) {
        data = data.filter((e) => {
          return e.action !== item.action
        });
      } 

      resolve(uniqWith(data, isEqual));
    })
  }

  const onChangeCheckboxEmitValue = (fieldName, value, isParent, isAdd, action, isChecked) => {
    props.onChangeCheckbox({
      fieldName,
      item: value,
      resource: props.rolePermission.code,
      isParent,
      isAdd,
      name: props.rolePermission.name,
      action,
      parentName: props.rolePermission.groupName,
      isChecked
    }); 
  }

  const getDefaultValue = (action, item) => {
    let defaultValue =  false;

    switch (action) {
      case "create":
        defaultValue = item.canCreate;
        break;
      case "read":
        defaultValue = item.canRead;
        break;
      case "update":
        defaultValue = item.canUpdate;
        break;
      case "delete":
        defaultValue = item.canDelete;
        break;
    }

    return defaultValue
  }

  const checkboxClassName = (actionType) => {
    let className = '';

    const isHavePermissions = permissions?.some((e) => e.action === actionType);

    const isHaveForbidden = forbidden?.some((e) => e.action === actionType);

    className =
      isHavePermissions || isHaveForbidden
        ? 'user-permission-checkbox'
        : 'user-roles-checkbox';
    return className;
  };

  return (
    <Form form={form}>
      <Row justify="center" className="checkbox-group">
        <Col span={6} className="user-roles-permission-checkbox">
          <Form.Item name="canCreate" valuePropName="checked">
            <Checkbox
              className={checkboxClassName('create')}
              onChange={(e) =>
                onChange(e, 'create', props.rolePermission.canCreate)
              }
              disabled={disabledCheckbox(
                props.rolePermission.disabledActions,
                'create'
              )}
            />
          </Form.Item>
        </Col>
        <Col span={6} className="user-roles-permission-checkbox">
          <Form.Item name="canRead" valuePropName="checked">
            <Checkbox
              className={checkboxClassName('read')}
              onChange={(e) =>
                onChange(e, 'read', props.rolePermission.canRead)
              }
              disabled={disabledCheckbox(
                props.rolePermission.disabledActions,
                'read'
              )}
            />
          </Form.Item>
        </Col>
        <Col span={6} className="user-roles-permission-checkbox">
          <Form.Item name="canUpdate" valuePropName="checked">
            <Checkbox
              className={checkboxClassName('update')}
              onChange={(e) =>
                onChange(e, 'update', props.rolePermission.canUpdate)
              }
              disabled={disabledCheckbox(
                props.rolePermission.disabledActions,
                'update'
              )}
            />
          </Form.Item>
        </Col>
        <Col span={6} className="user-roles-permission-checkbox">
          <Form.Item name="canDelete" valuePropName="checked">
            <Checkbox
              className={checkboxClassName('delete')}
              onChange={(e) =>
                onChange(e, 'delete', props.rolePermission.canDelete)
              }
              disabled={disabledCheckbox(
                props.rolePermission.disabledActions,
                'delete'
              )}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
