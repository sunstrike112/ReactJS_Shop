import { QUERY } from 'Constants'
import React, { useCallback } from 'react'
import {
  useHistory
} from 'react-router-dom'

export function useHistories() {
  const history = useHistory()

  const pushParams = useCallback(
    (params = {}, replace = false) => {
      if (replace) {
        history.push(`${window.location.pathname}?${new URLSearchParams(Object.entries(params)).toString()}`)
      } else {
        let allParams = new URLSearchParams(window.location.search)
        Object.keys(params).forEach((key) => {
          allParams.set(key, params[key])
        })
        history.push(`${window.location.pathname}?${allParams.toString()}`)
      }
    },
    [history, window.location.pathname]
  )

  const popParams = useCallback(
    (params = {}) => {
      let allParams = new URLSearchParams(window.location.search)
      Object.keys(params).forEach((key) => {
        allParams.delete(key, params[key])
      })
      history.push(`${window.location.pathname}?${allParams.toString()}`)
    },
    [history, window.location.pathname]
  )

  const push = (location, state) => {
    const querys = new URLSearchParams(window.location.search)
    const workspaceIdQuery = `${querys.toString().split('&').filter((q) => q.includes(QUERY.WORKSPACE_ID))}`

    if (typeof location === 'object') {
      const allQuery = workspaceIdQuery ? `${location.search}&${workspaceIdQuery}` : location.search
      history.push({ ...location, search: allQuery })
    } else {
      const locations = location.split('?')
      const [initLocation, queryLocation] = locations

      const allQuery = locations.length > 1
        ? (workspaceIdQuery ? `${queryLocation}&${workspaceIdQuery}` : queryLocation)
        : workspaceIdQuery

      history.push(`${initLocation}?${allQuery}`, state)
    }
  }

  return React.useMemo(() => ({
    ...history,
    push,
    pushParams,
    popParams
  }), [history, pushParams, popParams])
}
