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
