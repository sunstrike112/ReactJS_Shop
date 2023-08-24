export const getResultWithPaging = async ({ action, payload, condition = (data) => data.result.length }) => {
  const isPageInsideParams = Boolean(payload.params?.page)
  const currentPage = isPageInsideParams ? payload.params.page : payload.page || 1
  const previousPage = currentPage - 1

  // if result from current page match condition || page = 1 => return result
  // if current page return empty array => continue get result from previous page
  const { code, data } = await action(payload)

  if (condition(data) || currentPage === 1) {
    return { code, data }
  }

  let result
  if (isPageInsideParams) {
    result = await getResultWithPaging({ action, payload: { ...payload, params: { ...payload.params, page: previousPage } }, condition })
  } else {
    result = await getResultWithPaging({ action, payload: { ...payload, page: previousPage }, condition })
  }
  return result
}
