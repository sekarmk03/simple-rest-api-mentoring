require('dotenv').config();
const mysql = require('mysql');
const {
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME
} = process.env;

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
});

const executeQuery = (query, params, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null);
            return;
        }
      
        connection.query(query, params, (err, results) => {
            connection.release();
            callback(err, results);
        });
    });
}

module.exports = executeQuery;