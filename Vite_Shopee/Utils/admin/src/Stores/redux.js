/* eslint-disable no-prototype-builtins */
function updateObject(oldObject, newValues) {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return { ...oldObject, ...newValues }
}

function updateItemInArray(array, itemId, updateItemCallback) {
  const updatedItems = array.map((item) => {
    if (item.id !== itemId) {
      // Since we only want to update one item, preserve all others as they are now
      return item
    }

    // Use the provided callback to create an updated item
    const updatedItem = updateItemCallback(item)
    return updatedItem
  })

  return updatedItems
}

function createReducer(initialState, handlers) {
  // eslint-disable-next-line func-names
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    }
    return state
  }
}

export {
  updateObject,
  updateItemInArray,
  createReducer
}
