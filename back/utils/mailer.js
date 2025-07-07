// utils/mailer.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false // ปิดการตรวจ cert (ในกรณีใช้ self-signed)
  }
});

function sendMail(to, subject, text, callback) {
  transporter.sendMail({
    from: `"MFU System" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  }, (error, info) => {
    if (error) {
      console.error("❌ Email sending failed:", error);
      if (callback) callback(error);
    } else {
      console.log(`📧 Email sent to ${to}`);
      if (callback) callback(null, info);
    }
  });
}


module.exports = sendMail;
