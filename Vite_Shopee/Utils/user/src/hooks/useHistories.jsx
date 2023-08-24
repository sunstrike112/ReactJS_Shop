import { useHistory } from 'react-router-dom'
import { QUERY } from '../constants'

export function useHistories() {
  const history = useHistory()

  const pushParams = (params = {}, replace = false) => {
    if (replace) {
      history.push(`${window.location.pathname}?${new URLSearchParams(Object.entries(params)).toString()}`)
    } else {
      let allParams = new URLSearchParams(window.location.search)
      Object.keys(params).forEach((key) => {
        allParams.set(key, params[key])
      })
      history.push(`${window.location.pathname}?${allParams.toString()}`)
    }
  }

  const popParams = (params = {}) => {
    let allParams = new URLSearchParams(window.location.search)
    Object.keys(params).forEach((key) => {
      allParams.delete(key, params[key])
    })
    history.push(`${window.location.pathname}?${allParams.toString()}`)
  }

  const push = (location, state) => {
    const queries = new URLSearchParams(window.location.search)

    const workspaceIdQuery = `${queries.toString().split('&').filter((q) => q.includes(QUERY.WORKSPACE_ID))}`

    if (typeof location === 'object') {
      const allQuery = workspaceIdQuery ? `${location.search}&${workspaceIdQuery}` : location.search
      history.push({ ...location, search: allQuery })
    } else {
      const locations = location.split('?')
      const [initLocation, queryLocation] = locations

      let allQuery
      switch (true) {
        case locations.length > 1: {
          if (workspaceIdQuery && !queryLocation.includes(workspaceIdQuery)) {
            allQuery = `${queryLocation}&${workspaceIdQuery}`
          } else {
            allQuery = queryLocation
          }
          break
        }
        default: {
          allQuery = workspaceIdQuery
        }
      }

      history.push(`${initLocation}?${allQuery}`, state)
    }
  }

  return {
    ...history,
    push,
    pushParams,
    popParams
  }
}
