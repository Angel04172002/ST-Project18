const express = require('express')
const router = express.Router();
const auth = require("../middleware/auth");


const profileController = require('../controllers/profile.controller');

router.post('/create', profileController.createProfile)

router.post('/auth', profileController.auth)

router.use(auth)

router.post('/', profileController.getProfileById)

module.exports = router