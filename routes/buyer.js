var express = require('express');
var router = express.Router();
var buyer_dal = require('../dal/buyer_dal');


/* GET users listing. */
router.get('/all', function(req, res, next) {
    buyer_dal.getAll(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.render('buyer/buyer_view',{buyers: result});
        }

    })
});

router.get('/add', function(req, res, next) {
    buyer_dal.getAll(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.render('buyer/buyer_add',{buyers: result});
        }

    })
});

router.get('/insert', function(req, res, next) {

    buyer_dal.insert(req.query,function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.redirect(302, '/buyer/all');
        }

    })

});

module.exports = router;