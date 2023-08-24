import { createNewRole, deleteRoleById, getRoleByRoleId, getRoles, Permission, Role, UpdatePermission, updateRoleById } from '@ss-fe-fw/api/role/role';
import { ITEM_CREATED_SUCCESSFULLY, ITEM_DELETED_SUCCESSFULLY, ITEM_UPDATE_SUCCESSFULLY } from '@ss-fe-fw/constants';
import { capitalizeFirstLetter } from '@ss-fe-fw/utils/format-data';
import { Button, Empty, notification, Spin } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import Layout, { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { pick } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Action } from '../../../enums';
import { MCCheckboxTable, MCDynamicTable } from '../../molecules';

const DEFAULT_NEW_ROW_ID = 0
const NOT_GLOBAL_FORBIDDEN_RESOURCE = 'General Settings';
interface Column {
  title: string,
  dataIndex: string,
  key?: string,
  render: Function,
  editable?: Boolean
}
interface Row {
  [index: string]: any,
  readonly?: Boolean,
  newRow?: Boolean
}
interface GroupCriteria {
  groupName: string,
  condition: Function
}

const roleColumns: Column[] = [
  {
    title: 'Role',
    dataIndex: 'name',
    key: 'name',
    render: (text) => text,
    editable: true
  },
];

/**
 * @returns Columns that used in Checkbox table, include: resourceName | create | read | update | delete |
 */
const permisionColumns = (): Column[] => {
  let columns = [
    {
      title: 'Module',
      dataIndex: 'name',
      width: '50%',
      render: (text, record) => record.groupName ? <span style={{ marginInlineStart: '24px' }}>{text}</span> : <>{text}</>
    }
  ]

  /**
   * With each enum Action type, create a column
   */
  for (let type in Action) {
    const value: Action = Action[type] as Action;

    const newColumn = {
      title: capitalizeFirstLetter(type), // Upper case first letter
      dataIndex: value.toString(),
      editable: true
    }

    // @ts-expect-error
    columns = [...columns, newColumn]

  }
  return columns
}

const roleGroupCriteria: GroupCriteria[] = [
  { groupName: 'System Roles', condition: (e: any) => e.level == 1 && e.isDefault },
  { groupName: 'Custom Roles', condition: (e: any) => !(e.level == 1 && e.isDefault) }
]



export default function OGManageRoles(props) {

  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)

  const [roles, setRoles] = useState([])
  const [selectedRoleId, setSelectedRoleId] = useState('');

  const [isToggleSave, setIsToggleSave] = useState(null)
  const [isTogggleReset, setIsTogggleReset] = useState(null)

  const [permissions, setPermissions] = useState([])

  const [globalPermission, setGlobalPermission] = useState(null)
  const [initGlobalPermission, setInitGlobalPermission] = useState(null)

  useEffect(() => {
    getRoles().then((result) => {
      setRoles(result.items)

    }).catch((err) => {
      console.log('err :>> ', err);
    });
  }, [])

  useEffect(() => {
    (async () => {
      setPermissions([])
      setMounted(false)

      if (Number(selectedRoleId) != DEFAULT_NEW_ROW_ID) {
        const roleDetail = await getRoleByRoleId(Number(selectedRoleId), true)
        setPermissions(roleDetail.rolePermission?.permissions || [])
        setGlobalPermission(roleDetail.isGlobal)
        setInitGlobalPermission(roleDetail.isGlobal)
      }

      setMounted(true)
    })()
  }, [selectedRoleId])

  const onSelectRole = (row) => {
    const { id: key } = row
    if (key > 0)
      setSelectedRoleId(key.toString())
  }

  const onAddRole = () => {
    const row: Partial<Role> & Row = {
      id: DEFAULT_NEW_ROW_ID,
      name: '',
      newRow: true,
      readonly: false,
      disableSelect: false
    }
    setRoles([...roles, { ...row }])
  }

  const onDiscardRole = async (id) => {
    if (id != DEFAULT_NEW_ROW_ID) {
      const result = await deleteRoleById(id)

      if (result.status)
        return;

      // If delete selected role, empty selectedRoles
      if (id == Number(selectedRoleId)) {
        setSelectedRoleId('')
      }

      notification.success({
        message: ITEM_DELETED_SUCCESSFULLY
      })
    }
    setRoles([...roles.filter(d => d.id != id)])
  }

  const onSaveRole = async (row) => {
    const { id } = row
    let result = null, body = null
    if (id == DEFAULT_NEW_ROW_ID) {
      body = pick(row, ['name'])
      result = await createNewRole(body)

      if (result.status)
        return;

      setSelectedRoleId(result.id)

      notification.success({
        message: ITEM_CREATED_SUCCESSFULLY
      })
    } else {
      body = pick(row, ['name', 'level', 'isActive', 'isGlobal', 'isDefault'])
      result = await updateRoleById(id, body)

      if (result.status)
        return;
      notification.success({
        message: ITEM_UPDATE_SUCCESSFULLY
      })
    }
    setRoles(roles.map(d => d.id == row.id ? ({ ...result }) : ({ ...d })))
  }

  const onSavePermissions = async (changedPermissions) => {
    const body = {
      isGlobal: globalPermission,
      rolePermission: {
        permissions: [...convertPermission(changedPermissions, globalPermission)]
      }
    }

    const result = await updateRoleById(Number(selectedRoleId), body)

    if (result.status)
      return;

    notification.success({
      message: ITEM_UPDATE_SUCCESSFULLY
    })

    setPermissions([...changedPermissions])
    setInitGlobalPermission(globalPermission)

    setIsToggleSave(null)
    setIsTogggleReset(null)
    setLoading(false)
  }

  const standardisePermisionDataSrc = (data, isGlobal) => {
    let result = []

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      const hideGeneralSettings = !isGlobal && element.groupName == 'General Settings'

      if (element.groupName && !result.find(r => r.name == element.groupName)) {
        const sameGroup = data.filter(d => d.groupName == element.groupName)
        const canRead = sameGroup.every(e => e.canRead)
        const canDelete = sameGroup.every(e => e.canDelete)
        const canUpdate = sameGroup.every(e => e.canUpdate)
        const canCreate = sameGroup.every(e => e.canCreate)

        const newGroup = {
          id: -element.id,
          key: (-element.id).toString(),
          name: element.groupName,
          groupName: null,
          disabledActions: [],
          canCreate: canCreate,
          canRead: canRead,
          canUpdate: canUpdate,
          canDelete: canDelete,
          hide: hideGeneralSettings
        }
        result.push(newGroup)
        // result.push(newGroup) = [...result, newGroup]
      }
      result.push({ ...element, key: element.id.toString(), hide: hideGeneralSettings })
      // result = [...result, { ...element, key: element.id.toString(), hide: hideGeneralSettings }]
    }
    return result
  }

  const groupDataByCriteria = (roles, criterias: GroupCriteria[]) => {
    let result = {}

    for (let index = 0; index < roles.length; index++) {
      const element = roles[index];
      criterias.forEach(c => {
        if (c.condition(element)) {
          result = { ...result, [c.groupName]: [...result[c.groupName] || [], { ...element }] }
        }
      })
    }
    return result
  }

  const standardiseRoleDataSrc = (roles) => {
    const groupingRoles = groupDataByCriteria(roles, roleGroupCriteria) // groupingRoles = {'Custom Roles': Array(2), 'System Roles': Array(3)}

    const systemGroup = groupingRoles['System Roles'].map(role => ({ ...role, hideIcons: true }))

    return [
      {
        id: -1,
        name: 'System Roles',
        newRow: false,
        readonly: true,
        disableSelect: true
      },
      ...systemGroup || [],
      {
        id: -2,
        name: 'Custom Roles',
        newRow: false,
        readonly: true,
        disableSelect: true
      },
      ...groupingRoles['Custom Roles'] || []
    ]

  }

  const convertPermission = (permssions: Permission[], isGlobalPermission = true): UpdatePermission[] => {
    let result = []
    let superPermission = [{ action: 'manage', resource: 'all' }]

    let isSupperPermission = true

    for (let index = 0; index < permssions.length; index++) {
      const element = permssions[index];

      if (!isGlobalPermission && element.groupName == NOT_GLOBAL_FORBIDDEN_RESOURCE)
        break;

      for (let type in Action) {
        const value: Action = Action[type] as Action;
        element[value] && result.push({ action: type, resource: element.code })
        element[value] == false && (isSupperPermission = false)
      }
    }

    return isSupperPermission ? superPermission : result
  }

  const onToggleGlobalPermission = (isChecked) => {
    setGlobalPermission(isChecked)
  }

  return <>
    <Layout className="site-layout-background">
      <Sider className="site-layout-background" width={300} style={{ boxShadow: 'none', border: '1px solid #f0f0f0' }}>
        {(roleColumns.length && roles.length)
          ? <MCDynamicTable columns={roleColumns} data={standardiseRoleDataSrc(roles)}
            onSelectRow={onSelectRole}
            selectedRowKeys={selectedRoleId.toString()}
            onAddRow={onAddRole}
            onSaveRow={onSaveRole}
            onDeleteRow={onDiscardRole}></MCDynamicTable>
          : <div></div>
        }
      </Sider>
      <Content style={{ border: '1px solid #f0f0f0' }}>
        {
          !mounted
            ? <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}><Spin /></div>
            : (permissions.length && globalPermission != null
              ? (<>
                <GlobalPermission isGlobalPermission={globalPermission} onToggleGlobalPermission={onToggleGlobalPermission} />
                <MCCheckboxTable
                  columns={permisionColumns()}
                  dataSource={standardisePermisionDataSrc(permissions, globalPermission)}
                  loading={!mounted}
                  isToggleSave={isToggleSave}
                  isTogggleReset={isTogggleReset}
                  onSaveChanges={onSavePermissions}
                ></MCCheckboxTable>
              </>)
              : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)
        }
      </Content>
    </Layout >
    <div style={{ paddingTop: '10px', display: 'flex', justifyContent: 'flex-end', alignItems: 'end', gap: '10px' }}>
      <Button onClick={() => { setIsTogggleReset(!isTogggleReset); setGlobalPermission(initGlobalPermission) }}>
        Cancel
      </Button>
      <Button onClick={() => { setIsToggleSave(!isToggleSave); setLoading(true) }} type="primary" loading={loading}>
        Save
      </Button>
    </div>
  </>

}


const GlobalPermission = (props) => {
  const onChange = (e) => {
    props.onToggleGlobalPermission(e.target.checked)
  }

  return (<>
    <div className="ant-table ant-table-small ant-table-empty">
      <div className="ant-table-container">
        <div className="ant-table-content">
          <table style={{ tableLayout: 'auto' }}>
            <thead className="ant-table-thead">
              <tr>
                <th className="ant-table-cell">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Permission</span>
                    <Checkbox onChange={onChange} checked={props.isGlobalPermission}>Global Permission</Checkbox>
                  </div></th></tr></thead></table></div></div></div>
  </>)
}


GlobalPermission.prototypes = {
  isGlobalPermission: PropTypes.bool,
  onToggleGlobalPermission: PropTypes.func,
  isToggleReset: PropTypes.bool
}

OGManageRoles.propTypes = {
  apiEndpoint: PropTypes.string
}


