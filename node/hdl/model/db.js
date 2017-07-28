/**
 * Created by Administrator on 2017/6/8 0008.
 */
var config=require('./config1.js').config.dbUrl;
var Mongodb=require('mongodb').MongoClient;
var objectId=require('mongodb').ObjectId;
// exports.objectId=new objectId(id);
//创建链接数据库的函数
function _connect(callback){
    Mongodb.connect(config,function(err,db){
        //链接数据库如果成功回调函数返回err和db值
        if(err){
            console.log('数据库链接失败');
            return
        }
        callback(err,db);
    })
}
exports.FindId=function(collectionName,json,callback){
    //先链接数据库
    _connect(function(err,db){
        var result=db.collection(collectionName).find({"_id":new objectId(json)})
        var list=[];
        result.each(function(error,doc){
            if(doc!=null){
                list.push(doc);
            }else{
                db.close();
                callback(error,list)
            }
        })
    })
}
//封装查找函数FindeID只要id就可以不要json
exports.Find=function(collectionName,json,callback){
    //先链接数据库
    _connect(function(err,db){
        var result=db.collection(collectionName).find(json)
        var list=[];
        result.each(function(error,doc){
            if(doc!=null){
                list.push(doc);
            }else{
                db.close();
                callback(error,list)
            }
        })
    })
}

exports.findMore=function (collectionName, json, skipnumber, limit,callback) {



    _connect(function(err,db){


        if(err){ /*数据库连接失败*/

            console.log('数据库连接失败');
            return;
        }


        //var userRel=db.collection(collectionName).find(json);
        var userRel=db.collection(collectionName).find(json).limit(limit).skip(skipnumber);

        var result=[];
        userRel.each(function(err, doc) {

            if(err){
                // res.write("游标遍历错误");
                return;
            }
            if (doc != null) {
                result.push(doc);
            } else {
                //console.log(result);
                //遍历完毕
                db.close();
                callback(err,result)
            }
        });

    })




}
//封装增加函数
exports.Insert=function(collectionName,json,callback){
    _connect(function(err,db){
        db.collection(collectionName).insertOne(json,function(err,result){
            if(err){
                console.log("增加失败");
                return;
            }
            db.close();
            callback(err,result)
        })
    })
}
exports.InsertMore=function(collectionName,json,callback){
    _connect(function(err,db){
        db.collection(collectionName).insertMany(json,function(err,result){
            if(err){
                console.log("增加失败");
                return;
            }
            db.close();
            callback(err,result)
        })
    })
}

//封装改函数
exports.Updata=function(collectionName,id,json,callback){
    _connect(function(err,db){
        db.collection(collectionName).updateOne({"_id":new objectId(id)},json,function(err,result){
            if(err){
                console.log("改写失败");
                return
            }
            db.close();
            callback(err,result);
        })
    })
}

//封装删除函数
exports.Delete=function(collectionName,id,callback){
    _connect(function(err,db){
        db.collection(collectionName).deleteOne({"_id":new objectId(id)},function(err,result){
            if(err){
                console.log('删除失败');
                return;
            }
            db.close();
            callback(err,result)
        })
    })
}

exports.delete=function(collectionName,id,callback){
    _connect(function(err,db){
        db.collection(collectionName).deleteOne(id,function(err,result){
            if(err){
                console.log('删除失败');
                return;
            }
            db.close();
            callback(err,result)
        })
    })
}