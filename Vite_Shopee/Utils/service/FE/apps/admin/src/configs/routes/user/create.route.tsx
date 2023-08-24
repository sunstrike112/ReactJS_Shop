import { ItemRoute } from '../../interfaces/routes.interface'
import { OGToggleActiveResource } from '@ss-fe-fw/organisms'
import { OGFormResources } from '@ss-fe-fw/organisms'
import { userForm } from './form/user.form'

export const userCreateRoute: ItemRoute = {
  key: 'create-user',
  // title: 'Users Management',
  link: '/resources/users/create',
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
        { action: 'create', resource: 'User' }
      ],
      left: {
        isDisplay: true,
        title: 'Add New User',
        backLink: '/resources/users',
        // extraHeaderComponent: [(props) => (<OGToggleActiveResource {...props} />)],
        // footerComponent: (props) => (<OGToggleActiveResource {...props} />),
        // component: (props) => (<OGToggleActiveResource {...props} />)
      },
      main: {
        isDisplay: true,
        components: [
          {
            key: 'tab-user',
            title: 'User Detail',
            can: {
              action: 'create',
              resource: 'User'
            },
            component: (props) => (
              <OGFormResources
                apiEndpoint="/users"
                // apiSchemaEndpoint="/users/schema"
                redirectAfterComplete="/resources/users"
                formType="create"
                form={{
                  columns: 4,
                  meta: userForm,
                  style: { width: '50%' }
                }}
                {...props}
              />
            )
          },
        ],
      }
    }
  }
}
