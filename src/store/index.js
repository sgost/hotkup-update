import { createStore } from 'vuex';

export default createStore({
  state: {
    welcomeMsg: 'Vuex Loaded 1.',
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++;
    }
  },
  getters: {
    count: state => {
      return state.count;
    },
    welcomeMsg: state => {
      return state.welcomeMsg;
    }
  }
});
