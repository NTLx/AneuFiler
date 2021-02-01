/*
 * @Author: Letmeouted
 * @Email: 1002726239@qq.com
 * @FilePath: \Vue-AnenuFiler\src\renderer\main.js
 */

import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import resetMessage from './assets/js/resetMessage'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
Vue.use(ElementUI)
Vue.prototype.$message = resetMessage
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
