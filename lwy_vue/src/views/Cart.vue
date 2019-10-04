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
        <!-- 购物车中没有商品时显示 -->
        <div v-if="!list.length" class="cartEmpty w1200 bg_fff">
            <p>购物车中没有礼物</p>
            <p>
                <router-link class="changeRed" to="">继续购物</router-link>
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
                <li>操作</li>
            </ul>
            <ul class="detail">
                <li @click="dele" v-for="(item,index) of list" :key="index" class="d-flex">
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
                        <div>
                            <a href="javascript:;" @click="countChange(-1,index)"></a>
                            <input type="text" v-model="item.count">
                            <a href="javascript:;" @click="countChange(1,index)"></a>
                        </div> 
                    </div>
                    <div v-text="item['is_spot']?'有库存':'无库存'"></div>
                    <div>¥{{item.price*item.count | priceFilter}}</div>
                    <div>
                        <a href="javascript:;" data-i="index" id="del"></a>
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
                    <span class="font16" v-text="`共${list.length}件商品`"></span>
                    <span class="font16">合计：
                        <b>¥ {{total | priceFilter}}</b>
                    </span>
                    <router-link to="" class="changeRed font16">去结算</router-link>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[],
            imgUrl:'http://127.0.0.1:5050/',
            pcount:0,
            LoginState:false
        }
    },
    methods:{
        // 删除当前商品
        dele(e){
            if(e.target.nodeName=="A" && e.target.id=="del"){
                var i=e.target.dataset.i;
                this.list.splice(i,1);
                let products=JSON.parse(localStorage.getItem("cartProducts"));
                products.splice(i,1);
                localStorage.setItem("cartProducts",JSON.stringify(products));
            }
        },
        // 购物车数量单击按钮事件
        countChange(val,i){
            if(val==-1){
                if(this.list[i].count==1){
                    return;
                }
                this.list[i].count-=1;
            }else if(val==1){
                this.list[i].count+=1;
            }
            // 将变化的数量保存到localstorage中
            let products=JSON.parse(localStorage.getItem("cartProducts"));
            products[i].count=this.list[i].count;
            localStorage.setItem("cartProducts",JSON.stringify(products));
        },
        // 判断是否登录
        isLogin(){
            (async ()=>{
                var res=await this.axios.get('user/isLogin');
                if(res.data.code==-1){
                    console.log('未登录');
                    this.LoginState=true;
                }else{
                    console.log('已登录');
                    this.LoginState=false;
                }
            })();
        },
        loadMore(){
            this.isLogin();
            // 未登录 读取浏览器存储的数据
            if(!this.LoginState){
                this.list=this.$store.getters.getstorageCart;
                console.log(this.list);
            }else{
                // 如果用户登录状态 浏览器中有商品数据 则将其逐个添加到数据库中
                var localList=this.$store.getters.getstorageCart;
                if(localList){
                    var addCartList=[];
                    for (const p of localList) {
                        addCartList.push(
                           this.axios.get('cart/addCart',{
                            params:{
                                pid:p.pid,
                                pic:p.sm,
                                title:p.title,
                                spec:p.spec,
                                price:p.price,
                                is_spot:p['is_spot'],
                                color:p.color,
                                count:p.count
                            }
                        }) 
                        );
                    }
                    Promise.all(addCartList).then(arr=>{
                        var result=arr.every((ele)=>{
                            if(ele==1){
                                return true;
                            }
                        });
                        console.log(result);
                    }); 
                }
            }
        }
    },
    created(){
        // 用户是否登录？登录状态查询当前浏览器中cartProducts是否有信息？
        // 浏览器端有存储信息 将存储信息中的
        this.loadMore();
        console.log("购物车");

    },
    computed:{
        total(){
            return this.list.reduce((prev,value)=>{
                prev+=value.price*value.count;
                return prev;
            },0);
        }
    }
}
</script>
<style>
    @import url(../assets/css/cart.css);
</style>

