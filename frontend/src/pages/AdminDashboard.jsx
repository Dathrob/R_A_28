// src/pages/AdminDashboard.jsx
import React from 'react';
import CourseManager from '../components/Admin/CourseManager';

const AdminDashboard = () => (
  <div className="container mx-auto p-6">
    <h2 className="text-3xl font-bold mb-6">Admin Console</h2>
    <CourseManager />
  </div>
);

export default AdminDashboard;