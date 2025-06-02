const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentUserWithCompany,
  updateUser,
  updateCompany,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getCurrentUser);
router.get("/myCompany", getCurrentUserWithCompany);

router.put("/updateUser", updateUser);
router.put("/updateCompany", updateCompany);

module.exports = router;
