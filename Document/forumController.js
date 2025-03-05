const ForumPost = require('../models/ForumPost');

exports.createPost = async (req, res) => {
  try {
    const post = new ForumPost({
      content: req.body.content,
    });
    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error('Error creating post:', error); // Log detailed error for debugging
    res.status(500).json({ error: 'Failed to post. Please try again.', details: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error); // Log detailed error for debugging
    res.status(500).json({ error: 'Failed to fetch posts. Please try again.', details: error.message });
  }
};