import axios from "axios";
import qs from "qs";
import store from '../../store';
import router from '../../router'
// 创建axios实例
const Axios=axios.create({
  baseURL:"http://127.0.0.1:5050/",
  withCredentials:true
})
// 请求拦截器
Axios.interceptors.request.use(
  config=>{
    console.log("进入请求拦截器...");
    console.log(store.getters.getToken);
    //this.axios.post(
      //"user/signin",
      //{uname:dingding , upwd:123456}
    //)
    if(config.method==="post"){
      config.data=qs.stringify(config.data)
    }
    if(localStorage.getItem("token")){
      config.headers.token=localStorage.getItem("token");
    }
    if(sessionStorage.getItem("token")){
      config.headers.token=sessionStorage.getItem("token");
    }
    return config;
  },
  error=>{
    console.log("===发送请求拦截器报错===")
    console.log(error);
    console.log("===end===");
    Promise.reject(error);
  }
);
Axios.interceptors.response.use(
  res=>{
    console.log("触发响应拦截器...")
    // console.log(res);
    if(res.data.status==403){
      console.log(store.getters.getToken);
      store.commit("logout");
      console.log(store.getters.getToken);
      alert("请重新登录");
      router.push({name:'login'});
    }else if(res.config.url.indexOf("user/getUser")!==-1 && res.data.code==-2){
      // store.commit("setIslogin",false);
      // store.commit("setUname","");
      // alert(res.data.msg+" 请先登录 !");
      alert("用户名或密码错误");
    }else if(res.config.url.indexOf("/user")!==-1 && res.data.token){
      store.commit("setToken",res.data.token);
      store.commit("setIsLogin",true);
      store.commit("setuserInfo",res.data.data[0]);
      // if(res.remember==="true"){
      //   localStorage.setItem("token",res.data.token);
      // }else{
      //   sessionStorage.setItem("token",res.data.token);
      // }
    }
    return res;
  },
  error=>{
    
  }
)
export default {
  install: function(Vue, Option){
    Vue.prototype.axios=Axios;
  }
}
export {Axios} 