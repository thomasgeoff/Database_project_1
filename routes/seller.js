var express = require('express');
var router = express.Router();
var seller_dal = require('../dal/seller_dal');


/* GET users listing. */
router.get('/all', function(req, res, next) {
    seller_dal.getAll(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.render('seller/seller_view_all',{sellers: result});
        }

    })
});

router.get('/add', function(req, res, next) {
    seller_dal.getAll(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.render('seller/seller_add',{sellers: result});
        }

    })
});

router.get('/insert', function(req, res, next) {

    seller_dal.insert(req.query,function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.redirect(302, '/seller/all');
        }

    })

});

module.exports = router;