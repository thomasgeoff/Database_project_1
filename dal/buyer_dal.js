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
exports.getinfo = function(user_id, callback) {
    var query = 'CALL buyer_getinfo(?)';
    var queryData = [user_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE buyer SET prop_type = ?, budget = ? WHERE user_id = ?';

    var queryData = [params.prop_type, params.budget, params.user_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result)
    });
};
exports.delete = function(params, callback) {
    var query = 'Delete from buyer WHERE user_id = ?';

    var queryData = [params.user_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result)
    });
};