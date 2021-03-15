import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false

new Vue({
  axios,
  render: h => h(App),
}).$mount('#app')


