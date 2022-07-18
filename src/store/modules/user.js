import { setItem, getItem } from '@/utils/storage'
import { userInfoAPI, logoutAPI } from '@/api/user'
import { Notification } from '@/utils/Notification'
import router from '@/router'
import { resetRouter } from '../../utils/resetRouter'

export default {
  namespaced: true,
  state: () => ({
    token: getItem('token') || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async getUserInfo({ commit }) {
      try {
        const data = await userInfoAPI()
        commit('setUserInfo', data)
      } catch (error) {}
    },
    async userLogout({ commit }) {
      try {
        await logoutAPI()
        resetRouter()
        commit('setToken', '')
        commit('setUserInfo', {})
        router.push('/login')
        Notification('退出登录成功', '', 'success')
      } catch (error) {}
    }
  }
}
