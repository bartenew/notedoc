import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  mutations: {
    initStore(state) {
      const storeStr = localStorage.getItem('store');
      if (storeStr) {
        this.replaceState(Object.assign(state, JSON.parse(storeStr)));
      }
    },
  },
});

// Subscribe to store updates
store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
