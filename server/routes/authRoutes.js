const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentUserWithCompany,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getCurrentUser);
router.get("/myCompany", getCurrentUserWithCompany);

module.exports = router;
