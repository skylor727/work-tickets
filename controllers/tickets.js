const pool = require("../db");
const { get } = require("../routes");
const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

const index = async (req, res) => {
  const tasks = await pool.query("SELECT * FROM tasks;");
  const users = await pool.query("SELECT * FROM users");
  const activeUser = await pool.query(
    `SELECT * from users WHERE id=${req.user.id}`
  );
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

const update = async (req, res) => {
  console.log(req.body);
};

const deleteTask = async (req, res) => {
  console.log(req.params.id, ' REQ PARAMS');
  const taskToDelete = await pool.query(
    `DELETE FROM tasks where id=${req.params.id}`
  );
  res.redirect('/tickets')
  console.log(taskToDelete);
};

const show = async (req, res) => {
  const task = await pool.query(
    `SELECT * FROM tasks WHERE id=${req.params.id}`
  );
  const users = await pool.query(`SELECT * FROM users`);
  res.render("tickets/show", { task, users });
};

module.exports = {
  index,
  create,
  show,
  update,
  delete: deleteTask,
};
