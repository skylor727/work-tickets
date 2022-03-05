const pool = require("../db");

const index = async (req, res) => {
  try {
    const users = await pool.query(`SELECT * FROM users`);
    res.render("users/index", { users });
  } catch (err) {
    console.log(err);
  }
};

const show = async (req, res) => {
  try {
    const user = await pool.query(
      `SELECT * FROM users WHERE id=${req.user.id}`
    );
    res.render("users/show", { user });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { index, show };
