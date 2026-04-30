const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

exports.getMyEnrollments = async (req, res) => {
  try {
    const studentId = req.user.id;
    const enrollments = await Enrollment.getByStudent(studentId);
    res.json(enrollments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
};

exports.enrollInCourse = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ error: 'courseId is required' });
    }

    // Check if course exists
    const course = await Course.getById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Check if already enrolled
    const already = await Enrollment.exists(studentId, courseId);
    if (already) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }

    const enrollment = await Enrollment.create(studentId, courseId);
    res.status(201).json(enrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to enroll' });
  }
};

// Optional: unenroll
exports.unenroll = async (req, res) => {
  try {
    const studentId = req.user.id;
    const courseId = req.params.courseId;
    const deleted = await Enrollment.delete(studentId, courseId);
    if (!deleted) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    res.json({ message: 'Unenrolled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to unenroll' });
  }
};