var express=require('express');
// 引入pool
var pool=require('../pool.js');
// 创建路由
var cartRouter=express.Router();
// 添加购物车
cartRouter.get("/addCart",(req,res)=>{
    var pid=req.query.pid;
    var pic=req.query.pic;
    var title=req.query.title;
    var spec=req.query.spec;
    var price=req.query.price;
    var is_spot=req.query['is_spot'];
    var count=req.query.count;
    var color=req.query.color;
    var uid=req.session.uid;
    // 查看购物车表中是否有这个商品
    var sql='select cid form lwy_shopping_cart where user_id=? && product_id=? && color=?'; 
    pool.query(sql,[uid,pid,color],(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            // 说明购物车中已有这件商品 将商品数量增加
            var sql1='update lwy_shopping_cart set count=? where user_id=? && product_id=? && color=?';
            pool.query(sql1,[count,uid,pid,color],(err,result)=>{
                if(err)throw err;
                if(result.affectedRows>0){
                    res.send({code:1,msg:'商品添加成功'});
                }else{
                    res.send({code:-1,msg:'商品添加失败'});
                }
            });
        }else{
            // 添加商品
            var sql2='insert into lwy_shopping_cart values(?,?,?,?,?,?,?,?,?,?)';
            pool.query(sql1,[null,uid,pid,pic,title,spec,price,is_spot,count,color],(err,result)=>{
                if(err)throw err;
                if(result.affectedRows>0){
                    res.send({code:1,msg:'商品添加成功'});
                }else{
                    res.send({code:-1,msg:'商品添加失败'});
                }
            });
        }
    });  
});
// 查询购物车数据
cartRouter.get("/getCart",(req,res)=>{
    pool.query('select * from lwy_shopping_cart',(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

// 导出cartRouter对象
module.exports=cartRouter;