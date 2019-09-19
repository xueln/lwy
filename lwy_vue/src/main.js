import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MyHeader from './components/MyHeader.vue'
import MyFooter from './components/MyFooter.vue'
import ToolBars from './components/ToolBars.vue'
import Bread from './components/Bread.vue'
// vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// 引入axios
import axios from 'axios'
import QS from 'qs'
// 请求的基础路径
axios.defaults.baseURL="http://127.0.0.1:5050/";
// 请求时保存session信息
axios.defaults.withCredentials=true;
Vue.prototype.axios=axios;
Vue.prototype.QS=QS;
Vue.config.productionTip = false
Vue.component("my-header",MyHeader);
Vue.component("my-footer",MyFooter);
Vue.component("tool-bars",ToolBars);
Vue.component("bread",Bread);
Vue.use(VueAwesomeSwiper);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
