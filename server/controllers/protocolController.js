const pool = require("../db");

// POST

exports.createProtocol = async (req, res) => {
  const {
    title,
    description,
    type,
    hasDevice,
    deviceName,
    isWarranty,
    parentTicketId,
  } = req.body;

  const user = req.session.user;

  if (!user || user.role !== "client") {
    return res.status(403).json({ message: "Brak dostępu" });
  }

  try {
    const admin = await pool.query(
      "SELECT id FROM users WHERE id = $1 AND role = 'admin'",
      [6]
    );

    if (admin.rowCount === 0) {
      return res.status(400).json({ message: "Admin o ID 6 nie istnieje" });
    }

    const prefix = type === "awaria" ? "AW" : "MO";
    const resultCount = await pool.query("SELECT COUNT(*) FROM tickets");
    const number = parseInt(resultCount.rows[0].count) + 1;
    const ticketNumber = `${prefix}-${String(number).padStart(6, "0")}`;

    const result = await pool.query(
      `INSERT INTO tickets
      (ticket_number, admin_id, client_id, status, title, description, type,
       has_device, device_name, is_warranty, parent_ticket_id, created_at)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7,
       $8, $9, $10, $11, NOW())
      RETURNING *`,
      [
        ticketNumber,
        6,
        user.id,
        "submitted",
        title,
        description,
        type,
        hasDevice,
        hasDevice ? deviceName : null,
        isWarranty,
        parentTicketId || null,
      ]
    );

    res
      .status(201)
      .json({ message: "Zgłoszenie utworzone", ticket: result.rows[0] });
  } catch (err) {
    console.error("Błąd tworzenia zgłoszenia:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

// GET

// CLIENT
exports.getUserTodayProtocols = async (req, res) => {
  const user = req.session.user;

  if (!user || user.role !== "client") {
    return res.status(403).json({ message: "Brak dostępu" });
  }

  try {
    const result = await pool.query(
      `SELECT tickets.*, companies.*
       FROM tickets
       JOIN companies ON tickets.client_id = companies.user_id
       WHERE client_id = $1
         AND tickets.status = 'scheduled'
         AND DATE(tickets.scheduled_at) = CURRENT_DATE
       ORDER BY tickets.created_at DESC`,
      [user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Błąd pobierania zgłoszeń o statusie scheduled:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.getUserSubmittedProtocols = async (req, res) => {
  const user = req.session.user;

  if (!user || user.role !== "client") {
    return res.status(403).json({ message: "Brak dostępu" });
  }

  try {
    const result = await pool.query(
      `SELECT tickets.*, companies.*
           FROM tickets
           JOIN companies ON tickets.client_id = companies.user_id
           WHERE client_id = $1 AND tickets.status = 'submitted'
           ORDER BY tickets.created_at DESC`,
      [user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Błąd pobierania zgłoszeń o statusie submitted:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.getUserScheduledProtocols = async (req, res) => {
  const user = req.session.user;

  if (!user || user.role !== "client") {
    return res.status(403).json({ message: "Brak dostępu" });
  }

  try {
    const result = await pool.query(
      `SELECT tickets.*, companies.*
             FROM tickets
             JOIN companies ON tickets.client_id = companies.user_id
             WHERE client_id = $1 AND tickets.status = 'scheduled'
             ORDER BY tickets.created_at DESC`,
      [user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Błąd pobierania zgłoszeń o statusie scheduled:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.getUserClosedProtocols = async (req, res) => {
  const user = req.session.user;

  if (!user || user.role !== "client") {
    return res.status(403).json({ message: "Brak dostępu" });
  }

  try {
    const result = await pool.query(
      `SELECT tickets.*, companies.*
             FROM tickets
             JOIN companies ON tickets.client_id = companies.user_id
             WHERE client_id = $1 AND tickets.status = 'closed'
             ORDER BY tickets.created_at DESC`,
      [user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Błąd pobierania zamkniętych zgłoszeń:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

// ADMIN
exports.getTodayProtocols = async (req, res) => {
  const user = req.session.user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Brak dostępu" });
  }

  try {
    const result = await pool.query(
      `SELECT tickets.*, companies.*
       FROM tickets
       JOIN companies ON tickets.client_id = companies.user_id
       WHERE tickets.status = 'scheduled'
         AND DATE(tickets.scheduled_at) = CURRENT_DATE
       ORDER BY tickets.created_at DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Błąd pobierania dzisiejszych zgłoszeń (admin):", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.getSubmittedProtocols = async (req, res) => {
  const user = req.session.user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Brak dostępu" });
  }

  try {
    const result = await pool.query(
      `SELECT tickets.*, companies.*
         FROM tickets
         JOIN companies ON tickets.client_id = companies.user_id
         WHERE tickets.status = 'submitted'
         ORDER BY tickets.created_at DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Błąd pobierania submitted zgłoszeń:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.getScheduledProtocols = async (req, res) => {
  const user = req.session.user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Brak dostępu" });
  }

  try {
    const result = await pool.query(
      `SELECT tickets.*, companies.*
         FROM tickets
         JOIN companies ON tickets.client_id = companies.user_id
         WHERE tickets.status = 'scheduled'
         ORDER BY tickets.created_at DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Błąd pobierania scheduled zgłoszeń:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.getClosedProtocols = async (req, res) => {
  const user = req.session.user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Brak dostępu" });
  }

  try {
    const result = await pool.query(
      `SELECT tickets.*, companies.*
         FROM tickets
         JOIN companies ON tickets.client_id = companies.user_id
         WHERE tickets.status = 'closed'
         ORDER BY tickets.created_at DESC`
    );

    console.log(result);

    res.json(result.rows);
  } catch (err) {
    console.error("Błąd pobierania closed zgłoszeń:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};
