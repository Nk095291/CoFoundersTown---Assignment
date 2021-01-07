const express = require('express');
// to auto matically wrap all the router in try and catch blocks
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const UsersController = require('../controllers/users');
const { validateBody, schemas } = require('../helpers/routeHelpers');
const passportSignin = passport.authenticate('local', {session : false });
const passportJWT = passport.authenticate('jwt', { failureRedirect : 'home', session: false}) ;


router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
    .post(validateBody(schemas.loginSchema), passportSignin, UsersController.signIn);

// if not authenticated , then redirect it to home page
router.route('/username')
    .get(passportJWT, UsersController.username);

router.route('/home')
  .get(UsersController.home);
// if not authenticated , then redirect it to home page
router.route('/publish')
  .post( passportJWT, validateBody(schemas.postSchema), UsersController.publish);

module.exports = router;