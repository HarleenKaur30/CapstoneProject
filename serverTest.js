const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost", // Your connection adress (localhost).
  //  port: 3306,
  user: "root", // Your database's username.
  password: "", // Your database's password.
  database: "aishading", // Your database's name.
  connectionLimit: 10,
});

pool.query("select * from blinds", (err, result, fields) => {
  if (err) {
    return console.log(err);
  }
  return console.log(result);
});
