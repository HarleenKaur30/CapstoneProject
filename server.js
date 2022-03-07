var express = require("express");
var app = express();

var mysql = require("mysql");
var bodyParser = require("body-parser");
const { application } = require("express");

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
  host: "localhost", // Your connection adress (localhost).
  port: "3306",
  user: "root", // Your database's username.
  password: "newpassword", // Your database's password.
  database: "birthdays", // Your database's name.
});

connection.connect(function (error) {
  if (error) console.log(error);
  else console.log("connected");
});

// Starting our server.
app.listen(4547, () => {
  console.log("Go to http://localhost:4547/dinners so you can see the data.");
});

/* // Creating a GET route that returns data from the 'users' table.
app.get("/dinners", function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query(
      "SELECT * FROM dinners",
      function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        console.log(results);
        res.send(results);
      }
    );
  });
}); */

app.get("/users", function (req, res) {
  con.query("select * from users", function (error, rows, fields) {
    if (error) console.log(error);
    else {
      console.log(rows);
      res.send(rows);
    }
  });
});

/* var express = require("express");
var app = express();

var mysql = require("mysql");
var bodyParser = require("body-parser");
const { application } = require("express");

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "newpassword",
  database: "birthdays",
});

var server = app.listen(4545, function () {
  var host = server.address().address;
  var port = server.address().port;
}); */

/* con.connect(function (error) {
  if (error) console.log(error);
  else console.log("connected");
});
 */
/* app.get("/users", function (req, res) {
  con.query("select * from users", function (error, rows, fields) {
    if (error) console.log(error);
    else {
      console.log(rows);
      res.send(rows);
    }
  });
}); */
