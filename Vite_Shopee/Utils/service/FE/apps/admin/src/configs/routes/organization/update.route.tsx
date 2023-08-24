import { ItemRoute } from '../../interfaces/routes.interface'
import { OGToggleActiveResource } from '@ss-fe-fw/organisms'
import { OGFormResources } from '@ss-fe-fw/organisms'
import React from 'react'
import { OGLeftColumnServiceCentre } from 'apps/admin/src/components/organisms/resources/custom/elements/left-column-service-centre.organism'
import { updateOrganizationForm } from './form/organization.form'

export const organizationUpdateRoute: ItemRoute = {
  key: 'update-organization',
  link: '/resources/organizations/update',
  apiEndpoint: '/organizations',
  isDisplayBreadcrumb: true,
  breadcrumb: [
    { path: null, breadcrumbName: 'Configuration' },
    { path: '/resources/organizations', breadcrumbName: 'Store Management' }
  ],
  ui: {
    twoColumns: {
      can: [
        { action: 'update', resource: 'Organization' }
      ],
      left: {
        isDisplay: true,
        // backLink: '/resources/organizations',
        extraHeaderComponent: [(props) => (<OGToggleActiveResource apiEndpoint="/organizations" {...props} />)],
        component: (props) => (<OGLeftColumnServiceCentre {...props} />),
      },
      main: {
        isDisplay: true,
        components: [
          {
            key: 'tab-store',
            title: 'Store Details',
            can: {
              action: 'update',
              resource: 'Organization'
            },
            component: (props) => (
              <OGFormResources
                apiEndpoint="/organizations"
                formType="update"
                formTitle="Store Details"
                form={{
                  columns: 4,
                  meta: updateOrganizationForm
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
