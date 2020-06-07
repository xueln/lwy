export default{
    compareAdd(arr,obj){
        if(arr.length==0){
            arr.push(obj);
        }else{
            var k=0;
            for (const p of arr) {
                // 查看是否已经有此商品
               if(p.pid==obj.pid  && p.color==obj.color) {
                   p.count+=1;
               }else{
                   k+=1;
               }
            }
            if(k==arr.length){
                arr.push(obj);
            }
        }
        return arr; 
    }
}