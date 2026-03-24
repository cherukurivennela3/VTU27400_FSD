const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "payment_db"
});

// GET all accounts
app.get("/accounts", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM accounts");
  res.json(rows);
});

// POST payment (Transaction)
app.post("/pay", async (req, res) => {
  const { sender, receiver, amount } = req.body;

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [rows] = await connection.query(
      "SELECT balance FROM accounts WHERE account_id = ?",
      [sender]
    );

    if (rows.length === 0) {
      throw new Error("Sender not found");
    }

    if (rows[0].balance < amount) {
      throw new Error("Insufficient balance");
    }

    await connection.query(
      "UPDATE accounts SET balance = balance - ? WHERE account_id = ?",
      [amount, sender]
    );

    await connection.query(
      "UPDATE accounts SET balance = balance + ? WHERE account_id = ?",
      [amount, receiver]
    );

    await connection.commit();

    res.json({ success: true, message: "Payment successful" });

  } catch (err) {
    await connection.rollback();

    res.status(400).json({
      success: false,
      message: err.message
    });

  } finally {
    connection.release();
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
