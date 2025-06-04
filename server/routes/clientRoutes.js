const express = require("express");
const router = express.Router();
const {
  getClientList,
  getCompanyAndUserEmailByCompanyID,
} = require("../controllers/clientsController");

router.get("/Clients", getClientList);
router.get("/clientDetails/:id", getCompanyAndUserEmailByCompanyID);

module.exports = router;
