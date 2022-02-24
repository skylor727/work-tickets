var express = require("express");
var router = express.Router();
const authRole = require("../config/basicAuth");
const ticketsCtrl = require("../controllers/tickets");
//Tickets index
router.get("/", ticketsCtrl.index);

router.post("/create", ticketsCtrl.create);

router.get("/:id", ticketsCtrl.show);

router.delete('/:id', ticketsCtrl.delete);

router.put('/:id', ticketsCtrl.update);

module.exports = router;
