const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

// Public route to see museum (only public posts)
router.get('/', postController.getAllPosts);

// Protected routes
router.post('/', auth, postController.createPost);
router.get('/mine', auth, postController.getMyPosts);    // The Attic
router.patch('/:id/privacy', auth, postController.togglePrivacy); // Privacy Switch

module.exports = router;
