// 引入mysql
var sql=require('mysql');
// 创建连接池
var pool=sql.createPool({
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    passward:'',
    database:'lwy',
    connectionLimit:15
});
// 导出连接池对象
module.exports=pool;
Object.freeze(pool);
