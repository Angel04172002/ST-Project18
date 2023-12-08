const express = require('express')
const router = express.Router()

const gradesController = require('../controllers/grades.controller')


router.post('/student', gradesController.getGradesByStudent)

router.post('/teacher', gradesController.getGradesByTeacher)

router.post('/parent', gradesController.getGradesByParent)

router.post('/add-to-grade', gradesController.addStudentsToGrade)

router.post('/add-subjects-to-grade', gradesController.addSubjectsToGrade)

router.post('/all', gradesController.getStudentsWithGradeAndDivison)

router.post('/subjects/all', gradesController.getAllSubjects)

router.post('/get/teachers/grades', gradesController.getGradesDivisionsAndSubjectsForTeacher)
router.post('/get/grade-teachers/grades', gradesController.getGradesDivisionsAndSubjectsForGradeTeacher)
router.post('/get/students/grades', gradesController.getGradesDivisionsAndSubjectsForStudent)
router.post('/get/parents/grades', gradesController.getGradesDivisionsAndSubjectsForStudent)
<<<<<<< HEAD
router.post('/get/students/by-grades', gradesController.getStudentsByGradeAndDivision);
=======
router.post('/get/students/by-grades', gradesController.getStudentsByGradeAndDivision)

>>>>>>> 2ba2029e80d2cc64ff2718a6e88d96166b7e79bb

module.exports = router