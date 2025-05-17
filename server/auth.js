const express = require("express");
const router = express.Router();
const pool = require("./db");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Użytkownik już istnieje" });
    }

    await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      email,
      password,
    ]);

    res.status(201).json({ message: "Rejestracja zakończona sukcesem" });
  } catch (err) {
    console.error("Rejestracja błąd:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length > 0) {
      req.session.user = {
        id: result.rows[0].id,
        email: result.rows[0].email,
      };
      res.json({ message: "Zalogowano pomyślnie" });
    } else {
      res.status(401).json({ message: "Niepoprawne dane logowania" });
    }
  } catch (err) {
    console.error("Logowanie błąd:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Wylogowano" });
  });
});

router.get("/me", (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: "Nie zalogowano" });
  }
});

module.exports = router;
