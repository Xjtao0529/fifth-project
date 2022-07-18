export default {
  token: (state) => state.user.token,
  isCollapse: (state) => state.menu.isCollapse,
  userInfo: (state) => state.user.userInfo,
  menus: (state) => state.user.userInfo.menus,
  tagsView: (state) => state.tagsView.tags
}
