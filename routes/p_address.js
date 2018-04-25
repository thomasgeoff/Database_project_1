var express = require('express');
var router = express.Router();
var p_address_dal = require('../dal/p_address_dal');


/* GET users listing. */
router.get('/all', function(req, res, next) {
    p_address_dal.getAll(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.render('p_address/p_address_view_all',{p_addresses: result[0]});
        }

    })
});

router.get('/add', function(req, res, next) {
    p_address_dal.getAll(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.render('p_address/p_address_add',{p_addresses: result});
        }

    })
});

router.get('/insert', function(req, res, next) {

    p_address_dal.insert(req.query,function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.redirect(302, '/p_address/all');
        }

    })

});

module.exports = router;