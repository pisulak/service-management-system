const pool = require("../db");

exports.getPartsList = async (req, res) => {
  const user = req.session.user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Brak dostępu" });
  }

  try {
    const result = await pool.query("SELECT * FROM parts");

    res.json(result.rows);
  } catch (err) {
    console.error("Błąd pobierania części:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};
