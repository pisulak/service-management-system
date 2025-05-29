const pool = require("../db");
const { hashPassword, verifyPassword } = require("../utils/passwordUtils.js");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Wszystkie pola są wymagane" });
  }

  try {
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Użytkownik już istnieje" });
    }

    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role",
      [email, hashedPassword, "client"]
    );

    const user = result.rows[0];

    req.session.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    res.status(201).json({ message: "Rejestracja zakończona sukcesem", user });
  } catch (err) {
    console.error("Rejestracja błąd:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Niepoprawne dane logowania" });
    }

    const isValid = await verifyPassword(user.password, password);

    if (!isValid) {
      return res.status(401).json({ message: "Niepoprawne dane logowania" });
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    res.json({
      message: "Zalogowano pomyślnie",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Logowanie błąd:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Wylogowano" });
  });
};

exports.getCurrentUser = (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: "Nie zalogowano" });
  }
};

exports.getCurrentUserWithCompany = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Nie zalogowano" });
  }

  const user = req.session.user;

  try {
    const companyResult = await pool.query(
      "SELECT * FROM companies WHERE user_id = $1",
      [user.id]
    );

    const company = companyResult.rows[0] || null;

    res.json({
      user,
      company,
    });
  } catch (error) {
    console.error("Błąd podczas pobierania danych firmy:", error);
    res.status(500).json({ message: "Błąd serwera" });
  }
};
