import React, { useState, useEffect } from 'react'
import { OGBasePageComponent } from '@ss-fe-fw/organisms'
import { OGListResources } from '@ss-fe-fw/organisms'
import useResource from '@ss-fe-fw/hooks/use-resource'
import { Result, Skeleton } from 'antd';
import { useAbility } from '@casl/react'
import { AbilityContext } from '@ss-fe-fw/utils/can'
import * as inflection from 'inflection'
import { capitalCase } from "change-case";
import { CAN_NOT_ACCESS_PAGE_MESSAGE } from '@ss-fe-fw/constants'

function Index({ pathName, query }) {
  const { resource } = useResource(pathName)
  const ability = useAbility(AbilityContext)
  const [resourceName, setResourceName] = useState(null)

  useEffect(() => {
    const pid = query.pid
    setTimeout(() => {
      setResourceName(capitalCase(inflection.singularize(pid)))
    }, 200);
  }, [])

  return (
    <OGBasePageComponent>
      {!resourceName && <Skeleton active />}
      {resourceName && ability.can('read', resourceName) &&
        <OGListResources
          resource={resource}
          // resourcePath={router.asPath}
        >
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
  return { pathName: ctx.asPath, query: ctx.query }
}

export default Index;
