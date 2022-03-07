const pool = require("../db");

const index = async (req, res) => {
  try {
    const users = await pool.query(`SELECT * FROM users`);
    const activeUser = await pool.query(
      `SELECT * FROM users WHERE id=${req.user.id}`
    );
    res.render("users/index", { users, activeUser: activeUser.rows[0] });
  } catch (err) {
    console.log(err);
  }
};

const show = async (req, res) => {
  try {
    const userTickets = await pool.query(
      `SELECT * FROM tasks WHERE assigned_to=${req.user.id}`
    );
    const users = await pool.query(`SELECT * FROM users`);
    res.render("users/show", { userTickets, users });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { index, show };
