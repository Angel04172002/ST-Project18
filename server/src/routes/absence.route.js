const express = require('express')
const router = express.Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads/', limits: { fileSize: 10 * 1024 * 1024 } }); // temporarily stores files in 'uploads' folder

const absencesController = require('../controllers/absences.controller');

router.post('/add/absences', absencesController.addAbsencesByTeacher);
//router.post('/add/excuse-reasons', absencesController.addExcuseReasonsByParent);
//upload.fields([{ name: 'file', maxCount: 1 }, { name: 'excuseReasons', maxCount: 1 }])
router.post('/add/excuse-reasons', upload.single('file'), absencesController.addExcuseReasonsByParent);

router.post('/update/absences', absencesController.updateAbsencesByTeacher);

router.get('/get-absences/grade-teacher', absencesController.getAbsencesByGradeTeacher);
router.get('/get-absences/teacher', absencesController.getAbsencesByTeacher);
router.get('/get-absences/student', absencesController.getAbsencesByStudent);
router.get('/get-absences/parent', absencesController.getAbsencesByParent);

router.get('/get-excuse-reasons/grade-teacher', absencesController.getExcuseReasonsByGradeTeacher);
router.get('/get-excuse-reasons/teacher', absencesController.getExcuseReasonsByTeacher);
router.get('/get-excuse-reasons/parent', absencesController.getExcuseReasonsByParent);
router.get('/get-excuse-reasons/student', absencesController.getExcuseReasonsByStudent);



module.exports = router