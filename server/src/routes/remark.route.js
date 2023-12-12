const express = require('express')
const router = express.Router()


const remarkController = require('../controllers/remark.controller')


router.post('/add', remarkController.addRemark)

router.post('/get/student', remarkController.getRemarksByStudent)

router.post('/get/parent', remarkController.getRemarksByParent)

router.post('/get/teacher', remarkController.getRemarksByTeacher)

router.post('/get/class-teacher', remarkController.getRemarksByClassTeacher)

module.exports = router
