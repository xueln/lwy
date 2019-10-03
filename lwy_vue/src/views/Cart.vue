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
                    <li>
                        <span>US000061487</span>     
                    </li>
                    <li>
                        <router-link to="" class="changeRed">个人中心</router-link>
                    </li>
                    <li>
                        <router-link to="" class="changeRed">我的订单</router-link>
                    </li>
                    <li>
                        <router-link to="" class="changeRed">浏览历史</router-link>
                    </li>    
                    <li>
                        <router-link to="" class="changeRed">退出登录</router-link>
                    </li>    
                </ul>
            </div>
        </div>
        <!-- 面包屑 -->
        <bread :breadName="['购物车']"></bread>
        <div class="cartList w1200 bg_fff">
            <ul class="d-flex">
                <li>商品信息</li>
                <li>单价</li>
                <li>数量</li>
                <li>库存</li>
                <li>小计</li>
                <li>操作</li>
            </ul>
            <ul class="detail">
                <li class="d-flex">
                    <div class="d-flex">
                        <router-link to="">
                            <img src="http://127.0.0.1:5050/img/product/bird.jpg" alt="">
                        </router-link>
                        <p>
                            <router-link to="">我想镜镜</router-link>
                            <span class="block2 color666 font12">礼物款式:直接购买</span>
                        </p>
                    </div>
                    <div>¥{{39 | priceFilter}}</div>
                    <div>
                        <div>
                            <a href="javascript:;"></a>
                            <input type="text">
                            <a href="javascript:;"></a>
                        </div> 
                    </div>
                    <div>有库存</div>
                    <div>¥{{39 | priceFilter}}</div>
                    <div>
                        <a href="javascript:;"></a>
                    </div> 
                </li>
            </ul>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[]
        }
    },
    methods:{
        loadMore(){

        }
    },
    created(){
        // 用户是否登录？登录状态查询当前浏览器中cartProducts是否有信息？
        // 浏览器端有存储信息 将存储信息中的
        console.log("购物车");
    }
}
</script>
<style>
    @import url(../assets/css/cart.css);
</style>

