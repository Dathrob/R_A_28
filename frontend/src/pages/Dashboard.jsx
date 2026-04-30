// src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'admin') navigate('/admin');
    else if (user?.role === 'student') navigate('/student');
  }, [user, navigate]);

  return <div className="p-10 text-center">Redirecting...</div>;
};

export default Dashboard;