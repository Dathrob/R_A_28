const express = require('express');
const {
  getMyEnrollments,
  enrollInCourse,
  unenroll,
} = require('../controllers/enrollmentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// All enrollment endpoints are for students only
router.use(authMiddleware);
router.use(roleMiddleware(['student']));

router.get('/my', getMyEnrollments);
router.post('/', enrollInCourse);
router.delete('/:courseId', unenroll); // optional

module.exports = router;