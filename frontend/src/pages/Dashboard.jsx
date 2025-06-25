import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (location.state?.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        
        navigate('.', { replace: true, state: {} });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state, navigate]);

  if (!token) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Please login to access the dashboard</p>
        <Link to="/login" className="text-indigo-600 hover:text-indigo-800">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome to your Dashboard</h2>

      {showSuccess && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Post created successfully!
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

        <Link
          to="/posts/create"
          state={{ fromDashboard: true }} 
          className="inline-block px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-md shadow hover:bg-indigo-700 transition duration-200"
        >
          + Create New Post
        </Link>
      </div>

    </div>
  );
};

export default Dashboard;