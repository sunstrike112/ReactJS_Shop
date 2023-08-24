import React, { useEffect, useState, useMemo } from 'react'
import {
  Tabs,
  Skeleton,
} from 'antd';

import { AdminTwoColumnLayout } from '@ss-fe-fw/templates'
import { OGHeaderLeftColumn } from '@ss-fe-fw/organisms'
import { randomUuid } from '@ss-fe-fw/utils/uuid'
import { useAbility } from '@casl/react'
import { AbilityContext } from '@ss-fe-fw/utils/can'
import { CAN_NOT_ACCESS_PAGE_MESSAGE } from '@ss-fe-fw/constants'

/* eslint-disable-next-line */
export interface OGDetailResourcesProps {
  resource?: any;
  idData?: any;
  children?: any;
}

const { TabPane } = Tabs;

export function OGDetailResources(props: OGDetailResourcesProps) {
  const [metadata, setmetadata] = useState({
    activeKey: `two-columns-tabs-${props.resource?.ui?.twoColumns?.main?.components[0]?.key}` ?? null
  })
  const ability = useAbility(AbilityContext)

  function onTabChange(activeKey) {
    setmetadata(oldMetaData => ({...oldMetaData, activeKey: activeKey}))
  }

  const LeftComponent = props?.resource?.ui?.twoColumns?.left?.component ?? null
  const LeftFooterComponent = props?.resource?.ui?.twoColumns?.left?.footerComponent ?? null

  return (
    <AdminTwoColumnLayout
      left={{
        isDisplay: true,
        headerComponent: <OGHeaderLeftColumn
          title={props?.resource?.ui?.twoColumns?.left.title}
          backLink={props?.resource?.ui?.twoColumns?.left.backLink}
          extra={
            props?.resource?.ui?.twoColumns?.left?.extraHeaderComponent &&
            props?.resource?.ui?.twoColumns?.left?.extraHeaderComponent.map((item) => {
              const Component = item;
              return <Component key={randomUuid()} {...{resource: props.resource, idData: props.idData, metadata, setmetadata}} />
              // return React.createElement(
              //   item,
              //   {key: randomUuid()},
              //   {...{resource: props?.resource, metadata, setmetadata}}
              // )
            })
          }
          {...{resource: props?.resource, metadata, setmetadata}}
        />,
        component: props?.resource?.ui?.twoColumns?.left?.component &&
          // React.createElement(
          //   props?.resource?.ui?.twoColumns?.left?.component,
          //   {key: randomUuid()},
          //   {...{resource: props?.resource, metadata, setmetadata}}
          // )
          <LeftComponent {...{resource: props?.resource, idData: props.idData, metadata, setmetadata}} />
        ,
        footerComponent: props.resource?.ui?.twoColumns?.left?.footerComponent &&
          // React.createElement(
          //   props?.resource?.ui?.twoColumns?.left?.footerComponent,
          //   {key: randomUuid()},
          //   {...{resource: props?.resource, metadata, setmetadata}}
          // )
          <LeftFooterComponent {...{resource: props?.resource, idData: props.idData, metadata, setmetadata}} />
      }}
      // resource={resource}
      // resourcePath={router.asPath}
    >
      {
        props.resource?.ui?.twoColumns?.main?.isDisplay &&
        props.resource?.ui?.twoColumns?.main?.components &&
        (<Tabs activeKey={metadata.activeKey} onChange={onTabChange}>
          {props.resource?.ui?.twoColumns?.main?.components.map((component) => {
            const Component = component.component
            const isCanAccess = component?.can ? ability.can(component.can.action, component.can.resource) : true
            return isCanAccess && <TabPane tab={component.title} key={'two-columns-tabs-' + component.key}>
              {
                // React.createElement(
                //   component.component,
                //   {key: randomUuid()},
                //   {...{resource: props.resource, metaData, setmetadata}}
                // )
                <Component {...{resource: props.resource, idData: props.idData, metadata, setmetadata}} />
              }
            </TabPane>
          })}
        </Tabs>)
      }
    </AdminTwoColumnLayout>
  )
}

export default OGDetailResources
