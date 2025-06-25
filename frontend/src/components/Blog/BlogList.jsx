import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Loading from '../Common/Loading';
import Pagination from '../Common/Pagination';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const currentTag = searchParams.get('tag');
  const currentCategory = searchParams.get('category');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        if (currentPage < 1) {
          setSearchParams({ page: 1 });
          return;
        }

        const response = await api.get('/posts', {
          params: {
            page: currentPage,
            tag: currentTag,
            category: currentCategory,
          },
        });

        setPosts(response.data.posts || []);
        setPagination(response.data.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalPosts: 0,
        });

      } catch (err) {
        setError(
          err.response?.data?.message ||
          err.message ||
          'Failed to load posts. Please try again later.'
        );

        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchParams, currentPage, currentTag, currentCategory]);

  const handlePageChange = (page) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set('page', page);
    setSearchParams(updatedParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loading />;

  return (
  <div className="container mx-auto px-4 py-10">
    {error && (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-md shadow-sm mb-8">
        <p className="font-medium">Error: {error}</p>
      </div>
    )}

  {posts.length > 0 ? (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => navigate(`/posts/${post.id}`)}
            className="bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-md p-6 transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 line-clamp-2">
              {post.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {post.content.substring(0, 100)}...
            </p>
          </div>
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <div className="mt-10">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  ) : (
    !error && (
      <div className="text-center mt-16 text-gray-500 text-lg font-medium">
        No posts found.
      </div>
    )
  )}
</div>

  );
};

export default BlogList;
