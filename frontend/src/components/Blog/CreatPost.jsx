import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: 1,
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'categoryId' ? Number(value) : value
    }));
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

  
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required.');
      setIsLoading(false);
      return; 
    }

    const submitData = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      categoryId: formData.categoryId,
      tags: formData.tags.length > 0 ? formData.tags : []
    };

    console.log('Submitting data:', submitData); 

    try {
      const response = await api.post('/posts', submitData);
      console.log('Post created successfully:', response.data);
      navigate('/dashboard');
    } catch (err) {
      console.error('CreatePost error:', err);
      console.error('Error response:', err.response);
     
      if (err.response) {
        
        const errorMessage = err.response.data?.message || 
                           err.response.data?.error || 
                           `Server error: ${err.response.status}`;
        setError(errorMessage);
        
        console.error('Server error details:', {
          status: err.response.status,
          data: err.response.data,
          headers: err.response.headers
        });
      } else if (err.request) {
     
        setError('Network error. Please check your connection and try again.');
      } else {
     
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
<div className="container mx-auto px-4 py-12 max-w-2xl">
  <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>

  {error && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md shadow-sm mb-6 text-sm">
      {error}
    </div>
  )}

  <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
    <div>
      <label htmlFor="title" className="block text-gray-800 font-medium mb-2">
        Title <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        placeholder="Enter post title"
        required
        disabled={isLoading}
      />
    </div>

    <div>
      <label htmlFor="content" className="block text-gray-800 font-medium mb-2">
        Content <span className="text-red-500">*</span>
      </label>
      <textarea
        id="content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        rows={8}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
        placeholder="Write your post content here..."
        required
        disabled={isLoading}
      />
    </div>

    <div>
      <label htmlFor="categoryId" className="block text-gray-800 font-medium mb-2">
        Category
      </label>
      <select
        id="categoryId"
        name="categoryId"
        value={formData.categoryId}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        disabled={isLoading}
      >
        <option value={1}>Technology</option>
        <option value={2}>Travel</option>
        <option value={3}>Food</option>
        <option value={4}>Lifestyle</option>
      </select>
    </div>

    <div>
      <label className="block text-gray-800 font-medium mb-2">Tags</label>
      <div className="flex mb-3">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder="Add a tag and press Enter"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || !tagInput.trim()}
        >
          Add
        </button>
      </div>

      {formData.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center bg-gray-100 px-3 py-1 rounded-full shadow-sm text-sm"
            >
              <span className="mr-2 text-gray-700">#{tag}</span>
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-gray-400 hover:text-red-500 focus:outline-none"
                disabled={isLoading}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>

    <div className="flex justify-end gap-3 pt-4">
      <button
        type="button"
        onClick={() => navigate('/dashboard')}
        className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-6 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? 'Publishing...' : 'Publish'}
      </button>
    </div>
  </form>
</div>

  );
};

export default CreatePost;