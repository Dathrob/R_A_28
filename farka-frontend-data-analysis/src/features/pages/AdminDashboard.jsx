import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, fetchEnrollments, createCourse, deleteCourse } from "../elearning/elearningSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { courses, enrollments, status, error } = useSelector((state) => state.onlineCourses);
  const loading = status === "loading";

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [courseData, setCourseData] = useState({
    title: '', description: '', price: '', status: 'active', start_date: '', end_date: ''
  });

  const handleDeleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await dispatch(deleteCourse(id));
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    await dispatch(createCourse(courseData));
    setShowAddCourse(false);
    setCourseData({ title: '', description: '', price: '', status: 'active', start_date: '', end_date: '' });
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCourses());
      dispatch(fetchEnrollments());
    }
  }, [status, dispatch]);

  
  const calculateRevenue = () => {
    return enrollments.reduce((sum, enr) => {
      const coursePrice = enr.course ? Number(enr.course.price) : 0;
      return sum + coursePrice;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-indigo-800">
          AdminPanel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${activeTab === 'dashboard' ? 'bg-indigo-800 text-white' : 'hover:bg-indigo-800 text-indigo-200'}`}>Dashboard</button>
          <button onClick={() => setActiveTab('courses')} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${activeTab === 'courses' ? 'bg-indigo-800 text-white' : 'hover:bg-indigo-800 text-indigo-200'}`}>Courses</button>
          <button className="w-full text-left px-4 py-3 hover:bg-indigo-800 rounded-lg text-indigo-200 transition">Users</button>
          <button className="w-full text-left px-4 py-3 hover:bg-indigo-800 rounded-lg text-indigo-200 transition">Settings</button>
        </nav>
      </aside>

      
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {activeTab === 'dashboard' ? 'Dashboard Overview' : 'Manage Courses'}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium text-gray-600">Admin User</div>
          </div>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

      
        {activeTab === 'dashboard' && (
          <>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Enrollments</p>
                  <p className="text-3xl font-bold text-indigo-600 mt-1">{enrollments.length}</p>
                </div>
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 text-xl">🎓</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Active Courses</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">{courses.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 text-xl">📚</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Revenue</p>
                  <p className="text-3xl font-bold text-blue-600 mt-1">${calculateRevenue()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-xl">💰</div>
              </div>
            </div>

            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">Recent Enrollments</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                      <th className="px-6 py-4 font-medium">Student Name</th>
                      <th className="px-6 py-4 font-medium">Course</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loading ? (
                      <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Loading data...</td></tr>
                    ) : enrollments.length === 0 ? (
                      <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No enrollments found.</td></tr>
                    ) : (
                      enrollments.map((enr) => (
                        <tr key={enr.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 text-sm font-medium text-gray-800">{enr.user ? enr.user.name : 'Unknown'}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{enr.course ? enr.course.title : 'Unknown'}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{new Date(enr.created_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${enr.status === 'enrolled' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {enr.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium mr-3">Approve</button>
                            <button className="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        
        {activeTab === 'courses' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Available Courses</h2>
              <button 
                onClick={() => setShowAddCourse(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Add New Course
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                    <th className="px-6 py-4 font-medium">Course Title</th>
                    <th className="px-6 py-4 font-medium">Price</th>
                    <th className="px-6 py-4 font-medium">Start Date</th>
                    <th className="px-6 py-4 font-medium">End Date</th>
                    <th className="px-6 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Loading data...</td></tr>
                  ) : courses.length === 0 ? (
                    <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No courses found.</td></tr>
                  ) : (
                    courses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{course.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">${course.price}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{course.start_date || 'TBD'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{course.end_date || 'TBD'}</td>
                        <td className="px-6 py-4">
                          <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium mr-3">Edit</button>
                          <button 
                            onClick={() => handleDeleteCourse(course.id)} 
                            className="text-red-600 hover:text-red-900 text-sm font-medium transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

     
      {showAddCourse && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">Add New Course</h3>
              <button onClick={() => setShowAddCourse(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form onSubmit={handleAddCourse} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                <input 
                  type="text" required
                  value={courseData.title} onChange={e => setCourseData({...courseData, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  required rows="3"
                  value={courseData.description} onChange={e => setCourseData({...courseData, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input 
                    type="number" required min="0" step="0.01"
                    value={courseData.price} onChange={e => setCourseData({...courseData, price: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    value={courseData.status} onChange={e => setCourseData({...courseData, status: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input 
                    type="date"
                    value={courseData.start_date} onChange={e => setCourseData({...courseData, start_date: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input 
                    type="date"
                    value={courseData.end_date} onChange={e => setCourseData({...courseData, end_date: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3 border-t border-gray-100 pt-4">
                <button type="button" onClick={() => setShowAddCourse(false)} className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition">Cancel</button>
                <button type="submit" className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition">Save Course</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
