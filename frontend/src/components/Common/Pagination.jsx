import React from 'react';
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-12">
  <nav className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-2">

    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="group flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-gray-50 disabled:hover:to-gray-100 disabled:hover:text-gray-700 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200/50"
    >
      <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span className="font-medium text-sm">Previous</span>
    </button>
    

    <div className="flex items-center space-x-1 px-2">
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`relative w-10 h-10 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
            currentPage === page 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700' 
              : 'bg-gray-50 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 border border-gray-200/50 hover:border-blue-200'
          }`}
        >
          {currentPage === page && (
            <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
          )}
          <span className="relative z-10">{page}</span>
        </button>
      ))}
    </div>
    
  
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="group flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-gray-50 disabled:hover:to-gray-100 disabled:hover:text-gray-700 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200/50"
    >
      <span className="font-medium text-sm">Next</span>
      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </nav>
  

  <div className="absolute mt-16 flex items-center justify-center">
    <div className="bg-gray-100/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/50">
      <span className="text-sm text-gray-600 font-medium flex items-center space-x-2">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>Page {currentPage} of {totalPages}</span>
      </span>
    </div>
  </div>
</div>
  );
};

export default Pagination;