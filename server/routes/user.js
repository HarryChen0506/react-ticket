var express = require('express');
var router = express.Router();

let users = require('../models/user.js');

function handle4err(err,res){   
    res.json({
      code: 500,
      msg: err.message||"服务器出错"
    })    
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    //获取cookie
    let { userId } = req.cookies;
    // users.findOne({_id:userId},(err, doc)=>{
    //     if(err){
    //         handle4err(err,res);
    //         return
    //     }
    //     if(doc){
    //         res.json({
    //           code:200,
    //           msg: '用户id正确',
    //           result: doc
    //         })
    //     }else{
    //         res.json({
    //           code:210,
    //           msg: '无该用户id'
    //         })
    //     }
    // })         

});

//注册用户
router.post('/register',function(req, res, next){
    let {user, pwd, type} = req.body;
    users.find({user},(err,doc)=>{
        if(err){
            handle4err(err,res);
            return
        } 
        if(doc.length>0){
            res.json({
              code: 210,
              msg: '该用户名已被注册,请选择其他名字...'
            })
            return
        } 

        let usersModel = new users({user, pwd, type});
        usersModel.save((err, doc)=>{
            if(err){
              handle4err(err,res);
              return
            } 
            if(!doc){
                res.json({
                    code:210,
                    msg: '注册失败'
                })
            }   
            res.cookie('userId', doc._id,{httpOnly: true })
            doc.pwd='';
            res.json({
              code:200,
              msg: '成功',
              result: doc
            })
        })

        // users.create({user,pwd,type},(err,doc)=>{
        //     if(err){
        //       handle4err(err,res);
        //       return
        //     }    
        //     res.json({
        //       code:200,
        //       msg: '成功',
        //       result: doc
        //     })
        // })
    })
    
})
//登录
router.post('/login', function(req, res, next){
    let {user, pwd} = req.body;       
    users.findOne({user,pwd},{pwd: 0},(err, doc)=>{
        if(err){
            handle4err(err,res);
            return
        }   
        if(!doc){
            res.json({
              code: 210,
              msg: '用户名或密码不正确!'
            })
        }else{
            res.cookie('userId',doc._id,{httpOnly: true })
            res.json({
                code: 200,
                result:doc,
                msg: '成功'
            })
        }
    })
})
//注销
router.get('/logout',function(req, res, next){
    res.cookie('userId', '', {expires: new Date(0)});
    res.json({
        code: 200,
        msg: '注销成功'
    })
})
//更新信息
// db.user.update({userName:"jack"},{$set:{userAge:128}})
router.post('/update', function(req, res, next){
    let userId = req.cookies.userId;
    let {avatar,company,desc,salary,title} = req.body;
    if(!userId){
        return res.json({
              code: 210,
              msg: 'userId的cookie不正确'
            })
    }
    users.findOne({_id:userId},(err,doc)=>{
        if(err){
            handle4err(err,res);
            return
        } 
        if(!doc){
            res.json({
                code:210,
                msg: '用户id不正确'
            })
        }  
        let {user, type} = doc;
        let resultData = Object.assign({},{avatar,company,desc,salary,title},{user, type});
        users.update({_id:userId},{$set:{avatar,company,desc,salary,title}},(err, doc)=>{
            if(err){
                handle4err(err,res);
                return
            } 
            if(!doc){
                res.json({
                    code:210,
                    msg: '更新失败'
                })
            }   
            res.json({
                code:200,
                msg: '成功',
                result: resultData
            })
        }) 
    })
      
})


    // chats.remove({},(err,doc)=>{      
    //     if(err){
    //         handle4err(err,res);
    //         return
    //     }
    // })



module.exports = router;

