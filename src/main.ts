import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

Vue.config.productionTip = false;
Vue.use(Buefy);

new Vue({
  beforeCreate() {
    //this.$store.commit('initStore');
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app');
