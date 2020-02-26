// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();
//全局过滤器
Vue.filter('fils',function(value,index=0){
    return '全局过滤器:'+value+'过滤器参数:'+index;
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data() {
    return {
      key: '这是root的data'
    }
  },
  components: { App },
  template: '<App/>'
})
