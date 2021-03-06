var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback){
    var query = 'select * from property_view;';
    connection.query(query, function (err, result) {
        callback(err, result);

    });
};

exports.insert = function(params, callback){
    var query = 'insert into property (property_type,p_address_id,price) values (?,?,?)';

    var queryData = [params.property_type,params.p_address_id,params.price];

    connection.query(query,queryData, function (err, result) {
        callback(err, result);

    });
};
/*
exports.insert = function(params, callback) {

    // First insert the property
    var query = 'insert into property (property_type,p_address_id,price) values (?,?,?)';

    var queryData = [params.property_type,params.p_address_id,params.price];

    connection.query(query, queryData, function(err, result) {
        if(err || params.address_id === undefined) {
            console.log(err);
            callback(err, result);
        } else {
            var property_id = result.insertId;
            var query = 'insert into p_address (p_address_id,property_name,city,zip) values (?,?,?,?)';

            // CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
            var propertyAddressData = [];
            if (params.p_address_id.constructor === Array) {
                // first we check if its an array of values
                for (var i = 0; i < params.p_address_id.length; i++) {
                    propertyAddressData.push(
                        [params.p_address_id[i],params.property_name,params.city,params.zip]
                    );
                }
            }
            else {
                propertyAddressData.push([params.p_address_id[i],params.property_name,params.city,params.zip]);
            }
            connection.query(query, [propertyAddressData],
                function (err, result) {
                    callback(err, result);
                });
        }
    });

};
*/

exports.getinfo = function(property_id, callback) {
    var query = 'CALL property_getinfo(?)';
    var queryData = [property_id];
    connection.query(query,queryData,  function(err, result) {
        callback(err, result);
    });
};


exports.update = function(params, callback) {
    var query = 'UPDATE property SET property_type = ?,p_address_id = ?,price = ? WHERE property_id = ?';
    var queryData = [params.property_id,params.property_type,params.p_address_id,params.price];

    connection.query(query, queryData, function(err, result) {
        propertyAddressUpdate(params.property_id,params.property_type,params.p_address_id,params.price,  function (err, result) {
            callback(err, result);
        });
    });
};
exports.delete = function(params, callback) {
    var query = 'Delete from property WHERE property_id = ?';

    var queryData = [params.property_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result)
    });
};
exports.distinct = function(callback){
    var query = 'select distinct price from property;';
    connection.query(query, function (err, result) {
        callback(err, result);

    });
};
exports.in = function(callback){
    var query = 'select * from property where property_type IN (select prop_type from buyer);';
    connection.query(query, function (err, result) {
        callback(err, result);

    });
};
exports.compare = function(callback){
    var query = 'select * from property where price < (select budget from buyer);';
    connection.query(query, function (err, result) {
        callback(err, result);

    });
};
exports.exist = function(callback){
    var query = 'select property_type from property where exists (select prop_type from buyer where user_id > 0);';
    connection.query(query, function (err, result) {
        callback(err, result);

    });
};
exports.join = function(callback){
    var query = 'select p.property_type,p.p_address_id,p.price,a.city,a.property_name,a.zip from property p JOIN p_address a on p.p_address_id=a.p_address_id;';
    connection.query(query, function (err, result) {
        callback(err, result);

    });
};
exports.advancejoin = function(callback){
    var query = 'select p.property_type,p.p_address_id,p.price,a.city,a.property_name,a.zip from property p JOIN p_address a where p.p_address_id=a.p_address_id group by a.city having avg(p.price) > 700000;';
    connection.query(query, function (err, result) {
        callback(err, result);

    });
};
