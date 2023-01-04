var pg = require("pg");
const getDBUrl = require("../aws-ssm").getDBUrl;
async function main() {
  const DATABASE_URL = await getDBUrl();
  var conString = `${DATABASE_URL}`;

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
}
main();
