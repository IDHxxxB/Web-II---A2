const mysql = require('mysql2');

// Create a database connection 
const dbconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'charityevents_db'
});

// Try to connect
dbconnection.connect((error) => {
    if (error) {
        console.error('Failed to connect to MySQL database: ' + err.stack);
        return;
    }
    console.log('Successfully connected to the MySQL database. Connection ID: ' + dbconnection.threadId);
});

module.exports = dbconnection;