import baseApi from '@ss-fe-fw/api/base-api';
import { ROLE_ENPOINT } from '@ss-fe-fw/constants';
import { Action } from '../../enums'

export interface UpdatePermission {
    action: Action,
    resource: string
}

export interface Permission {
    id: Number,
    name: String,
    code: String,
    groupName: String,
    disabledActions: Action[],
    isGlobal: Boolean,
    order: Number,
    canCreate: Boolean,
    canRead: Boolean,
    canUpdate: Boolean,
    canDelete: Boolean
}

export interface Role {
    id: number,
    name: string,
    code: string,
    level: number,
    isActive: boolean,
    isGlobal: boolean,
    isDefault: boolean,
    createdAt: string,
    updatedAt: string,
    deletedAt: any,
    rolePermission: {
        id: number,
        roleId: number,
        permissions: Permission[]
    }
}

type CreateRole = Pick<Role, 'name'>

async function getRoles() {
    return await baseApi(ROLE_ENPOINT.BASE + ROLE_ENPOINT.SEARCH, 'POST', {})
}

async function getRoleByRoleId(roleId: number, rolePermisionInclude: boolean) {
    const body = {
        include: {
            rolePermission: rolePermisionInclude
        }
    }
    return await baseApi(ROLE_ENPOINT.BASE + `/${roleId}`, 'POST', body)
}

async function updateRoleById(roleId: Number, payload: Partial<Role> | any) {
    return await baseApi(ROLE_ENPOINT.BASE + `/${roleId}`, 'PATCH', payload)
}

async function createNewRole(payload: CreateRole) {
    return await baseApi(ROLE_ENPOINT.BASE, 'POST', payload)
}

async function deleteRoleById(roleId: Number) {
    return await baseApi(ROLE_ENPOINT.BASE + `/${roleId}`, 'DELETE', {})
}
export { getRoles, getRoleByRoleId, updateRoleById, createNewRole, deleteRoleById }