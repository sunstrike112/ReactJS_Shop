import React, { ReactNode, useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, Spin } from 'antd'
import { useAbility } from '@casl/react'
import { AbilityContext } from '@ss-fe-fw/utils/can'
import { brandingColors } from '@ss-fe-fw/constants'
import { MenuItem } from '@ss-fe-fw/configs'
import { useRecoilState } from 'recoil'
import { serviceCentreState } from '@ss-fe-fw/stores'

/* eslint-disable-next-line */
export interface OGSidebarMenuProps {
  mainKey?: string;
  theme?: any;
  mode?: any;
  onSelect?: any;
  selectedKeys?: string[];
  menuItems: MenuItem[];
  marginTop?: number;
}

const { SubMenu } = Menu

export function OGSidebarMenu(props: OGSidebarMenuProps) {
  const ability = useAbility(AbilityContext);
  const [openKeys, setOpenKeys] = React.useState(props.selectedKeys);
  const [menuItems, setMenuItems] = useState([])
  const [serviceCentre] = useRecoilState(serviceCentreState)
  const xOrganizationId = localStorage.getItem('xOrganizationId');

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  useEffect(() => {
    setTimeout(() => {
      const listGroupSubMenu = props.menuItems.map((item) => {
        if (item.kind !== 'item' && item.subMenuItems.length > 0) {
          const subItemsCanAccess = item.subMenuItems.filter(
            (subItem) => {
              let canAccess = ability.can('read', subItem.can);
              if (subItem.can == 'Organization' && !canAccess) {
                canAccess = ability.can('update', subItem.can);
              }
              return (canAccess && (subItem.isHidden === undefined || !subItem.isHidden))
            }
          )
          if (subItemsCanAccess.length > 0) item.isHidden = false
          else item.isHidden = true
        }

        return item;
      });

      const _menuItems = listGroupSubMenu.map((item: MenuItem) => {
        return item.kind === 'item' && (item.isHidden === undefined || !item.isHidden) ?
          <>
            {
              (item.withoutPermission === undefined || !item.withoutPermission) && ability.can('read', item.can) &&
              <Menu.Item key={item.key} icon={item.icon}>
                <Link href={item.link}>
                  <a className="box-sidebar-menu__menu-single-link">{item.title}</a>
                </Link>
              </Menu.Item>
            }
            { item.withoutPermission && <Menu.Item key={item.key} icon={item.icon}>
                <Link href={item.link}>
                  <a className="box-sidebar-menu__menu-single-link">{item.title}</a>
                </Link>
              </Menu.Item>
            }
          </> :
          (item.isHidden === undefined || !item.isHidden) &&
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {item.subMenuItems.map((subItem) => {
                let canAccess = ability.can('read', subItem.can);
                if (subItem.can == 'Organization') {
                  if (!canAccess && xOrganizationId) {
                    canAccess = ability.can('update', subItem.can);
                    subItem.link += `/update/${xOrganizationId}`;
                  }
                }
                return subItem.kind === 'item' &&
                  <>
                    {
                      (subItem.withoutPermission === undefined || !subItem.withoutPermission) &&
                        canAccess &&
                        <Menu.Item key={`${subItem.key}`} icon={subItem.icon}>
                          <Link href={subItem.link}>{subItem.title}</Link>
                        </Menu.Item>
                    }
                    { subItem.withoutPermission && <Menu.Item key={`${subItem.key}`} icon={subItem.icon}>
                        <Link href={subItem.link}>{subItem.title}</Link>
                      </Menu.Item>
                    }
                  </>
              })}
            </SubMenu>
      });

      setMenuItems(_menuItems)
    }, 1000);
  }, [])

  return (
    <>
      <Menu
        className="box-sidebar-menu"
        mode={props.mode ?? 'inline'}
        selectedKeys={props.selectedKeys}
        onSelect={props.onSelect}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        {(!menuItems || menuItems.length <= 0) && <Spin style={{ display: 'flex', justifyContent: 'center' }} />}
        {menuItems.length > 0 && menuItems}
      </Menu>
      <style jsx global>{`
      .ant-menu-item:hover .ant-menu-title-content a {
        color: #fff !important;
      }
      .ant-menu-submenu-selected .ant-menu-item-icon,
      .ant-menu-item-selected .ant-menu-item-icon,
      .ant-menu-item:hover .ant-menu-item-icon {
        filter: invert(53%) sepia(46%) saturate(1066%) hue-rotate(147deg) brightness(100%) contrast(97%) !important;
      }
      span.ant-menu-title-content,
      span.ant-menu-title-content a,
      .ant-menu-submenu-arrow,
      .box-sidebar-menu__menu-single-link {
        color: rgba(255, 255, 255, 0.65) !important;
      }
      .box-sidebar-menu__menu-single-link:hover {
        color: rgba(255, 255, 255, 1) !important;
      }
      .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected,
      .ant-menu-submenu-selected .ant-menu-title-content,
      .ant-menu-submenu-selected .ant-menu-submenu-arrow,
      .ant-menu-item-selected span a  {
        color: rgba(255, 255, 255, 1) !important;
        background-color: inherit;
      }
      .ant-menu-item-selected::after,
      .ant-menu-submenu-selected::after {
        border: 0 !important;
      }
      .main-sider .ant-menu-sub.ant-menu-inline {
        background-color: #0F083F !important;
      }
      .ant-menu-submenu-popup > .ant-menu {
        background-color: #0F083F !important;
      }
      .ant-menu {
        background-color: #1D1655;
        border: 0;
      }
      `}</style>
    </>
  );
}

export default OGSidebarMenu
