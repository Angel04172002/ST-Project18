const express = require('express')
const router = express.Router()


const remarkController = require('../controllers/remark.controller')


router.post('/add', remarkController.addRemark)

router.get('/get/student', remarkController.getRemarksByStudent)

router.get('/get/parent', remarkController.getRemarksByParent)

router.get('/get/teacher', remarkController.getRemarksByTeacher)

router.get('/get/class-teacher', remarkController.getRemarksByClassTeacher)

module.exports = router
