import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/components.css';

function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/api/forum');
        console.log('Forum posts response:', response.data); // Log the response for debugging
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching forum posts:', error.response ? error.response : error);
        const errorMessage = error.response?.data?.error || 'Failed to load forum posts. Please try again.';
        setError(errorMessage);
        console.log('Error details:', error.response?.data?.details || error.message); // Log detailed error for debugging
      }
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/forum', { content: newPost });
      console.log('Response from backend:', response.data); // Log the response for debugging
      setPosts([...posts, response.data]);
      setNewPost('');
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error posting to forum:', error.response ? error.response : error);
      const errorMessage = error.response?.data?.error || 'Failed to post. Please try again.';
      setError(errorMessage);
      console.log('Error details:', error.response?.data?.details || error.message); // Log detailed error for debugging
    }
  };

  return (
    <div className="forum-container">
      <h2>Community Forum</h2>
      <p>Share your experiences, safety tips, and advice with others.</p>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="forum-form">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your experience or safety tips"
          className="forum-input"
          required
        />
        <button type="submit" className="forum-submit">Post</button>
      </form>
      <div className="forum-posts">
        {posts.length === 0 ? (
          <p>No posts yet. Be the first to share!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="forum-post">
              <p>{post.content}</p>
              <small>Posted on: {new Date(post.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Forum;