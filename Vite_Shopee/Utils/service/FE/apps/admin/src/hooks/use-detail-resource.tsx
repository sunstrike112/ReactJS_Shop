import useSWR from 'swr'
import { fetcher } from '@ss-fe-fw/api/fetcher'

function useDetailResource({ mounted, detailUrl, query }) {
  const { data, error } = useSWR(
    (mounted && detailUrl) ? [detailUrl, 'POST', query] : null,
    (url, method, body) => fetcher(url, method, body)
  )

  return {
    data: data,
    isLoading: !error && !data,
    error: error
  }
}

export default useDetailResource
