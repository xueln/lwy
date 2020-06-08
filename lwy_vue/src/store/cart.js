import axios from 'axios';
import apis from './api';
import QS from 'qs'
export default{
    state:{
        cartList:[],
        // [cid:false] 关联数组
        checkStatus: []
        // 数量也在本地存一份
    },
    getters:{
        getCartList(state){        
            return state.cartList;
        },
        // 购物车商品总数量
        getCount(state){
            return state.cartList.reduce((prev,v)=>{
                return prev+parseInt(v.count);
            },0);
        },
        getCheckStatus(state){
            return state.checkStatus;
        },
        getIsAllCheck(state){
            var sum=0,trueC=0;
            // var checks=this.getters.getCheckStatus();
            for (const c in state.checkStatus) {
                sum++;
                if (state.checkStatus[c]==true) {
                    trueC++;
                }
            }
            return sum==trueC;
        },
        getSelectCount(state){
            var c=0;
            for (const key in state.checkStatus) {
                if (state.checkStatus[key]==true) {
                   state.cartList.forEach(e=>{
                       if(e.cid==key){
                           c+=e.count;
                       }
                   }) 
                }
            }
            return c;
        },
        getSelectTotal(state){
            var total=0;
            for (const key in state.checkStatus) {
                if (state.checkStatus[key]==true) {
                   state.cartList.forEach(e=>{
                       if(e.cid==key){
                           total+=e.price*e.count;
                       }
                   }) 
                }
            }
            return total;
        }
    },
    mutations:{
        // state.chosenList中有商品的checked发生改变
        updateChecked(state,obj){
            for (const c in state.checkStatus) {
                if(c==obj.cid){
                    state.checkStatus[c]=obj.checked;   
                }
            }
            localStorage.setItem("chosenList",JSON.stringify(state.chosenList));
        },
        // 删除取消勾选的商品
        delChecked(state,cid){
            state.chosenList=state.chosenList.filter(e=>{e.cid!=cid});
            // 将更改存到localStorage中
            localStorage.setItem("chosenList",JSON.stringify(state.chosenList));
        },
        // 增加商品
        addCartList(state,product){
            // 更新到state中  没有商品数据，直接加入，否则遍历比对，相同的商品count+1
            var arr=apis.compareAdd(state.cartList,product);
            state.cartList=arr;          
            //  判断是否需要更新到localStorage中
            if(!this.getters.getIsLogin){
                localStorage.setItem("cartlist",JSON.stringify(arr));
            }
        },
        // 修改
        setCartList(state,obj){
            console.log("修改前"+state.cartList);
            state.cartList.forEach(ele=>{
                if(ele.cid==obj.cid){
                    ele.count=obj.count;   
                }
            });
            console.log("修改后"+state.cartList);
            // 判断是否需要更新到localStorage中
            if(!this.getters.getIsLogin){
                localStorage.setItem("cartlist",JSON.stringify(state.cartList));
            }
        }, 
        // 删除
        delProduct(state,cid){
            state.cartList.forEach((e,i,arr)=>{
                if(e.cid==cid){
                    arr.splice(i,1);
                }
            });         
            // 判断是否需要更新到localStorage中
            if(!this.getters.getIsLogin){
                localStorage.setItem("cartlist",JSON.stringify(state.cartList));
            }
        },
        setAllCheck(state,bool){
            state.checkStatus=state.checkStatus.map(e=>bool);
            localStorage.setItem("checkStatus",JSON.stringify(state.checkStatus));
        },
        // 
        changeStatus(state,cid){
            var temp=state.checkStatus.map(e=>e);
            for (const key in temp) {
                if (key==cid) {
                    temp[cid]=!temp[cid];
                }
            }
            state.checkStatus=temp;
            localStorage.setItem("checkStatus",JSON.stringify(temp));
        },
        delStatus(state,cid){
            var temp=state.checkStatus.map(e=>e);
            for (const key in temp) {
                if (key==cid) {
                    delete temp[key];  
                }
            }
            state.checkStatus=temp;
            localStorage.setItem("checkStatus",JSON.stringify(temp));
        }
    },
    actions:{
        // 初始化state
        async cartInit(context){
            // 判断是否是登录状态 如果localStorage中有数据，合并
            // console.log(this.getters.getIsLogin);
            if(this.getters.getIsLogin){
                // 登录状态
                console.log("购物车登录状态");
                // 将localStorage中的数据添加到数据库中
                var list=JSON.parse(localStorage.getItem("cartlist")) || [];
                console.log(list.length);
                if(list.length>0){
                    console.log('localStorage中有数据');
                    list=list.map(ele => {
                        return (axios.get('cart/addCart',{
                            params:ele
                        }));
                    });
                    await Promise.all(list).then((arr)=>{
                        arr.forEach(ele=>{
                            console.log(ele.data.code);
                        });
                        if(arr.every(ele=>ele.data.code==1)){
                            // 插入成功 清除localStorage
                            localStorage.removeItem("cartlist");
                            console.log("全部合并成功");
                        }
                    })
                }
                // 本地无数据 直接从数据库中获取
                var res= await axios.get("cart/getCart");
                context.state.cartList=res.data;
                console.log("state.cartList",context.state.cartList);
                return;
            }
                // 非登录状态 从webStorage中取
            context.state.cartList=JSON.parse(localStorage.getItem("cartlist")) || [];
            // console.log("state.count",context.getters.getCount); 
        },
        // 购物车增加商品
        async addCart(context,product){
            // 判断是否是登录状态
            if(this.getters.getIsLogin){
                //加入数据库
                var res= await axios.get('cart/addCart',{
                    params:product
                });
                // if(res.data.code==1){
                    // 添加成功
                    // }
            }   
            // 将商品信息更新到state中
            context.commit("addCartList",product);
          
        },
        // 修改某个购物车商品
        async changeCart(context,obj){
            // 判断是否是登录状态
            if(this.getters.getIsLogin){
                // 更新数据库购物车表
                var res=await axios.get("cart/updateCart",{params:obj});
                if(res.data.code==1){
                    console.log("商品修改成功");
                }
            }
            context.commit("setCartList",obj);
        },
        // 删除某个商品
        async del(context,obj){
            // 判断是否是登录状态
            if(this.getters.getIsLogin){
                // 更新数据库购物车表
                console.log("即将删除");
                var res=await axios.get("cart/delete",{params:{cid:obj.cid}});
                if(res.data.code==1){
                    console.log("商品删除成功");
                }
            }
            context.commit("delProduct",obj.cid);
            context.commit("delStatus",obj.cid);
        },
        // 购物车勾选状态初始化
        checkedInit({state,commit}){
            var temp=[];
                for (const p of state.cartList) {
                    temp[p.cid]=true;
                }
            if(localStorage.getItem("checkStatus")!==null){
                var checkStatus=JSON.parse(localStorage.getItem("checkStatus"));
                for (const c in checkStatus) {
                    if(checkStatus[c]==false && (temp[c]!==undefined)){
                        temp[c]=false;
                    }
                }
                
            }
            state.checkStatus=temp;
        },
        
    }
}