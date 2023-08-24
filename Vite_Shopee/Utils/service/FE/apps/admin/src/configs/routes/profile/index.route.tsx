import { OGChangePassword, OGInformationProfile, OGPersonalInformation } from '@ss-fe-fw/organisms'
import { ItemRoute } from '../../interfaces/routes.interface'

export const profileRoute: ItemRoute = {
  key: 'profile',
  // title: 'Users Management',
  link: '/profile',
  apiEndpoint: '/auth/profiles',
  isDisplayBreadcrumb: false,
  breadcrumb: null,
  ui: {
    twoColumns: {
      left: {
        isDisplay: true,
        title: null,
        backLink: '/',
        // extraHeaderComponent: [(props) => (<OGToggleActiveResource {...props} />)],
        // footerComponent: (props) => (<OGToggleActiveResource {...props} />)
        component: (props) => (<OGInformationProfile {...props} />)
      },
      main: {
        isDisplay: true,
        components: [
          {
            key: 'tab-personal-information',
            title: 'Personal Information',
            component: (props) => (<OGPersonalInformation {...props} />)
          },
          {
            key: 'tab-security',
            title: 'Security',
            component: (props) => (<OGChangePassword {...props} />)
          }
        ],
      }
    }
  }
}
