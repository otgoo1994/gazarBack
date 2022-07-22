const db = require('./config/sql');

const jwt = require("jwt-then");
const app = require('./app');
const port = 8005;

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('connected mysql')
});

global.db = db;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
