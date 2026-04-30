// src/pages/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import CourseEnroll from '../components/Student/CourseEnroll';
import MyCourses from '../components/Student/MyCourses';

const StudentDashboard = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);

  const fetchData = async () => {
    const coursesRes = await api.get('/courses');
    const myRes = await api.get('/enrollments/my');
    setAllCourses(coursesRes.data);
    setMyCourses(myRes.data);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="container mx-auto p-6 space-y-10">
      <section>
        <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>
        <MyCourses enrollments={myCourses} />
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
        <CourseEnroll courses={allCourses} onRefresh={fetchData} />
      </section>
    </div>
  );
};

export default StudentDashboard;