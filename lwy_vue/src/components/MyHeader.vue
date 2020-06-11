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
                            <li v-show="!getIsLogin">
                                <router-link to="/Login" class="changeRed">登录</router-link>/
                                <router-link to="/Register" class="changeRed">注册</router-link>
                            </li>
                            <li v-show="getIsLogin" v-text="getuserInfo.unum"></li>
                            <li><router-link to="" class="changeRed">浏览历史</router-link></li>
                            <li><router-link to="" class="changeRed">我的订单</router-link></li>
                            <li><router-link to="" class="changeRed">我的收藏</router-link></li>
                            <li v-show="getIsLogin" @click="logout"><router-link to="" class="changeRed">退出登录</router-link></li>
                        </ul>
                    </div>
                </router-link>
                <router-link to="/Cart" class="car block">
                    <i id="car_icon" class="block"></i>
                    <span class="cart_count" v-text="getCount"></span>
                    <div  class="box cart_box">
                        <i class="triangle cart_tri"></i>
                        <p v-show="getCount==0" class="cart_empty">购物车中还没有商品，赶紧选购吧！</p>
                        <div v-show="getCount>0">
                            <ul>
                                <li v-for="(item,index) of cartList" :key="index">
                                    <div class="font12">
                                        <router-link to="">  
                                            <img :src="imgUrl+item.pic" alt="">
                                        </router-link>
                                        <div>
                                            <router-link :to="`/Details/${item.pid}`"  class="font12 changeRed" v-text="item.title"></router-link><br>   
                                            <span v-show="item.color">礼物颜色：{{item.color}}</span><br>
                                            <span>个性定制：{{item.spec}}</span>
                                        </div>
                                    </div>
                                    <p>
                                    <span>X{{item.count}}</span> <br>
                                    <span>¥{{item.price | priceFilter}}</span> <br>
                                    <a href="javascript:;"  class="font12 changeRed" @click.prevent="delProduct(index)">删除</a>
                                    </p>

                                </li>
                            </ul>
                            <div class="banlance">
                                <span class="total_left">
                                    共计{{cartList.length}}件商品
                                    <br>
                                    <span>
                                        <b>合计：</b>
                                        <span class="c-d93732">¥{{total | priceFilter}}</span>
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
import {mapGetters,mapActions} from 'vuex'
export default {
    data(){
        return {
           kw:" ",
           cartList:[],
        //    cartCount:0,
           imgUrl:"http://127.0.0.1:5050/"
        }
    },
    methods:{
        ...mapActions(["userLogout","cartInit","del"]),
        search(){
            console.log(typeof this.kw);
            this.$router.push("/Products/"+this.kw);
            // this.$emit("kwHandle",this.kw);
        },
        logout(){
            this.userLogout();
            console.log(this.getIsLogin);
        },
        // 删除商品
        delProduct(i){
            console.log("删除商品"+i);
            this.del({cid:this.cartList[i].cid,i});
        }
    },
    created(){
        
        (async ()=>{
            // 购物车数据初始化
            await this.cartInit();
            this.kw=this.$route.params.kw || " ";
            this.cartList=this.getCartList;
            console.log(this.getCount);
        })();
    },
    watch:{
        $route(){
           this.kw=this.$route.params.kw; 
        },
    },
    computed:{
        ...mapGetters(["getIsLogin","getuserInfo","getCartList","getCount"]),
        total(){
            return this.cartList.reduce((prev,value)=>{
                prev+=value.price*value.count;
                return prev;
            },0);
        }
    }
}
</script>
<style>
    @import url(../assets/css/header.css);
</style>

