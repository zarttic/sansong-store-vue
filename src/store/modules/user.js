/*
 * @Description: 用户登录状态模块
 */
export default {
  state: {
    account: "", // 登录的用户
    showLogin: false // 用于控制是否显示登录组件
  },
  getters: {
    getAccount (state) {
      return state.account
    },
    getShowLogin (state) {
      return state.showLogin
    }
  },
  mutations: {
    setAccount (state, data) {
      state.account = data;
    },
    setShowLogin (state, data) {
      state.showLogin = data;
    }
  },
  actions: {
    setAccount ({ commit }, data) {
      commit('setAccount', data);
    },
    setShowLogin ({ commit }, data) {
      console.log(data+"111");
      commit('setShowLogin', data);
    }
  }
}
