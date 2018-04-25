var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback){
    var query = 'CALL address_getall();';
    connection.query(query, function (err, result) {
        callback(err, result);

    });
};
exports.insert = function(params, callback){
    var query = 'CALL address_insert(?,?,?)';

    var queryData = [params.property_name,params.city,params.zip];

    connection.query(query,queryData, function (err, result) {
        callback(err, result);

    });
};