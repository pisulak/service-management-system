const express = require("express");
const router = express.Router();
const { getClientList } = require("../controllers/clientsController");

router.get("/Clients", getClientList);

module.exports = router;
