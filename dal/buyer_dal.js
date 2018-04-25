var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback){
    var query = 'select * from buyer_view;';
    connection.query(query, function (err, result) {
        callback(err, result);

    });
};

exports.insert = function(params, callback){
    var query = 'insert into buyer (user_id,prop_type,budget) values (?,?,?)';

    var queryData = [params.user_id,params.prop_type,params.budget];

    connection.query(query,queryData, function (err, result) {
        callback(err, result);

    });
};