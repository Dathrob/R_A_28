// src/components/Admin/CourseManager.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const CourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ 
    course_name: '', 
    description: '', 
    institution: '',
    duration: '',
    class_mode: '',
    schedule: '',
    registration_link: '',
    registration_start: '',
    registration_end: '',
    start_date: '',
    end_date: '' 
  });

  const fetchCourses = async () => {
    const res = await api.get('/courses');
    setCourses(res.data);
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) await api.put(`/courses/${editId}`, form);
    else await api.post('/courses', form);
    setEditId(null);
    setForm({ 
      course_name: '', 
      description: '', 
      institution: '',
      duration: '',
      class_mode: '',
      schedule: '',
      registration_link: '',
      registration_start: '',
      registration_end: '',
      start_date: '',
      end_date: '' 
    });
    fetchCourses();
  };

  const handleDelete = async (id) => {
    await api.delete(`/courses/${id}`);
    fetchCourses();
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            placeholder="Course Name" 
            value={form.course_name} 
            onChange={e => setForm({...form, course_name: e.target.value})} 
            className="p-2 border rounded w-full" 
            required 
          />
          <input 
            placeholder="Institution" 
            value={form.institution} 
            onChange={e => setForm({...form, institution: e.target.value})} 
            className="p-2 border rounded w-full" 
            required 
          />
          <textarea 
            placeholder="Description" 
            value={form.description} 
            onChange={e => setForm({...form, description: e.target.value})} 
            className="p-2 border rounded w-full" 
            required 
          />
          <input 
            placeholder="Duration (e.g., 6 weekends)" 
            value={form.duration} 
            onChange={e => setForm({...form, duration: e.target.value})} 
            className="p-2 border rounded w-full" 
          />
          <input 
            placeholder="Class Mode (e.g., Fully Online)" 
            value={form.class_mode} 
            onChange={e => setForm({...form, class_mode: e.target.value})} 
            className="p-2 border rounded w-full" 
          />
          <input 
            placeholder="Schedule (e.g., Saturday and Sunday 8:00-12:00 LT)" 
            value={form.schedule} 
            onChange={e => setForm({...form, schedule: e.target.value})} 
            className="p-2 border rounded w-full" 
          />
          <input 
            placeholder="Registration Link" 
            value={form.registration_link} 
            onChange={e => setForm({...form, registration_link: e.target.value})} 
            className="p-2 border rounded w-full" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="date" 
              placeholder="Registration Start Date" 
              value={form.registration_start} 
              onChange={e => setForm({...form, registration_start: e.target.value})} 
              className="p-2 border rounded w-full" 
              required 
            />
            <input 
              type="date" 
              placeholder="Registration End Date" 
              value={form.registration_end} 
              onChange={e => setForm({...form, registration_end: e.target.value})} 
              className="p-2 border rounded w-full" 
              required 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="date" 
              placeholder="Start Date" 
              value={form.start_date} 
              onChange={e => setForm({...form, start_date: e.target.value})} 
              className="p-2 border rounded w-full" 
              required 
            />
            <input 
              type="date" 
              placeholder="End Date" 
              value={form.end_date} 
              onChange={e => setForm({...form, end_date: e.target.value})} 
              className="p-2 border rounded w-full" 
              required 
            />
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto">
          {editId ? 'Update Course' : 'Add Course'}
        </button>
      </form>

      <div className="space-y-4">
        {courses.map(c => (
          <div key={c.id} className="p-4 bg-white rounded shadow border">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{c.course_name}</h3>
              <div className="space-x-2">
                <button onClick={() => {setEditId(c.id); setForm(c);}} className="text-blue-500 hover:text-blue-700">Edit</button>
                <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:text-red-700">Delete</button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1"><strong>Institution:</strong> {c.institution}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Duration:</strong> {c.duration}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Schedule:</strong> {c.schedule}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Dates:</strong> {new Date(c.start_date).toLocaleDateString()} - {new Date(c.end_date).toLocaleDateString()}</p>
            {c.description && (
              <p className="text-sm text-gray-700 line-clamp-2">{c.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseManager;