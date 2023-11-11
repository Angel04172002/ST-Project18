const express = require('express')
const router = express.Router();

const profileRoute = require('./profile.route')


// Add profile routing
router.use('/profile', profileRoute);

module.exports = router