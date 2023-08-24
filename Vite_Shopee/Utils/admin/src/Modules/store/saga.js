import { getThemeAPI } from 'APIs'
import { put, takeLatest } from 'redux-saga/effects'
import { setFavicon, setTitle } from 'Utils'
import { SET_THEME_REQUEST, SET_THEME_SUCCESS, SET_THEME_FAILURE } from './constants'

export function* setThemeSaga({ payload }) {
  try {
    const { code, data } = yield getThemeAPI(payload)
    if (code === 200) {
      setFavicon(data.faviconPath)
      setTitle(data.name)
      yield put({
        type: SET_THEME_SUCCESS,
        data: {
          themeCompany: data.elementTheme,
          infoCompany: data
        }
      })
    }
  } catch (error) {
    yield put({
      type: SET_THEME_FAILURE,
      error
    })
  }
}

export default function* registrationCoursesSaga() {
  yield takeLatest(SET_THEME_REQUEST, setThemeSaga)
}
