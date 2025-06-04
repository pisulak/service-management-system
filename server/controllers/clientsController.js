const pool = require("../db");

exports.getClientList = async (req, res) => {
  const user = req.session.user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Brak dostępu" });
  }

  try {
    const result = await pool.query(
      `SELECT 
            companies.*, 
            users.id AS user_id, 
            users.role, 
            COUNT(tickets.id) AS ticket_count
                FROM companies
                JOIN users ON companies.user_id = users.id
                LEFT JOIN tickets ON companies.user_id = tickets.client_id
                WHERE users.role = 'client'
                GROUP BY companies.id, users.id, users.role
                ORDER BY companies.id ASC;`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Błąd pobierania klientów:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.getCompanyAndUserEmailByCompanyID = async (req, res) => {
  const user = req.session.user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Brak dostępu" });
  }

  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT
        c.*,
        u.email AS user_email
        FROM companies c
        JOIN users u ON c.user_id = u.id
        WHERE c.id = $1;`,
      [id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Nie znaleziono firmy dla podanego ID" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Błąd pobierania firmy i emaila:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};
