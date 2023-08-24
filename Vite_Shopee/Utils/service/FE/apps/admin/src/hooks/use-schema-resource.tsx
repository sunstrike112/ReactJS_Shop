import useSWR from 'swr'
import { fetcher } from '@ss-fe-fw/api/fetcher'

function useSchemaResource({ mounted, apiEndpoint }) {
  const { data, error } = useSWR(mounted ? `${apiEndpoint}/schema` : null, fetcher)

  return {
    schema: data,
    isSchemaLoading: !error && !data,
    isSchemaError: error
  }
}

export default useSchemaResource
