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
    var count=parseInt(req.query.count);
    var color=req.query.color;
    var uid=req.user.uid;
    console.log(req.query);
    // 查看购物车表中是否有这个商品
    var sql="select cid,count from lwy_shopping_cart where user_id=? and product_id=? and color=?"; 
    pool.query(sql,[uid,pid,color],(err,result)=>{
        if(err)throw err;
        console.log(uid,pid,color);
        console.log(result);
        if(result.length>0){
            console.log('length>0');
            // 说明购物车中已有这件商品 将商品数量增加
            count+=result[0].count;
            var sql1='update lwy_shopping_cart set count=? where user_id=? and product_id=? and color=?';
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
            pool.query(sql2,[null,uid,pid,pic,title,spec,price,is_spot,count,color],(err,result)=>{
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
// 修改商品
cartRouter.get("/updateCart",(req,res)=>{
    var obj=req.query;
    var sql="update lwy_shopping_cart set count=? where cid=?"
    pool.query(sql,[obj.count,obj.cid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'update succ'});
        }
    });
});
// 删除商品
cartRouter.get("/delete",(req,res)=>{
    var cid=req.query.cid;
    console.log(cid);
    var sql="delete from lwy_shopping_cart  where cid=?"
    pool.query(sql,[cid],(err,result)=>{
        if(err) throw err;
        console.log(result);
        if(result.affectedRows>0){
            res.send({code:1,msg:'dele succ'});
        }
    });
});


// 查询购物车数据
cartRouter.get("/getCart",(req,res)=>{
    pool.query('select * from lwy_shopping_cart',(err,result)=>{
        if(err) throw err;
        res.send({code:200,result});
    });
});
// 批量插入数据
// cartRouter.post("/concatCart",(req,res)=>{
//     console.log('合并后端接口');
//     console.log(JSON.parse(req.body.list));
//     var list=JSON.parse(req.body.list);
//     console.log(list.length);
//     for(var i=0;i<list.length;i++){
//         var str='('+req.session.uid+',';
//         for(var j in list[i]){
//             if(typeof list[i][j]=="string"){
//                 str=`${str}'${list[i][j]}',`;
//             }else{
//                 str=str+list[i][j]+',';
//             }
            
//         }
//         list[i]=str.slice(0,-1)+')';
//     }
//     list=list.join();
//     console.log(list);
//     var sql=`insert into lwy_shopping_cart (user_id,product_id,pic,title,spec,price,is_spot,color,count) values ${list}`;
//     console.log(sql)
//     pool.query(sql,(err,result)=>{
//         if(err) throw err;
//         if(result.affectedRows>0){
//             console.log('插入成功');
//             res.send({code:1,msg:'insert succ'});
//         }
        
//     });
    
// });
// 测试接口
// cartRouter.get("/test",(req,res)=>{
//     var kw=req.query.kw;
//     console.log(req.query);
//     var sql="select * from lwy_shopping_cart where color=?";
//     pool.query(sql,[kw],(err,result)=>{
//         if(err) throw err;
//         res.send(result);
//     });
// });
// 导出cartRouter对象
module.exports=cartRouter;