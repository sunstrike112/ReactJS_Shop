import { ItemRoute } from '../../interfaces/routes.interface'
import { OGToggleActiveResource } from '@ss-fe-fw/organisms'
import { OGFormResources } from '@ss-fe-fw/organisms'
import { userForm, updateUserForm } from './form/user.form'
import { OGLeftColumnUserManagement } from 'apps/admin/src/components/organisms/resources/custom/elements/left-column-user-management.organism'
import React from 'react'
import { OGUserRolesManagement } from 'apps/admin/src/components/organisms/resources/custom/user-roles-management/user-roles-management.organism'

export const userUpdateRoute: ItemRoute = {
  key: 'update-user',
  // title: 'Users Management',
  link: '/resources/users/update',
  apiEndpoint: '/users',
  isDisplayBreadcrumb: true,
  breadcrumb: [
    { path: null, breadcrumbName: 'Configuration' },
    { path: '/resources/users', breadcrumbName: 'User Management' },
    { path: null, breadcrumbName: 'User Details' }
  ],
  ui: {
    twoColumns: {
      can: [
        { action: 'update', resource: 'User' }
      ],
      left: {
        isDisplay: true,
        backLink: '/resources/users',
        extraHeaderComponent: [(props) => (<OGToggleActiveResource apiEndpoint="/users" {...props} />)],
        // footerComponent: (props) => (<OGToggleActiveResource {...props} />),
        component: (props) => (<OGLeftColumnUserManagement {...props} />)
      },
      main: {
        isDisplay: true,
        components: [
          {
            key: 'tab-user',
            title: 'User Detail',
            can: {
              action: 'update',
              resource: 'User'
            },
            component: (props) => (
              <OGFormResources
                apiEndpoint="/users"
                // apiSchemaEndpoint="/users/schema"
                // redirectAfterComplete="/resources/users"
                formType="update"
                form={{
                  columns: 4,
                  meta: updateUserForm,
                  include: {
                    roles: {
                      include: {
                        rolePermission: true
                      }
                    },
                    organizations: true,
                    userPermissions: true
                  },
                  style: { width: '50%' }
                }}
                {...props}
              />
            )
          },
          {
            key: 'tab-user-roles',
            title: 'User Roles',
            can: {
              action: 'update',
              resource: 'Role'
            },
            component: (props) => (
              <OGUserRolesManagement
                query={{
                  include: {
                    roles: {
                      include: {
                        rolePermission: true
                      }
                    },
                    organizations: true,
                    userPermissions: true
                }}}
                {...props}
              />
            )
          }
        ],
      }
    }
  }
}
