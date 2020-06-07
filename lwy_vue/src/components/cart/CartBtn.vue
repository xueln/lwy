<template>
    <div>
        <a href="javascript:;" @click.prevent="countChange($event,-1)"></a>
        <input type="text" v-model.lazy="pcount">
        <a href="javascript:;" @click.prevent="countChange($event,1)"></a>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    data(){
        return{
            pcount:this.count,
            mycount:this.count
        }
    },
    created(){
        // this.pcount=this.count;
    },
    methods:{
         ...mapActions(["changeCart","del"]),
         countChange(e,val){
            this.mycount+=val;
            console.log(this.pcount);
        },
        
    },
    watch:{
        mycount(){
            var i=parseInt(this.i);
            if(this.mycount<=0){
                // 应该执行删除操作
                console.log("应该执行删除操作");
                this.del({cid:this.list[i].cid,i});
            }else{
               if(this.mycount>=40){
                    this.mycount=40;
                } 
            // 将修改更新到vuex中
            this.changeCart({cid:this.list[i].cid,count:this.mycount,i});
            }
        },
        count(){
            this.pcount=this.count;
        },
        pcount(newv,oldv){
            if(isNaN(parseInt(newv))){
                alert("请输入数字");
                 this.pcount=oldv;
            }
            this.mycount=this.pcount;
        }

    },
    props:["list","i","count"]
}
</script>

<style>

</style>