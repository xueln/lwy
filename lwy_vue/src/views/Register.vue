<template>

    <div class="reg_bg">
        <table></table>
        <div class="service">
            <span>服务热线：0755-86380505 (8:00－24:00)</span>
            <a href="javascript:;">QQ在线交谈</a>
        </div>
        <div class="content">
            <h2>注册礼无忧账号</h2> 
            <input  @blur="blurPhoneHandle" placeholder="请输入手机号" v-model="phone">
            <div v-text="reg_phone"></div>
            <input @blur="blurPwdHandle" type="password" placeholder="请输入密码6-12位(字母+数字)" v-model="pwd">
            <div v-text="reg_pwd"></div>
            <input @blur="blurPwd2Handle" type="password" placeholder="再次输入密码" v-model="pwd2">
            <div v-text="reg_pwd2"></div>
            <p>
                注册即为同意
                <a href="javascript:;">《礼无忧用户注册协议》</a>
            </p>
            <input @click="regNowHandle" type="button" value="立即注册" id="reg">
        </div>
    </div>

</template>

<script>
import QS from 'qs'
import { async } from 'q';
export default {
    data(){
        return{
            phone:"",
            pwd:"",
            pwd2:"",
            reg_phone:"",
            reg_pwd:"",
            reg_pwd2:"",
            regAlready:false
        }
    },
    methods:{
        getPhone(){
            (async ()=>{
                var res=await this.axios.post('user/getUser',QS.stringify({
                    iphone:this.phone
                }));
                console.log(res.data);
                if(res.data.code==-1){
                    this.reg_phone="该手机号已被注册";
                    this.regAlready=true;
                }
            })();

        },
        blurPhoneHandle(){
            var reg1=/^1[3-9]\d{9}$/;
            var isCorrect=reg1.test(this.phone);
            // console.log(this.phone,isCorrect);
            if(!isCorrect){
                this.reg_phone="手机号格式不正确";
                return false;
            }else{
                // 验证用户手机号是否被使用
                this.getPhone();
                if(this.regAlready==false){
                   this.reg_phone="";
                   return true;
                }else{
                    return false;
                }
                
            } 
        },
        blurPwdHandle(){
            var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
            if(!reg.test(this.pwd)){
                this.reg_pwd="请输入正确格式的密码(6~12位 数字+字母)";
                return false;
            }else{
                console.log(this.pwd);
                this.reg_pwd="";
                return true;
            } 
        },
        blurPwd2Handle(){
            var pwd2=this.pwd2.replace(/[a-z]/ig,(kw)=>{
                return kw.toUpperCase();
            });
            var pwd=this.pwd.replace(/[a-z]/ig,(kw)=>{
                return kw.toUpperCase();
            });
            if(pwd2!==pwd){
                this.reg_pwd2="两次输入密码不一致";
                return false;
            }else{
                this.reg_pwd2="";
                return true;
            }
        },
        // 立即注册单击事件
        regNowHandle(){
            if(this.blurPhoneHandle() && this.blurPwdHandle() &&  this.blurPwd2Handle()){
                console.log(this.phone,this.pwd);
                (async ()=>{
                    var res=await this.axios.post("user/v1/reg",
                        QS.stringify({
                            iphone:this.phone,
                            upwd:this.pwd2
                        })
                    );
                    console.log(res.data);
                    if(res.data.code==200){
                      alert("注册成功！欢迎您"+this.phone); 
                    //   自动登录
                    var loginRes=await this.axios.post('user/getUser',this.QS.stringify({
                        iphone:this.phone,
                        upwd:this.pwd2
                    }));
                    if(loginRes.data.code==1){
                        this.$router.push('/Index');
                    }else{
                        alert('登录失败,请稍后再试');
                    }
                       
                    }
                })();
            }

        }
    },
    created(){

    }
}
</script>
<style>
    @import url(../assets/css/register.css);
</style>

