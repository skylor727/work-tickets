var pg = require("pg");

var conString = `${process.env.DATABASE_URL}`;

var client = new pg.Client({
  connectionString: conString,
  ssl: {
    rejectUnauthorized: false,
  },
});
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
