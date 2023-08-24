import { USER_SORT_TYPE } from 'Constants/user'

export const parseFilter = (params) => {
  if (params?.filter) {
    const { filter, ...restParams } = params
    return { ...restParams, ...filter }
  }
  return params
}

export const parseSort = (params) => {
  if (params?.sort) {
    let { sort, ...restParams } = params
    const { field: fieldSorted, order } = sort
    if (order) {
      return { ...restParams, fieldSorted, sortType: USER_SORT_TYPE[order] }
    }
    return restParams
  }
  return params
}

export const parseParamsToQueryString = (params) => {
  const q = new URLSearchParams()
  Object.keys(params).forEach((key) => {
    if (params[key] instanceof Array) {
      params[key].forEach((value) => q.append(key, value))
    } else if (params[key]) {
      q.append(key, params[key])
    }
  })
  return q
}

export const parseParamsToQueryStringV2 = (params) => {
  const q = new URLSearchParams()
  Object.keys(params).forEach((key) => {
    if (params[key] instanceof Array) {
      params[key].forEach((value) => q.append(key, value))
    } else if (params[key] !== '' && params[key] !== null && params[key] !== undefined && params[key] !== 0) {
      q.append(key, params[key])
    }
  })
  return q
}

export const parseParamsToQueryStringV3 = (params) => {
  const q = new URLSearchParams()
  const exceptValues = ['', null, undefined, false, NaN]
  Object.keys(params).forEach((key) => {
    if (params[key] instanceof Array) {
      params[key].forEach((value) => q.append(key, value))
    } else if (!exceptValues.includes(params[key])) {
      q.append(key, params[key])
    }
  })
  return q
}

export const parseFilterArrayToString = (params) => {
  if (!params) return ''
  let string = ''
  Object.keys(params).forEach((key) => {
    if (Array.isArray(params[key]) && params[key].length > 0) {
      params[key].forEach((param) => {
        string = `${string}&${key}=${param}`
      })
    } else if (params[key] && !Array.isArray(params[key])) {
      string = `${string}&${key}=${params[key]}`
    }
  })
  return string
}

export const parseFilterArrayToStringV2 = (params) => {
  let newParams
  let string = ''
  if (params?.filter) {
    const { filter, ...restParams } = params
    newParams = { ...filter, ...restParams }
  } else {
    newParams = { ...params }
  }
  if (newParams) {
    Object.keys(newParams).forEach((key) => {
      if (Array.isArray(newParams[key]) && newParams[key].length > 0) {
        newParams[key].forEach((param) => {
          string = `${string}&${key}=${param}`
        })
      } else if (newParams[key] && !Array.isArray(newParams[key])) {
        string = `${string}&${key}=${newParams[key]}`
      }
    })
  }
  return string
}

export const copyObjectUsingJSON = (object) => JSON.parse(JSON.stringify(object))

export const isNotEmptyObject = (object) => Boolean(Object.keys(object).length)
