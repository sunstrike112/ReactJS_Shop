import { updateObject } from 'Stores'

// LIST CATEGORY

function loadListCategory(state) {
  return updateObject(state, {
    listCategory: updateObject(state.listCategory, {
      error: null,
      isLoading: true,
      isSuccess: false
    })
  })
}

function loadListCategorySuccess(state, { payload }) {
  const { data } = payload
  return updateObject(state, {
    listCategory: updateObject(state.listCategory, {
      isLoading: false,
      isSuccess: true,
      data
    })
  })
}

// LIST USER

function loadListUser(state) {
  return updateObject(state, {
    listUser: updateObject(state.listUser, {
      error: null,
      isLoading: true
    })
  })
}

function loadListUserSuccess(state, { payload }) {
  const { data, pagination, filter } = payload
  return updateObject(state, {
    listUser: updateObject(state.listUser, {
      isLoading: false,
      data,
      pagination,
      filter
    })
  })
}

// LIST USER SELECTED

function loadListUserSelected(state) {
  return updateObject(state, {
    listUserSelected: updateObject(state.listUserSelected, {
      error: null,
      isLoading: true
    })
  })
}

function loadListUserSelectedSuccess(state, { payload }) {
  const { data, pagination, filter } = payload
  return updateObject(state, {
    listUserSelected: updateObject(state.listUserSelected, {
      isLoading: false,
      data,
      pagination,
      filter
    })
  })
}

// LIST GROUP

function loadListGroup(state) {
  return updateObject(state, {
    listGroup: updateObject(state.listGroup, {
      error: null,
      isLoading: true,
      isSuccess: false
    })
  })
}

function loadListGroupSuccess(state, { payload }) {
  const { data } = payload
  return updateObject(state, {
    listGroup: updateObject(state.listGroup, {
      isLoading: false,
      isSuccess: true,
      data
    })
  })
}

// LIST ATTRIBUTE

function loadListAttribute(state) {
  return updateObject(state, {
    listAttribute: updateObject(state.listAttribute, {
      error: null,
      isLoading: true,
      isSuccess: false
    })
  })
}

function loadListAttributeSuccess(state, { payload }) {
  const { data } = payload
  return updateObject(state, {
    listAttribute: updateObject(state.listAttribute, {
      isLoading: false,
      isSuccess: true,
      data
    })
  })
}

// LIST COURSE

function loadListCourse(state) {
  return updateObject(state, {
    listCourse: updateObject(state.listCourse, {
      error: null,
      isLoading: true,
      isSuccess: false
    })
  })
}

function loadListCourseSuccess(state, { payload }) {
  const { data } = payload
  return updateObject(state, {
    listCourse: updateObject(state.listCourse, {
      isLoading: false,
      isSuccess: true,
      data
    })
  })
}

export {
  loadListCourse,
  loadListCourseSuccess,
  loadListGroup,
  loadListGroupSuccess,
  loadListAttribute,
  loadListAttributeSuccess,
  loadListUserSelected,
  loadListUserSelectedSuccess,
  loadListCategory,
  loadListCategorySuccess,
  loadListUser,
  loadListUserSuccess
}
