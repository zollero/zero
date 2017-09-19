/*!
 * z-todo  - https://github.com/zollero/todo-chrome
 * Version - 0.0.2
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2017 zollero <corona7@163.com>
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App/index'

// import common styles
import '../static/css/animate.min.css'
import '../static/css/base.less'
import '../static/fonts/iconfont.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
