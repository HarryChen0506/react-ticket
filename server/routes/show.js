var express = require('express');
var router = express.Router();
var http_service = require('../http_service/service.js');

function handle4err(err,res){   
    res.json({
      code: 500,
      msg: err.message||"服务器出错"
    })    
}

/* GET show listing. */
router.get('/banner', function(req, res, next) {
    var params = req.query;
    http_service.show.getCarouselBanner(params).then(function(data){        
        res.json(data.data)
    },function(err){
        handle4err(err,res);
    })
});
//获取热门演出
router.get('/hotshow', function(req, res, next) {
    var params = req.query;
    http_service.show.getMarketingShows(params).then(function(data){        
        res.json(data.data)
    },function(err){
        handle4err(err,res);
    })
});
//获取热门推荐演出
router.get('/recommendshow', function(req, res, next) {  
    var params = req.query;
    http_service.show.getRecommendShows(params).then(function(data){        
        res.json(data.data)
    },function(err){
        handle4err(err,res);
    })
});
//获取演出列表
router.get('/showlist', function(req, res, next) {  
    var params = req.query;
    http_service.show.getListShows(params).then(function(data){        
        res.json(data.data)
    },function(err){
        handle4err(err,res);
    })
});
//获取演出详情
router.get('/showbyid/:showOID', function(req, res, next) {  
    var params = req.query;
    var showOID = req.params.showOID;    
    http_service.show.getShowById(showOID, params).then(function(data){        
        res.json(data.data)
    },function(err){
        handle4err(err,res);
    })
});
//获取相关演出
router.get('/relatedshow/:showOID', function(req, res, next) {  
    var params = req.query;
    var showOID = req.params.showOID;    
    http_service.show.getRelateShowList(showOID, params).then(function(data){        
        res.json(data.data)
    },function(err){
        handle4err(err,res);
    })
});
//获取城市站点
router.get('/cities', function(req, res, next) {  
    var params = req.query; 
    http_service.show.getCities(params).then(function(data){        
        res.json(data.data)
    },function(err){
        handle4err(err,res);
    })
});
   


// console.log('http_service',http_service)

module.exports = router;

