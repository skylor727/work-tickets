var express = require("express");
var router = express.Router();
const authRole = require("../config/basicAuth");
const usersCtrl = require("../controllers/users");

router.get("/employee", authRole("employee"), usersCtrl.index);

module.exports = router;
