import { ItemRoute } from '../../interfaces/routes.interface'
import { OGFormResources } from '@ss-fe-fw/organisms'
import { customerForm } from './form/customer.form'

export const customerCreateRoute: ItemRoute = {
  key: 'create-customer',
  link: '/resources/customer/create',
  apiEndpoint: '/customers/admin',
  isDisplayBreadcrumb: true,
  breadcrumb: [
    { path: '/resources/customer', breadcrumbName: 'Customer List' },
    { path: null, breadcrumbName: 'Add New Customer' }
  ],
  ui: {
    twoColumns: {
      can: [
        { action: 'create', resource: 'Customer' }
      ],
      left: {
        isDisplay: true,
        title: 'Add Customer',
        backLink: '/resources/customer',
      },
      main: {
        isDisplay: true,
        components: [
          {
            key: 'tab-store',
            title: 'Customer Details',
            can: {
              action: 'create',
              resource: 'Customer'
            },
            component: (props) => (
              <OGFormResources
                apiEndpoint="/customers/admin"
                redirectAfterComplete="/resources/customer"
                formType="create"
                formTitle="Customer Details"
                form={{
                  columns: 4,
                  meta: customerForm,
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
