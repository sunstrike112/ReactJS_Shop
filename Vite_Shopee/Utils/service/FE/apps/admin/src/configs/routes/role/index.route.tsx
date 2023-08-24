import { ItemRoute } from '../../interfaces/routes.interface'

export const roleRoute: ItemRoute = {
  key: 'role',
  title: 'Roles Management',
  link: '/resources/roles',
  apiEndpoint: '/roles',
  isDisplayBreadcrumb: true,
  breadcrumb: [
    { path: '/', breadcrumbName: 'Home' },
    { path: null, breadcrumbName: 'Global Settings' },
    { path: null, breadcrumbName: 'Roles Management' },
  ],
  ui: {
    list: {
      topControls: {
        left: {
          isDisplay: true,
        },
        right: {
          isDisplay: true,
        }
      },
      table: {
        isDisplay: true,
      }
    }
  }
}
