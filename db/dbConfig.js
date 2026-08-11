const mysql = require('mysql2');

const dbConnection = mysql.createPool({
    user: 'evangadi-admin',
    host: 'localhost',
    password: 'evangadi123',
    database: 'evangadi_db',
    connectionLimit: 10
})

dbConnection.execute("select 'test' ", (err, result) => {
    if (err){
        console.log(err.message);
    }else{ 
        console.log(result);
    }
})