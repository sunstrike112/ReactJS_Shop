import { ItemRoute } from '../../interfaces/routes.interface'
import { OGFormResources } from '@ss-fe-fw/organisms'
import { organizationForm } from './form/organization.form'

export const organizationCreateRoute: ItemRoute = {
  key: 'create-organization',
  link: '/resources/organizations/create',
  apiEndpoint: '/organizations',
  isDisplayBreadcrumb: true,
  breadcrumb: [
    { path: null, breadcrumbName: 'Configuration' },
    { path: '/resources/organizations', breadcrumbName: 'Store Management' }
  ],
  ui: {
    twoColumns: {
      can: [
        { action: 'create', resource: 'Organization' }
      ],
      left: {
        isDisplay: true,
        title: 'Add Store',
        backLink: '/resources/organizations',
      },
      main: {
        isDisplay: true,
        components: [
          {
            key: 'tab-store',
            title: 'Store Details',
            can: {
              action: 'create',
              resource: 'Organization'
            },
            component: (props) => (
              <OGFormResources
                apiEndpoint="/organizations"
                redirectAfterComplete="/resources/organizations"
                formType="create"
                formTitle="Store Details"
                form={{
                  columns: 4,
                  meta: organizationForm,
                  style: { width: '50%' },
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
