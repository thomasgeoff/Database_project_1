var express = require('express');
var router = express.Router();
var property_dal = require('../dal/property_dal');
var p_address_dal = require('../dal/p_address_dal');
var buyer_dal = require('../dal/buyer_dal');

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
});
/*
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
}); */

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
                {properties: result[0][0]});
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
router.get('/delete', function(req, res) {
    property_dal.delete(req.query, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            console.log(result);
            res.redirect(302, '/property/all');
        }
    });
});
router.get('/distinct', function(req, res, next) {
    property_dal.distinct(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.render('property/property_distinct',{properties: result});
        }

    })
});
router.get('/in', function(req, res, next) {
    property_dal.in(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.render('property/property_in',{properties: result,buyers: result});
        }

    })
});
router.get('/compare', function(req, res, next) {
    property_dal.in(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.render('property/property_compare',{properties: result,buyers: result});
        }

    })
});
router.get('/exist', function(req, res, next) {
    property_dal.in(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.render('property/property_exist',{properties: result,buyers: result});
        }

    })
});
module.exports = router;