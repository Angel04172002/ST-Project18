const express = require('express')
const router = express.Router()

const absencesController = require('../controllers/absences.controller');

router.post('/add/absences', absencesController.addAbsencesByTeacher);
router.post('/add/excuse-reasons', absencesController.addExcuseReasonsByParent);

router.post('/get-absences/grade-teacher', absencesController.getAbsencesByGradeTeacher);
router.post('/get-absences/teacher', absencesController.getAbsencesByTeacher);
router.post('/get-absences/student', absencesController.getAbsencesByStudent);
router.post('/get-absences/parent', absencesController.getAbsencesByParent);

router.post('/get-excuse-reasons/grade-teacher', absencesController.getExcuseReasonsByGradeTeacher);
router.post('/get-excuse-reasons/teacher', absencesController.getExcuseReasonsByTeacher);
router.post('/get-excuse-reasons/parent', absencesController.getExcuseReasonsByParent);



module.exports = router