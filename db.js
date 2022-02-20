const { Pool } = require("pg");

const pool = new Pool({
  database: "tickets",
  port: 5432,
  host: "localhost",
  user: "postgres",
  password: "password",
});

module.exports = pool;
