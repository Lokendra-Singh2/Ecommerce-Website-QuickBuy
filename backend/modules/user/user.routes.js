const express = require('express');
const router = express.Router();
const{login, logout,getMyProfile, registerNewUser, updateMyProfile, getAllUser,deleteUser,forgotPassword,updatePassword} = require('./user.controller');
const {authenticate, authorize} = require('../../Authentication/auth');

router.route('/login').post(login);
router.route('/logout').put(logout);
router.route('/').get(authenticate,getMyProfile).put(registerNewUser).put(authenticate,updateMyProfile);
router.route('/admin/').get(authenticate,authorize,getAllUser);
router.route('/admin/:id').delete(authenticate,authorize,deleteUser);
router.route('/forgotPassword').put(forgotPassword);
router.route('/updatePassword').put(updatePassword);


module.exports = router;