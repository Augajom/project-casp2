const express = require('express')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router()
const getAllProject = require('../models/Commitee/getProject')
const GetPlTimelines = require('../models/GetPLTimelines')
const GetDataTimeline = require('../models/GetDataTimeline')
const CommiteeSendComment = require('../models/Commitee/sendComment')
const CommiteeGetComment = require('../models/Commitee/getComment')


router.post('/get/comment',(req,res)=>{
    CommiteeGetComment(req.body,(err,results)=>{
        if(err){
            return res.status(500).json({ success: false, message: 'An error occurred while fetching the comments.' })
        }
        return res.status(200).json({ success: true, message: 'Comments fetched successfully.', data: results });
    })
})

router.post('/send/comment',(req,res)=>{
    CommiteeSendComment(req.body,(err,results)=>{
        if(err){
            return res.status(500).json({ success: false, message: 'An error occurred while sending the comment.' })
        }
        return res.status(200).json({ success: true, message: 'Comment sent successfully.', data: results });
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

router.post('/projects',(req,res)=>{
    getAllProject(req.body,(err,results)=>{
        if(err){
            return res.status(500).json({ success: false, message: 'An error occurred while fetching the data.' })
        }
        return res.status(200).json({ success: true, message: 'Data fetched successfully.',data: results });
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

module.exports = router;