import { iphoneLogin,userLogout } from '../assets/js/interface';
export default{
    state:{
        islogin:JSON.parse(sessionStorage.getItem("islogin")) || false,
        userInfo:JSON.parse(sessionStorage.getItem("userInfo")) || {},
        token:sessionStorage.getItem("token")
    },
    getters:{
        getIsLogin(state){
            return state.islogin;
        },
        getuserInfo(state){
            return state.userInfo;
        },
        getToken(state){
            return state.token;
        }
    },
    mutations:{
        setIsLogin(state,b){
            state.islogin=b;
            sessionStorage.setItem("islogin",JSON.stringify(b));
        },
        setuserInfo(state,info){
            state.userInfo=info;
            sessionStorage.setItem("userInfo",JSON.stringify(info));
        } ,
        logout(state){
            state.islogin=false;
            state.userInfo={};
            state.token=null;
            sessionStorage.removeItem("islogin");
            sessionStorage.removeItem("userInfo");
            sessionStorage.removeItem("token");
        } ,
        setToken(state,token){
            state.token=token;
            sessionStorage.setItem("token",token);
        },
        clearToken(state){
            state.token=null;
            sessionStorage.removeItem("token");
        }
    },
    actions:{
        async userLogin(context,user){
            var res=await iphoneLogin(user);
            console.log(res);
            if(res.code==1){
                console.log("登录成功啦");
                console.log(typeof context.state.token);
                context.commit("setIsLogin",true);
                context.commit("setuserInfo",res.data[0]);
                return true;
            }
        },
        userLogout({commit}){
            commit("logout");
        }
    }
}