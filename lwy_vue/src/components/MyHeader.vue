<template>
    <div>
        <header>
            <div class="center">
                <router-link to="/" class="block" id="logo_icon"></router-link>
                <div id="classify">
                        <a href="javascript:;">礼物分类
                            <i href="javascript:;" id="classify_icon" class="block"></i>
                        </a>
                        <!-- 礼物分类下拉菜单 -->
                        <ul class="classify_pop">
                            <li>
                                <a href="javascrit:;">少女心饰</a>
                            </li>
                            <li>
                                <a href="javascrit:;">萌萌心物</a>
                            </li>
                            <li>
                                <a href="javascrit:;">为爱停留</a>
                            </li>
                            <li>
                                <a href="javascrit:;">潮流时尚</a>
                            </li>
                            <li>
                                <a href="javascrit:;">科技达人</a>
                            </li>
                            <li>
                                <a href="javascrit:;">幸福烙印</a>
                            </li>
                            <li>
                                <a href="javascrit:;">爱情保鲜</a>
                            </li>
                            <li>
                                <a href="javascrit:;">&nbsp;</a>
                            </li>
                        </ul>
                </div>
                <ul class="pro_nav">
                    <li>
                        <a href="javascript:;">送礼导航</a>
                        <div class="nav_menu">
                            <div class="menu_center">
                                <dl>
                                    <dt>送给谁：</dt>
                                    <dd>
                                        <a href="javascrpt:;">不限</a>
                                        <a href="javascrpt:;">公主女票</a>
                                        <a href="javascrpt:;">欧巴男票</a>
                                        <a href="javascrpt:;">潮爸辣妈</a>
                                        <a href="javascrpt:;">熊孩子</a>
                                        <a href="javascrpt:;">生意伙伴</a>
                                        <a href="javascrpt:;">致谢恩师</a>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>为啥送：</dt>
                                    <dd>
                                        <a href="javascrpt:;">不限</a>
                                        <a href="javascrpt:;">公主女票</a>
                                        <a href="javascrpt:;">欧巴男票</a>
                                        <a href="javascrpt:;">潮爸辣妈</a>
                                        <a href="javascrpt:;">熊孩子</a>
                                        <a href="javascrpt:;">生意伙伴</a>
                                        <a href="javascrpt:;">致谢恩师</a>
                                    </dd>
                                </dl>
                                <div>
                                    <a href="javascript:;">搜索</a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <a href="javascript:;">创意礼物</a>
                    </li>
                    <li>
                        <a href="javascript:;">新品上架</a>
                    </li>
                    <li>
                        <a href="javascript:;">父亲节礼物</a>
                    </li>
                </ul>
                <div class="search">
                    <input type="text" v-model="kw" @keydown.13="search">
                    <a @click="search" href="javascript:;" id="search_icon" class="block"></a>
                </div>
                <router-link to="/Login" class="block user" >
                    <i id="user_icon" class="block"></i>
                    <div class="box user_box">
                        <i class="triangle"></i>
                        <ul>
                            <li>
                                <router-link to="/Login" class="changeRed">登录</router-link>/
                                <router-link to="/Register" class="changeRed">注册</router-link>
                            </li>
                            <li><router-link to="" class="changeRed">浏览历史</router-link></li>
                            <li><router-link to="" class="changeRed">我的订单</router-link></li>
                            <li><router-link to="" class="changeRed">我的收藏</router-link></li>
                        </ul>
                    </div>
                </router-link>
                <router-link to="" class="car block">
                    <i id="car_icon" class="block"></i>
                    <span class="cart_count">2</span>
                    <div  class="box cart_box">
                        <i class="triangle cart_tri"></i>
                        <p v-show="false" class="cart_empty">购物车中还没有商品，赶紧选购吧！</p>
                        <div v-show="true">
                            <ul>
                                <li>
                                    <div class="font12">
                                        <router-link to="">  
                                            <img src="../../public/images/index/birthday01.jpg" alt="">
                                        </router-link>
                                        <div>
                                            <router-link to=""  class="font12 changeRed">酷玩音乐台灯</router-link><br>   
                                            <span>礼物款式：普通款</span><br>
                                            <span>个性定制：直接购买</span>
                                        </div>
                                    </div>
                                    <p>
                                    <span>X{{1}}</span> <br>
                                    <span>¥{{49.0}}</span> <br>
                                    <a href="javascript:;"  class="font12 changeRed">删除</a>
                                    </p>

                                </li>
                            </ul>
                            <div class="banlance">
                                <span class="total_left">
                                    共计{{1+1}}件商品
                                    <br>
                                    <span>
                                        <b>合计：</b>
                                        <span class="c-d93732">¥{{1}}</span>
                                    </span>
                                </span>
                                <router-link to="/Cart" >去购物车结算</router-link>
                            </div>
                        </div>
                    </div>
                </router-link>
                
            </div>
        </header>
    </div>
</template>

<script>
export default {
    data(){
        return {
           kw:" "
        }
    },
    methods:{
        search(){
            this.$router.push("/Products/"+this.kw);
            this.$emit("kwHandle",this.kw);
        }
    },
    created(){
        this.kw=this.$route.params.kw || " ";
    },
    watch:{
        $route(){
           this.kw=this.$route.params.kw; 
        }
    }
}
</script>
<style>
    @import url(../assets/css/header.css);
</style>

