import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { OGBasePageComponent } from '@ss-fe-fw/organisms'
import { OGListResources } from '@ss-fe-fw/organisms'
import useResource from '@ss-fe-fw/hooks/use-resource'
import { Result, Skeleton } from 'antd';
import { useAbility } from '@casl/react'
import { AbilityContext } from '@ss-fe-fw/utils/can'
import { CAN_NOT_ACCESS_PAGE_MESSAGE } from '@ss-fe-fw/constants'

import {
  Col,
} from 'antd'


const Calendar = dynamic(() => import('../../../components/organisms/resources/custom/elements/calendar.organism'), { ssr: false })

function Index({ pathName, query }) {
  const { resource } = useResource(pathName)
  const ability = useAbility(AbilityContext)
  const [resourceName, setResourceName] = useState('User')

  return (
    <OGBasePageComponent>
      {!resourceName && <Skeleton active />}
      {resourceName && ability.can('read', resourceName) && <OGListResources
        resource={resource}
        // resourcePath={router.asPath}
      >
        <Col span={24}>
          <Calendar />
        </Col>
      </OGListResources>
      }
      {resourceName && !ability.can('read', resourceName) &&
        <Result
          status="403"
          title="403"
          subTitle={CAN_NOT_ACCESS_PAGE_MESSAGE}
        />
      }
    </OGBasePageComponent>
  );
}

Index.getInitialProps = async (ctx) => {
  console.log(ctx.asPath)
  return { pathName: ctx.asPath, query: ctx.query }
}

export default Index;
