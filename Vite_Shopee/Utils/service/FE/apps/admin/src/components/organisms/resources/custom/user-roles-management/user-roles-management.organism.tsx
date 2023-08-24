import { List, Row, Col, Space, Button, notification } from 'antd';
import { MCPermissionHeader } from 'apps/admin/src/components/molecules/user-roles/user-roles-permission-header.molecule';
import React, { useState, useEffect } from 'react';
import { useMount } from 'react-use';
import useDetailResource from '@ss-fe-fw/hooks/use-detail-resource';
import { MCLocationHeader } from 'apps/admin/src/components/molecules/user-roles/user-roles-location-header.molecule';
import { MCRoleHeader } from 'apps/admin/src/components/molecules/user-roles/user-roles-role-header.molecule';
import PubSub from 'pubsub-js';
import { cloneDeep, isEqual, remove, uniqWith } from 'lodash';
import {
  deleteUserRole,
  getRoleDetail,
  updateUserRoles,
} from '@ss-fe-fw/api/user/user-permissions';
import { ITEM_UPDATE_SUCCESSFULLY } from '@ss-fe-fw/constants';
import { MCCheckboxList } from 'apps/admin/src/components/molecules/user-roles/user-roles-checkbox-list.molecule';
import { DeleteFilled } from '@ant-design/icons';
import { pascalCase } from 'change-case';

const SELECTED_ROLE_INITIAL_VALUES = {
  id: null,
  name: '',
  code: '',
  isGlobal: false,
  permissions: [],
  rolePermission: {
    permissions: [],
  },
};

export function OGUserRolesManagement(props) {
  const [mounted, setMounted] = useState(false);
  const [detailUrl, setDetailUrl] = useState(null);
  const [query, setQuery] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedRole, setSelectedRole] = useState(
    SELECTED_ROLE_INITIAL_VALUES
  );
  const [organizations, setOrganizations] = useState([]);
  const [roles, setRoles] = useState([]);
  const [organizationRoles, setOrganizationRoles] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  const [currentUserPermission, setCurrentUserPermission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { data, error } = useDetailResource({ mounted, detailUrl, query });

  useMount(() => setMounted(true));

  useEffect(() => {
    const url = `${props.resource.apiEndpoint}/${props.idData}`;
    const combinedQuery = props?.query?.include
      ? { include: props?.query?.include }
      : {};
    setDetailUrl(url);
    setQuery(combinedQuery);
  }, []);

  useEffect(() => {
    if (data) {
      setOrganizations(data.organizations);
      setRoles(data.roles);
      setUserPermissions(data.userPermissions);
    }
  }, [data]);

  useEffect(() => {
    const newOrganization = PubSub.subscribe(
      'add_new_organization',
      (msg, data) => {
        // if (organizations.length === 0) return;

        const idx = organizations.findIndex((organization) => {
          return organization.id === data.id;
        });

        if (idx < 0) {
          setOrganizations([...organizations, data]);
          addNewOrganization(data.id);
        }
      }
    );

    return () => {
      PubSub.unsubscribe(newOrganization);
    };
  }, [organizations]);

  useEffect(() => {
    const newRole = PubSub.subscribe('add_new_role', async (msg, data) => {
      const idx = organizationRoles.findIndex((role) => {
        return role.id === data.id;
      });

      if (idx < 0) {
        const roleDetailQuery = {
          include: {
            rolePermission: true
          }
        }
        const result = await getRoleDetail(data.id, roleDetailQuery);
        addNewRole(result.id);
        setOrganizationRoles([...organizationRoles, result]);
      }
    });

    return () => {
      PubSub.unsubscribe(newRole);
    };
  }, [organizationRoles]);

  useEffect(() => {
    if (selectedRole.id) setNewUserPermission();
  }, [selectedRole.id]);

  useEffect(() => {
    if (submitted) {
      const selectedOrganization = organizations.find((item) => {
        return item.id === selectedLocation;
      });

      if (selectedOrganization) selectLocation(selectedOrganization);
      setSubmitted(false);
    }
  }, [userPermissions]);

  const selectLocation = (location) => {
    setSelectedLocation(location.id);

    const userPermissionsFiltered = userPermissions.filter((item) => {
      return item.organizationId === location.id;
    });

    let filteredRoles = [];
    userPermissionsFiltered.forEach((item) => {
      roles.forEach((role) => {
        if (item.roleId === role.id) {
          filteredRoles.push(role);
        }
      });
    });

    setOrganizationRoles(filteredRoles);
  };

  const selectRole = (role) => {
    setLoading(true);
    createRoleData(role).then((item: any) => {
      setSelectedRole(item);
      setLoading(false);
    });
  };

  const setNewUserPermission = () => {
    let filteredUserPermission = filterUserPermission();

    if (!filteredUserPermission) {
      filteredUserPermission = {
        organizationId: selectedLocation,
        roleId: selectedRole.id,
        permissions: [],
        forbidden: [],
      };
    }
    setCurrentUserPermission(filteredUserPermission);
  };

  const createRoleData = (role) => {
    return new Promise(async (resolve, reject) => {
      let rolePermissions = [...role.permissions];
      rolePermissions = mapRoleData(role, rolePermissions);
      role.permissions = rolePermissions;

      return resolve(role);
    });
  };

  const mapRoleData = (role, arr: any[]) => {
    let parentName = [];
    arr.forEach((item) => {
      Object.entries(item).forEach(([key, value]) => {
        if (key === 'groupName' && value && !parentName.includes(value)) {
          parentName.push(value);
        }
      });
    });

    arr = arr.map((item) => {
      if (item.groupName) {
        item.parent = item.groupName;
      }

      return item;
    });

    parentName.forEach((name) => {
      const idx = arr.findIndex((item) => {
        return item.groupName === name;
      });

      const filteredGroup = arr.filter((item) => {
        return item.groupName === name;
      });

      const newItem = {
        name: name,
        code: pascalCase(name),
        groupName: null,
        canCreate: mapCheckboxValue(filteredGroup, 'canCreate'),
        canDelete: mapCheckboxValue(filteredGroup, 'canDelete'),
        canRead: mapCheckboxValue(filteredGroup, 'canRead'),
        canUpdate: mapCheckboxValue(filteredGroup, 'canUpdate'),
        isParent: true,
      };

      const newItemIdx = arr.findIndex((item) => {
        return item.name === newItem.name;
      });

      if (newItemIdx === -1) arr.splice(idx, 0, newItem);
    });

    if (!role.isGlobal) {
      remove(arr, (item) => {
        return (
          item.groupName === 'General Settings' ||
          item.name === 'General Settings'
        );
      });
    }

    return arr;
  };

  const mapCheckboxValue = (arr, field) => {
    const isChecked = arr.some((item) => {
      return !item[field];
    });

    return !isChecked;
  };

  const onChange = async ({
    fieldName,
    item,
    resource,
    isParent,
    isAdd,
    name,
    action,
    parentName,
    isChecked,
  }) => {
    let userPermission = cloneDeep(currentUserPermission);
    remove(userPermission[fieldName], (e: any) => {
      return e.resource === resource;
    });

    if (isParent) {
      const filterChildren = selectedRole.permissions.filter((e) => {
        return e.groupName === name;
      });

      filterChildren.forEach((children) => {
        const childrenDefaultValue = getDefaultValue(action, children);

        if (
          isAdd &&
          isChecked === childrenDefaultValue &&
          childrenDefaultValue
        ) {
          const idx = userPermission?.forbidden?.findIndex((e) => {
            return e.action === action && e.resource === children.code;
          });

          if (idx === 0) {
            userPermission.forbidden = userPermission.forbidden.filter((e) => {
              return e.action !== action;
            });
          }
        } else if (!isAdd) {
          if (isChecked !== childrenDefaultValue && childrenDefaultValue) {
            const obj = {
              action,
              resource: children.code,
            };

            userPermission.forbidden = userPermission.forbidden
              ? [...userPermission.forbidden, obj]
              : [obj];
          } else {
            remove(userPermission[fieldName], (e: any) => {
              return e.resource === children.code && e.action === action;
            });
          }
        }
      });
    }

    userPermission[fieldName] = userPermission[fieldName]
      ? uniqWith([...userPermission[fieldName], ...item], isEqual)
      : uniqWith([...item], isEqual);

    if (!isParent && parentName) {
      let filteredData = [];
      const filterChildren = selectedRole.permissions.filter((e) => {
        return e.groupName === parentName;
      });

      filterChildren.forEach((children) => {
        const data = userPermission[fieldName].filter((e) => {
          return e.action === action && e.resource === children.code;
        });

        filteredData = [...filteredData, ...data];
      });

      const mapData = filteredData.map((e) => e.resource);
      const mapChildren = filterChildren.map((e) => e.code);

      if (isEqual(mapData, mapChildren)) {
        const obj = {
          action,
          resource: pascalCase(parentName),
        };

        userPermission[fieldName] = uniqWith(
          [...userPermission[fieldName], obj],
          isEqual
        );
      } else {
        remove(userPermission[fieldName], (e: any) => {
          return e.action === action && e.resource === pascalCase(parentName);
        });
      }
    }

    setCurrentUserPermission(userPermission);
  };

  const getDefaultValue = (action, item) => {
    let defaultValue = false;

    switch (action) {
      case 'create':
        defaultValue = item.canCreate;
        break;
      case 'read':
        defaultValue = item.canRead;
        break;
      case 'update':
        defaultValue = item.canUpdate;
        break;
      case 'delete':
        defaultValue = item.canDelete;
        break;
    }

    return defaultValue;
  };

  const addNewOrganization = (organizationId) => {
    const payload = {
      organizationId,
    };

    setLoading(true);
    submitUpdateUserRoles(payload, props.idData).then((res) => {
      if (res) {
        setLoading(false);
      }
    });
  };

  const addNewRole = (roleId) => {
    const payload = {
      organizationId: selectedLocation,
      roleId,
    };

    setLoading(true);
    submitUpdateUserRoles(payload, props.idData).then((res) => {
      if (res) {
        setLoading(false);
      }
    });
  };

  const submit = async () => {
    currentUserPermission.permissions = currentUserPermission.permissions
      ? uniqWith([...currentUserPermission.permissions], isEqual)
      : [];
    currentUserPermission.forbidden = currentUserPermission.forbidden
      ? uniqWith([...currentUserPermission.forbidden], isEqual)
      : [];

    const payload = currentUserPermission;
    submitUpdateUserRoles(payload, props.idData).then((res) => {
      if (res) setLoading(false);
    });
  };

  const submitUpdateUserRoles = (payload, id) => {
    setLoading(true);
    return new Promise(async (resolve, reject) => {
      const result = await updateUserRoles(payload, id);
      if (result) {
        setSubmitted(true);
        setOrganizations(result.organizations);
        setRoles(result.roles);
        setUserPermissions(result.userPermissions);
      }

      if (!result.status) {
        notification.success({
          message: ITEM_UPDATE_SUCCESSFULLY,
        });
      }

      resolve(true);
    });
  };

  const deleteOrganizations = (organizationId, event) => {
    event.stopPropagation();
    const payload = {
      organizationId,
    };

    setLoading(true);
    submitDeleteOrganizationRole(payload, props.idData).then((res) => {
      if (res) {
        setSelectedLocation(null);
        setOrganizationRoles([]);
        setSelectedRole(SELECTED_ROLE_INITIAL_VALUES);
        setLoading(false);
      }
    });
  };

  const deleteRoles = (roleId, event) => {
    event.stopPropagation();
    const payload = {
      organizationId: selectedLocation,
      roleId,
    };

    setLoading(true);
    submitDeleteOrganizationRole(payload, props.idData).then((res) => {
      if (res) {
        setSelectedRole(SELECTED_ROLE_INITIAL_VALUES);
        setLoading(false);
      }
    });
  };

  const submitDeleteOrganizationRole = (payload, id) => {
    return new Promise(async (resolve, reject) => {
      const result = await deleteUserRole(payload, id);
      if (result) {
        setSubmitted(true);
        setOrganizations(result.organizations);
        setRoles(result.roles);
        setUserPermissions(result.userPermissions);
      }

      if (!result.status) {
        notification.success({
          message: ITEM_UPDATE_SUCCESSFULLY,
        });
      }
      resolve(true);
    });
  };

  const onReset = () => {
    const filteredUserPermission = filterUserPermission();
    if (filteredUserPermission)
      setCurrentUserPermission(filteredUserPermission);
    selectRole(selectedRole);
  };

  const filterUserPermission = () => {
    return userPermissions?.find((item) => {
      return (
        item.organizationId === selectedLocation &&
        item.roleId === selectedRole.id
      );
    });
  };

  return (
    <Row gutter={[0, 16]}>
      <Col span={5} className="border-user-roles border-right-none">
        <List
          className="list-container"
          header={
            <MCLocationHeader title="Location" apiEndpoint="/organizations" />
          }
          dataSource={organizations}
          renderItem={(item) => (
            <div className="user-roles-list-container">
              <div
                className={`user-roles-list-item-container ${
                  selectedLocation === item.id ? 'selected' : ''
                }`}
                onClick={() => selectLocation(item)}
              >
                <a className="user-roles-list-item">{item.name}</a>

                <Button
                  className="delete-button"
                  onClick={(e) => deleteOrganizations(item.id, e)}
                  icon={<DeleteFilled />}
                  type="link"
                  danger
                />
              </div>
            </div>
          )}
        />
      </Col>

      <Col span={5} className="border-user-roles border-right-none">
        <List
          className="list-container"
          header={
            <MCRoleHeader
              title="Role"
              apiEndpoint="/roles"
              isSelectedLocation={selectedLocation ? true : false}
            />
          }
          dataSource={organizationRoles}
          renderItem={(item) => (
            <div className="user-roles-list-container">
              <div
                className={`user-roles-list-item-container ${
                  selectedRole.code === item.code ? 'selected' : ''
                }`}
                onClick={() => selectRole(item)}
              >
                <a className="user-roles-list-item">{item.name}</a>

                <Button
                  className="delete-button"
                  onClick={(e) => deleteRoles(item.id, e)}
                  icon={<DeleteFilled />}
                  type="link"
                  danger
                />
              </div>
            </div>
          )}
        />
      </Col>

      <Col span={14} className="border-user-roles">
        <List
          className="list-container"
          header={<MCPermissionHeader />}
          dataSource={
            !loading || selectedRole.id ? selectedRole.permissions : []
          }
          renderItem={(item) => (
            <Row className="user-roles-permission-list-container">
              <Col span={12}>
                <span className={item.parent ? 'checkbox-group-item' : ''}>
                  {item.name}
                </span>
              </Col>
              <Col span={12}>
                {!selectedRole.isGlobal &&
                  (item.groupName !== 'General Settings' ||
                    item.name !== 'General Settings')}
                <MCCheckboxList
                  role={selectedRole}
                  rolePermission={item}
                  userPermission={currentUserPermission}
                  onChangeCheckbox={onChange}
                />
              </Col>
            </Row>
          )}
        />
      </Col>
      <Col span={24}>
        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button htmlType="button" onClick={onReset} disabled={loading}>
            Cancel
          </Button>
          <Button type="primary" onClick={submit}>
            Save
          </Button>
        </Space>
      </Col>
    </Row>
  );
}
