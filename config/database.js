var pg = require("pg");
const getDBUrl = require("../aws-ssm").getParameter;
async function main() {
  const DATABASE_URL = await getDBUrl("DATABASE_URL");
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
