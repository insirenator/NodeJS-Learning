const express = require('express');
const { registerUser, loginUser, verifyUser } = require('../controllers/users');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/verify').get(verifyUser);

module.exports = router