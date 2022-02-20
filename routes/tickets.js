var express = require("express");
var router = express.Router();
const authRole = require("../config/basicAuth");
const ticketsCtrl = require("../controllers/tickets");
//Tickets index
router.get("/", ticketsCtrl.index);

router.post("/create", ticketsCtrl.create);

// router.get('/', ticketsCtrl.create)

module.exports = router;
