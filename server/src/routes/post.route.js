const express = require('express')
const router = express.Router()

const postController = require('../controllers/post.controller')

router.post('/post/add', postController.addNewPost);
router.post('/get', postController.getAllPosts);
router.post('/get/id', postController.openPost);
router.post('/like', postController.likePost);
router.post('/like/check', postController.checkIfLiked);
router.post('/likes/get', postController.getLikes);
router.post('/comment/add', postController.addComment);
router.post('/comment/get', postController.getCommentsForAPost);
router.post('/post/delete', postController.deletePost);

module.exports = router