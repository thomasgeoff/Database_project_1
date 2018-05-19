var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback){
    var query = 'select * from seller_view;';
    connection.query(query, function (err, result) {
        callback(err, result);

    });
};

exports.insert = function(params, callback){
    var query = 'insert into seller (user_id,property_id,property_for) values (?,?,?)';

    var queryData = [params.user_id,params.property_id,params.property_for];

    connection.query(query,queryData, function (err, result) {
        callback(err, result);

    });
};
exports.insert = function(params, callback){
    var query = 'insert into seller (user_id,property_id,property_for) values (?,?,?)';

    var queryData = [params.user_id,params.property_id,params.property_for];

    connection.query(query,queryData, function (err, result) {
        callback(err, result);

    });
};
exports.getinfo = function(user_id, callback) {
    var query = 'CALL seller_getinfo(?)';
    var queryData = [user_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE seller SET property_id = ?, property_for = ? WHERE user_id = ?';

    var queryData = [params.property_id, params.property_for, params.user_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result)
    });
};
exports.delete = function(params, callback) {
    var query = 'Delete from seller WHERE user_id = ?';

    var queryData = [params.user_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result)
    });
};