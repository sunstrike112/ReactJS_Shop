import { listRoute } from '@ss-fe-fw/configs'
import useSWR from 'swr'
import { fetcher } from '@ss-fe-fw/api/fetcher'

function useResource(resourcePath: string) {
  let resource = null
  Object.entries(listRoute).forEach(([key, route]) => {
    if (
      route.link === resourcePath ||
      (resourcePath.includes('/update') && resourcePath.includes(route.link))
    ) {
      resource = route
    }
  })

  return { resource }
}

export default useResource
