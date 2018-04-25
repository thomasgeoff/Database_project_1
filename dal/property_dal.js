var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback){
    var query = 'select * from property_view;';
    connection.query(query, function (err, result) {
        callback(err, result);

    });
};
/*
exports.insert = function(params, callback){
    var query = 'insert into property (property_type,p_address_id,price) values (?,?,?)';

    var queryData = [params.property_type,params.p_address_id,params.price];

    connection.query(query,queryData, function (err, result) {
        callback(err, result);

    });
}; */

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


exports.getinfo = function(property_id, callback) {
    var query = 'CALL property_getinfo(?)';
    var queryData = [property_id];
    connection.query(query,queryData,  function(err, result) {
        callback(err, result);
    });
};

var propertyAddressInsert = function(property_id,property_type, price, addressIdArray, callback){
    // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
    var query = 'CALL property_insert(?,?,?);';

    // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
    var propertyAddressData = [];
    if (addressIdArray.constructor === Array) {
        for (var i = 0; i < addressIdArray.length; i++) {
            propertyAddressData.push([property_id,property_type, price, addressIdArray[i]]);
        }
    }
    else {
        propertyAddressData.push([property_id,property_type, price, addressIdArray]);
    }
    connection.query(query, [propertyAddressData], function(err, result){
        callback(err, result);
    });
};



var propertyAddressUpdate = function(property_id, addressIdArray, callback){
    // First we need to remove all the entries, and then re-insert new ones
    var query = 'CALL property_delete(?)';

    connection.query(query, property_id, function (err, result) {
        if(err || addressIdArray === undefined) {
            // if error or no address were selected then return
            callback(err, result);
        } else { // insert addresses
            propertyAddressInsert(property_id,property_type,p_address_id,price, callback);
        }
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

