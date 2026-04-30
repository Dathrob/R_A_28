const express = require('express');
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  createCourseFee,
  updateCourseFee,
  deleteCourseFee,
} = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Public routes - course listing and details accessible without authentication
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Admin only routes for course modification
router.post('/', authMiddleware, roleMiddleware(['admin']), createCourse);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateCourse);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteCourse);

// Course fees routes (admin only)
router.post('/:courseId/fees', authMiddleware, roleMiddleware(['admin']), createCourseFee);
router.put('/fees/:id', authMiddleware, roleMiddleware(['admin']), updateCourseFee);
router.delete('/fees/:id', authMiddleware, roleMiddleware(['admin']), deleteCourseFee);

module.exports = router;