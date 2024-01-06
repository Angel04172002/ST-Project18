const express = require('express')
const router = express.Router()

const marksController = require('../controllers/marks.controller')

router.post('/teacher/add', marksController.addMarksByTeacher)

router.get('/teacher/', marksController.getMarksByTeacher)

router.get('/teacher/class', marksController.getMarksByClassTeacher)

router.get('/student', marksController.getMarksByStudent)

router.get('/parent', marksController.getMarksByParent)


module.exports = router