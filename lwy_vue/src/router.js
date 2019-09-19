import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Details from './views/Details.vue'
// import Carousel from './components/index/Carousel.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',
     component: Index
    },
    {path: '/Index',
     component: Index
    },
    {path: '/Login',
     component: Login
    },
    {path: '/Register',
     component: Register
    },
    {path: '/Details/:pid',
     component: Details,
     props:true
    }
  
  ]
})