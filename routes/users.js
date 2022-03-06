var express = require("express");
var router = express.Router();
const authRole = require("../config/basicAuth");
const usersCtrl = require("../controllers/users");

router.get("/employee", authRole("Employee"), usersCtrl.index);

router.get("/:id", authRole("Employee"), usersCtrl.show);

module.exports = router;
