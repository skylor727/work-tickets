var pg = require("pg");

var conString = "postgres://postgres:password@localhost:5432/tickets";

var client = new pg.Client(conString);
client.connect((err) => {
  if (err) {
    return console.error("Could not connect to postgres ", err);
  }
  console.log("Connected to ", conString);
  client.query("", (err, result) => {
    if (err) {
      return console.error("Query Error ", err);
    }
    client.end();
  });
});
