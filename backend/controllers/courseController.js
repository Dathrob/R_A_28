const Course = require('../models/Course');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.getAll();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.getById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    
    // Get fees for this course
    const fees = await Course.getFeesByCourseId(course.id);
    course.fees = fees;
    
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { course_name, description, institution, duration, class_mode, schedule, registration_link, registration_start, registration_end, start_date, end_date } = req.body;
    if (!course_name) {
      return res.status(400).json({ error: 'Course name is required' });
    }
    const created_by = req.user.id; // admin id
    const newCourse = await Course.create(course_name, description, institution, duration, class_mode, schedule, registration_link, registration_start, registration_end, start_date, end_date, created_by);
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create course' });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { course_name, description, institution, duration, class_mode, schedule, registration_link, registration_start, registration_end, start_date, end_date } = req.body;
    const courseId = req.params.id;
    const existing = await Course.getById(courseId);
    if (!existing) return res.status(404).json({ error: 'Course not found' });

    const updated = await Course.update(courseId, course_name, description, institution, duration, class_mode, schedule, registration_link, registration_start, registration_end, start_date, end_date);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update course' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const existing = await Course.getById(courseId);
    if (!existing) return res.status(404).json({ error: 'Course not found' });

    await Course.delete(courseId);
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete course' });
  }
};

// Course fees controllers
exports.createCourseFee = async (req, res) => {
  try {
    const { courseId, category, fee, currency } = req.body;
    if (!courseId || !category || !fee) {
      return res.status(400).json({ error: 'Course ID, category, and fee are required' });
    }
    const newFee = await Course.createFee(courseId, category, fee, currency);
    res.status(201).json(newFee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create course fee' });
  }
};

exports.updateCourseFee = async (req, res) => {
  try {
    const { id, category, fee, currency } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Fee ID is required' });
    }
    const updatedFee = await Course.updateFee(id, category, fee, currency);
    if (!updatedFee) return res.status(404).json({ error: 'Fee not found' });
    res.json(updatedFee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update course fee' });
  }
};

exports.deleteCourseFee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Fee ID is required' });
    }
    const deletedFee = await Course.deleteFee(id);
    if (!deletedFee) return res.status(404).json({ error: 'Fee not found' });
    res.json({ message: 'Course fee deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete course fee' });
  }
};