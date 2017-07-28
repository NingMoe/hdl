/**
 * Created by Administrator on 2017/7/19 0019.
 */
var express = require('express');
var router = express.Router();
var DB=require('../../model/db.js');
var async = require('async')
var HOST='';
var multiparty=require('multiparty');
var json=require("../../model/product.json")
var fs=require("fs")
router.use(function(req, res, next){

    //console.log(req.headers);
    HOST='http://'+req.headers.host+'/';
    next();
})
router.get("/",function(req,res){

   if(currentPage){
        var currentPage=req.query.page;
    }else{
        var currentPage=1;
    }
    var cur=currentPage*10

    async.parallel({
        num:function(cb){
            DB.Find("shop",{},function(err,data){

                var page=Math.floor(data.length/10)
                cb(null,page)
            })
        },
        datalist:function(cb){
            DB.findMore("shop",{},cur,10,function(err,data){
                cb(null,data)
            })
        }
    },function(err,data1){
        ;
        res.render("./admin/shop/index",{
            host:HOST,
            data:data1.datalist,
            page:data1.num,
            currentPage:currentPage
        })
    })
    // DB.Find("shop",{},function(err,data){
    //
    //     res.render("./admin/shop/index",{
    //         host:HOST,
    //         data:data
    //     })
    // })
})
router.get("/add",function(req,res){
    res.render("./admin/shop/add",{
        host:HOST
    })
})
router.post("/add",function(req,res){
    // var shoplist=json.resultData.body.result;
    // for(var i=0;i<shoplist.length;i++){
    //     var pic=shoplist[i].headPhoto;
    //     var img=shoplist[i].headPhoto;
    //     var address=shoplist[i].storeAddress;
    //     var name=shoplist[i].storeName;
    //     var tel=shoplist[i].storetel;
    //     var add_time='2017/7/20';
    //     var status=1;
    //     var description="1111"
    //         DB.Insert("shop",{description,tel,add_time,pic,name,address,img,status},function(err,data){
    //
    //         })
    // }
    var form=new multiparty.Form()
    form.uploadDir='./public/upload'
    // 保存图片的路径
    form.parse(req,function(err,fields,files){
        var description=fields.description[0];
        var tel=fields.tel[0];
        var add_time=fields.add_time[0];
        var pic=fields.pic[0];
        var name=fields.name[0];
        var address=fields.address[0];
        var status=fields.status[0];
        // console.log(fields);
        // console.log(files);
        var img="";
        if(files.img[0].originalFilename==""){
            img=pic;
            fs.unlink(files.img[0].path,function(err){
                if(err){
                    console.log(删除失败);
                }
            })
        }else{
            img=files.img[0].path.substr(7,files.img[0].path.length);

        };
        DB.Insert("shop",{description,tel,add_time,pic,name,address,img,status},function(err,data){
            res.redirect("/admin/shop")
        })

    })


})
//删除
router.get("/delete",function(req,res){

    DB.Delete("shop",req.query.id,function(err,data){
        res.redirect("/admin/shop")
    })
})
module.exports = router;