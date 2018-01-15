var express = require('express');
var router = express.Router();


function handle4err(err,res){   
    res.json({
      code: 500,
      msg: err.message||"服务器出错"
    })    
}

/* GET users listing. */
router.get('/', function(req, res, next) {
   res.json({
        code:200,
        msg: 'demo'
    })         

});

module.exports = router;

