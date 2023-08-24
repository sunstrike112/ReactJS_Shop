import { ItemRoute } from '../../interfaces/routes.interface'
import { OGToggleActiveResource } from '@ss-fe-fw/organisms'
import { OGFormResources } from '@ss-fe-fw/organisms'
import { newsForm } from './form/news.form'

export const newsUpdateRoute: ItemRoute = {
  key: 'update-news',
  // title: 'Users Management',
  link: '/resources/news/update',
  apiEndpoint: '/news',
  isDisplayBreadcrumb: true,
  breadcrumb: [
    { path: '/resources/news', breadcrumbName: 'News List' },
    { path: null, breadcrumbName: 'Update News' }
  ],
  ui: {
    twoColumns: {
      left: {
        isDisplay: true,
        title: 'Update News',
        backLink: '/resources/news',
        // extraHeaderComponent: [(props) => (<OGToggleActiveResource {...props} />)],
        // footerComponent: (props) => (<OGToggleActiveResource {...props} />),
        // component: (props) => (<OGToggleActiveResource {...props} />)
      },
      main: {
        isDisplay: true,
        components: [
          {
            key: 'tab-user',
            title: 'News Detail',
            component: (props) => (
              <OGFormResources
                apiEndpoint="/news"
                // apiSchemaEndpoint="/users/schema"
                // redirectAfterComplete="/resources/users"
                formType="update"
                form={{
                  columns: 4,
                  meta: newsForm,
                  include: {
                    author: true
                  },
                  // style: { width: '70%' }
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
