// src/components/Student/CourseEnroll.jsx
import React, { useState } from 'react';
import api from '../../services/api';
import CourseDetailsModal from '../../components/CourseDetailsModal';

const CourseEnroll = ({ courses, onRefresh }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleEnroll = async (courseId) => {
    try {
      await api.post('/enrollments', { courseId });
      onRefresh();
    } catch (err) { 
      alert('Already enrolled or error occurred');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {courses.map(course => (
          <div key={course.id} className="p-4 bg-white border rounded hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedCourse(course)}>
            <div className="space-y-2">
              <h4 className="font-bold text-lg">{course.course_name}</h4>
              <p className="text-sm text-gray-600"><strong>Institution:</strong> {course.institution}</p>
              <p className="text-sm text-gray-600"><strong>Duration:</strong> {course.duration}</p>
              <p className="text-sm text-gray-600"><strong>Schedule:</strong> {course.schedule}</p>
              <p className="text-sm text-gray-600"><strong>Dates:</strong> {new Date(course.start_date).toLocaleDateString()} - {new Date(course.end_date).toLocaleDateString()}</p>
            </div>
            <div className="mt-4 flex items-center">
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering course detail modal
                  handleEnroll(course.id); 
                }}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
              >
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Course Details Modal */}
      <CourseDetailsModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
};

export default CourseEnroll;