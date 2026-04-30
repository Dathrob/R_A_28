import React from 'react';

const CourseDetailsModal = ({ course, onClose }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{course.course_name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Course Information</h3>
            <p className="text-gray-600"><strong>Institution:</strong> {course.institution}</p>
            <p className="text-gray-600"><strong>Duration:</strong> {course.duration}</p>
            <p className="text-gray-600"><strong>Class Mode:</strong> {course.class_mode}</p>
            <p className="text-gray-600"><strong>Schedule:</strong> {course.schedule}</p>
            <p className="text-gray-600"><strong>Description:</strong> {course.description}</p>
          </div>

          {/* Registration Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Registration Information</h3>
            <p className="text-gray-600"><strong>Registration Period:</strong> 
              {new Date(course.registration_start).toLocaleDateString()} to 
              {new Date(course.registration_end).toLocaleDateString()}
            </p>
            <p className="text-gray-600"><strong>Class Dates:</strong> 
              {new Date(course.start_date).toLocaleDateString()} to 
              {new Date(course.end_date).toLocaleDateString()}
            </p>
            {course.registration_link && (
              <div className="mt-2">
                <a 
                  href={course.registration_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Register Now: {course.registration_link}
                </a>
              </div>
            )}
          </div>

          {/* Fees */}
          {course.fees && course.fees.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Fee Structure</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fee (ETB)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {course.fees.map(fee => (
                      <tr key={fee.id}>
                        <td className="px-6 py-4 text-sm text-gray-900">{fee.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{fee.fee.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex justify-end space-x-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsModal;