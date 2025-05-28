const express = require("express");
const router = express.Router();
const { getPartsList } = require("../controllers/storageController");

router.get("/Parts", getPartsList);

module.exports = router;
