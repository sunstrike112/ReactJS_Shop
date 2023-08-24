import AxiosClient from './api'
import END_POINT from './constants'

function testAPI() {
  return AxiosClient.get(END_POINT.TEST_API)
    .then((res) => res).catch((err) => err)
}

export {
  testAPI
}
