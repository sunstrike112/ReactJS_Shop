import { OGActionTable, OGButtonCreateResources } from '@ss-fe-fw/organisms'
import { OGCustomerActionBtn } from 'apps/admin/src/components/organisms/resources/custom/elements/customer-action-btn.organism'
import React from 'react'
import { ItemRoute } from '../../interfaces/routes.interface'

export const customerRoute: ItemRoute = {
  key: 'customer',
  title: 'Customer Management',
  link: '/resources/customer',
  apiEndpoint: '/customers',
  isDisplayBreadcrumb: true,
  breadcrumb: [
    { path: '/', breadcrumbName: 'Home'},
    { path: null, breadcrumbName: 'Global Settings' },
    { path: null, breadcrumbName: 'Customer Management' },
  ],
  ui: {
    list: {
      topControls: {
        breadcrumbTopRight: {
          isDisplay: true,
          component: [
            (props) => (
              <OGButtonCreateResources
                {...props}
                key="add-new-customer"
                type="primary"
                link="/resources/customer/create"
                label="Create Customer"
                resourceName="Customer"
              />
            )
          ]
        },
        left: {
          isDisplay: true,
        },
        right: {
          isDisplay: true,
        }
      },
      search: {
        fields: ['email', 'firstName', 'lastName'],
        customFormatFields: {
          format: (searchKey) => {
            const [firstName] = searchKey.split(' ')
            const lastName = searchKey.replace(`${firstName}`, '').trim()

            return {
              AND: [
                { firstName: { contains: firstName, mode: "insensitive" } },
                { lastName: { contains: lastName, mode: "insensitive" } }
              ]
            }
          }
        },
      },
      filters: {
        fields: [
          { key: 'isActive', label: 'Status' }
        ],
      },
      table: {
        isDisplay: true,
        columns: [
          { title: 'Status', key: 'isActive', type: 'status', sorter: true },
          { title: 'Customer Name', key: 'fullName', sorter: true },
          { title: 'Mobile Number', key: 'phoneNumber', sorter: true },
          { title: 'Email', key: 'email', linkToDetail: '/resources/customer/update', sorter: true },
          { title: 'Address', key: 'addressLine1', sorter: true },
          {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, row) => (
              <OGCustomerActionBtn />
            )
          }
        ],
        transform: (items) => {
          return items.map((item) => {
            item.fullName = `${item.firstName} ${item.lastName}`
            return item
          })
        }
      }
    }
  }
}
