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

// ----------------------------------------------

exports.updateUser = async (req, res) => {
  const sessionUser = req.session.user;
  if (!sessionUser) {
    return res
      .status(403)
      .json({ message: "Brak dostępu: użytkownik niezalogowany" });
  }

  const { newEmail, oldPassword, newPassword } = req.body;

  if (!oldPassword) {
    return res
      .status(400)
      .json({ message: "Stare hasło jest wymagane do weryfikacji" });
  }
  if (!newEmail && !newPassword) {
    return res.status(400).json({
      message: "Brak danych do aktualizacji: podaj newEmail i/lub newPassword",
    });
  }

  try {
    const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [
      sessionUser.id,
    ]);
    if (userResult.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Nie znaleziono użytkownika w bazie" });
    }
    const user = userResult.rows[0];

    const isMatch = await verifyPassword(user.password, oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Niepoprawne stare hasło" });
    }

    let emailToSet = user.email;
    if (newEmail && newEmail !== user.email) {
      const emailCheck = await pool.query(
        "SELECT id FROM users WHERE email = $1",
        [newEmail]
      );
      if (emailCheck.rows.length > 0) {
        return res
          .status(400)
          .json({ message: "Podany e-mail jest już zajęty" });
      }
      emailToSet = newEmail;
    }

    let passwordToSet = user.password;
    if (newPassword) {
      if (newPassword.length < 8) {
        return res
          .status(400)
          .json({ message: "Nowe hasło powinno mieć co najmniej 8 znaków" });
      }
      passwordToSet = await hashPassword(newPassword);
    }

    const updateResult = await pool.query(
      `
      UPDATE users
      SET email = $1,
          password = $2
      WHERE id = $3
      RETURNING id, email, role
      `,
      [emailToSet, passwordToSet, sessionUser.id]
    );

    if (updateResult.rowCount === 0) {
      return res
        .status(500)
        .json({ message: "Nie udało się zaktualizować danych użytkownika" });
    }

    const updatedUser = updateResult.rows[0];

    req.session.user.email = updatedUser.email;

    res.json({
      message: "Dane zaktualizowane pomyślnie",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (err) {
    console.error("Błąd przy aktualizacji danych użytkownika:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

// ------------------------------------------------

exports.updateCompany = async (req, res) => {
  const sessionUser = req.session.user;
  if (!sessionUser) {
    return res
      .status(403)
      .json({ message: "Brak dostępu: użytkownik niezalogowany" });
  }

  const { companyName, address, nip, phoneNumber, password } = req.body;

  if (!password) {
    return res
      .status(400)
      .json({ message: "Hasło jest wymagane do weryfikacji" });
  }

  if (!companyName && !address && !nip && !phoneNumber) {
    return res.status(400).json({ message: "Brak danych do aktualizacji" });
  }

  try {
    const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [
      sessionUser.id,
    ]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "Nie znaleziono użytkownika" });
    }

    const user = userResult.rows[0];
    const isMatch = await verifyPassword(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Nieprawidłowe hasło" });
    }

    const companyResult = await pool.query(
      "SELECT * FROM companies WHERE user_id = $1",
      [sessionUser.id]
    );

    if (companyResult.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Nie znaleziono firmy przypisanej do użytkownika" });
    }

    const currentCompany = companyResult.rows[0];

    const companyNameToSet = companyName || currentCompany.company_name;
    const addressToSet = address || currentCompany.address;
    const nipToSet = nip || currentCompany.nip;
    const phoneToSet = phoneNumber || currentCompany.phone_number;

    const updateResult = await pool.query(
      `
      UPDATE companies
      SET company_name = $1,
          address = $2,
          nip = $3,
          phone_number = $4
      WHERE user_id = $5
      RETURNING company_name, address, nip, phone_number
      `,
      [companyNameToSet, addressToSet, nipToSet, phoneToSet, sessionUser.id]
    );

    res.json({
      message: "Dane firmy zaktualizowane pomyślnie",
      company: updateResult.rows[0],
    });
  } catch (err) {
    console.error("Błąd przy aktualizacji danych firmy:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};
