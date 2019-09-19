var express=require('express');
// 引入pool
var pool=require('../pool.js');
// 创建路由
var indexRouter=express.Router();
// 轮播图接口
indexRouter.get('/carousel',function(req,res){
    var sql='select img,pro_id  from lwy_index_carousel';
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        console.log(result);
        res.send({code:1,msg:result});
    });
});
// 导出userRouter对象
module.exports=indexRouter;