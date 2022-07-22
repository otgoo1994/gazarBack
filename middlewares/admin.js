const jwt = require("jwt-then");
const mysql = require("mysql");


const db = mysql.createConnection({
  host: 'localhost',
  database: 'icbcv2',
  user: 'root',
  password: ''
});

// const db = mysql.createConnection({
//   host: 'localhost',
//   database: 'admin_icbc',
//   user: 'icbc',
//   port: 3306,
//   password: 'Mongol8899@'
// });

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw "Forbidden!!";
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');
    req.payload = payload;
    let qry = `SELECT id from users WHERE id = ${payload.id} AND (posID = 1 OR posID = 4)`;
    db.query(qry, async (err, result) => {
      if(err) {
        throw err;
      }
      if(result.length > 0) {
        next();
      } else {
        return res.status(401).json({
          message: "Access denied"
        });
      }
    });
  } catch (err) {
    res.status(401).json({
      message: "Forbidden",
    });
  }
};