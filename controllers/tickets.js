const pool = require("../db");
const { get } = require("../routes");
const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

const index = (req, res) => {
  res.render("tickets/index");
};

const create = async (req, res) => {
  const ticket = req.body;
  let randomNum;

  try {
    let maxNum = await pool.query("SELECT COUNT(*) FROM users;");
    randomNum = Math.floor(getRandom(1, parseInt(maxNum.rows[0].count) + 1));
  } catch (err) {
    console.log(err);
  }

  let insertQuery = `INSERT INTO tasks(subject, description, assigned_to)
  VALUES('${ticket.subject}', '${ticket.description}', ${randomNum});`;

  const insertTask = async (query) => {
    try {
      console.log('Successful Insertion')
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
