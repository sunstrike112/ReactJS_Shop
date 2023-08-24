import { ItemRoute } from '../../interfaces/routes.interface'
// import { OGNewsPublishedFilter } from '@ss-fe-fw/organisms'

export const newsRoute: ItemRoute = {
  key: 'news',
  title: 'News Management',
  link: '/resources/news',
  apiEndpoint: '/news',
  isDisplayBreadcrumb: true,
  breadcrumb: [
    { path: '/', breadcrumbName: 'Home' },
    { path: null, breadcrumbName: 'Resources' },
    { path: null, breadcrumbName: 'News Management' },
  ],
  ui: {
    list: {
      topControls: {
        // top: {
        //   isDisplay: true,
        //   component: (props) => (<OGNewsPublishedFilter {...props} />)
        // },
        left: {
          isDisplay: true,
        },
        right: {
          isDisplay: true,
        }
      },
      filters: {
        relations: [
          { name: 'organization', field: 'name', idKey: 'id'},
        ]
      },
      query: {
        include: {
          organization: true
        }
      },
      table: {
        isDisplay: true,
        columns: [
          { title: 'Id', key: 'id', sorter: true },
          { title: 'Title', key: 'title', sorter: true },
          { title: 'Published', key: 'published' },
          { title: 'Price', key: 'price', sorter: true },
          { title: 'Created Date', key: 'createdAt', sorter: true },
          { title: 'Organization', key: 'organization', fieldName: 'name' },
        ]
      }
    }
  }
}
