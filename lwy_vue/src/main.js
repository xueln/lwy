import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MyHeader from './components/MyHeader.vue'
import MyFooter from './components/MyFooter.vue'
import ToolBars from './components/ToolBars.vue'
import Bread from './components/Bread.vue'
import * as filters  from './assets/js/filters.js'
import axios from './assets/js/axiosConfig.js'
// 全局注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
 });

// $router.push 解决重复路由问题
import Router from 'vue-router'
 
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

// 创建axios对象
// const Axios=axios.create({
//   baseURL:"http://127.0.0.1:5050/",
//   withCredentials:true
// });
// axios.defaults.baseURL="http://127.0.0.1:5050/";
// axios.defaults.withCredentials=true;

Vue.use(axios);
var serverUrl="http://127.0.0.1:5050/";
Vue.prototype.serverUrl=serverUrl;

import Vuex from 'vuex'
// Vue.config.productionTip = false
Vue.component("my-header",MyHeader);
Vue.component("my-footer",MyFooter);
Vue.component("tool-bars",ToolBars);
Vue.component("bread",Bread);
Vue.use(VueAwesomeSwiper);
Vue.use(Vuex);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
