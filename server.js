var express = require("express");
var app = express();

var mysql = require("mysql");
var bodyParser = require("body-parser");
const { application } = require("express");

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
  host: 'localhost', // Your connection adress (localhost).
  port: "3306",
  user: "root", // Your database's username.
  password: "", // Your database's password.
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


app.get("/users", function (req, res) {
  con.query("select * from users", function (error, rows, fields) {
    if (error) console.log(error);
    else {
      console.log(rows);
      res.send(rows);
    }
  });
});


