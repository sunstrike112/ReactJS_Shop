import { GeneratedOrganizationType } from '@ss-fe-fw/enums'
import { OGActionTable, OGButtonCreateResources } from '@ss-fe-fw/organisms'
import React from 'react'
import { ItemRoute } from '../../interfaces/routes.interface'

export const organizationRoute: ItemRoute = {
  key: 'organization',
  title: 'Store Management',
  link: '/resources/organizations',
  apiEndpoint: '/organizations',
  isDisplayBreadcrumb: true,
  breadcrumb: [
    { path: '/', breadcrumbName: 'Home'},
    { path: null, breadcrumbName: 'Configuration' },
    { path: null, breadcrumbName: 'Store Management' },
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
                key="add-new-organization"
                type="primary"
                link="/resources/organizations/create"
                label="Create Store"
                resourceName="Organization"
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
        fields: ['name', 'addressLine1', 'contactPhoneNumber', 'contactEmail'],
      },
      filters: {
        fields: [
          { key: 'name', label: 'Name' },
          { key: 'addressLine1', label: 'Address' },
          { key: 'contactPhoneNumber', label: 'Phone Number' },
          { key: 'contactEmail', label: 'Email' },
        ],
      },
      table: {
        isDisplay: true,
        columns: [
          { title: 'Status', key: 'isActive', type: 'status', sorter: true },
          { title: 'Name', key: 'name', sorter: true },
          { title: 'Address', key: 'addressLine1', sorter: true },
          { title: 'Phone Number', key: 'contactPhoneNumber', sorter: true },
          { title: 'Email', key: 'contactEmail', sorter: true },
          {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, row) => (
              <OGActionTable
                {...{
                  text: text,
                  row: row,
                  resourceName: 'User',
                  linkToDetail: '/resources/organizations/update'
                }}
              />
            )
          }
        ]
      }
    }
  }
}
