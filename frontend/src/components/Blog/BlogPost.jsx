import React from 'react';  
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Loading from '../Common/Loading';
import { useAuth } from '../../context/AuthContext';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  async function handleDeletePost(){
    try {
      await api.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      navigate('/');
    } catch (err) {
      setError('Failed to delete post. Please try again later.');
    }
  }

  if (loading) return <Loading />;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300">
        <div className="p-8">

          <span className="inline-block px-4 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold mb-5 shadow-sm">
            {post?.Category?.name}
          </span>


          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            {post?.title}
          </h1>


          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="font-medium">By {post.username}</span>
            <span className="text-gray-400">•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

    
          <div className="flex flex-wrap gap-2 mb-6">
            {post.Tags?.map((tag) => (
              <Link
                key={tag.name}
                to={`/posts?tag=${tag.name}`}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium hover:bg-gray-200 transition duration-200"
              >
                #{tag.name}
              </Link>
            ))}
          </div>

          <div className="prose prose-lg prose-indigo max-w-none mb-10">
            <p className="whitespace-pre-line">{post.content}</p>
          </div>

          {token && (
            <div className="flex gap-4">
              <Link
                to={`/posts/${post.id}/edit`}
                className="px-5 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold shadow-md hover:bg-indigo-700 transition"
              >
                Edit Post
              </Link>
              <button
                onClick={handleDeletePost}
                className="px-5 py-2 bg-red-600 text-white rounded-md text-sm font-semibold shadow-md hover:bg-red-700 transition"
              >
                Delete Post
              </button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;