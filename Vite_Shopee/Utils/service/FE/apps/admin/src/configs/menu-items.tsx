import React, { ReactNode } from 'react'
import { DashboardIcon, CalendarIcon, ContactsIcon, SettingIcon } from '@ss-fe-fw/atoms';
import { listRoute } from './list-route'

export interface MenuItem {
  kind: string; // item or sub-menu
  key: string;
  link?: string;
  icon?: ReactNode;
  title: string;
  isHidden?: boolean;
  withoutPermission?: boolean;
  can?: string; // Module name for check permission, eg: User, News, Role, ...
  subMenuItems?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    kind: 'item',
    key: listRoute.dashboard.key,
    title: listRoute.dashboard.title,
    link: listRoute.dashboard.link,
    icon: <DashboardIcon />,
    withoutPermission: true
  },
  {
    kind: 'item',
    key: 'BookingManagement',
    title: 'Booking Management',
    link: '/',
    icon: <CalendarIcon />,
    can: 'Booking'
  },
  {
    kind: 'item',
    key: listRoute.customer.key,
    link: listRoute.customer.link,
    title: listRoute.customer.title,
    icon: <ContactsIcon />,
    can: 'Customer'
  },
  {
    kind: 'sub-menu',
    key: 'configuration-group',
    title: 'Configuration',
    icon: <SettingIcon />,
    subMenuItems: [
      {
        kind: 'item',
        key: listRoute.user.key,
        link: listRoute.user.link,
        title: listRoute.user.title,
        can: 'User'
      },
      {
        kind: 'item',
        key: listRoute.organizationRoute.key,
        link: listRoute.organizationRoute.link,
        title: listRoute.organizationRoute.title,
        can: 'Organization'
      },
      {
        kind: 'item',
        key: listRoute.generalSettings.key,
        link: listRoute.generalSettings.link,
        title: listRoute.generalSettings.title,
        // can: 'Organization' -> TODO: change to array
      },
    ]
  }
]
