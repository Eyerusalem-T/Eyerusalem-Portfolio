const nodemailer = require("nodemailer");

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null; // not configured yet — server still runs, emails just get skipped
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: SMTP_SECURE !== "false",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

async function notifyAdminOfNewMessage(entry) {
  const t = getTransporter();
  if (!t) return { sent: false, reason: "SMTP not configured" };

  await t.sendMail({
    from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: entry.email,
    subject: `New portfolio message from ${entry.name}`,
    text: `${entry.message}\n\n— ${entry.name} <${entry.email}>`,
  });
  return { sent: true };
}

async function sendReplyToSender(entry) {
  const t = getTransporter();
  if (!t) return { sent: false, reason: "SMTP not configured" };

  await t.sendMail({
    from: `"${process.env.ADMIN_EMAIL}" <${process.env.SMTP_USER}>`,
    to: entry.email,
    subject: `Re: your message`,
    text: `${entry.replyText}\n\n---\nYour original message:\n${entry.message}`,
  });
  return { sent: true };
}

module.exports = { notifyAdminOfNewMessage, sendReplyToSender };
