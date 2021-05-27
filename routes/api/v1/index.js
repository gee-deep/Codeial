const express = require('express');
const router = express.Router();

console.log('V1 loaded');
router.use('/posts',require('./posts'));
router.use('/users',require('./users'));

module.exports = router;
