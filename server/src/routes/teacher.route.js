const express = require('express')
const router = express.Router()

const teacherController = require('../controllers/teacher.controller')


router.post('/add/subjects-and-grades', teacherController.addSubjectsAndGradesToTeacher)
router.get('/get/teacher-grades', teacherController.getSubjectsAndGradesForTeacher)


module.exports = router