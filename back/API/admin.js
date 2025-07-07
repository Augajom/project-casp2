const express = require('express')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const AllPermissions = require('../models/Admin/AllPermissions')
const AdminGetUser = require('../models/Admin/AdminGetUser')
const AdminActiveRole = require('../models/Admin/AdminActiveRole')
const AdminInActiveRole = require('../models/Admin/AdminInActiveRole')
const AdminDeleteRole = require('../models/Admin/AdminDeleteRole');
const AdminAddPermission = require('../models/Admin/AdminAddPermission');
const AdminAddAccount = require('../models/Admin/AdminAddAccount')
const AdminDeleteAccount = require('../models/Admin/AdminDeleteAccount')
const AdminDeleteAllRole = require('../models/Admin/AdminDeleteAllRole')
const GetProjects = require('../models/Admin/Get_project')
const ConsiderStatus = require('../models/Admin/ConsiderStatus')
const toggleState = require('../models/Admin/ToggleProposal')
const GetStatus = require('../models/Admin/Get_status')
const AdminSetFiscalYear = require('../models/Admin/AdminSetFiscal');
const AdminGetFiscalYear = require('../models/Admin/AdminGetFiscal');
const AdminDeleteFiscalYear = require('../models/Admin/AdminDeleteFiscal');
const editProfile = require('../models/Admin/AdminEditProfile');
const GetPlTimelines = require('../models/GetPLTimelines')
const GetDataTimeline = require('../models/GetDataTimeline')
//Upload User .xlsx
const { insertUser, insertUserAccess } = require('../models/Admin/UserUpload');
const getAllEmails = require('../models/Admin/AdminGetEmail')

// try by Aris
const { getDashboardSummary, getFiscalYears } = require('../models/Admin/Dashboard');

router.post('/fiscal/delete', (req, res) => {
    const { fiscal_id } = req.body;

    AdminDeleteFiscalYear({ fiscal_id }, (err, results) => {
        if (err) {
            console.error('Error deleting fiscal year:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'เกิดข้อผิดพลาดในการลบปีงบประมาณ' 
            });
        }
        
        // แก้ไข: ใช้ results.affectedRows แทน results.rowCount
        if (results.affectedRows === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'ไม่พบปีงบประมาณที่ต้องการลบ' 
            });
        }
        
        return res.status(200).json({ 
            success: true, 
            message: 'ลบปีงบประมาณสำเร็จ' 
        });
    });
});


router.get('/fiscals', (req, res) => {
  AdminGetFiscalYear((err, results) => {
    if (err) {
      console.error('Error fetching fiscal years:', err);
      return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูลปีงบประมาณ' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'ไม่พบปีงบประมาณที่บันทึกไว้' });
    }

    return res.status(200).json({ success: true, message: 'ดึงข้อมูลปีงบประมาณสำเร็จ', data: results });
  });
});

router.post('/fiscal/add', (req, res) => {
  AdminSetFiscalYear(req.body, (err, results) => {
    
    if (err) {
      console.error('Insert Error:', err);
      return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการบันทึกปีงบประมาณ' });
    }

    return res.status(201).json({ success: true, message: 'เพิ่มปีงบประมาณสำเร็จ' });
  });
});

router.get('/status',(req,res)=>{
    GetStatus((err,results)=>{
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูลสถานะการอนุมัติ' });
        }

        return res.status(200).json({ success: true, message: 'สำเร็จ',results: results });
    })
})

// Users Upload
// ใช้ memory storage (RAM)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const xlsx = require('xlsx')

router.post('/upload-user-form', upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = xlsx.utils.sheet_to_json(sheet);

    const rawUsers = json.map(row => ({
      user_email: row.Email?.trim(),
      user_employeeID: row.ID?.toString().trim(),
      user_name: row.Name?.trim(),
      user_affiliation: row.Affiliation?.toString().trim(),
      roles: row.Role?.toString().trim(),
    })).filter(user =>
      user.user_email &&
      user.user_employeeID &&
      user.user_name &&
      user.user_affiliation
    );

    // ห่อ getAllEmails ที่ใช้ callback ด้วย Promise
    const existingEmails = await new Promise((resolve, reject) => {
      getAllEmails((err, emails) => {
        if (err) return reject(err);
        resolve(emails);
      });
    });

    const users = rawUsers.filter(user =>
      !existingEmails.includes(user.user_email.toLowerCase())
    );

    for (const user of users) {
      const { roles, ...userData } = user;

      const userId = await new Promise((resolve, reject) => {
        insertUser(userData, (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        });
      });

      const roleIds = roles?.split(',').map(r => parseInt(r.trim())).filter(r => !isNaN(r));

      for (const permissionId of roleIds || []) {
        await new Promise((resolve, reject) => {
          insertUserAccess({
            access_user: userId,
            access_permission: permissionId,
            access_isActive: 1
          }, (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });
      }
    }

    const skipped = rawUsers.length - users.length;

    res.status(200).json({
      success: true,
      message: `บันทึกผู้ใช้จาก Excel สำเร็จแล้ว ${users.length} รายการ (ข้ามซ้ำ ${skipped})`
    });
  } catch (error) {
    console.error('Upload Excel Error:', error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการประมวลผล Excel' });
  }
});


router.post('/edit/user', (req, res) => {
    const { user_email, user_employeeID, user_name, user_affiliation, user_id } = req.body;

    if (!user_email || !user_employeeID || !user_name || !user_affiliation || !user_id) {
        return res.status(400).json({
            success: false,
            message: 'กรุณากรอกข้อมูลให้ครบถ้วน'
        });
    }

    editProfile(req.body, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                success: false,
                message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'อัปเดตข้อมูลสำเร็จ',
            data: result
        });
    });
});

//
router.post('/toggle/proposal_state',(req,res)=>{
    //console.log(req.body)
    toggleState(req.body,(err,result)=>{
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการอัปเดตสถานะ' });
        }

        return res.status(200).json({ success: true, message: 'อัพเดทสถานะสำเร็จ' });
    })
})

router.post('/timelines',(req,res)=>{
    //console.log(req.body)
    GetPlTimelines(req.body,(err,results)=>{
        if(err){
            return res.status(500).json({ success: false, message: 'An error occurred while fetching the timelines.' })
        }
        return res.status(200).json({ success: true, message: 'Timelines fetched successfully.', data: results });
    })
})

router.post('/timelines/data',(req,res)=>{
    GetDataTimeline(req.body,(err,result)=>{
        if(err){
            return res.status(500).json({ success: false, message: 'An error occurred while fetching the data timelines.' })
        }
        return res.status(200).json({ success: true, message: 'Data Timelines fetched successfully.', data: result });
    })
})

router.get('/file/timeline', (req, res) => {
  const { projectId, projectType } = req.query;

  if (!projectId || !projectType) {
    return res.status(400).send({ success: false, message: 'Missing projectId or projectType' });
  }

  const folderPath = path.join(__dirname, '../Files');

  let files = [];
  try {
    files = fs.readdirSync(folderPath);
  } catch (err) {
    console.error('ไม่สามารถอ่านโฟลเดอร์:', err);
    return res.status(500).send({ success: false, message: 'Read folder failed' });
  }

  const matchFiles = files.filter(f => f.startsWith(`${projectId}-${projectType}`));

  if (matchFiles.length === 0) {
    return res.send({ success: true, files: [] });
  }

  res.send({
    success: true,
    files: matchFiles.sort(), //เรียงจากเก่าไปใหม่
  });
});

// Email + status
const sendMail = require("../utils/mailer"); //1
const { getProjectNameAndUserEmail } = require("../models/emailModel");

router.post('/consider/status', (req, res) => { 
  const { status, project_id, comment } = req.body;

  // อัปเดตสถานะใน DB
  ConsiderStatus(req.body, (err, result) => {
    if (err) {
      console.error('❌ Error updating status:', err);
      return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการอัปเดตสถานะ' });
    }

    // ตอบ client ทันทีหลังอัปเดตเสร็จ
    res.status(200).json(result);

    // ส่งอีเมลแบบ fire-and-forget
    if ([5, 7, 8, 9, 10, 11, 12, 13].includes(status)) {
      getProjectNameAndUserEmail(project_id, (err2, data) => {
        if (err2) {
          return console.error('❌ Error fetching project data:', err2);
        }

        if (data && data.user_email) {
          let subject = '';
          let message = '';

          if (status == 5) {
            subject = `แจ้งตีกลับข้อเสนอโครงการบริการวิชาการ - ${data.project_name}`;
            message = `
              เรียน หัวหน้าโครงการ

              ตามที่ท่านได้จัดส่งข้อเสนอโครงการบริการวิชาการเข้ามาในระบบ หัวข้อ "${data.project_name}"
              ทั้งนี้ มีข้อเสนอแนะเพิ่มเติมจากผู้ประเมิน 
              โปรดตรวจสอบรายละเอียดได้ที่ https://asds-cas.mfu.ac.th/

              ขอแสดงความนับถือ

              หมายเหตุ: ข้อความนี้เป็นข้อความอัตโนมัติ กรุณาอย่าตอบกลับ
            `;
          } else if (status == 7) {
            subject = `แจ้งผลการพิจารณาโครงการ - ไม่อนุมัติ (${data.project_name})`;
            message = `
เรียน หัวหน้าโครงการ

ตามที่ท่านได้ส่งข้อเสนอโครงการบริการวิชาการ "${data.project_name}" คณะกรรมการบริหารงานบริการวิชาการ มีมติ **ไม่อนุมัติ**

โปรดตรวจสอบรายละเอียดได้ที่ https://asds-cas.mfu.ac.th/

ขอแสดงความนับถือ

หมายเหตุ: ข้อความนี้เป็นข้อความอัตโนมัติ กรุณาอย่าตอบกลับ
            `;
          } else {
            subject = `แจ้งผลการพิจารณาโครงการ - อนุมัติ (${data.project_name})`;
            message = `
เรียน หัวหน้าโครงการ

ตามที่ท่านได้ส่งข้อเสนอโครงการบริการวิชาการ "${data.project_name}" คณะกรรมการบริหารงานบริการวิชาการ มีมติ **อนุมัติ**

โปรดตรวจสอบรายละเอียดเพิ่มเติมที่ https://asds-cas.mfu.ac.th/

ขอแสดงความนับถือ

หมายเหตุ: ข้อความนี้เป็นข้อความอัตโนมัติ กรุณาอย่าตอบกลับ
            `;
          }

          sendMail(data.user_email, subject, message, (mailErr) => {
            if (mailErr) {
              console.error('❌ Error sending email:', mailErr);
            } else {
              console.log(`📧 Email sent to ${data.user_email}`);
            }
          });
        }
      });
    }
  });
});


router.post('/projects',(req,res)=>{
    GetProjects(req.body,(err,results)=>{
        if(err){
            return res.status(500).json({ success: false, message: 'An error occurred while fetching the data.' })
        }
        return res.status(200).json({ success: true, message: 'Data fetched successfully.',data: results });
    })
})


router.post('/add/account', (req, res) => {
    //console.log(req.body)
    AdminAddAccount(req.body, (err, result) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message })
        } else {
            return res.json({ success: true, message: result.message })
        }
    })
})

router.post('/delete/account', (req,res)=>{
    AdminDeleteAllRole(req.body,(err,result)=>{
        if(err){
            return res.status(500).json({ success: false, message: 'An error occurred when delete permissions' })
        }
        //console.log(result)
        AdminDeleteAccount(req.body, (err,results)=>{
            if(err){
                return res.status(500).json({ success: false, message: 'An error occurred when delete account' })
            }
            if(results.affectedRows > 0){
                return res.status(200).json({ success: true})
            }
            
        })
    })
})

router.post('/users/permissions', (req, res) => {
    AllPermissions(req.body,(err, results) => {
        if (err) {
            res.json({ success: false, message: 'An error occurred' });
        } else {
            // res.json({ success: true, Data: results ? results : {} });
            res.json({success: true, result : results})
        }
    });
})


router.post('/access/user', (req, res) => {
    //console.log(req.body)
    AdminGetUser(req.body,(err, results) => {
        if (err) {
            res.json({ success: false, message: 'An error occurred' });
        } else {
            // res.json({ success: true, Data: results ? results : {} });
            res.json({success: true, result : results})
        }
    });
})

router.post('/active/role',(req,res)=>{
    AdminActiveRole(req.body,(err,result)=>{
        if (err) {
            res.json({ success: false, message: 'An error occurred' });
        } else {
            // res.json({ success: true, Data: results ? results : {} });
            res.json({success: true, message: 'เปิดใช้สิทธิ์เสร็จสมบูรณ์'})
        }
    })
})

router.post('/in-active/role',(req,res)=>{
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ success: false, message: 'No data provided' });
    }
    AdminInActiveRole(req.body,(err,result)=>{
        if (err) {
            res.json({ success: false, message: 'An error occurred' });
        } else {
            // res.json({ success: true, Data: results ? results : {} });
            res.json({success: true, message: 'ยกเลิกสิทธิ์ผู้ใช้เสร็จสมบูรณ์'})
        }
    })
})

router.post('/delete/role',(req,res)=>{
    AdminDeleteRole(req.body,(err,result)=>{
        if (err) {
            res.json({ success: false, message: 'An error occurred' });
        } else {
            // res.json({ success: true, Data: results ? results : {} });
            res.json({success: true, message: 'ลบสิทธิ์ใช้งานเสร็จสมบูรณ์'})
        }
    })

})
router.post('/add/permission', (req, res) => {
    AdminAddPermission(req.body, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'An error occurred' });
        }

        //console.log(results);

        // Check if the permission already exists
        if (results.success === false) {
            return res.status(409).json({ success: false, message: results.message });
        }

        // Check if the permission was successfully added
        if (results.data.affectedRows > 0) {
            return res.status(200).json({ success: true, message: 'Permission added successfully.' });
        } else {
            return res.status(400).json({ success: false, message: 'No permission was added.' });
        }
    });
});


//try by Aris 
// router.post('/dashboard-summary', (req, res) => {
//   getDashboardSummary(req.body, (err, results) => {
//     if (err) {
//       console.error("Error in dashboard summary:", err);
//       return res.status(500).json({ success: false, error: err.message }); // Always return array
//     }
//     res.json(results);
//   });
// });

router.get('/fiscal-years', (req, res) => {
  getFiscalYears((err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching fiscal years",
        error: err.message
      });
    }
    res.json({
      success: true,
      result: result
    });
  });
});

// Modify existing dashboard-summary route
router.post('/dashboard-summary', (req, res) => {
  getDashboardSummary(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching dashboard summary",
        error: err.message
      });
    }
    res.json(result);
  });
});
//
module.exports = router;