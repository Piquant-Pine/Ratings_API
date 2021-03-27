var mysql = require('mysql');
var connection = mysql.createConnection({
  host: '172.31.10.97',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'ratings'
});

connection.connect((err) => {
  if (err) {
    console.log('error connection: ', err);
    return;
  }
  console.log('connected to mysql');
});

module.exports = connection;
