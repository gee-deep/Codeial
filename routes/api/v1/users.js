const express = require('express');
const router = express.Router();
const passport = require('passport')
const usersApiController = require('../../../controller/api/v1/users_api');

router.post('/generate-token',usersApiController.createToken);

module.exports = router