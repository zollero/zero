// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App/index'
// import router from './router'
// import JSONbig from 'json-bigint'
// import store from './store'
// import filters from './filters'
// import axios from './utils/axios'

// 自定义样式
import '../static/css/animate.min.css'
import '../static/css/base.less'
import '../static/fonts/iconfont.css'

// 引入公共样式
// import SearchTablePagination from '@/components/search-table-pagination'
// import operateWrapper from '@/components/operate-wrapper'

Vue.config.productionTip = false

// Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

// Vue.prototype.axios = axios

// 将原生的JSON对象暂存为oldJSON对象，并将JSONbig设为JSON
// window.oldJSON = window.JSON
// window.JSON = JSONbig

// 注册公共组件
// Vue.component('search-table-pagination', SearchTablePagination)
// Vue.component('operate-wrapper', operateWrapper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  // store,
  template: '<App/>',
  components: { App }
})
