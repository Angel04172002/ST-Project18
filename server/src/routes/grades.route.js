const express = require('express')
const router = express.Router()

const gradesController = require('../controllers/grades.controller')


router.post('/student', gradesController.getGradesByStudent)

router.post('/teacher', gradesController.getGradesByTeacher)

router.post('/parent', gradesController.getGradesByParent)

router.post('/add-to-grade', gradesController.addStudentsToGrade)

router.post('/add-subjects-to-grade', gradesController.addSubjectsToGrade)

router.get('/all', gradesController.getStudentsWithGradeAndDivison)

router.get('/subjects/all', gradesController.getAllSubjects)

router.get('/get/teachers/grades', gradesController.getGradesDivisionsAndSubjectsForTeacher)
router.get('/get/grade-teachers/grades', gradesController.getGradesDivisionsAndSubjectsForGradeTeacher)
router.get('/get/students/grades', gradesController.getGradesDivisionsAndSubjectsForStudent)
router.get('/get/parents/grades', gradesController.getGradesDivisionsAndSubjectsForParent)

router.get('/get/students/by-grades', gradesController.getStudentsByGradeAndDivision)

module.exports = router