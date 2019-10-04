<template>
    <div>
        <my-header></my-header>
        <div id="page_detail">
            <bread :breadName="['BeeFo小唱机']"></bread>
            <div class="goods_info">
                <div class="center w1200 d-flex">
                    <div class="images d-flex">
                        <!-- 小图 -->
                        <ul class="d-flex" @mouseover="changeImg">
                            <li v-for="(item,index) of pics" :key="index" >
                                <img :src="imgUrl+item.sm" alt=""  :class="i==index?'borderRed':''" :data-i="index">
                            </li>
                        </ul>
                        <!-- 中图 -->
                        <div class="mdImg relative">
                            <img :src="imgUrl+pics[i].md" alt="">
                            <div v-show="enter" class="smMask"></div>
                            <div class="Mask" @mouseover="enter=!enter" @mouseout="enter=!enter"></div>
                        </div>
                    </div>
                    <div class="goods_attr">
                        <h2 v-text="product.title"></h2>
                        <h3 class="subtitle" v-text="product.subtitle"></h3>
                        <div class="good_price d-flex">
                            <span>{{product.price.toFixed(2)}}元</span>
                            <span class="color666" v-text="pics[i].is_spot?'有现货':'暂时缺货'"></span>
                        </div>
                        <div class="specs">
                            <div>
                                <span class="block color666">选择规格:</span>
                                <!-- 规格与浏览器中参数id值一致时 说明是选中状态 -->
                                <router-link @click.native="specClick(index)" :to="/Details/+item.pid" v-for="(item,index) of specs" :key="index" class="block option" :class="item.pid==pid?'optionSelected':''"  v-text="item.spec"></router-link>
                            </div>
                            <div class="colors" @click="changeColor">
                                <p>
                                  <span class="block color666">礼物颜色:</span>  
                                </p>
                                <router-link to="" v-for="(item,index) of pics" :key="index"  :data-ci="index" class="block option" :class="colorIndex==index?'colorSelected':''" v-text="item.color"></router-link>
                            </div>
                        </div>
                        <div class="buy">
                            <router-link to="" @click.native="goCart">立即购买</router-link>
                            <a href="javascript:;" class="sc" @click="bgImgHandle">
                                <i :class="bgImg"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="detailNav" :class="scrollTop>navOffsetTop && navOffsetTop!=0?'fixed':''" class="details_nav">
                <div class="w1200">
                    <ul class="w1200 d-flex"  @click="toOwn">
                        <li>
                           <a href="javascript:;" data-id="detailContent" :class="detailNavIndex==0?'active':''" data-i="0">礼物详情</a> 
                        </li>
                        <li>
                            <a data-id="detail_params" href="javascript:;" :class="detailNavIndex==1?'active':''"  data-i="1">规格参数</a> 
                        </li>
                        <li>
                            <a href="javascript:;" :class="detailNavIndex==2?'active':''"  data-i="2">视频晒单(5)</a> 
                        </li>
                        <li>
                            <a href="javascript:;" :class="detailNavIndex==3?'active':''"  data-i="3">咨询(5)</a>
                        </li>
                    </ul>
                    <div class="service" v-show="scrollTop>navOffsetTop|| navOffsetTop==0">
                        <span>需要帮助？</span>
                        <router-link to="">QQ在线交谈</router-link>
                    </div>
                </div>
            </div>
            <div class="bg_f5f5f5" style="height:20px"></div>
            <div class="bg_f5f5f5" id="detailContent">
                <div class=" w1200 bg_fff">
                    <img v-for="(item,index) of detailsImages" :key="index" :src="item" alt="">
                </div>
                <div id="detail_params">规格参数</div>
                <div class="detailP_details w1200"></div>
                <div id="detailParams">
                </div>
                <div id="detailComment"></div>
                <div id="detailRequest"></div>
                <!-- 猜你喜欢 -->
                <div id="guess_title">猜你喜欢</div>
                <div class="guessULike w1200">
                    <ul :class="guessClass" :style="{'margin-left':-243*times+'px',width:guessList.length*228+(guessList.length-1)*15+'px'}">
                        <li v-for="(item,index) of guessList" :key="index">
                            <img :src="imgUrl+guessList[index]" alt="">
                            <p>魔法小唱机</p>
                            <p>¥399.0</p>
                        </li>
                    </ul>
                    <!-- 备用ul -->
                    <ul :class="guessClass" :style="{width:guessList.length*228+(guessList.length-1)*15+'px'}">
                        <li v-for="(item,index) of guessList" :key="index">
                            <img :src="imgUrl+guessList[index]" alt="">
                            <p>魔法小唱机</p>
                            <p>¥399.0</p>
                        </li>
                    </ul>
                </div>
                <!-- 指示器 -->
                <div class="directors" @mouseover="scrollDire" @mouseout="startScroll">
                    <a href="javacsript:;" v-for="i of guessList.length%5+1" :key="i" :data-i="i-1" :class="i-1==times ||(i==guessList.length%5 && times>3)?'borderRed':''"></a>
                </div>
            </div>
            <!-- 子组件将scrollTop传给父组件 -->
            <tool-bars @scroll="scroll"></tool-bars>   
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
export default {
    data(){
        return{
            enter:false,
            bgImg:{
               bgImgClass:false 
            },
            product:{price:0},
            pics:[{md:'img/detail/md1.jpg',sm:'img/detail/sm1.jpg',lg:'img/detail/lg1.jpg'}],
            specs:[] ,
            imgUrl:"http://127.0.0.1:5050/",
            // 判断是选中的哪一张小图片
            i:0,
            // 选中的规格
            specIndex:0,
            // 判断选中的颜色
            colorIndex:-1,
            // 详情的导航部分 判断点击的是哪个部分
            detailNavIndex:0,
            // 礼物详情的模拟数据
            detailsImages:["http://127.0.0.1:5050/img/detail/1.jpg","http://127.0.0.1:5050/img/detail/2.jpg","http://127.0.0.1:5050/img/detail/3.jpg","http://127.0.0.1:5050/img/detail/4.jpg","http://127.0.0.1:5050/img/detail/5.jpg","http://127.0.0.1:5050/img/detail/5.jpg","http://127.0.0.1:5050/img/detail/6.jpg"],
            navOffsetTop:0,
            scrollTop:0,
            // 猜你喜欢的模拟图片数据
            guessList:["img/detail/guessULike/1.jpg","img/detail/guessULike/2.jpg","img/detail/guessULike/3.jpg","img/detail/guessULike/5.jpg","img/detail/guessULike/2.jpg","img/detail/guessULike/3.jpg","img/detail/guessULike/5.jpg","img/detail/guessULike/2.jpg"],
            times:0,
            times2:0,
            guessClass:{transition:true},
            // 定时器timer
            timer:0
        }
    },
    props:{pid:{default:0}},
    created(){
        // console.log(this.pid);
        this.loadMore();    
        this.guessScroll();
    },
    mounted(){
        // 获取礼物详情 规格参数....导航栏距离页面顶部的距离
        this.navOffsetTop=document.getElementById("detailNav").offsetTop;
        // this.navOffsetTop=top;
        // console.log('距离顶部距离'+this.navOffsetTop);
        // 控制轮播指示器 鼠标滑过边框变红的样式数组初始化
    },
    methods:{
        // 点击立即购买 将商品添加到购物车 并跳转到购物车
        goCart(){
            if(this.colorIndex==-1){
                alert("请选择规格！！！");
                return;
            }
        // 判断用户是否是登录状态
        (async ()=>{  
            var cartProduct={
                pid:this.product.pid,
                pic:this.pics[this.colorIndex].sm,
                title:this.product.title,
                spec:this.specs[this.specIndex].spec,
                price:this.product.price,
                is_spot:this.pics[this.colorIndex]['is_spot'],
                color:this.pics[this.colorIndex].color,
                count:1
            }; 
            var res=await this.axios.get('user/isLogin');  
            if(res.data.code==-1){
                //  若未登录 将购物车信息保存到客户端
                console.log("未登录"+res.data.code);
                let k=0;
                let products=JSON.parse(localStorage.getItem("cartProducts"));
                // 如果浏览器端没有存储的商品数据 不进行遍历 直接将数据放进去
                if(!products){
                    products=[];
                    products.push(cartProduct);
                    localStorage.setItem("cartProducts",JSON.stringify(products));
                    return;
                }
                for (const p of products) {
                    // 查看是否已经有此商品
                   if(p.pid==cartProduct.pid  && p.color==cartProduct.color) {
                       p.count+=1;
                   }else{
                       k+=1;
                   }
                }
                if(k==products.length){
                    products.push(cartProduct);
                }
                localStorage.setItem("cartProducts",JSON.stringify(products));
                console.log(localStorage.getItem("cartProducts"));
            }else{
                console.log("登录"+res.data.code);
                // 将商品信息插入到购物车表
                var addCartRes=await this.axios.get('cart/addCart',{
                    params:cartProduct
                });
                if(addCartRes.data.code==1){
                    console.log("商品添加至购物车");
                }
            }  
            this.$router.push('/Cart');
        })();

        },
        // 鼠标离开 重新开始轮播
        startScroll(e){
             if(e.target.nodeName=="A"){
                 this. guessScroll();
                //  console.log("鼠标离开"+this.times);
             }
        },
        // 鼠标滑过指示器 边框变红 轮播图滑动到响应的页数
        scrollDire(e){
            if(e.target.nodeName=="A"){
                // console.log(e.target.dataset.i);
                var i=e.target.dataset.i;
                // 变为选中的样式
                this.times=i*1;
                clearInterval(this.timer);
            }
        },
        // 猜你喜欢的自动轮播
        guessScroll(){
            this.timer=setInterval(()=>{
                // console.log("times"+this.times);
                this.times+=1;
                this.guessClass.transition=true;
                if(this.times>(this.guessList.length%5+1)){
                    
                }
                if(this.times>this.guessList.length){
                    this.guessClass.transition=false;
                    this.times=0;
                }
            },2000);
        },
        // 滚动到对应的内容
        toOwn(e){
            if(e.target.nodeName=="A"){
                var thisA=e.target;
                // 点击文字变红
                this.detailNavIndex=e.target.dataset.i;
                // 滚动到对应的内容
                var elem=document.getElementById(thisA.dataset.id);
                var dist=this.scrollTop-elem.offsetTop;
                if(thisA.dataset.i==0){
                    if(dist>0){
                        this.scrollToDetail(dist);
                    }
                }else{
                    if(thisA.dataset.i==1){
                        if(this.scrollTop>this.navOffsetTop){
                            dist+=66;
                        }else{
                            dist+=66*2;
                            
                        }      
                        console.log(this.scrollTop+"elem.offsetTop:"+elem.offsetTop+"  滚动的距离"+dist); 
                            this.scrollToDetail(dist);           
                    }
                }
            }
        },
        scrollToDetail(dist){
            // 总距离 dist
            // 总步数
            var steps=50;
            // 总时间
            var dura=500;
            // 每步走多长
            var step= dist/steps;
            // 每步走多长时间
            var interval=dura/steps;
            var timer=setInterval(()=>{
                window.scrollBy(0,-step);
                steps--;
                if(steps==0){
                    clearInterval(timer);
                }
            });
        },
        scroll(t){
            // 从子组件中传过来的值
          this.scrollTop=t; 
          console.log("scrollTop"+this.scrollTop); 
        //   console.log('距离顶部距离'+this.navOffsetTop);
            // 如果页面滚动到礼物详情内容区域 相应的导航字变红
            if(this.scrollTop>=837 && this.scrollTop<9408){
            this.detailNavIndex=0;  
            }else if(this.scrollTop>=9408 && this.scrollTop<9676){
                // 如果页面滚动到规格参数内容区域 相应的导航字变红
                this.detailNavIndex=1;
            }else{
                this.detailNavIndex=3;
            }
            
        },
        loadMore(){
            (async ()=>{
                var res=await this.axios.get('detail/getPro',{
                    params:{
                        pid:this.pid
                    }
                });
                // console.log(res.data);
                var obj=res.data;
                // this.product=obj.product;
                for (const p in obj.product) {
                // this.$set相当于手动去将this.product处理成一个响应式的属性
                this.$set(this.product,p,obj.product[p]);
                }
                this.pics=obj.pics;
                this.specs=obj.specs;
                // console.log(this.product,this.pics,this.specs);
                console.log(this.pics);
            })();
        },
        // 选择规格
        specClick(index){
            this.specIndex=index;
        },
        //选择颜色事件
        changeColor(e){
            if(e.target.nodeName=="A"){
                this.colorIndex=e.target.dataset.ci;
                // 对应的选中相应颜色的小图片与大图片
                this.i=this.colorIndex;
            }
        },
        // 鼠标移到哪个小图片 哪个小图片就加上红色边框 并且切换对应的大图片
        changeImg(e){
            if(e.target.nodeName=="IMG"){
                var i=e.target.dataset.i;
                //当前选中的是i图片
                 this.i=i; 
            }
            

        },
        bgImgHandle(){
            (async ()=>{
                var res=await this.axios.get('user/isLogin');
                console.log(res.data);
                if(res.data.code==-1){
                    alert("请先登录！登录后才能收藏");
                }else{
                    this.bgImg.bgImgClass=!this.bgImg.bgImgClass; 
                }
            })();
           
        }
    },
    watch:{
        // 一旦浏览器中的地址改变 刷新网页 重新发送ajax请求
        $route(){
            this.loadMore();
        }
    },
    computed:{
        
    }

}
</script>
<style scoped>
    @import url(../assets/css/details.css);
</style>
