import {Axios as axios} from './axiosConfig.js'
// 获取首页数据
export function getIndex(){
    return new Promise((resolve,reject)=>{
        axios.get('index/carousel').then((res)=>{
            resolve(res.data);
        });
    });
}
export function getProduct(pid){
    return new Promise((resolve,reject)=>{
        axios.get('detail/getPro',{
            params:{
                pid
            }
        }).then((res)=>{
            resolve(res.data);
        });
    });
}
export function getProductList(params){
    return new Promise((resolve,reject)=>{
        axios.get('product/pros',{
            // {pno,kw}
            params
        }).then((res)=>{
            resolve(res.data)
        });
    });
}
export function iphoneLogin({iphone,upwd}){
    return new Promise((resolve,reject)=>{
        axios.post('user/getUser',{
            iphone,upwd
        }).then((res)=>{
            resolve(res.data)
        });
    });
}
export function iphoneReg({iphone,upwd}){
    return new Promise((resolve,reject)=>{
        axios.post('user/v1/reg',{
            iphone,upwd
        }).then((res)=>{
            resolve(res.data)
        });
    });
}
export function userLogout(){
    return new Promise((resolve,reject)=>{
        axios.get("user/logout").then((res)=>{
            resolve(res.data)
        });
    });
}
export function userStore(){
    return new Promise((resolve,reject)=>{
        axios.get("user/myStore").then((res)=>{
            resolve(res.data)
        });
    });
}
export function addToCart(product){
    return new Promise((resolve,reject)=>{
        axios.get('cart/addCart',{
           params:product
        }).then((res)=>{
            resolve(res.data)
        });
    });
}
export function getCart(){
    return new Promise((resolve,reject)=>{
        axios.get("cart/getCart").then((res)=>{
            resolve(res.data)
        });
    });
}
export function updateCart(product){
    return new Promise((resolve,reject)=>{
        axios.get("cart/updateCart",{params:product})
        .then((res)=>{
            resolve(res.data)
        });
    });
}
export function delCartProduct(params){
    // {cid}
    return new Promise((resolve,reject)=>{
        axios.get("cart/delete",{params})
        .then((res)=>{
            resolve(res.data)
        });
    });
}
