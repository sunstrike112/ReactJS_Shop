import { ItemRoute } from '../../interfaces/routes.interface'
import {
  OGStateFilter,
  OGPostCodeFilter,
  OGSuburbFilter,
  OGSwitchView,
  OGButtonCreateResources,
  OGActionTable,
  OGUserTypeFilter,
} from '@ss-fe-fw/organisms'
import { userForm, updateUserForm } from './form/user.form'

const apiEndpoint = '/users'

export const userRoute: ItemRoute = {
  key: 'user',
  title: 'Users Management',
  link: '/resources/users',
  apiEndpoint: apiEndpoint,
  isDisplayBreadcrumb: true,
  breadcrumb: [
    { path: '/', breadcrumbName: 'Home' },
    { path: null, breadcrumbName: 'Global Settings' },
    { path: null, breadcrumbName: 'Users Management' },
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
                key="add-new-user"
                type="primary"
                link="/resources/users/create"
                label="Create User"
                resourceName="User"
              />
            )
          ]
        },
        left: {
          isDisplay: true,
          // beforeExtraComponent: (props) => (<OGFilterResource apiEndpoint={apiEndpoint} {...props} />),
          // afterExtraComponent: (props) => (<OGFilterResource apiEndpoint={apiEndpoint} {...props} />)
        },
        right: {
          isDisplay: true,
          // afterExtraComponent: (props) => (<OGSwitchView defaultValue="list" linkCard="/resources/users/view-card" {...props} />)
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
          // { key: 'email', label: 'Email' },
          // { key: 'firstName' },
          // { key: 'lastName' },
          // {
          //   key: 'state',
          //   label: 'State',
          //   component: {
          //     element: (props) => (<OGStateFilter {...props} />),
          //     value: { operator: 'in', form: null, defaultValue: null }
          //   }
          // },
          // {
          //   key: 'postCode',
          //   component: {
          //     element: (props) => (<OGPostCodeFilter {...props} />),
          //     value: { operator: 'equals', form: null, defaultValue: null }
          //   }
          // },
          {
            key: 'suburb',
            // component: {
            //   element: (props) => (<OGSuburbFilter {...props} />),
            //   value: { operator: 'equals', form: null, defaultValue: null }
            // }
          },
          // { key: 'news' },
          // { key: 'organizations' },
          { key: 'provider' },
          {
            key: 'organizations',
            label: 'User Type',
            // component: {
            //   element: (props) => (<OGUserTypeFilter {...props} />),
            //   value: { operator: 'in', form: null, defaultValue: null }
            // }
          },
        ],
        relations: [
          { name: 'news', field: 'title', idKey: 'id' },
          { name: 'organizations', field: 'name', idKey: 'id' },
          { name: 'roles', field: 'name', idKey: 'id' }
        ]
      },
      query: {
        include: {
          roles: true,
          news: true,
          organizations: true,
          _count: {
            select: {
              news: true,
              roles: true
            }
          }
        },
        orderBy: {
          news: {
            count: "asc"
          }
        },
        // where: {
        //   isAdmin: true
        // }
      },
      table: {
        isDisplay: true,
        columns: [
          { title: 'Status', key: 'isActive', type: 'status', sorter: true },
          { title: 'Name', key: 'fullName', sorter: true, realColumnSorter: 'firstName', linkToDetail: '/resources/users/update' },
          { title: 'Mobile Number', key: 'phoneNumber', sorter: true },
          { title: 'Email', key: 'email', sorter: true },
          { title: 'User Type', key: 'userType' },
          {
            title: 'Action',
            key: 'action',
            align: 'right',
            render: (text, row) => (
              <OGActionTable
                {...{
                  text: text,
                  row: row,
                  resourceName: 'User',
                  linkToDetail: '/resources/users/update'
                }}
              />
            )
          }
        ],
        transform: (items) => {
          return items.map((item) => {
            item.fullName = `${item.firstName} ${item.lastName}`
            item.userType = item.organizations.some((organization) => organization.name === 'Global') ? 'Global' : 'Local'
            return item
          })
        }
      }
    }
  }
}
