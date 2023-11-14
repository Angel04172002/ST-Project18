const express = require('express')
const router = express.Router();

const profileController = require('../controllers/profile.controller');

router.post('/create', profileController.createProfile)

router.post('/auth', profileController.auth)

router.post('/', profileController.getProfileById)

module.exports = router