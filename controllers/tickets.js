const pool = require("../db");
const { get } = require("../routes");
const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

const index = async (req, res) => {
  try {
    const tasks = await pool.query("SELECT * FROM tasks");
    const users = await pool.query("SELECT * FROM users");
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
    let users = await pool.query(
      "SELECT id FROM users WHERE user_role='Employee'"
    );
    const randomIdx = Math.floor(getRandom(0, parseInt(users.rows.length)));
    randomNum = users.rows[randomIdx].id;
  } catch (err) {
    console.log(err);
  }

  // Query to add task
  let insertQuery = `INSERT INTO tasks(subject, description, assigned_to, created_by)
  VALUES('${ticket.subject}', '${ticket.description}', ${randomNum}, ${req.user.id})`;

  const insertTask = async (query) => {
    try {
      console.log("Successful Insertion");
      pool.query(query);
    } catch (err) {
      console.log(err);
    }
    res.redirect("/work-tickets/tickets");
    pool.end;
  };
  insertTask(insertQuery);
};

const update = async (req, res) => {
  const is_active = req.body.is_active ? false : true;
  console.log(is_active, " is_active var");
  console.log(req.body.is_active, " is_active req.body");
  try {
    await pool.query(
      `UPDATE tasks SET subject='${req.body.subject}', description='${req.body.description}', is_active=${is_active} WHERE id=${req.params.id}`
    );
  } catch (err) {
    console.log(err, " While Updating");
  }
  //
  res.redirect(`/work-tickets/tickets/${req.params.id}`);
};

const deleteTask = async (req, res) => {
  try {
    await pool.query(`DELETE FROM tasks where id=${req.params.id}`);
  } catch (err) {
    console.log(err, " while deleting");
  }
  res.redirect("/work-tickets/tickets");
};

const show = async (req, res) => {
  try {
    const task = await pool.query(
      `SELECT * FROM tasks WHERE id=${req.params.id}`
    );
    const users = await pool.query(`SELECT * FROM users`);
    const activeUser = await pool.query(
      `SELECT * FROM users WHERE id=${req.user.id}`
    );
    res.render("tickets/show", { task, users, activeUser: activeUser.rows[0] });
  } catch (err) {
    console.log(err);
    res.redirect("/work-tickets");
  }
};

module.exports = {
  index,
  create,
  show,
  update,
  delete: deleteTask,
};
