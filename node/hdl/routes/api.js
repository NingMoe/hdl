/**
 * Created by Administrator on 2017/7/19 0019.
 */
var express = require('express');
var router = express.Router();
var DB = require('../model/db');
var bodyParser = require('body-parser');
var md5 = require('md5');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
var session = require('express-session');
var async = require('async')
var cookie=require('cookie-parser')
var app = express()
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
// app.use(express.cookieParser('likeshan')); 
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
router.get("/product", function (req, res) {
    DB.Find("product", {}, function (err, data) {
        res.json(data)
    })
})
router.get("/store", function (req, res) {
    var page = req.query.page
    page = page * 5
    console.log(page)
    DB.findMore("shop", {}, page, 5, function (err, data) {
        res.json(data)
    })
})
router.get("/storeorder", function (req, res) {
    var page = req.query.page
    page = page * 20
    DB.findMore("shop", {}, page, 20, function (err, data) {
        res.json(data)
    })
})
router.get("/ticket", function (req, res) {
    DB.FindId("shop", req.query.id, function (err, data) {

        res.json(data)
    })
})
router.get("/storedetail", function (req, res) {
    DB.FindId("shop", req.query.id, function (err, data) {

        res.json(data)
    })
})
router.post("/addticket", function (req, res) {

    DB.Insert("order", req.body, function (err, data) {
        if (err) {
            res.json({ "result": 0 })

        } else {
            res.json({ "result": 1 })
        }

    })
})
router.get("/goods", function (req, res) {
    async.parallel({
        name: function (cb) {
            DB.Find("cate", {}, function (err, data) {

                cb(null,data)
            })
        },
        goods:function(cb){
             DB.Find("product", {}, function (err, data) {

                cb(null,data)
            })
        }
    },function(err,data){
        // console.log(data.goods.length);
        // for(var j=0;j<data.name.length;j++){
        //      data.name[j].goods=[]
        //     for(var i=0;i<data.goods.length;i++){
        //         if(data.goods[i].cid==data.name[j].name){
        //             data.name[j].goods.push(data.goods[i])
        //         }
           
        // }
        // }
        //  console.log(data.name);
        res.json(data)
        console.log(data);
    })

})
router.post("/buy", function (req, res) {
console.log(req.body)
    DB.Insert("user", req.body, function (err, data) {
        if (err) {
            res.json({ "result": 0 })

        } else {
            res.json({ "result": 1 })
        }

    })
})


router.get("/code",function(req,res){
   
     var codes=[];
 //数字:48-57;unicode编码
 for(var i=48;i<57;codes.push(i),i++);
 /*console.log(codes);*/
//大写字母:65-90;unicode编码
for(var i=65;i<90;codes.push(i),i++);
//小写字母:97-122;unicode编码
for(var i=97;i<122;codes.push(i),i++);
var arr=[]
for(var i=0;i<codes.length;i++){
   arr.push(String.fromCharCode(codes[i]))
}
var str=""
for(var i=0;i<6;i++){
str+=arr[parseInt(Math.random()*arr.length)]
// console.log(arr[parseInt(Math.random()*arr.length)]);
}
// req.session.user=1;
res.json(str);
//   console.log();
if(req.session==undefined){
    // req.session.user=1;
}
})
router.post("/code",function(req,res){
    // var str=req.body.yzm;
  
})
module.exports = router;
