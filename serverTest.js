const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost", // Your connection adress (localhost)
  user: "root", // Your database's username.
  password: "", // Your database's password.
  database: "birthdays", // Your database's name.
  connectionLimit: 10,
});

//pool.query("select * from blinds", (err, result, fields) => {
//  if (err) {
//    return console.log(err);
//  }
//  return console.log(result);
//});

exports.connection = {
  query: function () {
    var queryArgs = Array.prototype.slice.call(arguments),
      events = [],
      eventNameIndex = {};

    pool.getConnection(function (err, conn) {
      if (err) {
        if (eventNameIndex.error) {
          eventNameIndex.error();
        }
      }
      if (conn) {
        var q = conn.query.apply(conn, queryArgs);
        q.on("end", function () {
          conn.release();
        });

        events.forEach(function (args) {
          q.on.apply(q, args);
        });
      }
    });

    return {
      on: function (eventName, callback) {
        events.push(Array.prototype.slice.call(arguments));
        eventNameIndex[eventName] = callback;
        return this;
      },
    };
  },
};

exports.connection
  .query("SELECT * FROM tourneys")
  .on("result", function (row) {
    return console.log(row);
  })
  .on("error", function (err) {
    callback({ error: true, err: err });
  });
