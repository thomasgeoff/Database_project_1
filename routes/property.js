var express = require('express');
var router = express.Router();
var property_dal = require('../dal/property_dal');
var p_address_dal = require('../dal/p_address_dal');


/* GET users listing. */
router.get('/all', function(req, res, next) {
    property_dal.getAll(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.render('property/property_view_all',{properties: result});
        }

    })
});
/*
router.get('/add', function(req, res, next) {
    property_dal.getAll(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.render('property/property_add',{properties: result});
        }

    })
}); */

router.get('/add', function(req, res, next) {
    p_address_dal.getAll(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.render('property/property_add',{p_addresses_result: result[0]});
        }

    })
});

router.get('/insert', function(req, res, next) {

    property_dal.insert(req.query,function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.redirect(302, '/property/all');
        }

    })

});
router.get('/edit', function(req, res, next) {
    property_dal.getinfo(req.query.property_id, function(err, result) {
        if(err) { res.send(err); }
        else {
            res.render('property/propertyUpdate',
                {property: result[0][0],p_addresses_result: result[1]});
        }
    });
});


router.get('/update', function(req, res) {
    property_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/property/all');
        }
    });
});

module.exports = router;