const express = require('express')
const router = express.Router()


const eventsController = require('../controllers/events.controller')


router.post('/add', eventsController.addEvent)

router.post('/get', eventsController.getAllEvents)

router.post('/get/student', eventsController.getEventsByStudent)

router.post('/get/parent', eventsController.getEventsByParent)

module.exports = router