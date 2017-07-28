/**
 * Created by Administrator on 2017/7/19 0019.
 */
var express = require('express');
var router = express.Router();
var DB=require('../../model/db.js');
var HOST='';
var async = require('async')
router .use('/public',express.static('public'));
var fs=require("fs")
var multiparty=require('multiparty');
var json=require("../../model/goods.json")
router.use(function(req,res,next){
    HOST='http://'+req.headers.host+"/";
    next();
})
router.get("/",function(req,res){
    // var currentPage=req.query.page;
    if(currentPage){
        var currentPage=req.query.page;
    }else{
        var currentPage=1;
    }
    var cur=currentPage*10

    async.parallel({
        num:function(cb){
            DB.Find("product",{},function(err,data){

                var page=Math.floor(data.length/10)
                cb(null,page)
            })
        },
        datalist:function(cb){
            DB.findMore("product",{},cur,10,function(err,data){
                cb(null,data)
            })
        }
    },function(err,data1){
     ;
        res.render("./admin/product/index",{
            host:HOST,
            data:data1.datalist,
            page:data1.num,
            currentPage:currentPage
        })
    })
    // DB.Find("product",{},function(err,data){
    //     res.render("./admin/product/index",{
    //         host:HOST,
    //         data:data
    //     })
    // })
});
router.get("/add",function(req,res){
    // console.log(json.resultData.body.result.dishCategory);

    res.render("./admin/product/add",{
        host:HOST
    })

})
router.post("/add",function(req,res){

    // for(var key in json.resultData.body.result.dishCategory){
    //     // console.log(json.resultData.body.result.dishCategory[key]);
    //     // console.log(key);
    //
    //     var cid=json.resultData.body.result.dishCategory[key].dishCategoryName;
    //     var result=json.resultData.body.result.dishCategory[key].dishVOList;
    //     // console.log(json.resultData.body.result.dishCategory[key]);
    //     for(var i=0;i<result.length;i++){
    //         console.log(result[i]);
    //         var icon=result[i].bigImageAddr;
    //         var name=result[i].dishName;
    //         var price=result[i].unitPrice;
    //         var oldPrice=0;
    //         var description="111";
    //         var status=1;
    //         var add_time='2017/7/19';
    //         DB.Insert("product",{cid,icon,name,price,oldPrice,status,description,status,add_time},function(err,data){
    //
    //         })
    //     }
    //
    //
    //
    // }



    var form=new multiparty.Form()
    form.uploadDir='./public/upload'
    // 保存图片的路径
    form.parse(req,function(err,fields,files){
        var description=fields.description[0];
        var cid=fields.cid[0];
        var add_time=fields.add_time[0];
        var price=fields.price[0];
        var name=fields.name[0];
        var oldPrice=fields.oldPrice[0];
        var icon=fields.icon[0];
        var img="";
        if(files.img[0].originalFilename==""){
            img=icon;
             fs.unlink(files.img[0].path,function(err){
                 if(err){
                     console.log(删除失败);
                 }
             })
        }else{
            img=files.img[0].path.substr(7,files.img[0].path.length);

        };
        DB.Insert("product",{description,cid,add_time,price,name,oldPrice,icon,img},function(err,data){
            res.redirect("/admin/product")
        })

        })


})
router.get("/delete",function(req,res){

    DB.Delete("product",req.query.id,function(err,data){
        res.redirect("/admin/product")
    })
})
router.get("/delete",function(req,res){

    DB.Delete("product",req.query.id,function(err,data){
        res.redirect("/admin/product")
    })
})
module.exports = router;