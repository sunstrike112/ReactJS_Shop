import { useAbility } from '@casl/react';
import { AdminLayout } from '@ss-fe-fw/templates';
import { AbilityContext } from '@ss-fe-fw/utils/can';
import {
  Tabs
} from 'antd';
import Layout from 'antd/lib/layout/layout';
import React, { useState } from 'react';


/* eslint-disable-next-line */
export interface OGTabResourcesProps {
  resource?: any;
  idData?: any;
  children?: any;
}

const { TabPane } = Tabs;

export function OGTabResources(props: OGTabResourcesProps) {
  const [metadata, setmetadata] = useState({
    activeKey: `two-columns-tabs-${props.resource?.ui?.twoColumns?.main?.components[0]?.key}` ?? null
  })
  const ability = useAbility(AbilityContext)

  function onTabChange(activeKey) {
    setmetadata(oldMetaData => ({ ...oldMetaData, activeKey: activeKey }))
  }

  return (
    <>
      {props.resource?.ui?.twoColumns?.main?.isDisplay &&
        props.resource?.ui?.twoColumns?.main?.components &&
        <Layout style={{ minHeight: '70vh' }} className="main-layout">

          <Tabs activeKey={metadata.activeKey} onChange={onTabChange}>
            {props.resource?.ui?.twoColumns?.main?.components.map((component) => {
              const Component = component.component
              const isCanAccess = component?.can ? ability.can(component.can.action, component.can.resource) : true
              return isCanAccess && <TabPane tab={component.title} key={'two-columns-tabs-' + component.key}>
                {
                  <Component {...{ resource: props.resource, idData: props.idData, metadata, setmetadata }} />
                }
              </TabPane>
            })}
          </Tabs>
        </Layout>}

      <style jsx global>{`
        .main-layout  {
          background: white;
        }
        .main-layout .ant-tabs .ant-tabs-nav,
        .main-layout .ant-tabs .ant-tabs-content {
          padding-left: 20px;
          padding-right: 20px;
        }
        .main-layout .ant-tabs-content{
          padding-bottom: 20px;
        }
      `}</style>
    </>

  )
}

export default OGTabResources
