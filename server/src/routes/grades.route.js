const express = require('express')
const router = express.Router()

const gradesController = require('../controllers/grades.controller')


router.post('/student', gradesController.getGradesByStudent)

router.post('/teacher', gradesController.getGradesByTeacher)

router.post('/parent', gradesController.getGradesByParent)

router.post('/add-to-grade', gradesController.addStudentsToGrade)

router.post('/add-subjects-to-grade', gradesController.addSubjectsToGrade)

module.exports = router