require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 5010;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    store: new pgSession({ pool }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.post("/api/companies", async (req, res) => {
  const { companyName, nip, address, phone } = req.body;
  const user = req.session.user;

  if (!user) {
    return res.status(401).json({ message: "Nieautoryzowany" });
  }

  try {
    await pool.query(
      "INSERT INTO companies (user_id, company_name, nip, address, phone_number, join_date) VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)",
      [user.id, companyName, nip, address, phone]
    );

    res.status(201).json({ message: "Firma zarejestrowana" });
  } catch (err) {
    console.error("Błąd rejestracji firmy:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
});

// Endpointy API
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server działa na porcie ${PORT}`);
});
