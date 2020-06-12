<template>
    <div id="loginContent">
        <h2>欢迎回来 
        <span class="no_user">还没有账号?
            <a href="javascript:;" @click.prevent="goreg">现在注册</a>
        </span>
        </h2>
        <p :class="testUser">用户名或密码错误</p>
        <input  id="phone" placeholder="请输入手机号 / 邮箱" v-model="myPhone" v-autoFocus @blur="phoneBlur">
        <p :class="iphoneIsNull?'':'vali'">用户名不能为空</p>
        <input id="upwd" placeholder="请输入密码" v-model="myPwd"  @blur="pwdBlur">
        <p :class="pwdIsNull?'':'vali'">密码不能为空</p>
        <input @click="loginNow"  type="button" value="立即登录" id="login">
        <p>
            <input type="checkbox" id="auto">
            <label for="auto">30天内免登陆</label>
            <a id="forget_pwd" href="javascript:;">忘记密码?</a>
        </p>
        <p class="other_login">
            <span class="left_line"></span>
            其他方式登录
            <span class="right_line"></span>
        </p>
        <ul class="three">
            <li>
                <i class="qq_icn"></i>
                <a href="">QQ</a>
            </li>
            <li class="sina">
                <i class="sina_icon"></i>
                <a href="">新浪微博</a>
            </li>
            <li class="zfb">
                <i class="zfb_icon"></i>
                <a href="">支付宝</a>
            </li>
        </ul>
    </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    data(){
        return{
            myPhone:"",
            myPwd:"",
            iphoneIsNull:true, //false 不为空
            pwdIsNull:true,
            testUser:{vali:true}
        }
    },
    methods:{
        ...mapActions(["userLogin"]),
        phoneBlur(e){
            this.myPhone=this.myPhone.trim();
            if(!this.myPhone){
                this.iphoneIsNull=true;
            }else{
                this.iphoneIsNull=false;
            }
        },
        pwdBlur(e){
            this.myPwd=this.myPwd.trim();
            if(!this.myPwd){
                this.pwdIsNull=true;
                
            }else{
                this.pwdIsNull=false;
                
            }
            
            
        },   
        loginNow(){
            console.log(this.myPwd);  
           if(this.iphoneIsNull){
               document.getElementById("phone").focus();
               return;
           }else if(this.pwdIsNull){
                document.getElementById("upwd").focus();
                return ;
           }
            // 登录 保留状态
            (async ()=>{
                await this.userLogin({
                    iphone:this.myPhone,
                    upwd:this.myPwd
                });
                if(this.getIsLogin){
                    alert("登录成功");
                    this.$router.push('/');
                }else{
                    // alert("用户名或密码错误");
                    this.testUser.vali=false;
                }
                this.myPhone="";
                this.myPwd="";
                 
            })();
        },
        goreg(){
            this.$router.push('/Register');
        }
    },
    computed:{
        ...mapGetters(["getIsLogin"])
    },
    directives:{
        "autoFocus":{
            inserted(dom){
                dom.focus();
            }
        }
    }
}
</script>
<style>
    @import url(../assets/css/login.css);
</style>

