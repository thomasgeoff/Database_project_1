var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback){
    var query = 'select * from users_view;';
    connection.query(query, function (err, result) {
        callback(err, result);

    });
};

exports.insert = function(params, callback){
    var query = 'insert into users (user_type,fname,lname,contact) values (?,?,?,?)';

    var queryData = [params.user_type,params.fname,params.lname,params.contact];

    connection.query(query,queryData, function (err, result) {
        callback(err, result);

    });
};
exports.getinfo = function(user_id, callback) {
    var query = 'CALL p_user_getinfo(?)';
    var queryData = [user_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE users SET user_type = ?, fname = ?, lname = ?, contact = ? WHERE user_id = ?';

    var queryData = [params.user_type, params.fname, params.lname,params.contact, params.user_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result)
    });
};
exports.delete = function(params, callback) {
    var query = 'Delete from users WHERE user_id = ?';

    var queryData = [params.user_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result)
    });
};
exports.groupby = function(callback){
    var query = 'select * from users group by user_type;';
    connection.query(query, function (err, result) {
        callback(err, result);

    });
};