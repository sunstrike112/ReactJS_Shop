import { ItemRoute } from '../../interfaces/routes.interface'
import {
  OGStateFilter,
  OGPostCodeFilter,
  OGSuburbFilter,
  OGSwitchView,
} from '@ss-fe-fw/organisms'
import { Button } from 'antd'

const apiEndpoint = '/users'

export const userCardViewRoute: ItemRoute = {
  key: 'card-view-user',
  title: 'Users Management',
  link: '/resources/users/view-card',
  apiEndpoint: apiEndpoint,
  isDisplayBreadcrumb: true,
  breadcrumb: [
    { path: '/', breadcrumbName: 'Home'},
    { path: null, breadcrumbName: 'Global Settings' },
    { path: null, breadcrumbName: 'Users Management' },
  ],
  ui: {
    list: {
      topControls: {
        breadcrumbTopRight: {
          isDisplay: true,
          component: []
        },
        left: {
          isDisplay: true,
        },
        right: {
          isDisplay: true,
          afterExtraComponent: (props) => (<OGSwitchView defaultValue="card" linkList="/resources/users" {...props} />)
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
          {key: 'email', label: 'Email'},
          {key: 'firstName'},
          {key: 'lastName'},
          {
            key: 'state',
            label: 'State',
            component: {
              element: (props) => (<OGStateFilter {...props} />),
              value: { operator: 'in', form: null, defaultValue: null }
            }
          },
          {
            key: 'postCode',
            component: {
              element: (props) => (<OGPostCodeFilter {...props}/>),
              value: { operator: 'equals', form: null, defaultValue: null }
            }
          },
          {
            key: 'suburb',
            component: {
              element: (props) => (<OGSuburbFilter {...props}/>),
              value: { operator: 'equals', form: null, defaultValue: null }
            }
          },
          {key: 'news'},
          {key: 'provider'},
        ],
        relations: [
          { name: 'news', field: 'title', idKey: 'id'},
          { name: 'organizations', field: 'name', idKey: 'id'},
          { name: 'roles', field: 'name', idKey: 'id'}
        ]
      },
      query: {
        include: {
          roles: true,
          news: true,
          organizations: true
        }
      },
      table: {
        isDisplay: false
      }
    }
  }
}
