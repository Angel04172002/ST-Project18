const express = require('express')
const router = express.Router()

const marksController = require('../controllers/marks.controller')

router.post('/teacher/add', marksController.addMarksByTeacher)

router.post('/teacher/', marksController.getMarksByTeacher)

router.post('/teacher/class', marksController.getMarksByClassTeacher)


module.exports = router