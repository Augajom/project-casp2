const express = require('express')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router()
const GetProjects = require('../models/Head/Get_project')
const GetPlTimelines = require('../models/GetPLTimelines')
const GetDataTimeline = require('../models/GetDataTimeline')

// Email
const sendMail = require("../utils/mailer"); //1
const { getProjectNameAndUserEmail } = require("../models/emailModel");

// Update timeline
const updateProjectStatus = require('../models/Head/ConsiderStatus')

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


router.post('/consider/status', (req, res) => {
  const { status, project_id, comment } = req.body;

  updateProjectStatus({ status, project_id, comment }, (err, result) => {
    if (err) {
      console.error('❌ Error updating status:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    // ตอบ client ทันทีหลังอัปเดตเสร็จ
    res.json({ success: true });

    if (status == 3) {
      getProjectNameAndUserEmail(project_id, (err2, data) => {
        if (err2) {
          return console.error('❌ Error fetching project data:', err2);
        }

        if (data &&data.user_email) {
          const subject = `แจ้งตีกลับข้อเสนอโครงการบริการวิชาการ - ${data.project_name}`;
          const message = `
            เรียน หัวหน้าโครงการ

            ตามที่ท่านได้จัดส่งข้อเสนอโครงการบริการวิชาการเข้ามาในระบบ หัวข้อ "${data.project_name}"
            ทั้งนี้ มีข้อเสนอแนะเพิ่มเติมจากผู้ประเมิน 
            โปรดตรวจสอบรายละเอียดได้ที่ https://asds-cas.mfu.ac.th/

            ขอแสดงความนับถือ

            หมายเหตุ: ข้อความนี้เป็นข้อความอัตโนมัติ กรุณาอย่าตอบกลับ
          `;

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

router.post('/projects',(req,res)=>{
    GetProjects(req.body,(err,results)=>{
        if(err){
            return res.status(500).json({ success: false, message: 'An error occurred while fetching the data.' })
        }
        return res.status(200).json({ success: true, message: 'Data fetched successfully.',data: results });
    })
})

module.exports = router;