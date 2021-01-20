const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "amar22singh",
});
module.exports = pool.promise();
