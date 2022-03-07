const { Pool } = require("pg");

const pool = new Pool({
  database: process.env.DATABASE,
  port: process.env.PORT,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

module.exports = pool;
