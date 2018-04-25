var express = require('express');
var router = express.Router();
var p_users_dal = require('../dal/p_users_dal');


/* GET users listing. */
router.get('/all', function(req, res, next) {
    p_users_dal.getAll(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.render('p_users/p_users_view_all',{p_users: result});
        }

    })
});

router.get('/add', function(req, res, next) {
    p_users_dal.getAll(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.render('p_users/p_users_add',{p_users: result});
        }

    })
});

router.get('/insert', function(req, res, next) {

    p_users_dal.insert(req.query,function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.redirect(302, '/p_users/all');
        }

    })

});

module.exports = router;