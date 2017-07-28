/**
 * Created by Administrator on 2017/7/19 0019.
 */
var express = require('express');
var router = express.Router();
var DB=require('../../model/db.js');
var HOST='';
var multiparty=require('multiparty');
var json=require("../../model/goods.json")
router.use(function(req,res,next){
    HOST='http://'+req.headers.host+"/";
    next();
})
router.get("/",function(req,res){

    DB.Find("cate",{},function(err,data){
        res.render("./admin/cate/index",{
            host:HOST,
            data:data
        })
    })
});
router.get("/add",function(req,res){
    // console.log(json.resultData.body.result.dishCategory);

        res.render("./admin/cate/add",{
            host:HOST
        })

})
router.post("/add",function(req,res){

    // for(var key in json.resultData.body.result.dishCategory){
    //     console.log(json.resultData.body.result.dishCategory[key]);
    //     console.log(key);
    //     var name=json.resultData.body.result.dishCategory[key].dishCategoryName;
    //     var add_time="2017/7/19";
    //     var status=1;
    //     var description="111";
    //     DB.Insert("cate",{name,add_time,status,description},function(){
    //         // res.redirect("/admin/cate")
    //     })
    // }
    DB.Insert("cate",req.body,function(){
        res.redirect("/admin/cate")
    })

})
router.get("/delete",function(req,res){

    DB.Delete("cate",req.query.id,function(err,data){
        res.redirect("/admin/cate")
    })
})
module.exports = router;