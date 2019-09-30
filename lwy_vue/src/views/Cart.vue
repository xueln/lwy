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
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    @import url(../assets/css/cart.css);
</style>

