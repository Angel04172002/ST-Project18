const express = require('express')
const router = express.Router()


const remarkController = require('../controllers/remark.controller')


router.post('/add', remarkController.addRemark)

module.exports = router
