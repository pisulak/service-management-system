const express = require("express");
const router = express.Router();
const {
  createProtocol,
  getUserSubmittedProtocols,
  getUserScheduledProtocols,
  getUserClosedProtocols,
  getSubmittedProtocols,
  getScheduledProtocols,
  getClosedProtocols,
} = require("../controllers/protocolController");

router.post("/", createProtocol);
router.get("/clientSubmitted", getUserSubmittedProtocols);
router.get("/clientScheduled", getUserScheduledProtocols);
router.get("/clientClosed", getUserClosedProtocols);

router.get("/adminSubmitted", getSubmittedProtocols);
router.get("/adminScheduled", getScheduledProtocols);
router.get("/adminClosed", getClosedProtocols);

module.exports = router;
