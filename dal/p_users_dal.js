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