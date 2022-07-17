import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 3000
})
service.interceptors.request.use(
  (config) => {
    const token = store.getters.token
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  (response) => {
    const {
      status,
      data: { msg, data }
    } = response
    if (status === 200) {
      return data
    }
    _showError(msg)
    return Promise.reject(msg)
  },
  (error) => {
    const { message } = error
    if (message.includes('Network Error')) {
      _showError('网络错误')
      return Promise.reject(message)
    }
    if (message.includes('timeout')) {
      _showError('请求超时')
      return Promise.reject(message)
    }
    const {
      status,
      data: { msg }
    } = error.response
    switch (status) {
      case 401:
        _showError('登录已过期，请重新登录')
        break
      case 403:
        _showError('没有权限')
        break
      case 404:
        _showError('请求资源不存在')
        break
      case 500:
        _showError('服务器错误')
        break
      default:
        _showError(msg)
    }
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
const _showError = (msg) => {
  ElMessage.error(msg)
}

const request = (options) => {
  if (options.method.toUpperCase() === 'GET') {
    options.params = options.data || {}
  }
  return service(options)
}
export default request
