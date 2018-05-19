var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback){
    //var query = 'CALL address_getall();';
    var query = 'Select * from p_address_view;';
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
exports.getinfo = function(p_address_id, callback) {
    var query = 'CALL p_address_getinfo(?)';
    var queryData = [p_address_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE p_address SET city = ?, property_name = ?, zip = ? WHERE p_address_id = ?';

    var queryData = [params.city, params.property_name, params.zip, params.p_address_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result)
    });
};
exports.delete = function(params, callback) {
    var query = 'Delete from p_address WHERE p_address_id = ?';

    var queryData = [params.p_address_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result)
    });
};
exports.orderby = function(callback){
    //var query = 'CALL address_getall();';
    var query = 'Select * from p_address_view order by city;';
    connection.query(query, function (err, result) {
        callback(err, result);

    });
};