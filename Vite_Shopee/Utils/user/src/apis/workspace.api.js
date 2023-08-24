import AxiosClient from './api'
import END_POINT from './constants'

async function loadWorkspacesAPI() {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.WORKSPACE.LIST
  return axiosClient.get(uri).then((res) => res.data)
}

export {
  loadWorkspacesAPI
}
