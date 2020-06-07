<template>
    <div>
        <my-header></my-header>
        <div class="login_bg">
            <table></table>
            <div class="service">
                <span>服务热线：0755-86380505 (8:00－24:00)</span>
                <a href="javascript:;">QQ在线交谈</a>
            </div>
            <div class="content">
                <h2>欢迎回来 
                <span class="no_user">还没有账号?
                    <a href="javascript:;" @click.prevent="goreg">现在注册</a>
                </span>
                </h2>
                <input  id="phone" placeholder="请输入手机号 / 邮箱" v-model="myPhone" v-autoFocus>
                <input id="upwd" placeholder="请输入密码" v-model="myPwd">
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
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    data(){
        return{
            myPhone:"15101570073",
            myPwd:"123456n"
        }
    },
    methods:{
        ...mapActions(["userLogin"]),
        loginNow(){
            // 非空验证
            if(this.myPhone=="" || this.myPwd==""){
                alert("用户名或密码不能为空");
                document.getElementById("phone").focus();
                return;
            }
            // 登录 保留状态
            (async ()=>{
                await this.userLogin(this.QS.stringify({
                    iphone:this.myPhone,
                    upwd:this.myPwd
                }));
                if(this.getIsLogin){
                    alert("登录成功");
                    this.$router.push('Index');
                }else{
                    alert("用户名或密码错误");
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

