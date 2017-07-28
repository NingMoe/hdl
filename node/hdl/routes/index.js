/**
 * Created by Administrator on 2017/7/19 0019.
 */
var express = require('express');
var router = express.Router();
var HOST='';
var fs=require("fs")
router.use(function(req, res, next){

    //console.log(req.headers);
    HOST='http://'+req.headers.host+'/';
    next();
})
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("index",{
        host:HOST
    })
});


module.exports = router;
