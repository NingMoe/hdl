/**
 * Created by Administrator on 2017/7/19 0019.
 */
var express = require('express');
var router = express.Router();
var DB=require('../../model/db.js');
var HOST='';
var multiparty=require('multiparty');

router.use(function(req, res, next){

    //console.log(req.headers);
    HOST='http://'+req.headers.host+'/';
    next();
})
router.get("/",function(req,res){
    DB.Find("user",{},function(err,data){

        res.render("./admin/book/index",{
            host:HOST,
            data:data
        })
    })
})
router.get("/add",function(req,res){
    res.render("./admin/book/add",{
        host:HOST
    })
})
router.post("/add",function(req,res){
    DB.Insert("user",req.body,function(err,data){
        res.redirect("/admin/book")
    })
})
//删除
router.get("/delete",function(req,res){

    DB.Delete("user",req.query.id,function(err,data){
        res.redirect("/admin/book")
    })
})
module.exports = router;