const express = require('express')
const router = express.Router()


const eventsController = require('../controllers/events.controller')


router.post('/add', eventsController.addEvent)

router.get('/get', eventsController.getAllEvents)

router.get('/get/student', eventsController.getEventsByStudent)

router.get('/get/parent', eventsController.getEventsByParent)

module.exports = router