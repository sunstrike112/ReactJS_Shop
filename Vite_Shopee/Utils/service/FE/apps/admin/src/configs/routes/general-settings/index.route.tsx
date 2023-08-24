import { ROLE_ENPOINT } from '@ss-fe-fw/constants'
import { OGChangePassword, OGPersonalInformation } from '@ss-fe-fw/organisms'
import OGManageRoles from 'apps/admin/src/components/organisms/general-settings/manage-roles'
import OGOther from 'apps/admin/src/components/organisms/general-settings/other'
import { ItemRoute } from '../../interfaces/routes.interface'

export const generalSettingsRoute: ItemRoute = {
  key: 'general-settings',
  title: 'General Settings',
  link: '/configurations/general-settings',
  isDisplayBreadcrumb: true,
  breadcrumb: [
    { path: '/', breadcrumbName: 'Home' },
    { path: null, breadcrumbName: 'Configuration' },
    { path: null, breadcrumbName: 'General Settings' },
  ],
  ui: {
    twoColumns: {
      main: {
        isDisplay: true,
        components: [
          {
            key: 'tab-operating-hours',
            title: 'Operating Hours',
            component: (props) => (<></>)
          },
          {
            key: 'tab-promotion-codes',
            title: 'Promotion Codes',
            component: (props) => (<></>)
          },
          {
            key: 'tab-package-categories',
            title: 'Package Categories',
            component: (props) => (<></>)
          },
          {
            key: 'tab-manage-roles',
            title: 'Manage Roles',
            component: (props) => (<OGManageRoles {...props} apiEndpoint={ROLE_ENPOINT.BASE} />)
          },
          {
            key: 'tab-capacity-preset',
            title: 'Capacity Preset',
            component: (props) => (<></>)
          },
        ],
      }
    }
  }
}
