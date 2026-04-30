// src/components/Student/MyCourses.jsx
import React from 'react';

const MyCourses = ({ enrollments }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {enrollments.length === 0 ? <p className="text-gray-500">No courses enrolled yet.</p> : 
        enrollments.map(en => (
          <div key={en.id} className="p-4 bg-blue-50 border border-blue-200 rounded shadow-sm">
            <h4 className="font-bold text-blue-800">{en.course_name}</h4>
            <p className="text-sm">Status: <span className="text-green-600 font-medium">Active</span></p>
          </div>
        ))
      }
    </div>
  );
};

export default MyCourses;