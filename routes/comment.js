const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentController = require('../controller/comments_contoller');
router.post('/create',passport.checkAuthentication,commentController.createComment);
router.get('/delete/:id',passport.checkAuthentication,commentController.deleteComment);
module.exports = router;