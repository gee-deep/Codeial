const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersController = require('../controller/users_controller');
router.get('/profile',passport.checkAuthentication, usersController.profile);
router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);
router.post('/create',usersController.create);
router.post('/create-session',passport.authenticate('local',
{
    failureRedirect: '/users/sign-in',
    failureFlash: true }
),usersController.createSession);
module.exports = router;