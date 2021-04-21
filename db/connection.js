var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host: '13.57.246.129',
//   port: '3306',
//   user: 'guest',
//   password: 'password',
//   database: 'ratings'
// });

var connection = mysql.createConnection({
  user: 'root',
  password: 'root',
  database: 'ratings'
})

connection.connect((err) => {
  if (err) {
    console.log('error connection: ', err);
    return;
  }
  console.log('connected to mysql');
});

module.exports = connection;
