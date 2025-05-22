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

// Endpointy API
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server działa na porcie ${PORT}`);
});
