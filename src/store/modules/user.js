/*
 * @Description: 用户登录状态模块
 */
export default {
  state: {
    account: "", // 登录的用户
    showLogin: false, // 用于控制是否显示登录组件
    id: ""
  },
  getters: {
    getAccount (state) {
      return state.account
    },
    getShowLogin (state) {
      return state.showLogin
    },
    getId (state) {
      return state.id
    }
  },
  mutations: {
    setAccount (state, data) {
      state.account = data;
    },
    setShowLogin (state, data) {
      state.showLogin = data;
    },
    setId (state,data) {
      state.id = data;
    }
  },
  actions: {
    setAccount ({ commit }, data) {
      commit('setAccount', data);
    },
    setShowLogin ({ commit }, data) {
      commit('setShowLogin', data);
    },
    setId ({ commit }, data) {
      commit('setId', data);
    }
  }
}
