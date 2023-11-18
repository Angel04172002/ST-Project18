const express = require('express')
const router = express.Router();

const profileRoute = require('./profile.route')
const gradesRoute = require('./grades.route')
const chatRote = require('./chat.route')

// Add profile routing
router.use('/profile', profileRoute);

// Add grades routing
router.use('/grades', gradesRoute)

router.use('/chat', chatRote)

module.exports = router