import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
  <h1 className="text-7xl font-extrabold text-indigo-600 mb-4 tracking-tight">404</h1>
  <p className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</p>
  <p className="text-gray-500 mb-8 max-w-md">
    Sorry, the page you are looking for doesn’t exist or has been moved.
  </p>
  <Link
    to="/"
    className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition duration-200"
  >
    Go Back Home
  </Link>
</div>

  );
};

export default NotFound;