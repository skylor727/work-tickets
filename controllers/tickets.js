const pool = require("../db");
const { get } = require("../routes");
const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

const index = async (req, res) => {
  const tasks = await pool.query("SELECT * FROM tasks;");
  const users = await pool.query("SELECT * FROM users");
  res.render("tickets/index", { tasks, users });
};

const create = async (req, res) => {
  const ticket = req.body;
  let randomNum;
  //Get a random number for the length of users whose role = employee
  try {
    let maxNum = await pool.query(
      "SELECT COUNT(*) FROM users WHERE user_role='employee';"
    );
    randomNum = Math.floor(
      getRandom(
        1,
        parseInt(maxNum.rows[0].count) + maxNum.rows[0].count > 1 ? 1 : 0
      )
    );
  } catch (err) {
    console.log(err);
  }

  // Query to add task
  let insertQuery = `INSERT INTO tasks(subject, description, assigned_to, created_by)
  VALUES('${ticket.subject}', '${ticket.description}', ${randomNum}, ${req.user.id});`;

  const insertTask = async (query) => {
    try {
      console.log("Successful Insertion");
      pool.query(query);
    } catch (err) {
      console.log(err);
    }
    res.redirect("/tickets");
    pool.end;
  };
  insertTask(insertQuery);
};

module.exports = {
  index,
  create,
};
