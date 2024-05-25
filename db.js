const mysql = require('mysql');

const db = mysql.createConnection({
    user:'root',
    host:'127.0.0.1',
    port:'3306',
    password : 'iwbFR$$0102',
    database : 'sdddb1'
});

module.exports = db;