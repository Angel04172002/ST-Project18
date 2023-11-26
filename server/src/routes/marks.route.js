const express = require('express')
const router = express.Router()

const marksController = require('../controllers/marks.controller')

router.post('/teacher/add', marksController.addMarksByTeacher)

router.post('/teacher/', marksController.getMarksByTeacher)

router.post('/teacher/class', marksController.getMarksByClassTeacher)

router.post('/student', marksController.getMarksByStudent)

router.post('/parent', marksController.getMarksByParent)


module.exports = router