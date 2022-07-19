import request from '../utils/request'

export const statistics1Api = () => {
  return request({
    url: '/statistics1',
    method: 'GET'
  })
}
export const statistics2Api = () => {
  return request({
    url: '/statistics2',
    method: 'GET'
  })
}
export const statistics3Api = (data) => {
  return request({
    url: '/statistics3',
    method: 'GET',
    data
  })
}
