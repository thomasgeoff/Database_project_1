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