const express = require('express');
const router = express.Router();
const { validateForumPost } = require('../middleware/validate');
const forumController = require('../controllers/forumController');

router.post('/', validateForumPost, forumController.createPost);
router.get('/', forumController.getPosts);

module.exports = router;