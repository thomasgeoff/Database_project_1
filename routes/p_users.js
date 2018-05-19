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
router.get('/edit', function(req, res) {
    p_users_dal.getinfo(req.query.user_id, function(err,result) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            console.log(result);
            res.render('p_users/p_usersUpdate', {p_users:
                    result[0][0]});
        }
    });
});

router.get('/update', function(req, res) {
    p_users_dal.update(req.query, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            console.log(result);
            res.redirect(302, '/p_users/all');
        }
    });
});
router.get('/delete', function(req, res) {
    p_users_dal.delete(req.query, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            console.log(result);
            res.redirect(302, '/p_users/all');
        }
    });
});
router.get('/groupby', function(req, res, next) {
    p_users_dal.groupby(function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.render('p_users/user_groupby',{p_users: result});
        }

    })
});
module.exports = router;