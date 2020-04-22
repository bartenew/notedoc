import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(VueMaterial);
Vue.config.productionTip = false;

// wait for gapi to load
new Promise(resolve => {
  if (window.gapi) {
    resolve(window.gapi);
  }
}).then(() => {
  new Vue({
    beforeCreate() {
      //this.$store.commit('initStore');
    },
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
});
