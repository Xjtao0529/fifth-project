import request from '../utils/request'
export const userInfoAPI = () => {
  return request({
    url: '/getinfo',
    method: 'POST'
  })
}
/**
 * 退出登录
 * @returns {AxiosPromise}
 */
export const logoutAPI = () => {
  return request({
    url: '/logout',
    method: 'POST'
  })
}
