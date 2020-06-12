<template>
    <div id="regContent">
        <h2>注册礼无忧账号</h2> 
        <input id="regPhone" @blur="blurPhoneHandle" placeholder="请输入手机号" v-model="phone" v-autoFocus>
        <div v-text="reg_phone"></div>
        <input id="regPwd" @blur="blurPwdHandle" type="password" placeholder="请输入密码6-12位(字母+数字)" v-model="pwd">
        <div v-text="reg_pwd"></div>
        <input id="regPwd2" @blur="blurPwd2Handle" type="password" placeholder="再次输入密码" v-model="pwd2">
        <div v-text="reg_pwd2"></div>
        <p>
            注册即为同意
            <a href="javascript:;">《礼无忧用户注册协议》</a>
        </p>
        <input @click="regNowHandle" type="button" value="立即注册" id="reg" :class="{disabled:!regCanClick}">
    </div>

</template>

<script>
import QS from 'qs'
import { async } from 'q';
import {iphoneLogin,iphoneReg} from '../assets/js/interface'
export default {
    data(){
        return{
            phone:"",
            pwd:"",
            pwd2:"",
            reg_phone:"",
            reg_pwd:"",
            reg_pwd2:"",
            flag:{regPhone:false,regPwd:false,regPwd2:false}, //iphone pwd pwd2
            // regCanClick:false
        }
    },
    methods:{
        getPhone(){
            (async ()=>{
                var res=await iphoneLogin({iphone:this.phone});
                if(res.code==-1){
                    this.reg_phone="该手机号已被注册";
                     this.flag.regPhone=false;
                }else if(res.code==1){
                    this.reg_phone="";
                    this.flag.regPhone=true;
                }
            })();
        },
        regTest(str,reg,textP,msg){
            if(reg.test(str)){
                this[textP]="";
                return true;
            }else{
                this[textP]=msg;
                return false;
            }
        },
        blurPhoneHandle(e){
            this.phone=this.phone.trim();
            var reg=/^1[3-9]\d{9}$/;
            var isCorrect=this.regTest(this.phone,reg,"reg_phone","手机号格式不正确");
            // console.log(this.phone,isCorrect);
            if(!isCorrect){
                this.flag.regPhone=false;
            }else{
                // 验证用户手机号是否被使用
                this.getPhone();     
            } 
        },
        blurPwdHandle(e){
            this.pwd=this.pwd.trim();
            var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
            var isCorrect=this.regTest(this.pwd,reg,"reg_pwd","请输入正确格式的密码(6~12位 数字+字母)");
            if(!isCorrect){
                this.flag.regPwd=false;
            }else{
                this.flag.regPwd=true;
            } 
        },
        blurPwd2Handle(e){
            this.pwd2=this.pwd2.trim();
            var pwd2=this.pwd2.replace(/[a-z]/ig,(kw)=>{
                return kw.toUpperCase();
            });
            var pwd=this.pwd.replace(/[a-z]/ig,(kw)=>{
                return kw.toUpperCase();
            });
            if(pwd2!==pwd){
                this.reg_pwd2="两次输入密码不一致";
                this.flag.regPwd2=false;
            }else{
                this.reg_pwd2="";
                this.flag.regPwd2=true;
            }
        },
        // 立即注册单击事件
        regNowHandle(){     
            // console.log(this.flag);
            // for (const key in this.flag) {
            //     if (!this.flag[key]) {
            //         document.getElementById(key).focus();
            //         return;  
            //     }
            // }
            // console.log("格式都正确");
            // return;
            console.log(this.regCanClick);
            if(this.regCanClick){
                //    格式正确       
                (async ()=>{
                    var res=await iphoneReg({
                            iphone:this.phone,
                            upwd:this.pwd2
                    });
                    if(res.code==200){
                        alert("注册成功！欢迎您"+this.phone); 
                    //   自动登录
                    var loginRes=await iphoneLogin({
                        iphone:this.phone,
                        upwd:this.pwd2
                    });
                    if(loginRes.code==1){
                        this.$router.push('/');
                    }else{
                        alert('登录失败,请稍后再试');
                    }         
                    }
                })();   
            }
        }
    },
    created(){

    },
    computed:{
        regCanClick(){
            var sum=0,trueC=0;
            for (const key in this.flag) {
                console.log(this.flag[key]);
                sum++;
                if (this.flag[key]) {
                    trueC++;            
                }
            }
            console.log(trueC==sum);
            return sum==trueC;
        }
    }
}
</script>
<style>
    @import url(../assets/css/register.css);
</style>

