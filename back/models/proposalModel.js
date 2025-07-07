const cron = require('node-cron');
const moment = require('moment-timezone');
const db = require('../config/database');

// ✅ ตั้งสถานะเป็น active เมื่อ start_date ถึงวันนี้
const updateStartDate = () => {
  const today = moment().tz('Asia/Bangkok').format('YYYY-MM-DD');

  const sql = `
    UPDATE fiscal_years
    SET status = 'active'
    WHERE start_date <= ? AND end_date > ?
  `;

  db.query(sql, [today, today], (err, result) => {
    if (err) {
      console.error("❌ อัปเดตเป็น active ล้มเหลว:", err);
    } else {
      console.log("✅ อัปเดตเป็น active สำเร็จ");
      updateControlStatus();
    }
  });
};

// ✅ ตั้งสถานะเป็น inactive เมื่อ end_date <= วันนี้
const updateEndDate = () => {
  const today = moment().tz('Asia/Bangkok').format('YYYY-MM-DD');

  const sql = `
    UPDATE fiscal_years
    SET status = 'inactive'
    WHERE end_date <= ?
  `;

  db.query(sql, [today], (err, result) => {
    if (err) {
      console.error("❌ อัปเดตเป็น inactive ล้มเหลว:", err);
    } else {
      console.log("✅ อัปเดตเป็น inactive สำเร็จ");
      updateControlStatus();
    }
  });
};

// ✅ อัปเดต control_status ตาม status ปัจจุบัน
const updateControlStatus = () => {
  const sqlControl = `
    UPDATE controls
    SET control_status = (
      SELECT CASE
        WHEN EXISTS (
          SELECT 1 FROM fiscal_years WHERE status = 'active'
        ) THEN 1 ELSE 0
      END
    )
    WHERE control_name = 'is_open_proposal'
  `;

  db.query(sqlControl, (err, controlResult) => {
    if (err) {
      console.error("❌ อัปเดต control_status ล้มเหลว:", err);
    } else {
      console.log("✅ อัปเดต control_status สำเร็จ");
    }
  });
};

// ⏰ รันทุกวันตอน 00:00:01 สำหรับ start_date
cron.schedule('1 0 0 * * *', () => {
  console.log('🔁 รันอัปเดต start_date (00:00:01)');
  updateStartDate();
});

// ⏰ รันทุกวันตอน 23:59:59 สำหรับ end_date
cron.schedule('59 59 23 * * *', () => {
  console.log('🔁 รันอัปเดต end_date (23:59:59)');
  updateEndDate();
});
