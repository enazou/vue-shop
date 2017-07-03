import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App.vue'
import routes from './router.config.js'
import 'animate.css'

Vue.use(VueRouter)

Vue.prototype.$http = axios

const router = new VueRouter(routes)

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  data: {
  	eventHub: new Vue()
  }
})
