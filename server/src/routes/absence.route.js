const express = require('express')
const router = express.Router()

const absencesController = require('../controllers/absences.controller');

router.post('/add/absences', absencesController.addAbsencesByTeacher);
router.post('/add/excuse-reasons', absencesController.addExcuseReasonsByParent);

router.get('/get-absences/grade-teacher', absencesController.getAbsencesByGradeTeacher);
router.get('/get-absences/teacher', absencesController.getAbsencesByTeacher);
router.get('/get-absences/student', absencesController.getAbsencesByStudent);
router.get('/get-absences/parent', absencesController.getAbsencesByParent);

router.get('/get-excuse-reasons/grade-teacher', absencesController.getExcuseReasonsByGradeTeacher);
router.get('/get-excuse-reasons/teacher', absencesController.getExcuseReasonsByTeacher);
router.get('/get-excuse-reasons/parent', absencesController.getExcuseReasonsByParent);
router.get('/get-excuse-reasons/student', absencesController.getExcuseReasonsByStudent);



module.exports = router