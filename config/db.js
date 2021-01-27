const mysql = require('mysql');

const db = mysql.createConnection({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'divergent', 
})

module.exports=db;