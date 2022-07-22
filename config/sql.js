const mysql = require('mysql');

// const db = mysql.createConnection({
//     host: 'localhost',
//     database: 'gazarmn',
//     user: 'root',
//     password: ''
// });
  
const db = mysql.createConnection({
  host: 'localhost',
  database: 'gazarmn',
  user: 'root',
  port: 3306,
  password: 'password1010@'
});

module.exports = db;