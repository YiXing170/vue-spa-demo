// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import VueResorce from 'vue-resource'
import "./common/stylus/index.styl"
import './common/fonts/iconfont.css'

Vue.config.productionTip = false

Vue.use(VueResorce)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})

