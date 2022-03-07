const { Pool } = require("pg");

const pool = new Pool({
  database: `${process.env.DATABASE}`,
  port: 5432,
  host: `${process.env.HOST}`,
  user: `${process.env.USER}`,
  password: `${process.env.PASSWORD}`,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
