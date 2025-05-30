const express = require("express");
const router = express.Router();
const {
  createProtocol,
  getUserTodayProtocols,
  getUserSubmittedProtocols,
  getUserScheduledProtocols,
  getUserClosedProtocols,
  getTodayProtocols,
  getSubmittedProtocols,
  getScheduledProtocols,
  getClosedProtocols,
  getProtocolBasedOnID,
  editScheduledDate,
} = require("../controllers/protocolController");

router.post("/create", createProtocol);
router.get("/clientToday", getUserTodayProtocols);
router.get("/clientSubmitted", getUserSubmittedProtocols);
router.get("/clientScheduled", getUserScheduledProtocols);
router.get("/clientClosed", getUserClosedProtocols);

router.get("/adminToday", getTodayProtocols);
router.get("/adminSubmitted", getSubmittedProtocols);
router.get("/adminScheduled", getScheduledProtocols);
router.get("/adminClosed", getClosedProtocols);

router.get("/:id", getProtocolBasedOnID);
router.put("/schedule/:id", editScheduledDate);

module.exports = router;
