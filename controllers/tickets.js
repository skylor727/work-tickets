const pool = require("../db");
const { get } = require("../routes");
const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

const index = async (req, res) => {
  try {
    const tasks = await pool.query("SELECT * FROM tasks;");
    const users = await pool.query("SELECT * FROM users");
    const activeUser = await pool.query(
      `SELECT * from users WHERE id=${req.user.id}`
    );
    res.render("tickets/index", { tasks, users });
  } catch (err) {
    console.log(err);
  }
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

const update = async (req, res) => {
  const is_active = req.body.is_active === "true" ? true : false;
  try {
    await pool.query(
      `UPDATE tasks SET subject='${req.body.subject}', description='${req.body.description}', is_active=${is_active} WHERE id=${req.params.id};`
    );
  } catch (err) {
    console.log(err, " While Updating");
  }
  //
  res.redirect(`/tickets/${req.params.id}`);
};

const deleteTask = async (req, res) => {
  try {
    await pool.query(`DELETE FROM tasks where id=${req.params.id}`);
  } catch (err) {
    console.log(err, " while deleting");
  }
  res.redirect("/tickets");
};

const show = async (req, res) => {
  try {
    const task = await pool.query(
      `SELECT * FROM tasks WHERE id=${req.params.id}`
    );
    const users = await pool.query(`SELECT * FROM users`);
    res.render("tickets/show", { task, users });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

module.exports = {
  index,
  create,
  show,
  update,
  delete: deleteTask,
};
