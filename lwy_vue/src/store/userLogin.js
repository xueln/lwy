import axios from 'axios';
export default{
    state:{
        islogin:JSON.parse(sessionStorage.getItem("islogin")) || false,
        userInfo:JSON.parse(sessionStorage.getItem("userInfo")) || {}
    },
    getters:{
        getIsLogin(state){
            return state.islogin;
        },
        getuserInfo(state){
            return state.userInfo;
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
            sessionStorage.removeItem("islogin");
            sessionStorage.removeItem("userInfo");
            state.islogin=false;
            state.userInfo={};
        } 
    },
    actions:{
        async userLogin(context,user){
            var res=await axios.post('user/getUser',user);
            console.log(res.data);
            if(res.data.code==1){
                context.commit("setIsLogin",true);
                context.commit("setuserInfo",res.data.data[0]);
                return true;
            }
        },
        async userLogout(context){
           var res=await axios.get("/user/logout");
           console.log(res.data);
           context.commit("logout");
           console.log('logout');
        }
    }
}