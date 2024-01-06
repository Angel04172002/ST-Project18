const express = require('express')
const router = express.Router();

const profileRoute = require('./profile.route')
const gradesRoute = require('./grades.route')
const chatRote = require('./chat.route')
const marksRoute = require('./marks.route')
const teacherRoute = require('./teacher.route')
const absenceRoute = require('./absence.route')
const remarkRoute = require('./remark.route')
const eventsRoute = require('./events.route')
const postRoute = require('./post.route');

// Add profile routing
router.use('/profile', profileRoute);

// Add grades routing
router.use('/grades', gradesRoute)

router.use('/chat', chatRote)

router.use('/marks', marksRoute)

router.use('/absences', absenceRoute);

router.use('/teacher', teacherRoute);

router.use('/remark', remarkRoute)

router.use('/events', eventsRoute)

router.use('/posts', postRoute);

// router.use('/calendar', calendarRoute);



module.exports = router