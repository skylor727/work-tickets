const { user } = require("pg/lib/defaults");
const pool = require("../db");

const getUser = async (userId) => {
  try {
    const user = await pool.query(`SELECT * FROM users WHERE id=${userId}`);
    return user.rows[0].user_role;
  } catch (err) {
    console.log(err, " while fetching user");
  }
};
module.exports = authRole = (role) => {
  return async (req, res, next) => {
    if ((await getUser(req.user.id)) !== role) {
      res.status(401);
      return res.send("Not Allowed");
    }
    next();
  };
};
