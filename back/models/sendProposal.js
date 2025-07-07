const con = require('../config/database');

// อัปเดต project_status, fiscal_year และ send_at
const SQL_SEND_PROPOSAL = `
    UPDATE projects 
    SET project_status = 2, fiscal_year = ?, send_at = ?
    WHERE project_id = ? AND project_type = ?;
`;

// ตรวจสอบว่ากรอกข้อมูลครบทุกหน้า
const SQL_CHECK_DRAFT = `
    SELECT
      CASE
        WHEN project_data_p_1 IS NOT NULL
         AND project_data_p_2 IS NOT NULL
         AND project_data_p_3 IS NOT NULL
         AND project_data_p_4 IS NOT NULL
         AND project_data_p_5 IS NOT NULL
         AND project_data_p_6 IS NOT NULL
        THEN TRUE
        ELSE FALSE
      END AS all_fields_filled
    FROM project_data
    WHERE project_id = ?;
`;

// สร้าง timeline การเปลี่ยนสถานะ
const SQL_CREATE_TIMELINE = `
    INSERT INTO project_timelines(project_timeline_projectId, project_timeline_status_id)
    VALUES (?, ?);
`;

// ดึงช่วงปีงบประมาณที่เปิดใช้งาน
const SQL_GET_FISCAL_YEARS = `
  SELECT fiscal_year, start_date, end_date
  FROM fiscal_years
  WHERE status = 'active';
`;

// ฟังก์ชันหลักในการส่งข้อเสนอ
const sendProposal = (data, callback) => {
    const { project_id, project_type } = data;

    if (!project_id || !project_type) {
        return callback(new Error("project_id and project_type are required"), null);
    }

    // 1. ตรวจสอบว่าแบบฟอร์มกรอกครบทุกหน้า
    con.query(SQL_CHECK_DRAFT, [project_id], (err, result) => {
        if (err) return callback(err, null);

        const allFilled = result[0]?.all_fields_filled;

        if (allFilled !== 1) {
            return callback(null, {
                success: false,
                message: 'กรุณากรอกข้อมูลโครงการให้ครบทุกหน้าก่อนส่งเสนอ'
            });
        }

        // 2. ใช้เวลา ณ ตอนกดส่ง
        const now = new Date();
        const bangkokOffset = 7 * 60 * 60 * 1000;
        const sendDate = new Date(now.getTime() + bangkokOffset);

        // 3. ดึงข้อมูลปีงบประมาณที่เปิดอยู่ทั้งหมด
        con.query(SQL_GET_FISCAL_YEARS, (err, fiscalResults) => {
            if (err) return callback(err, null);

            let matchedFiscalYear = null;

            for (const fy of fiscalResults) {
                const start = new Date(fy.start_date);
                const end = new Date(fy.end_date);

                if (sendDate >= start && sendDate <= end) {
                    matchedFiscalYear = fy.fiscal_year;
                    break;
                }
            }

            // ถ้าไม่มีอยู่ในช่วงส่งข้อเสนอส่ง err ไปบอก
            if (!matchedFiscalYear) {
                return callback(null, {
                    success: false,
                    message: 'วันที่ส่งโครงการไม่ตรงกับช่วงปีงบประมาณที่เปิดรับ'
                });
            }

            // 4. อัปเดต status, fiscal_year, และ send_at
            con.query(SQL_SEND_PROPOSAL, [matchedFiscalYear, sendDate, project_id, project_type], (err, updateResult) => {
                if (err) return callback(err, null);

                // 5. สร้าง timeline การเปลี่ยนสถานะ
                con.query(SQL_CREATE_TIMELINE, [project_id, 2], (err, timelineResult) => {
                    if (err) return callback(err, null);

                    if (timelineResult.affectedRows > 0) {
                        return callback(null, {
                            success: true,
                            message: 'ส่งโครงการเสนอเรียบร้อย',
                            fiscal_year: matchedFiscalYear,
                            updateResult
                        });
                    } else {
                        return callback(null, {
                            success: false,
                            message: 'ไม่สามารถสร้าง timeline ได้'
                        });
                    }
                });
            });
        });
    });
};

module.exports = sendProposal;
