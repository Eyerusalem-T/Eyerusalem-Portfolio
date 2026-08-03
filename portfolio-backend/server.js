require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("./db");
const { notifyAdminOfNewMessage, sendReplyToSender } = require("./mailer");

const app = express();
const PORT = process.env.PORT || 4000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "*")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.includes("*") ? true : allowedOrigins,
  })
);
app.use(express.json());
app.use("/admin", express.static(path.join(__dirname, "public")));

function requireAdmin(req, res, next) {
  const token = req.header("x-admin-token");
  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// Public: the portfolio's contact form posts here.
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email, and message are all required" });
  }
  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return res.status(400).json({ error: "Invalid field types" });
  }
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return res.status(400).json({ error: "One or more fields is too long" });
  }

  const entry = db.addMessage({ name: name.trim(), email: email.trim(), message: message.trim() });

  try {
    await notifyAdminOfNewMessage(entry);
  } catch (err) {
    console.error("Failed to send admin notification email:", err.message);
    // Message is still saved even if the notification email fails.
  }

  res.status(201).json({ ok: true, id: entry.id });
});

// Admin: list all messages. Requires x-admin-token header.
app.get("/api/messages", requireAdmin, (req, res) => {
  res.json(db.listMessages());
});

// Admin: send a reply to a message's sender by email.
app.post("/api/messages/:id/reply", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { replyText } = req.body || {};
  if (!replyText || typeof replyText !== "string") {
    return res.status(400).json({ error: "replyText is required" });
  }

  const existing = db.getMessage(id);
  if (!existing) return res.status(404).json({ error: "Message not found" });

  const updated = db.markReplied(id, replyText.trim());

  try {
    const result = await sendReplyToSender(updated);
    if (!result.sent) {
      return res.json({ ok: true, saved: true, emailed: false, note: result.reason });
    }
  } catch (err) {
    console.error("Failed to send reply email:", err.message);
    return res.json({ ok: true, saved: true, emailed: false, note: "Email send failed, see server logs" });
  }

  res.json({ ok: true, saved: true, emailed: true });
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Portfolio contact API listening on port ${PORT}`);
  console.log(`Admin dashboard: http://localhost:${PORT}/admin`);
  if (!ADMIN_TOKEN) console.warn("⚠ ADMIN_TOKEN is not set — the admin routes will reject all requests.");
});
