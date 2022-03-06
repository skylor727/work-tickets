const pool = require("../db");

const index = async (req, res) => {
  try {
    const users = await pool.query(`SELECT * FROM users`);
    res.render("users/index", { users });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { index };
