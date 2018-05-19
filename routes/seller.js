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
router.get('/edit', function(req, res) {
    seller_dal.getinfo(req.query.user_id, function(err,result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            console.log(result);
            res.render('seller/sellerUpdate', {sellers:
                    result[0][0]});
        }
    });
});

router.get('/update', function(req, res) {
    seller_dal.update(req.query, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            console.log(result);
            res.redirect(302, '/seller/all');
        }
    });
});
router.get('/delete', function(req, res) {
    seller_dal.delete(req.query, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            console.log(result);
            res.redirect(302, '/seller/all');
        }
    });
});

module.exports = router;