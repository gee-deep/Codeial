const express = require('express');
const router = express.Router();
const express = require('express');
const postsController = require('../../../controller/api/v1/posts_api');

router.get('/',postsController.index);
router.get('/:id', postsController.deletePost);
module.exports = router;