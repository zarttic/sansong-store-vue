/*
 * @Description: 用户登录状态模块
 */
export default {
  state: {
    account: "", // 登录的用户
    showLogin: false, // 用于控制是否显示登录组件
    userId: ""
  },
  getters: {
    getAccount (state) {
      return state.account
    },
    getShowLogin (state) {
      return state.showLogin
    },
    getUserId (state) {
      return state.userId
    }
  },
  mutations: {
    setAccount (state, data) {
      state.account = data;
    },
    setShowLogin (state, data) {
      state.showLogin = data;
    },
    setUserId (state,data) {
      state.userId = data;
    }
  },
  actions: {
    setAccount ({ commit }, data) {
      commit('setAccount', data);
    },
    setShowLogin ({ commit }, data) {
      commit('setShowLogin', data);
    },
    setUserId ({ commit }, data) {
      commit('setUserId', data);
    }
  }
}
