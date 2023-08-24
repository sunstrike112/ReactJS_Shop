import {
  dashboardRoute,
  userRoute,
  userCardViewRoute,
  userCreateRoute,
  userUpdateRoute,
  roleRoute,
  newsRoute,
  newsCreateRoute,
  newsUpdateRoute,
  organizationRoute,
  organizationCreateRoute,
  organizationUpdateRoute,
  profileRoute,
  generalSettingsRoute,
} from './routes'
import { customerCreateRoute } from './routes/customer/create.route'
import { customerRoute } from './routes/customer/index.route'
import { customerUpdateRoute } from './routes/customer/update.route'

export const listRoute = {
  dashboard: dashboardRoute,
  user: userRoute,
  userCardView: userCardViewRoute,
  userCreate: userCreateRoute,
  userUpdate: userUpdateRoute,
  role: roleRoute,
  news: newsRoute,
  newsCreate: newsCreateRoute,
  newsUpdate: newsUpdateRoute,
  organization: organizationRoute,
  profileRoute: profileRoute,
  organizationRoute: organizationRoute,
  organizationCreate: organizationCreateRoute,
  organizationUpdate: organizationUpdateRoute,
  customer: customerRoute,
  customerCreate: customerCreateRoute,
  customerUpdate: customerUpdateRoute,
  generalSettings: generalSettingsRoute
}
