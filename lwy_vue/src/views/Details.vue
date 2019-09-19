<template>
    <div>
        <my-header></my-header>
        <div id="page_detail">
            <bread breadName="BeeFo小唱机"></bread>
            <div class="goods_info">
                <div class="center w1200 d-flex">
                    <div class="images d-flex">
                        <!-- 小图 -->
                        <ul class="d-flex">
                            <li v-for="(item,index) of pics" :key="index" >
                                <img :src="imgUrl+item.sm" alt=""  :class="imgClasses[index]?'borderRed':''" @mouseover="changeImg(index)">
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
                                <router-link :to="/Details/+item.pid" v-for="(item,index) of specs" :key="index" class="block option" :class="item.pid==pid?'optionSelected':''"  v-text="item.spec"></router-link>
                            </div>
                            <div class="colors" @click="changeColor">
                                <p>
                                  <span class="block color666">礼物颜色:</span>  
                                </p>
                                <router-link to="" v-for="(item,index) of pics" :key="index"  :data-ci="index" class="block option" :class="selectColors[index]==1?'colorSelected':''" v-text="item.color"></router-link>
                            </div>
                        </div>
                        <div class="buy">
                            <router-link to="" >立即购买</router-link>
                            <a href="javascript:;" class="sc" @click="bgImgHandle">
                                <i :class="bgImg"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="detailNav" class="details_nav">
                <div class="w-1200">
                    <ul class="w-1200 d-flex" @click="changeRed">
                        <li>
                           <a href="javascript:;" :class="textRed[0]" data-i="0">礼物详情</a> 
                        </li>
                        <li>
                            <a href="javascript:;" :class="textRed[1]"  data-i="1">规格参数</a> 
                        </li>
                        <li>
                            <a href="javascript:;" :class="textRed[2]"  data-i="2">视频晒单(5)</a> 
                        </li>
                        <li>
                            <a href="javascript:;" :class="textRed[3]"  data-i="3">咨询(5)</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="detailContent">
                <img v-for="(item,index) of detailsImages" :key="index" :src="item" alt="">
            </div>
            <div id="detailParams"></div>
            <div id="detailComment"></div>
            <div id="detailRequest"></div>
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
            // 控制每张小图片鼠标滑过的样式
            imgClasses:[],
            // 判断是选中的哪一张小图片
            i:0,
            // 判断选中的颜色
            selectColors:[],
            // 控制详情的导航部分文字变红
            textRed:[{active:false},{active:false},{active:false},{active:false}],
            // 礼物详情的模拟数据
            detailsImages:["../../../../public/images/detail/1.jpg","../../../public/images/detail/2.jpg","../../../public/images/detail/3.jpg","../../../public/images/detail/4.jpg","../../../public/images/detail/5.jpg","../../../public/images/detail/5.jpg","../../../public/images/detail/6.jpg"],
            navOffsetTop:0
        }
    },
    props:{pid:{default:0}},
    created(){
        console.log(this.pid);
        this.loadMore();    
        // this.navOffsetTop=this.getElementToPageTop(document.getElementById('detailNav'));
        // console.log(this.navOffsetTop);
    },
    methods:{
        
        scroll(t){
          console.log(t);  
        },
        changeRed(e){
            if(e.target.nodeName=="A"){
                var id=e.target.dataset.i;
               for(var t=0;t<this.textRed.length;t++){
                   if(t==id){
                       this.textRed[t].active=true;
                   }else{
                       this.textRed[t].active=false;
                   }
               }
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
                for(var i=0;i<this.pics.length;i++){
                    if(i==0){
                        this.$set(this.imgClasses,i,1);
                    }else{
                        this.$set(this.imgClasses,i,0);
                    }
                    this.$set(this.selectColors,i,0);
                }
                this.specs=obj.specs;
                // console.log(this.product,this.pics,this.specs);
                console.log(this.pics);
            })();
        },
        //选择颜色事件
        changeColor(e){
            if(e.target.nodeName=="A"){
                for (var c=0;c<this.selectColors.length;c++) {
                    this.$set(this.selectColors,c,0);
                }
                var ci=e.target.dataset.ci;
                this.$set(this.selectColors,ci,1);
                console.log(this.selectColors);
                // 对应的选中相应颜色的小图片与大图片
                this.changeImg(ci);
            }
        },
        // 鼠标移到哪个小图片 哪个小图片就加上红色边框 并且切换对应的大图片
        changeImg(i){
            // 其他小图片去掉红色边框
            for(var j=0;j<this.imgClasses.length;j++){
                this.imgClasses[j]=0;
            }
            // 当前的小图片加边框
            this.imgClasses[i]=1;
            // 切换大图片
            this.i=i; 

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
    }

}
</script>
<style scoped>
    @import url(../assets/css/details.css);
</style>
