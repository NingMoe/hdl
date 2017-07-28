/**
 * Created by Administrator on 2017/7/19 0019.
 */
var express = require('express');
var router = express.Router();

var shop= require("./admin/shop");
var book=require ("./admin/book");
var product=require("./admin/product");
var order=require("./admin/order");
var cate=require("./admin/cate");

router.use("/cate",cate);
router.use("/shop",shop);
router.use("/book",book);
router.use("/product",product);
router.use("/order",order);

module.exports = router;