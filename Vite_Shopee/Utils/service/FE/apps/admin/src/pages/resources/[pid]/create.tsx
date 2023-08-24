import React, { useState, useEffect } from 'react'
import { OGBasePageComponent, OGDetailResources } from '@ss-fe-fw/organisms'
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
  const [can, setCan] = useState(false)

  useEffect(() => {
    const pid = query.pid

    setTimeout(() => {
      if (resource?.ui?.twoColumns?.can) {
        const canArray = resource.ui.twoColumns.can.filter(item => {
          return ability.can(item.action, item.resource)
        });
        if (canArray.length > 0) {
          setCan(true)
        }
      }
    }, 200);

    setTimeout(() => {
      setResourceName(capitalCase(inflection.singularize(pid)))
    }, 200);
  }, [])

  return (
    <OGBasePageComponent>
      {!resourceName && <Skeleton active />}
      {resourceName && can && <OGDetailResources resource={resource} />}
      {resourceName && !can &&
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
