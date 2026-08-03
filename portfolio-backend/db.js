// Tiny file-backed JSON store. Fine for a personal contact form's traffic.
// Swap this for a real database (Postgres, MongoDB) if you outgrow it.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DB_PATH = path.join(__dirname, "data", "messages.json");

function ensureFile() {
  if (!fs.existsSync(DB_PATH)) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, "[]", "utf-8");
  }
}

function readAll() {
  ensureFile();
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeAll(messages) {
  fs.writeFileSync(DB_PATH, JSON.stringify(messages, null, 2), "utf-8");
}

function addMessage({ name, email, message }) {
  const messages = readAll();
  const entry = {
    id: crypto.randomUUID(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
    replied: false,
    replyText: null,
    repliedAt: null,
  };
  messages.unshift(entry);
  writeAll(messages);
  return entry;
}

function listMessages() {
  return readAll();
}

function markReplied(id, replyText) {
  const messages = readAll();
  const idx = messages.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  messages[idx].replied = true;
  messages[idx].replyText = replyText;
  messages[idx].repliedAt = new Date().toISOString();
  writeAll(messages);
  return messages[idx];
}

function getMessage(id) {
  return readAll().find((m) => m.id === id) || null;
}

module.exports = { addMessage, listMessages, markReplied, getMessage };
