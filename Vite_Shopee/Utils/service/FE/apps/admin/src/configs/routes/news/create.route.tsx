import { ItemRoute } from '../../interfaces/routes.interface'
import { OGToggleActiveResource } from '@ss-fe-fw/organisms'
import { OGFormResources } from '@ss-fe-fw/organisms'
import { newsForm } from './form/news.form'

export const newsCreateRoute: ItemRoute = {
  key: 'create-news',
  // title: 'Users Management',
  link: '/resources/news/create',
  apiEndpoint: '/news',
  isDisplayBreadcrumb: true,
  breadcrumb: [
    { path: '/resources/news', breadcrumbName: 'News List' },
    { path: null, breadcrumbName: 'Add News' }
  ],
  ui: {
    twoColumns: {
      left: {
        isDisplay: true,
        title: 'Add News',
        backLink: '/resources/news',
        // extraHeaderComponent: [(props) => (<OGToggleActiveResource {...props} />)],
        // footerComponent: (props) => (<OGToggleActiveResource {...props} />),
        // component: (props) => (<OGToggleActiveResource {...props} />)
      },
      main: {
        isDisplay: true,
        components: [
          {
            key: 'tab-news',
            title: 'News Detail',
            component: (props) => (
              <OGFormResources
                apiEndpoint="/news"
                apiSchemaEndpoint="/news/schema"
                redirectAfterComplete="/resources/news"
                formType="create"
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
