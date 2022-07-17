import request from '../utils/request'

/**
 * 用户登录
 * @param data
 * @returns {AxiosPromise}
 */
export const loginAPI = (data) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
