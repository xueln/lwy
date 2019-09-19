var express=require('express');
// 引入pool
var pool=require('../pool.js');
// 创建路由
var userRouter=express.Router();
// 用户注册接口 resful规则(post) 
userRouter.post('/v1/reg',(req,res)=>{
    var obj=req.body;
    console.log(obj);
    var sql='insert into lwy_user(iphone,upwd) values(?,?)';
    pool.query(sql,[obj.iphone,obj.upwd],function(err,result){
        if(err){
            throw err;
        }
        if(result.affectedRows>0){
            res.send({code:200,msg:'reg succed'});  
        }else{
            res.send({code:401,msg:'reg fail'});  
        }
    });
});
// 查询用户
userRouter.post('/getUser',(req,res)=>{
    var obj=req.body;
    var sql;
    // 注册时的手机号是否被注册验证
    if(!obj.upwd){
        sql="select uid from lwy_user where iphone=?";
        pool.query(sql,[obj.iphone],(err,result)=>{
            if(err) throw err;
            if(result.length>0){
                res.send({code:-1,msg:"手机号已被注册"});
            }else{
                res.send({code:1,msg:"手机号未注册"});
            }
        });
    }else{
        //登录接口
        sql="select uid from lwy_user where iphone=? and upwd=?";
        pool.query(sql,[obj.iphone,obj.upwd],(err,result)=>{
            if(err) throw err;
            if(result.length>0){
                res.send({code:1,msg:"用户密码正确"});
                console.log(req.session);
                // 保存session信息
                req.session.uid=result[0].uid;
                console.log(req.session);
                
            }else{
                res.send({code:-1,msg:"用户名或密码错误"});
            }
        });
    }
    
});
// 收藏 判断是否登录 登录后才能收藏
userRouter.get("/isLogin",(req,res)=>{
    if(!req.session.uid){
        res.send({code:-1,msg:"请先登录"});
        return;
    }else{
        res.send({code:1,msg:"已经登录"});
    }
});
// 导出userRouter对象
module.exports=userRouter;