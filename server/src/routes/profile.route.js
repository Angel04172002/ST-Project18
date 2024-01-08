const express = require('express')
const router = express.Router();
const auth = require("../middleware/auth");


const profileController = require('../controllers/profile.controller');

router.post('/create', profileController.createProfile)

router.post('/auth', profileController.auth)
router.post('/update', profileController.updateUser)

router.use(auth)

router.get('/', profileController.getProfileById)

module.exports = router