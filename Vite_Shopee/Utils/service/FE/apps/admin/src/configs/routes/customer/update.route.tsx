import { ItemRoute } from '../../interfaces/routes.interface'
import { OGToggleActiveResource } from '@ss-fe-fw/organisms'
import { OGFormResources } from '@ss-fe-fw/organisms'
import { OGLeftColumnCustomerManagement } from 'apps/admin/src/components/organisms/resources/custom/elements/left-column-customer-management.organism'
import { updateCustomerForm } from './form/customer.form'
import React from 'react'

export const customerUpdateRoute: ItemRoute = {
  key: 'update-customer',
  link: '/resources/customer/update',
  apiEndpoint: '/customers/admin',
  isDisplayBreadcrumb: true,
  breadcrumb: [
    { path: '/resources/customer', breadcrumbName: 'Customer List' },
    { path: null, breadcrumbName: 'Customer Details' }
  ],
  ui: {
    twoColumns: {
      can: [
        { action: 'update', resource: 'Customer' }
      ],
      left: {
        isDisplay: true,
        backLink: '/resources/customer',
        component: (props) => (<OGLeftColumnCustomerManagement type="customer" {...props} />),
        extraHeaderComponent: [(props) => (<OGToggleActiveResource apiEndpoint="/customers/admin" {...props} />)],
      },
      main: {
        isDisplay: true,
        components: [
          {
            key: 'tab-customer',
            title: 'Customer Details',
            can: {
              action: 'update',
              resource: 'Customer'
            },
            component: (props) => (
              <OGFormResources
                apiEndpoint="/customers/admin"
                formType="update"
                formTitle="Customer Details"
                form={{
                  columns: 4,
                  meta: updateCustomerForm
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
