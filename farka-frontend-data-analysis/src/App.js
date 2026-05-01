import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CourseEnrollment from './features/pages/registration';
import AdminDashboard from './features/pages/AdminDashboard';
import CourseList from './features/pages/CourseList';
import Certificate from './features/pages/Certificate';



function App() {
  return (
    <Router>
      <div className="App">
        
        <nav className="bg-white/10 backdrop-blur-md fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b border-white/10">
          <div className="text-xl font-bold text-indigo-500">Farka Academy </div>
          <div className="space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white font-medium">Student View</Link>
            <Link to="/admin" className="text-gray-300 hover:text-white font-medium">Admin View</Link>
          </div>
        </nav>

        <div className="pt-16 min-h-screen bg-[#0f172a]">
          <Routes>
            <Route path="/" element={<CourseList />} />
            <Route path="/enroll/:courseId" element={<CourseEnrollment />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/certificate/:enrollmentId" element={<Certificate />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
