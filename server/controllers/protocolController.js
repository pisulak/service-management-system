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
      "SELECT id FROM users WHERE id = 1 AND role = 'admin'"
    );

    if (admin.rowCount === 0) {
      return res.status(400).json({ message: "Admin o ID 1 nie istnieje" });
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
      `SELECT tickets.*, companies.address, companies.company_name, companies.nip, companies.phone_number, companies.join_date, companies.priority
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
      `SELECT tickets.*, companies.address, companies.company_name, companies.nip, companies.phone_number, companies.join_date, companies.priority
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
      `SELECT tickets.*, companies.address, companies.company_name, companies.nip, companies.phone_number, companies.join_date, companies.priority
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
      `SELECT tickets.*, companies.address, companies.company_name, companies.nip, companies.phone_number, companies.join_date, companies.priority
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
      `SELECT tickets.*, companies.address, companies.company_name, companies.nip, companies.phone_number, companies.join_date, companies.priority
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
      `SELECT tickets.*, companies.address, companies.company_name, companies.nip, companies.phone_number, companies.join_date, companies.priority
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
      `SELECT tickets.*, companies.address, companies.company_name, companies.nip, companies.phone_number, companies.join_date, companies.priority
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
      `SELECT tickets.*, companies.address, companies.company_name, companies.nip, companies.phone_number, companies.join_date, companies.priority
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

exports.getProtocolBasedOnID = async (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.status(403).json({ message: "Brak dostępu" });
  }

  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT
  t.*,
  c.address,
  c.company_name,
  c.nip,
  c.phone_number,
  c.join_date,
  c.priority,

  (
    SELECT 
      json_agg(
        json_build_object(
          'work_date',    ws.work_date,
          'start_time',   ws.start_time,
          'end_time',     ws.end_time,
          'duration',     ws.duration
        ) ORDER BY ws.work_date
      )
    FROM work_sessions ws
    WHERE ws.ticket_id = t.id
  ) AS work_sessions,

  (
    SELECT
      json_agg(
        json_build_object(
          'part_id',       up.part_id,
          'quantity_used', up.quantity_used,
          'code',          p.code,
          'product',       p.product,
          'price',         p.price
        ) ORDER BY p.product
      )
    FROM used_parts up
    JOIN parts p ON up.part_id = p.id
    WHERE up.ticket_id = t.id
  ) AS used_parts

FROM tickets t
JOIN companies c
  ON t.client_id = c.user_id
WHERE t.id = $1
;
`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Nie znaleziono zgłoszenia" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Błąd pobierania zgłoszenia po ID:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

// PUT

exports.editScheduledDate = async (req, res) => {
  const user = req.session.user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Brak dostępu" });
  }

  const { id } = req.params;
  const { scheduledDate } = req.body;

  if (!scheduledDate) {
    return res.status(400).json({ message: "Brak daty w żądaniu" });
  }

  try {
    const result = await pool.query(
      `UPDATE tickets
       SET
         scheduled_at = $1 ,
         status = 'scheduled'
       WHERE id = $2
       RETURNING *;`,
      [scheduledDate, id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Nie znaleziono zgłoszenia lub już zaplanowane" });
    }

    res.json({ message: "Zaktualizowano zgłoszenie", ticket: result.rows[0] });
  } catch (err) {
    console.error("Błąd aktualizacji zgłoszenia:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

// -----------------------------------------

exports.handleCloseProtocol = async (req, res) => {
  const user = req.session.user;
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Brak dostępu" });
  }

  const { id } = req.params;
  const { closedDate, workSessions, usedParts } = req.body;

  if (!closedDate) {
    return res
      .status(400)
      .json({ message: "Brak daty zamknięcia (closedDate)" });
  }
  if (
    typeof closedDate !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(closedDate)
  ) {
    return res
      .status(400)
      .json({ message: "closedDate powinno być w formacie YYYY-MM-DD" });
  }

  const sessions = Array.isArray(workSessions) ? workSessions : [];
  const parts = Array.isArray(usedParts) ? usedParts : [];

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const updateTicketQuery = `
        UPDATE tickets
        SET
          closed_at = $1,
          status = 'closed'
        WHERE id = $2
        RETURNING *;
      `;
    const ticketResult = await client.query(updateTicketQuery, [
      closedDate,
      id,
    ]);
    if (ticketResult.rowCount === 0) {
      await client.query("ROLLBACK");
      return res
        .status(404)
        .json({ message: "Nie znaleziono zgłoszenia lub już zamknięte" });
    }

    if (sessions.length > 0) {
      for (const ws of sessions) {
        if (
          typeof ws.work_date !== "string" ||
          !/^\d{4}-\d{2}-\d{2}$/.test(ws.work_date) ||
          typeof ws.start_time !== "string" ||
          !/^\d{2}:\d{2}$/.test(ws.start_time) ||
          typeof ws.end_time !== "string" ||
          !/^\d{2}:\d{2}$/.test(ws.end_time) ||
          typeof ws.duration !== "number"
        ) {
          await client.query("ROLLBACK");
          return res.status(400).json({
            message:
              "Błędny format workSessions – każdy entry musi mieć work_date: YYYY-MM-DD, start_time: HH:MM, end_time: HH:MM, duration: liczba",
          });
        }
      }

      const existingDatesRes = await client.query(
        `SELECT work_date FROM work_sessions WHERE ticket_id = $1;`,
        [id]
      );
      const existingDates = new Set(
        existingDatesRes.rows.map((r) => r.work_date)
      );

      const sessionsToInsert = sessions.filter(
        (s) => !existingDates.has(s.work_date)
      );

      if (sessionsToInsert.length > 0) {
        const wsValues = [];
        const wsPlaceholders = sessionsToInsert
          .map((s, idx) => {
            const base = idx * 5;
            wsValues.push(
              id,
              s.work_date,
              s.start_time,
              s.end_time,
              s.duration
            );
            return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${
              base + 5
            })`;
          })
          .join(", ");

        const insertWorkSessionsQuery = `
            INSERT INTO work_sessions (ticket_id, work_date, start_time, end_time, duration)
            VALUES ${wsPlaceholders};
          `;
        await client.query(insertWorkSessionsQuery, wsValues);
      }
    }

    if (parts.length > 0) {
      for (const up of parts) {
        if (
          typeof up.part_id !== "number" ||
          typeof up.quantity_used !== "number" ||
          up.quantity_used <= 0
        ) {
          await client.query("ROLLBACK");
          return res.status(400).json({
            message:
              "Błędny format usedParts – każdy entry musi mieć part_id: liczba, quantity_used: liczba > 0",
          });
        }
      }

      const upValues = [];
      const upPlaceholders = parts
        .map((item, idx) => {
          const base = idx * 3;
          upValues.push(id, item.part_id, item.quantity_used);
          return `($${base + 1}, $${base + 2}, $${base + 3})`;
        })
        .join(", ");

      const insertUsedPartsQuery = `
          INSERT INTO used_parts (ticket_id, part_id, quantity_used)
          VALUES ${upPlaceholders};
        `;
      await client.query(insertUsedPartsQuery, upValues);

      for (const item of parts) {
        const updatePartQuantityQuery = `
            UPDATE parts
            SET quantity = quantity - $1
            WHERE id = $2
              AND quantity >= $1
          `;
        const updateRes = await client.query(updatePartQuantityQuery, [
          item.quantity_used,
          item.part_id,
        ]);
        if (updateRes.rowCount === 0) {
          await client.query("ROLLBACK");
          return res.status(400).json({
            message: `Brak wystarczającej ilości części o ID = ${item.part_id}`,
          });
        }
      }
    }

    await client.query("COMMIT");
    return res.json({
      message: "Zamknięto zgłoszenie oraz dodano sesje i części",
      ticket: ticketResult.rows[0],
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Błąd podczas zamykania protokołu:", err);
    return res.status(500).json({ message: "Błąd serwera: " + err.message });
  } finally {
    client.release();
  }
};

exports.getTicketsByUserID = async (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.status(403).json({ message: "Brak dostępu" });
  }

  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT
        t.*
      FROM tickets t
      WHERE t.client_id = $1
      ORDER BY t.created_at DESC
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Brak zgłoszeń dla tego użytkownika" });
    }

    res.json(result.rows);
  } catch (err) {
    console.error("Błąd pobierania zgłoszeń użytkownika:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};
