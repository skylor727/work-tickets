const { Pool } = require("pg");
const getDBUrl = require("./aws-ssm").getParameter;
const DATABASE_URL = await getDBUrl("DATABASE_URL");
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
