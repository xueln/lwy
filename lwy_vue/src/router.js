import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from './views/Index.vue'
// const Index=()=>import (/*webpackChunkName:"index"*/'./views/Index.vue');
// import Login from './views/Login.vue'
const Login=()=>import (/*webpackChunkName:"Login"*/'./views/Login.vue');
// import Register from './views/Register.vue'
const Register=()=>import (/*webpackChunkName:"Register"*/'./views/Register.vue');
// import Details from './views/Details.vue'
const Details=()=>import (/*webpackChunkName:"Details"*/'./views/Details.vue');
// import Products from './views/Products.vue'
const Products=()=>import (/*webpackChunkName:"Products"*/'./views/Products.vue');
// import NotFound from './views/NotFound.vue'
const NotFound=()=>import (/*webpackChunkName:"NotFound"*/'./views/NotFound.vue');
// import Cart from './views/Cart.vue'
const Cart=()=>import (/*webpackChunkName:"Cart"*/'./views/Cart.vue');

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {path:'/',component:Home,children:[
      {path: '/',
       component: Index
      },
      {path: 'Index',
       component: Index
      },
      {path: 'Login',
       component: Login
      },
      {path: 'Register',
       component: Register
      },
      {name:"detail",path: 'Details/:pid',
       component: Details,
       props:true
      },
      {path: 'Products/:kw',
       component: Products,
       props:true
      },
      {path: 'Products/',
       component: Products
      },
    ]},
    {path: '/Cart',component: Cart},
    {path: '/*',component: NotFound}
  ]
})
