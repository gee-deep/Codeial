const express = require('express');
const router = express.Router();
const postsController = require('../../../controller/api/v1/posts_api');
console.log('Posts loaded');

router.get('/',postsController.index);

module.exports = router;