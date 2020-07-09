// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/base.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import nav from './components/nav/nav'
import axios from './request/axios.js'
import Qs from 'Qs'
import md5 from 'js-md5';
import request from './request/request.js'
import './assets/dms.css'


Vue.prototype.$http = axios
Vue.prototype.Qs = Qs
Vue.prototype.$message = Message
Vue.prototype.$md5 = md5;
Vue.prototype.server_url  = "http://api.dms.com"
Vue.prototype.$request = request
Vue.config.productionTip = false



Vue.use(ElementUI);
Vue.component('Nav', nav)
Vue.component(CollapseTransition.name, CollapseTransition)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
})
