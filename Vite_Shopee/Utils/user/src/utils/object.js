export const parseFilter = (params) => {
  if (params?.filter) {
    const { filter, ...restParams } = params
    return { ...restParams, ...filter }
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

export const checkTypeOf = (value) => Object.prototype.toString.call(value).slice(8, -1)

export const hasValuesInObject = (object) => {
  const hasValue = Object.values(object).some((value) => {
    if (checkTypeOf(value) === 'Array' && !value.length) return false
    if (checkTypeOf(value) === 'Object' && !Object.keys(value).length) return false
    return Boolean(value)
  })
  return hasValue
}

export const copyObjectUsingJSON = (object) => JSON.parse(JSON.stringify(object))
