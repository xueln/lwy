import Vue from 'vue'
import Vuex from 'vuex'
import userLogin from './userLogin'
import cart from './cart'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    userLogin,
    cart
  }
})
