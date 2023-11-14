const express = require('express')
const router = express.Router()

const gradesController = require('../controllers/grades.controller')


router.get('/student', gradesController.getGradesByStudent)

router.get('/teacher', gradesController.getGradesByTeacher)

router.get('/parent', gradesController.getGradesByParent)


module.exports = router