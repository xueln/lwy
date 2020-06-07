<template>
    <div class="cart_page bg_f5f5f5">
        <!-- 顶部导航栏 -->
        <div class="top_nav bg_fff">
            <div class="center w1200  d-flex">
                <div class="title">
                    <router-link to="/" class="block" id="logo_icon"></router-link>
                    <span>我的购物车</span>
                </div>
                <ul class="d-flex">
                    <li v-show="getIsLogin">
                        <span v-text="getuserInfo.unum"></span>     
                    </li>
                    <li v-show="getIsLogin">
                        <router-link to="" class="changeRed">个人中心</router-link>
                    </li>
                    <li v-show="getIsLogin">
                        <router-link to="" class="changeRed">我的订单</router-link>
                    </li>
                    <li v-show="!getIsLogin">
                        <router-link to="/Login" class="changeRed">登录</router-link> /
                        <router-link to="/Register" class="changeRed">注册</router-link>
                    </li>
                    <li>
                        <router-link to="" class="changeRed">浏览历史</router-link>
                    </li>    
                    <li v-show="getIsLogin">
                        <router-link to="" class="changeRed">退出登录</router-link>
                    </li>    
                </ul>
            </div>
        </div>
        <!-- 面包屑 -->
        <bread :breadName="['购物车']"></bread>
        <!-- 购物车中没有商品时显示 -->
        <div v-if="getCount==0" class="cartEmpty w1200 bg_fff">
            <p>购物车中没有礼物</p>
            <p>
                <router-link class="changeRed" to="/Products">继续购物</router-link>
            </p>
        </div>
        <!-- 有商品时的显示 -->
        <div v-else class="cartList w1200 bg_fff">
            <ul class="d-flex">
                <li>商品信息</li>
                <li>单价</li>
                <li>数量</li>
                <li>库存</li>
                <li>小计</li>
                <li>
                    全选<input type="checkbox" v-model="allCheck" @change="allCheckChange">
                </li>
            </ul>
            <ul class="detail">
                <li v-for="(item,index) of list" :key="index" class="d-flex">
                    <div class="d-flex">
                        <router-link :to="'/Details/'+item.pid">
                            <img :src="imgUrl+item.pic" alt="">
                        </router-link>
                        <p>
                            <router-link to="" v-text="item.title"></router-link>
                            <span class="block2 color666 font12" v-if="item.color">{{'礼物款式:'+item.color}}</span>
                            <span class="block2 color666 font12">礼物款式:{{item.spec}}</span>
                        </p>
                    </div>
                    <div>¥{{item.price | priceFilter}}</div>
                    <div>
                        
                        <cart-btn :count="item.count" :i="index" :list="list"></cart-btn>
                        <!-- <a href="javascript:;" @click.prevent="countChange($event,-1)" :data-i="index"></a>
                        <input type="text" v-model="item.count">
                        <a href="javascript:;" @click.prevent="countChange($event,1)" :data-i="index"></a> -->
                        
                    </div>
                    <div v-text="item['is_spot']?'有库存':'无库存'"></div>
                    <div>¥{{item.price*item.count | priceFilter}}</div>
                    <div>
                        <!-- <a href="javascript:;" data-i="index" id="del"></a> -->
                        <input type="checkbox" :checked="getCheckStatus[item.cid]" @change="statusChange(item.cid)">
                    </div> 
                </li>
            </ul>
            <!-- 结算 -->
            <div class="cart_total d-flex">
                <router-link to="" class="changeRed">
                    <i></i>
                    继续购物
                </router-link>
                <div class="right d-flex">
                    <span class="font16" v-text="`共${getSelectCount}件商品`"></span>
                    <span class="font16">合计：
                        <b>¥ {{getSelectTotal | priceFilter}}</b>
                    </span>
                    <router-link to="" class="changeRed font16">去结算</router-link>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
import {mapGetters,mapActions, mapMutations} from 'vuex';
import CartBtn from '../components/cart/CartBtn.vue'
export default {
    data(){
        return {
            list:[],
            imgUrl:'http://127.0.0.1:5050/',
            // 商品勾选值
            checkedList:[],
            allCheck:true
        }
    },
    methods:{
        ...mapActions(["cartInit","addCart","changeCart","del","checkedInit"]),
        ...mapMutations(["setAllCheck","changeStatus"]),
        // 购物车数量单击按钮事件
        countChange(e,val){
            var i=parseInt(e.target.dataset.i);
            var count=this.list[i].count;
            count+=val;
            console.log(count);
            if(count<=0){
                // 应该执行删除操作
                console.log("应该执行删除操作");
                this.del({cid:this.list[i].cid,i:i});
            }else{
               if(count>=40){
                    count=40;
                } 
            // 将修改更新到vuex中
            this.changeCart({cid:this.list[i].cid,count});
            }

        },
        allCheckChange(){
            this.setAllCheck(!this.getIsAllCheck);
        },
        statusChange(cid){
            this.changeStatus(cid);
            console.log(this.getIsAllCheck);
            this.allCheck=this.getIsAllCheck;
            // console.log(this.getCheckStatus);
        },
        loadMore(){
            // 从vuex中拿到购物车数据
            this.list=this.getCartList;
            // console.log(this.list[0].color);
        },
        
    },
    created(){
        // 初始化cart的state
        (async ()=>{
            await this.cartInit();
            this.checkedInit();
            // console.log(this.getIsAllCheck);
            this.allCheck=this.getIsAllCheck;
            // console.log(this.getIsLogin);
            // 用户是否登录？登录状态查询当前浏览器中cartProducts是否有信息？
            // 浏览器端有存储信息 将存储信息中的
            this.loadMore();
        })();
        
    },
    computed:{
        ...mapGetters(["getIsLogin","getuserInfo","getCartList","getCount","getCheckStatus","getIsAllCheck","getSelectCount","getSelectTotal"]),
        total(){
            return this.list.reduce((prev,value)=>{
                prev+=value.price*value.count;
                return prev;
            },0);
        }
    },
    wacth:{
        // 
    },
    components:{'cart-btn':CartBtn}
}
</script>
<style>
    @import url(../assets/css/cart.css);
</style>

