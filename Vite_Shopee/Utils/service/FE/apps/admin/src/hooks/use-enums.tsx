import useSWR from 'swr'
import { fetcher } from '@ss-fe-fw/api/fetcher'

function useEnums({ mounted, typeEnum }) {
  const { data, error } = useSWR(mounted && typeEnum ? `/enums/${typeEnum}` : null, fetcher)

  return {
    enums: data,
    isEnumsLoading: !error && !data,
    isEnumsError: error
  }
}

export default useEnums
